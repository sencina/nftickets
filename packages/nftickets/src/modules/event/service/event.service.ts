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

export class EventService {
  private deployer: Deployer;
  private repository: IEventRepository;

  constructor(private readonly contractConfig: ContractConfig) {
    this.deployer = new Deployer(
      new Wallet(WALLET_PRIVATE_KEY!, PROVIDER),
      this.contractConfig.artifact.abi,
      this.contractConfig.artifact.bytecode
    );
    this.repository = createEventRepository();
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

    const createdEvent = await this.repository.create({
      ...event,
      address,
      metadata_hash: hash,
    });

    return createdEvent;
  }

  async issueTicket(
    walletAddress: string,
    eventAddress: string,
    sectorId: number,
    urlMetadata: { host: string; protocol: string }
  ): Promise<{ tokenId: number }> {
    // Get event information for ticket image
    const contract = this.getContract(eventAddress);

    // Get sector name
    const sectorName = await contract.getSectorName(sectorId);

    // Get event URI (metadata)
    const eventURI = await contract.uri(0);
    const eventMetadata = await fetch(eventURI).then((res) => res.json());
    const eventName = eventMetadata.name || 'Event';

    const verificationUrl = `${urlMetadata.protocol}://${urlMetadata.host}/event/${eventAddress}/${sectorId}`;

    const ticketImage = await generateImage(eventName, sectorName, sectorId.toString(), verificationUrl);

    // Upload image and metadata to IPFS
    const tokenMetadataHash = await uploadMetadata(
      {
        name: `${eventName} - ${sectorName}`,
        description: `Ticket for ${eventName}, sector ${sectorName}`,
        sector: sectorName,
        sectorId: sectorId,
        eventAddress: eventAddress,
      },
      ticketImage
    );

    const mintData: MintTicketDTO = {
      walletAddress,
      eventAddress,
      sectorId,
      amount: 1,
      metadataURI: BUCKET_URL(tokenMetadataHash),
    };

    await this.mintTicket(mintData);
    return { tokenId: sectorId };
  }

  private async mintTicket(mintData: MintTicketDTO): Promise<{ transactionHash: string }> {
    const contract = this.getContract(mintData.eventAddress);
    const data = mintData.metadataURI ? toUtf8Bytes(mintData.metadataURI) : '0x';
    const tx = await contract.mint(mintData.walletAddress, mintData.sectorId, mintData.amount, data);
    const receipt = await tx.wait();
    return { transactionHash: receipt.hash };
  }

  async authenticate(address: string, sectorId: string): Promise<{ isAuthenticated: boolean }> {
    try {
      // Get event from database by address
      const event = await this.repository.findById(address);

      if (!event) {
        return { isAuthenticated: false };
      }

      return { isAuthenticated: true };
    } catch (error) {
      console.error('Authentication error:', error);
      return { isAuthenticated: false };
    }
  }
}
