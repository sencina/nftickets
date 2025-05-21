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

    const hash = await uploadMetadata({
      name: event.name,
      description: event.description,
    });

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
        contractType, // Store the event-specific contract type in the database
      });

      return createdEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new ValidationException([{ message: 'Failed to create event: ' + (error as Error).message }]);
    }
  }

  async issueTicket(
    walletAddress: string,
    eventId: string,
    sectorName: string,
    urlMetadata: { host: string; protocol: string },
    signature?: string
  ): Promise<{ tokenId: number; address: string; ticketId: string }> {
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

      // Use the VERIFICATION_URL function to generate the URL
      const verificationUrl = VERIFICATION_URL(
        urlMetadata.protocol,
        urlMetadata.host,
        eventId,
        walletAddress,
        contractSectorId
      );

      const ticketImage = await generateImage(eventName, sectorName, contractSectorId.toString(), verificationUrl);

      const tokenMetadataHash = await uploadMetadata(
        {
          name: `${eventName} - ${sectorName}`,
          description: `Ticket for ${eventName}, sector ${sectorName}`,
          sector: sectorName,
          sectorId: contractSectorId,
          eventAddress: eventAddress,
          verificationUrl: verificationUrl,
        },
        ticketImage
      );

      // Create mint data for the strategy
      const metadataURI = BUCKET_URL(tokenMetadataHash);

      // Get the appropriate minting strategy based on contract type
      const mintingStrategy = MintingStrategyFactory.getStrategy(contractType);

      // Execute the minting strategy - using the server wallet to execute
      // but minting the token to the provided wallet address
      await mintingStrategy.mint(contract, {
        walletAddress, // The ticket is minted TO this address
        eventAddress,
        sectorId: contractSectorId,
        metadataURI,
        amount: 1,
      });

      // Get the sector from database to access its ID
      const dbSector = await this.sectorRepository.findByEventIdAndName(eventId, sectorName);

      if (!dbSector) {
        throw new NotFoundException(sectorName);
      }

      // Create a ticket record in the database with the token ID
      const ticket = await this.ticketRepository.create({
        sector_id: dbSector.id,
        contract_token_id: currentTokenId.toString(),
      });

      return {
        tokenId: Number(currentTokenId),
        address: eventAddress,
        ticketId: ticket.id,
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
}
