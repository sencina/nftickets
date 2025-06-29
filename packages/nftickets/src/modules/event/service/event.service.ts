import { CreateEventDTO, EventDTO, MintTicketDTO } from '../dto';
import { Wallet, verifyMessage, JsonRpcSigner } from 'ethers';
import { WALLET_PRIVATE_KEY } from '@env';
import { PROVIDER } from '@modules/nft/utils/provider';
import { Deployer } from '@modules/nft/service/deployer/deployer.impl';
import { uploadMetadata } from '@modules/image/ipfs';
import { BUCKET_URL } from '@modules/image/utils/constants';
import { generateImage } from '@modules/image/image.generator';
import { Contract } from 'ethers';
import { ContractConfig, DEFAULT_CONTRACT, getContractConfig } from '@modules/nft/config/contracts.config';
import { IEventRepository } from '../repository/event.repository.interface';
import { createEventRepository } from '../repository/event.repository.factory';
import { NotFoundException, ValidationException } from '@utils/errors';
import { createTicketRepository } from '@modules/ticket/repository/ticket.repository.factory';
import { ITicketRepository } from '@modules/ticket/repository/ticket.repository.interface';
import { createSectorRepository } from '@modules/sector/repository/sector.repository.factory';
import { ISectorRepository } from '@modules/sector/repository/sector.repository.interface';
import { VERIFICATION_URL } from '../utils/constants';
import { MintingStrategyFactory } from '@modules/nft/strategy/minting';
import { AuthenticationStrategyFactory } from '@modules/nft/strategy/authentication';
import { DeploymentStrategyFactory } from '@modules/nft/strategy/deployment';
import { encryptQRData } from '@utils/encryption';

interface TransferStrategyNormal {
  type: 'NORMAL';
}

interface TransferStrategyNonTransferable {
  type: 'NON_TRANSFERABLE';
}

interface TransferStrategyFallback {
  type: 'FALLBACK';
  fallbackAddresses: string[];
}

type TransferStrategy = TransferStrategyNormal | TransferStrategyNonTransferable | TransferStrategyFallback;

export class EventService {
  private deployer: Deployer | undefined;
  private repository: IEventRepository;
  private ticketRepository: ITicketRepository;
  private sectorRepository: ISectorRepository;
  private defaultContractType: string;

  constructor(private readonly contractConfig: ContractConfig) {
    // Initialize repositories
    this.repository = createEventRepository();
    this.ticketRepository = createTicketRepository();
    this.sectorRepository = createSectorRepository();
    this.defaultContractType = this.contractConfig.name;
  }

  /**
   * Creates a server wallet signer for blockchain transactions
   * @param walletAddress The wallet address to associate with the transaction (for record-keeping only)
   * @returns A signer that uses the server wallet
   */
  private createServerWalletSigner(walletAddress?: string): any {
    // Check if we have a server wallet
    if (!WALLET_PRIVATE_KEY) {
      throw new ValidationException([{ message: 'Server wallet private key is required for executing transactions' }]);
    }

    const privateKey = WALLET_PRIVATE_KEY as string;

    // Create a signer that directly uses the server wallet
    const serverWallet = new Wallet(privateKey, PROVIDER);

    // Log the association with the user wallet if provided
    if (walletAddress) {
      console.log(`Using server wallet for transaction associated with ${walletAddress}`);
    }

    // Return the server wallet directly
    return serverWallet;
  }

  /**
   * Create a contract instance with the server wallet
   * @param address Contract address
   * @param walletAddress User's wallet address (for record-keeping only)
   * @param contractType Optional contract type
   * @returns Contract instance
   */
  private getContractWithServerWallet(address: string, walletAddress?: string, contractType?: string): Contract {
    // If contract type is provided, get its config, otherwise use the default
    const config = contractType ? getContractConfig(contractType) : this.contractConfig;

    // Create a contract instance with the server wallet
    try {
      // Create a signer that directly uses the server wallet
      const serverWallet = this.createServerWalletSigner(walletAddress);

      return new Contract(address, config.artifact.abi, serverWallet);
    } catch (error) {
      console.error('Error creating contract with server wallet:', error);
      throw new ValidationException([{ message: 'Failed to create contract: ' + (error as Error).message }]);
    }
  }

