import { NFTicket1155Artifact } from '../utils/constants';

export interface ContractConfig {
  artifact: {
    abi: any;
    bytecode: string;
  };
  name: string;
}

export const CONTRACTS: Record<string, ContractConfig> = {
  NFTicket1155: {
    artifact: NFTicket1155Artifact,
    name: 'NFTicket1155',
  },
};

export const DEFAULT_CONTRACT = 'NFTicket1155';

export function getContractConfig(contractType: string = DEFAULT_CONTRACT): ContractConfig {
  const config = CONTRACTS[contractType];

  if (!config) {
    throw new Error(`Contract type "${contractType}" not found in configuration`);
  }

  return config;
}
