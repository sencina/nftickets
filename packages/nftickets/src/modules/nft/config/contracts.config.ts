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

// Map to store deployed contract addresses and their types
const CONTRACT_ADDRESSES: Map<string, string> = new Map();

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

/**
 * Get contract configuration by contract address
 * @param address Contract address to look up
 * @returns Contract configuration
 */
export function getContractConfigByAddress(address: string): ContractConfig {
  // First try to get the contract type from our address map
  const contractType = CONTRACT_ADDRESSES.get(address.toLowerCase());

  if (!contractType) {
    // If not found, default to NFTicket721 for backward compatibility
    console.warn(`Contract address ${address} not found in mapping, defaulting to NFTicket721`);
    return CONTRACTS[DEFAULT_CONTRACT];
  }

  return getContractConfig(contractType);
}

/**
 * Register a deployed contract address with its type
 * @param address Contract address
 * @param contractType Contract type (e.g., 'NFTicket721')
 */
export function registerContractAddress(address: string, contractType: string) {
  CONTRACT_ADDRESSES.set(address.toLowerCase(), contractType);
  console.log(`Registered contract address ${address} as type ${contractType}`);
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
