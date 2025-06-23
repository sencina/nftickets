import { Contract } from 'ethers';

export interface AuthenticationData {
  walletAddress: string;
  sectorId: number;
  tokenId: number;
}

export interface AuthenticationResult {
  isAuthenticated: boolean;
  error?: string;
}

export interface AuthenticationStrategy {
  authenticate(contract: Contract, data: AuthenticationData): Promise<AuthenticationResult>;
}
