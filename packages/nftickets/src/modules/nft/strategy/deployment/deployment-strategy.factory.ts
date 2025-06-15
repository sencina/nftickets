import { DeploymentStrategy } from './deployment-strategy.interface';
import { NFTicket1155DeployStrategy } from './nft-ticket-1155-deploy-strategy';
import { NFTicket721DeployStrategy } from './nft-ticket-721-deploy-strategy';
import { getContractConfig } from '@modules/nft/config/contracts.config';

export class DeploymentStrategyFactory {
  private static defaultStrategies: Record<string, DeploymentStrategy> = {
    NFTicket1155: new NFTicket1155DeployStrategy(),
    NFTicket721: new NFTicket721DeployStrategy(),
  };

  private static customStrategies: Record<string, DeploymentStrategy> = {};

  public static getDefaultStrategies(): Record<string, DeploymentStrategy> {
    return this.defaultStrategies;
  }

  public static registerStrategy(contractType: string, strategy: DeploymentStrategy): void {
    this.customStrategies[contractType] = strategy;
  }

  public static getStrategy(contractType: string): DeploymentStrategy {
    // First check for custom strategies
    if (this.customStrategies[contractType]) {
      return this.customStrategies[contractType];
    }

    // Then check if strategy is defined in the contract config
    try {
      const config = getContractConfig(contractType);
      if (config.deploymentStrategy) {
        return config.deploymentStrategy;
      }
    } catch (error) {
      // Contract type not found in config, continue to default strategies
    }

    // Then check built-in default strategies
    const strategy = this.defaultStrategies[contractType];

    if (!strategy) {
      // Default to NFTicket1155 if strategy not found
      console.warn(`Deployment strategy for contract type ${contractType} not found, using default.`);
      return this.defaultStrategies.NFTicket1155;
    }

    return strategy;
  }
}
