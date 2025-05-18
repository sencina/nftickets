import { BUCKET_URL } from '@modules/image/utils/constants';
import { Deployer } from '@modules/nft/service/deployer/deployer.impl';
import { DeploymentData, DeploymentResult, DeploymentStrategy } from './deployment-strategy.interface';

export class NFTicket1155DeployStrategy implements DeploymentStrategy {
  async deploy(deployer: Deployer, data: DeploymentData): Promise<DeploymentResult> {
    const address = await deployer.deploy(
      BUCKET_URL(data.metadataHash),
      data.sectors.map((sector) => sector.name),
      data.sectors.map((sector) => sector.capacity)
    );

    return { address };
  }
}
