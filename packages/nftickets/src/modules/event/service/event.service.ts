import { CreateEventDTO, MintTicketDTO } from '../dto';
import { Wallet } from 'ethers';
import { WALLET_PRIVATE_KEY } from '@env';
import { PROVIDER } from '@modules/nft/utils/provider';
import { Deployer } from '@modules/nft/service/deployer/deployer.impl';
import { uploadMetadata } from '@modules/image/ipfs';
import { BUCKET_URL } from '@modules/image/utils/constants';
import { generateImage } from '@modules/image/image.generator';
import { Contract } from 'ethers';
import { ContractConfig } from '@modules/nft/config/contracts.config';

export class EventService {
  private deployer: Deployer;

  constructor(private readonly contractConfig: ContractConfig) {
    this.deployer = new Deployer(
      new Wallet(WALLET_PRIVATE_KEY!, PROVIDER),
      this.contractConfig.artifact.abi,
      this.contractConfig.artifact.bytecode
    );
  }

  private getContract(address: string): Contract {
    return new Contract(address, this.contractConfig.artifact.abi, new Wallet(WALLET_PRIVATE_KEY!, PROVIDER));
  }

  async create(event: CreateEventDTO, host: string, protocol: string): Promise<{ address: string }> {
    // Upload metadata with image
    const hash = await uploadMetadata({
      name: event.name,
      description: event.description,
    });

    const address = await this.deployer.deploy(
      BUCKET_URL(hash),
      event.sectors.map((sector) => sector.name),
      event.sectors.map((sector) => sector.capacity)
    );
    return { address };
  }

  async issueTicket(walletAddress: string, eventAddress: string, sectorId: number): Promise<{ tokenId: number }> {
    const mintData: MintTicketDTO = {
      walletAddress,
      eventAddress,
      sectorId,
      amount: 1,
    };

    await this.mintTicket(mintData);
    return { tokenId: sectorId };
  }

  private async mintTicket(mintData: MintTicketDTO): Promise<{ transactionHash: string }> {
    const contract = this.getContract(mintData.eventAddress);
    const tx = await contract.mint(mintData.walletAddress, mintData.sectorId, mintData.amount, '0x');
    const receipt = await tx.wait();
    return { transactionHash: receipt.hash };
  }

  authenticate(address: string, tokenId: string): { isAuthenticated: any } | PromiseLike<{ isAuthenticated: any }> {
    throw new Error('Method not implemented.');
  }
}
