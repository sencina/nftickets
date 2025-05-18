import { Deployer } from '@modules/nft/service/deployer/deployer.impl';
import { DeploymentData, DeploymentResult, DeploymentStrategy } from './deployment-strategy.interface';

export class NFTicket721DeployStrategy implements DeploymentStrategy {
  async deploy(deployer: Deployer, data: DeploymentData): Promise<DeploymentResult> {
    // Create a symbol from the first 5 chars of the name
    const symbol = data.eventName.slice(0, 5).toUpperCase();

    const address = await deployer.deploy(
      data.eventName,
      symbol,
      data.sectors.map((sector) => sector.name),
      data.sectors.map((sector) => sector.capacity)
    );

    return { address };
  }
}
