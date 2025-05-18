import { MintingStrategy } from './minting-strategy.interface';
import { NFTicket1155Strategy } from './nft-ticket-1155-strategy';
import { NFTicket721Strategy } from './nft-ticket-721-strategy';
import { getContractConfig } from '@modules/nft/config/contracts.config';

export class MintingStrategyFactory {
  private static defaultStrategies: Record<string, MintingStrategy> = {
    NFTicket1155: new NFTicket1155Strategy(),
    NFTicket721: new NFTicket721Strategy(),
  };

  private static customStrategies: Record<string, MintingStrategy> = {};

  public static registerStrategy(contractType: string, strategy: MintingStrategy): void {
    this.customStrategies[contractType] = strategy;
  }

  public static getStrategy(contractType: string): MintingStrategy {
    // First check for custom strategies
    if (this.customStrategies[contractType]) {
      return this.customStrategies[contractType];
    }

    // Then check if strategy is defined in the contract config
    try {
      const config = getContractConfig(contractType);
      if (config.mintingStrategy) {
        return config.mintingStrategy;
      }
    } catch (error) {
      // Contract type not found in config, continue to default strategies
    }

    // Then check built-in default strategies
    const strategy = this.defaultStrategies[contractType];

    if (!strategy) {
      // Default to NFTicket1155 if strategy not found
      console.warn(`Minting strategy for contract type ${contractType} not found, using default.`);
      return this.defaultStrategies.NFTicket1155;
    }

    return strategy;
  }
}
