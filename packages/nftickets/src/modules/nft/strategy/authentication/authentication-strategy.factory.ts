import { AuthenticationStrategy } from './authentication-strategy.interface';
import { NFTicket1155AuthStrategy } from './nft-ticket-1155-auth-strategy';
import { NFTicket721AuthStrategy } from './nft-ticket-721-auth-strategy';
import { getContractConfig } from '@modules/nft/config/contracts.config';

export class AuthenticationStrategyFactory {
  private static defaultStrategies: Record<string, AuthenticationStrategy> = {
    NFTicket1155: new NFTicket1155AuthStrategy(),
    NFTicket721: new NFTicket721AuthStrategy(),
  };

  private static customStrategies: Record<string, AuthenticationStrategy> = {};

  public static registerStrategy(contractType: string, strategy: AuthenticationStrategy): void {
    this.customStrategies[contractType] = strategy;
  }

  public static getStrategy(contractType: string): AuthenticationStrategy {
    // First check for custom strategies
    if (this.customStrategies[contractType]) {
      return this.customStrategies[contractType];
    }

    // Then check if strategy is defined in the contract config
    try {
      const config = getContractConfig(contractType);
      if (config.authenticationStrategy) {
        return config.authenticationStrategy;
      }
    } catch (error) {
      // Contract type not found in config, continue to default strategies
    }

    // Then check built-in default strategies
    const strategy = this.defaultStrategies[contractType];

    if (!strategy) {
      // Default to NFTicket1155 if strategy not found
      console.warn(`Authentication strategy for contract type ${contractType} not found, using default.`);
      return this.defaultStrategies.NFTicket1155;
    }

    return strategy;
  }
}
