import { Contract } from 'ethers';

export interface MintData {
  walletAddress: string;
  eventAddress: string;
  sectorId: number;
  metadataURI: string;
  amount?: number;
}

export interface MintResult {
  transactionHash: string;
}

export interface MintingStrategy {
  mint(contract: Contract, mintData: MintData): Promise<MintResult>;
}
