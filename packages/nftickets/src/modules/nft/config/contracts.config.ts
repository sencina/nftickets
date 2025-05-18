import { NFTicket1155Artifact, NFTicket721Artifact } from '../utils/constants';
import { DeploymentStrategy } from '../strategy/deployment';
import { MintingStrategy } from '../strategy/minting';
import { AuthenticationStrategy } from '../strategy/authentication';
import { NFTicket1155DeployStrategy, NFTicket721DeployStrategy } from '../strategy/deployment';
import { NFTicket1155Strategy, NFTicket721Strategy } from '../strategy/minting';
import { NFTicket1155AuthStrategy, NFTicket721AuthStrategy } from '../strategy/authentication';
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
    deploymentStrategy: new NFTicket1155DeployStrategy(),
    mintingStrategy: new NFTicket1155Strategy(),
    authenticationStrategy: new NFTicket1155AuthStrategy(),
  },
  NFTicket721: {
    artifact: NFTicket721Artifact,
    name: 'NFTicket721',
    deploymentStrategy: new NFTicket721DeployStrategy(),
    mintingStrategy: new NFTicket721Strategy(),
    authenticationStrategy: new NFTicket721AuthStrategy(),
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
