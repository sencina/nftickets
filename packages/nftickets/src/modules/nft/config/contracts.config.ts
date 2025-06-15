import { NFTicket1155Artifact, NFTicket721Artifact } from '../utils/constants';
import { DeploymentStrategy } from '../strategy/deployment';
import { MintingStrategy } from '../strategy/minting';
import { AuthenticationStrategy } from '../strategy/authentication';
import { NotFoundException } from '@utils/errors';

export interface ContractConfig {
  artifact: {
    abi: any;
    bytecode: string;
  };
  name: string;
  deploymentStrategy?: DeploymentStrategy;
  mintingStrategy?: MintingStrategy;
  authenticationStrategy?: AuthenticationStrategy;
}

export const CONTRACTS: Record<string, ContractConfig> = {
  NFTicket1155: {
    artifact: NFTicket1155Artifact,
    name: 'NFTicket1155',
  },
  NFTicket721: {
    artifact: NFTicket721Artifact,
    name: 'NFTicket721',
  },
};

export const DEFAULT_CONTRACT = 'NFTicket721';

export function getContractConfig(contractType: string = DEFAULT_CONTRACT): ContractConfig {
  const config = CONTRACTS[contractType];

  if (!config) {
    throw new NotFoundException(contractType);
  }

  return config;
}

// Initialize strategies after contract configs are defined
export function initializeStrategies(
  deploymentStrategies: Record<string, DeploymentStrategy>,
  mintingStrategies: Record<string, MintingStrategy>,
  authStrategies: Record<string, AuthenticationStrategy>
) {
  Object.keys(CONTRACTS).forEach((contractType) => {
    if (deploymentStrategies[contractType]) {
      CONTRACTS[contractType].deploymentStrategy = deploymentStrategies[contractType];
    }
    if (mintingStrategies[contractType]) {
      CONTRACTS[contractType].mintingStrategy = mintingStrategies[contractType];
    }
    if (authStrategies[contractType]) {
      CONTRACTS[contractType].authenticationStrategy = authStrategies[contractType];
    }
  });
}
