import { CreateEventDTO, EventDTO, MintTicketDTO } from '../dto';
import { Wallet } from 'ethers';
import { WALLET_PRIVATE_KEY } from '@env';
import { PROVIDER } from '@modules/nft/utils/provider';
import { Deployer } from '@modules/nft/service/deployer/deployer.impl';
import { uploadMetadata } from '@modules/image/ipfs';
import { BUCKET_URL } from '@modules/image/utils/constants';
import { generateImage } from '@modules/image/image.generator';
import { Contract } from 'ethers';
import { ContractConfig } from '@modules/nft/config/contracts.config';
import { toUtf8Bytes } from 'ethers';
import { IEventRepository } from '../repository/event.repository.interface';
import { createEventRepository } from '../repository/event.repository.factory';
import { NotFoundException } from '@utils/errors';
import { db } from '@utils/database';
import { createTicketRepository } from '@modules/ticket/repository/ticket.repository.factory';
import { ITicketRepository } from '@modules/ticket/repository/ticket.repository.interface';
import { createSectorRepository } from '@modules/sector/repository/sector.repository.factory';
import { ISectorRepository } from '@modules/sector/repository/sector.repository.interface';

export class EventService {
  private deployer: Deployer;
  private repository: IEventRepository;
  private ticketRepository: ITicketRepository;
  private sectorRepository: ISectorRepository;

  constructor(private readonly contractConfig: ContractConfig) {
    this.deployer = new Deployer(
      new Wallet(WALLET_PRIVATE_KEY!, PROVIDER),
      this.contractConfig.artifact.abi,
      this.contractConfig.artifact.bytecode
    );
    this.repository = createEventRepository();
    this.ticketRepository = createTicketRepository();
    this.sectorRepository = createSectorRepository();
  }

  private getContract(address: string): Contract {
    return new Contract(address, this.contractConfig.artifact.abi, new Wallet(WALLET_PRIVATE_KEY!, PROVIDER));
  }

  async create(event: CreateEventDTO): Promise<EventDTO> {
    const hash = await uploadMetadata({
      name: event.name,
      description: event.description,
    });

    const address = await this.deployer.deploy(
      BUCKET_URL(hash),
      event.sectors.map((sector) => sector.name),
      event.sectors.map((sector) => sector.capacity)
    );

    // Add contract sector ID (index) to each sector
    const sectorsWithIds = event.sectors.map((sector, index) => ({
      ...sector,
      contractSectorId: index,
    }));

    const createdEvent = await this.repository.create({
      ...event,
      sectors: sectorsWithIds,
      address,
      metadata_hash: hash,
    });

    return createdEvent;
  }

  async issueTicket(
    walletAddress: string,
    eventId: string,
    sectorName: string,
    urlMetadata: { host: string; protocol: string }
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

    const contract = this.getContract(eventAddress);

    // Get the current token ID before minting
    const currentTokenId = await contract.getCurrentId();

    const eventName = event.name;

    // Use authentication endpoint for verification
    const verificationUrl = `${urlMetadata.protocol}://${urlMetadata.host}/api/event/verify/${eventId}/${walletAddress}/${contractSectorId}`;

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

    const mintData: MintTicketDTO = {
      walletAddress,
      eventAddress,
      sectorId: contractSectorId,
      amount: 1,
      metadataURI: BUCKET_URL(tokenMetadataHash),
    };

    await this.mintTicket(mintData);

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
      tokenId: contractSectorId,
      address: eventAddress,
      ticketId: ticket.id,
    };
  }

  private async mintTicket(mintData: MintTicketDTO): Promise<{ transactionHash: string }> {
    const contract = this.getContract(mintData.eventAddress);
    const tx = await contract.mint(
      mintData.walletAddress,
      mintData.sectorId,
      mintData.amount,
      mintData.metadataURI || '',
      '0x' // Empty bytes for data parameter
    );
    const receipt = await tx.wait();
    return { transactionHash: receipt.hash };
  }

  /**
   * Get the token URI for a specific token ID
   */
  async getTokenURI(eventAddress: string, tokenId: number): Promise<string> {
    const contract = this.getContract(eventAddress);
    return await contract.getTokenURI(tokenId);
  }

  /**
   * Get the current token ID from the contract
   */
  async getCurrentTokenId(eventAddress: string): Promise<number> {
    const contract = this.getContract(eventAddress);
    const currentId = await contract.getCurrentId();
    return Number(currentId);
  }

  /**
   * Authenticate a ticket by checking if the address owns a token for the specific sector
   */
  async authenticateTicket(
    eventId: string,
    walletAddress: string,
    sectorId: number
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

      // Call the authenticate function on the smart contract
      const contract = this.getContract(event.address);
      const isAuthentic = await contract.authenticate(walletAddress, sectorId);

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
}
