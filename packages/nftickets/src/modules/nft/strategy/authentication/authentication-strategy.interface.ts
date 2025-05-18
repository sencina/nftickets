import { Contract } from 'ethers';

export interface AuthenticationData {
  walletAddress: string;
  sectorId: number;
}

export interface AuthenticationResult {
  isAuthenticated: boolean;
}

export interface AuthenticationStrategy {
  authenticate(contract: Contract, data: AuthenticationData): Promise<AuthenticationResult>;
}