  /**
   * Create an event using the server wallet
   */
  async create(event: CreateEventDTO, walletAddress?: string, signature?: string): Promise<EventDTO> {
    // Use the contract type from the event if provided, otherwise use the default
    const contractType = event.contractType || this.defaultContractType;

    // Skip metadata upload during event creation - contracts don't need it
    // Metadata will be uploaded when minting individual tickets
    const hash = ''; // Use empty hash for now

    // Get the correct contract config based on the contract type
    const contractConfig = getContractConfig(contractType);

    try {
      // Create a deployer with the server wallet
      const serverWallet = this.createServerWalletSigner(walletAddress);

      const deployer = new Deployer(serverWallet, contractConfig.artifact.abi, contractConfig.artifact.bytecode);

      const deploymentStrategy = DeploymentStrategyFactory.getStrategy(contractType);

      const deploymentResult = await deploymentStrategy.deploy(deployer, {
        eventName: event.name,
        metadataHash: hash,
        sectors: event.sectors.map((sector) => ({
          name: sector.name,
          capacity: sector.capacity,
        })),
        maxMintPerTransaction: event.maxMintPerTransaction || 10, // Default to 10 if not specified
      });

      const address = deploymentResult.address;

      // Add contract sector ID (index) to each sector
      const sectorsWithIds = event.sectors.map((sector, index) => ({
        ...sector,
        contractSectorId: index,
      }));

      // Store the event data
      const createdEvent = await this.repository.create({
        ...event,
        sectors: sectorsWithIds,
        address,
        metadata_hash: hash,
        creator_wallet_address: walletAddress || '', // Store the creator's wallet address
        contractType, // Store the event-specific contract type in the database
      });

      // Set maxMintPerTransaction if provided
      if (event.maxMintPerTransaction) {
        const contract = this.getContractWithServerWallet(address, walletAddress, contractType);
        await contract.setMaxMintPerTransaction(event.maxMintPerTransaction);
      }

      return createdEvent;
    } catch (error: unknown) {
      console.error('Error creating event:', error);

      // Handle insufficient funds error
      if (error instanceof Error && error.message && error.message.includes('insufficient funds')) {
        const match = error.message.match(/balance ([\d.]+), tx cost ([\d.]+), overshot ([\d.]+)/);
        if (match) {
          const [, balance, cost, deficit] = match;
          throw new ValidationException([
            {
              message: `Failed to create event: Insufficient funds for deployment`,
              details: {
                currentBalance: parseFloat(balance),
                requiredAmount: parseFloat(cost),
                missingAmount: parseFloat(deficit),
                unit: 'ETH',
              },
            },
          ]);
        }
      }

      // Handle other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorCode = error instanceof Error && 'code' in error ? (error as any).code : undefined;

      throw new ValidationException([
        {
          message: 'Failed to create event: ' + errorMessage,
          details: errorCode ? { errorCode } : undefined,
        },
      ]);
    }
  }

