import { CreateEventDTO } from '../dto';
import { Wallet } from 'ethers';
import { WALLET_PRIVATE_KEY } from '@env';
import { PROVIDER } from '@modules/nft/utils/provider';
import { Deployer } from '@modules/nft/service/deployer/deployer.impl';
import { uploadJsonMetadata } from '@modules/image/ipfs';
import { BUCKET_URL } from '@modules/image/utils/constants';
import { NFTicket1155Artifact } from '@modules/nft/utils/constants';

export class EventService {
  private deployer = new Deployer(
    new Wallet(WALLET_PRIVATE_KEY!, PROVIDER),
    NFTicket1155Artifact.abi,
    NFTicket1155Artifact.bytecode
  );

  async create(event: CreateEventDTO): Promise<{ address: string }> {
    const hash = await uploadJsonMetadata({ name: event.name, description: event.description });
    const address = await this.deployer.deploy(
      BUCKET_URL(hash),
      event.sectors.map((sector) => sector.name),
      event.sectors.map((sector) => sector.capacity)
    );
    return { address };
  }

  authenticate(address: string, tokenId: string): { isAuthenticated: any } | PromiseLike<{ isAuthenticated: any }> {
    throw new Error('Method not implemented.');
  }
}
