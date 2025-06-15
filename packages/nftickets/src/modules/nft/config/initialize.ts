import { DeploymentStrategyFactory } from '../strategy/deployment';
import { MintingStrategyFactory } from '../strategy/minting';
import { AuthenticationStrategyFactory } from '../strategy/authentication';
import { initializeStrategies } from './contracts.config';

export function initializeNFTModule() {
  // Initialize all strategies
  initializeStrategies(
    DeploymentStrategyFactory.getDefaultStrategies(),
    MintingStrategyFactory.getDefaultStrategies(),
    AuthenticationStrategyFactory.getDefaultStrategies()
  );
}