  async issueTicket(
    walletAddress: string,
    eventId: string,
    sectorName: string,
    urlMetadata: { host: string; protocol: string },
    signature?: string,
    transferStrategy?: TransferStrategy
  ): Promise<{ tokenId: number; address: string; ticketId: string; qrCodeData: string }> {
    const event = await this.repository.findById(eventId);
    if (!event) {
      throw new NotFoundException(eventId);
    }

    const sector = event.sectors?.find((s) => s.name === sectorName);
    if (!sector) {
      throw new NotFoundException(sectorName);
    }

    const eventAddress = event.address;
    const contractSectorId = sector.contractSectorId;

    if (contractSectorId === undefined) {
      throw new NotFoundException(sectorName);
    }

    // Use the contract type stored with the event
    const contractType = event.contractType || DEFAULT_CONTRACT;

    try {
      // Create a contract with the server wallet
      const contract = this.getContractWithServerWallet(eventAddress, walletAddress, contractType);

      // Get the current token ID before minting
      const currentTokenId = await contract.getCurrentId();

      const eventName = event.name;

      // Create complete QR code data with all necessary information
      const qrCodeData = {
        tokenId: currentTokenId.toString(),
        contractAddress: eventAddress,
        eventId,
        eventName: event.name,
        sectorName,
        sectorId: contractSectorId,
        ticketOwner: walletAddress,
        timestamp: Date.now(),
        signature: '', // Will be filled after signing
        // Removed verificationUrl for security
      };

      // Create message to sign (without the signature field)
      const message = `Verify ticket:\nToken ID: ${qrCodeData.tokenId}\nContract: ${qrCodeData.contractAddress}\nEvent: ${qrCodeData.eventId}\nEvent Name: ${qrCodeData.eventName}\nSector: ${qrCodeData.sectorName}\nSector ID: ${qrCodeData.sectorId}\nOwner: ${qrCodeData.ticketOwner}\nTimestamp: ${qrCodeData.timestamp}`;

      const serverWallet = new Wallet(WALLET_PRIVATE_KEY as string);
      const signature = await serverWallet.signMessage(message);

      // Add signature to QR code data
      qrCodeData.signature = signature;

      // Generate ticket image with QR code containing complete data
      const ticketImage = await generateImage(eventName, sectorName, currentTokenId.toString(), qrCodeData);

      const tokenMetadataHash = await uploadMetadata(
        {
          name: `${eventName} - ${sectorName}`,
          description: `Ticket for ${eventName}, sector ${sectorName}`,
          sector: sectorName,
          sectorId: contractSectorId,
          eventAddress: eventAddress,
          verificationUrl: VERIFICATION_URL(
            urlMetadata.protocol,
            urlMetadata.host,
            eventId,
            walletAddress,
            contractSectorId
          ),
          qrCodeData: JSON.stringify(qrCodeData),
        },
        ticketImage
      );

      // Create mint data for the strategy
      const metadataURI = BUCKET_URL(tokenMetadataHash);

      // Get the appropriate minting strategy based on contract type
      const mintingStrategy = MintingStrategyFactory.getStrategy(contractType);

      // Prepare transfer strategy data
      let strategyData = {
        strategyId: 1, // Default to NormalTransferStrategy
        initData: '0x', // Empty initialization data
      };

      // Prepare database transfer strategy data
      let transferStrategyType: TransferStrategy['type'] = 'NORMAL';
      let transferStrategyData: Record<string, any> | undefined;

      if (transferStrategy) {
        transferStrategyType = transferStrategy.type;

        switch (transferStrategy.type) {
          case 'NON_TRANSFERABLE':
            strategyData.strategyId = 2;
            break;
          case 'FALLBACK':
            const fallbackStrategy = transferStrategy as TransferStrategyFallback;
            if (!fallbackStrategy.fallbackAddresses || !fallbackStrategy.fallbackAddresses.length) {
              throw new ValidationException([
                { message: 'Fallback addresses are required for FALLBACK transfer strategy' },
              ]);
            }
            strategyData.strategyId = 3;
            // Encode the fallback addresses for the strategy initialization
            const abiCoder = new (require('web3').eth.abi)();
            strategyData.initData = abiCoder.encodeParameters(['address[]'], [fallbackStrategy.fallbackAddresses]);
            // Store fallback addresses in the database
            transferStrategyData = { fallbackAddresses: fallbackStrategy.fallbackAddresses };
            break;
          case 'NORMAL':
          default:
            // Already set to default values
            break;
        }
      }

      // Execute the minting strategy - using the server wallet to execute
      // but minting the token to the provided wallet address
      await mintingStrategy.mint(contract, {
        walletAddress, // The ticket is minted TO this address
        eventAddress,
        sectorId: contractSectorId,
        metadataURI,
        amount: 1,
      });

      // Set the transfer strategy for the token
      await contract.setTokenTransferStrategy(currentTokenId, strategyData.strategyId, strategyData.initData);

      // Get the sector from database to access its ID
      const dbSector = await this.sectorRepository.findByEventIdAndName(eventId, sectorName);

      if (!dbSector) {
        throw new NotFoundException(sectorName);
      }

      // Create a ticket record in the database with the token ID and transfer strategy
      const ticket = await this.ticketRepository.create({
        sector_id: dbSector.id,
        contract_token_id: currentTokenId.toString(),
        transfer_strategy_type: transferStrategyType,
        transfer_strategy_data: transferStrategyData,
      });

      // Encrypt QR code data for response
      const encryptedQRData = encryptQRData(qrCodeData);

      return {
        tokenId: Number(currentTokenId),
        address: eventAddress,
        ticketId: ticket.id,
        qrCodeData: encryptedQRData,
      };
    } catch (error) {
      console.error('Error issuing ticket:', error);
      throw new ValidationException([{ message: 'Failed to issue ticket: ' + (error as Error).message }]);
    }
  }

  // Minting is now handled by the strategy pattern

  /**
   * Get the token URI for a specific token ID
   */
  async getTokenURI(eventAddress: string, tokenId: number, contractType?: string): Promise<string> {
    const contract = this.getContractWithServerWallet(eventAddress, contractType);
    return await contract.getTokenURI(tokenId);
  }

  /**
   * Get the current token ID from the contract
   */
  async getCurrentTokenId(eventAddress: string, contractType?: string): Promise<number> {
    const contract = this.getContractWithServerWallet(eventAddress, contractType);
    const currentId = await contract.getCurrentId();
    return Number(currentId);
  }

  /**
   * Authenticate a ticket by checking if the address owns a token for the specific sector
   */
  async authenticateTicket(
    eventId: string,
    walletAddress: string,
    sectorId: number,
    signature: string = '' // Default empty value
  ): Promise<{ isAuthenticated: boolean; eventName?: string; sectorName?: string }> {
    try {
      // Get event from database by ID
      const event = await this.repository.findById(eventId);

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      // Find the sector by contract ID
      const sector = event.sectors?.find((s) => s.contractSectorId === sectorId);
      if (!sector) {
        throw new NotFoundException(`Sector with ID ${sectorId} not found`);
      }

      // Get the contract using the event's contract type and the server wallet
      const contractType = event.contractType || DEFAULT_CONTRACT;
      const contract = this.getContractWithServerWallet(event.address, contractType);

      // Get the appropriate authentication strategy
      const authStrategy = AuthenticationStrategyFactory.getStrategy(contractType);

      // Execute the authentication strategy
      const authResult = await authStrategy.authenticate(contract, {
        walletAddress,
        sectorId,
        tokenId: 0, // For sector-based authentication, we don't need a specific tokenId
      });

      const isAuthentic = authResult.isAuthenticated;

      return {
        isAuthenticated: isAuthentic,
        eventName: event.name,
        sectorName: sector.name,
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return { isAuthenticated: false };
    }
  }

  async authenticate(eventId: string, sectorName: string): Promise<{ isAuthenticated: boolean }> {
    try {
      // Get event from database by ID
      const event = await this.repository.findById(eventId);

      if (!event) {
        return { isAuthenticated: false };
      }

      // Find the sector by name
      const sector = event.sectors?.find((s) => s.name === sectorName);
      if (!sector) {
        return { isAuthenticated: false };
      }

      return { isAuthenticated: true };
    } catch (error) {
      console.error('Authentication error:', error);
      return { isAuthenticated: false };
    }
  }

  /**
   * Get an event by ID
   */
  async getEventById(eventId: string): Promise<EventDTO | null> {
    return this.repository.findById(eventId);
  }

  /**
   * Get all events
   */
  async getAllEvents(): Promise<EventDTO[]> {
    const result = await this.repository.findAll(1, 1000); // Get first 1000 events
    return result.events;
  }

  /**
   * Get events created by a specific wallet address
   */
  async getEventsByCreator(
    creatorWalletAddress: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ events: EventDTO[]; total: number }> {
    return this.repository.findByCreator(creatorWalletAddress, page, limit);
  }

  /**
   * Get statistics for a specific creator
   */
  async getCreatorStats(creatorWalletAddress: string): Promise<{
    totalEvents: number;
    totalSectors: number;
    totalTickets: number;
    usedTickets: number;
    usageRate: number;
  }> {
    const stats = await this.repository.getCreatorStats(creatorWalletAddress);
    return {
      ...stats,
      usageRate: stats.totalTickets > 0 ? (stats.usedTickets / stats.totalTickets) * 100 : 0,
    };
  }

  /**
   * Get detailed statistics for a specific event
   */
  async getEventStats(eventId: string): Promise<{
    totalTickets: number;
    usedTickets: number;
    usageRate: number;
    sectorStats: Array<{
      sectorName: string;
      capacity: number;
      ticketsSold: number;
      ticketsUsed: number;
      usageRate: number;
      fillRate: number;
    }>;
  }> {
    const stats = await this.repository.getEventStats(eventId);
    return {
      totalTickets: stats.totalTickets,
      usedTickets: stats.usedTickets,
      usageRate: stats.totalTickets > 0 ? (stats.usedTickets / stats.totalTickets) * 100 : 0,
      sectorStats: stats.sectorStats.map((sector) => ({
        ...sector,
        usageRate: sector.ticketsSold > 0 ? (sector.ticketsUsed / sector.ticketsSold) * 100 : 0,
        fillRate: sector.capacity > 0 ? (sector.ticketsSold / sector.capacity) * 100 : 0,
      })),
    };
  }

  /**
   * Log a scan attempt for analytics
   */
  async logScan(scanData: {
    eventId: string;
    tokenId: string;
    contractAddress: string;
    scannerAddress?: string;
    ticketOwner?: string;
    sectorName?: string;
    scanResult: 'SUCCESS' | 'FAILED' | 'INVALID' | 'ALREADY_USED';
    errorCode?: string;
    locationInfo?: Record<string, any>;
  }): Promise<void> {
    try {
      await this.repository.logScan(scanData);
    } catch (error) {
      console.error('Failed to log scan attempt:', error);
      // Don't throw - logging shouldn't fail the scan operation
    }
  }

  /**
   * Get scan analytics for a specific event
   */
  async getScanAnalytics(
    eventId: string,
    timeRange?: {
      startDate: Date;
      endDate: Date;
    }
  ): Promise<{
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    successRate: number;
    hourlyData: Array<{
      hour: number;
      scans: number;
      successful: number;
      failed: number;
    }>;
    dailyData: Array<{
      date: string;
      scans: number;
      successful: number;
      failed: number;
    }>;
    sectorBreakdown: Array<{
      sectorName: string;
      scans: number;
      successRate: number;
    }>;
  }> {
    return this.repository.getScanAnalytics(eventId, timeRange);
  }

  /**
   * Get scan analytics for all events created by a specific wallet
   */
  async getCreatorScanAnalytics(
    creatorWalletAddress: string,
    timeRange?: {
      startDate: Date;
      endDate: Date;
    }
  ): Promise<{
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    successRate: number;
    eventBreakdown: Array<{
      eventId: string;
      eventName: string;
      scans: number;
      successRate: number;
    }>;
    peakHours: Array<{
      hour: number;
      scans: number;
    }>;
  }> {
    return this.repository.getCreatorScanAnalytics(creatorWalletAddress, timeRange);
  }

  /**
   * Update database record when ticket is used - for audit trail only
   * This method updates the database record but performs NO validation
   * The smart contract is the single source of truth for ticket usage validation
   */
  async markTicketAsUsed(tokenId: string, walletAddress: string, eventId?: string): Promise<boolean> {
    try {
      let ticket;

      if (eventId) {
        // Use the more precise search with event ID to avoid token ID collisions
        ticket = await this.ticketRepository.findByTokenIdAndEvent(tokenId, eventId);
      } else {
        // Fallback to the old method for backward compatibility
        ticket = await this.ticketRepository.findByTokenId(tokenId);
      }

      if (!ticket) {
        // Ticket not found in database - this is okay since blockchain already validated
        console.log(`Token ID ${tokenId} not found in database - updating audit trail skipped`);
        return true;
      }

      if (ticket.is_used === true) {
        throw new ValidationException([{ message: 'Ticket has already been used' }]);
      }

      // Update database record for audit trail - no validation, just update
      console.log(`Updating database audit record for token ID ${tokenId} in event ${eventId || 'unknown'}`);
      await this.ticketRepository.markAsUsed(ticket.id, walletAddress);
      console.log(`Database audit record updated: token ${tokenId} marked as used by ${walletAddress}`);

      return true;
    } catch (error) {
      console.error(`Failed to update database audit record for token ${tokenId}:`, error);
      // Never fail - blockchain validation already passed, database is just for audit
      return true;
    }
  }

  /**
   * Authenticate a specific ticket token
   */
  async authenticateTicketToken(
    eventId: string,
    walletAddress: string,
    tokenId: number
  ): Promise<{ isAuthenticated: boolean; eventName?: string; sectorName?: string; sectorId?: number; error?: string }> {
    try {
      // Get event from database by ID
      const event = await this.repository.findById(eventId);

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      // Get the contract using the event's contract type and the server wallet
      const contractType = event.contractType || DEFAULT_CONTRACT;
      const contract = this.getContractWithServerWallet(event.address, contractType);

      // Try to authenticate the token directly with the contract
      try {
        const authResult = await contract.authenticate(walletAddress, tokenId);

        if (authResult) {
          // Get token metadata to find the sector
          let sectorId: number;
          try {
            // Try to get sector info from the contract if available
            sectorId = (await contract.getSectorByToken) ? await contract.getSectorByToken(tokenId) : 0;
          } catch (error) {
            console.error('Error getting token sector:', error);
            sectorId = 0; // Default to first sector
          }

          // Find the sector by contract ID
          const sector = event.sectors?.find((s) => s.contractSectorId === sectorId);

          return {
            isAuthenticated: true,
            eventName: event.name,
            sectorName: sector?.name || 'Unknown Sector',
            sectorId: sectorId,
          };
        }
      } catch (contractError: any) {
        console.error('Contract authentication error:', contractError);

        // Handle specific contract errors
        if (contractError.message) {
          const errorMessage = contractError.message.toLowerCase();

          if (errorMessage.includes('ticket already used')) {
            return {
              isAuthenticated: false,
              error: 'TICKET_ALREADY_USED',
              eventName: event.name,
            };
          } else if (errorMessage.includes('ticket not owned by sender')) {
            return {
              isAuthenticated: false,
              error: 'TICKET_NOT_OWNED',
              eventName: event.name,
            };
          } else if (
            errorMessage.includes('erc721: invalid token id') ||
            errorMessage.includes('token does not exist')
          ) {
            return {
              isAuthenticated: false,
              error: 'TICKET_NOT_EXISTS',
              eventName: event.name,
            };
          }
        }

        return {
          isAuthenticated: false,
          error: 'CONTRACT_ERROR',
          eventName: event.name,
        };
      }

      return { isAuthenticated: false };
    } catch (error) {
      console.error('Token authentication error:', error);
      return { isAuthenticated: false };
    }
  }

  /**
   * Get ticket by token ID
   */
  async getTicketByTokenId(tokenId: string, eventId?: string) {
    if (eventId) {
      return this.ticketRepository.findByTokenIdAndEvent(tokenId, eventId);
    }
    return this.ticketRepository.findByTokenId(tokenId);
  }
}
