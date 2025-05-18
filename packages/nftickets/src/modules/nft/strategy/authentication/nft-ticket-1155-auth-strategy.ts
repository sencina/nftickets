import { Contract } from 'ethers';
import { AuthenticationData, AuthenticationResult, AuthenticationStrategy } from './authentication-strategy.interface';

export class NFTicket1155AuthStrategy implements AuthenticationStrategy {
  async authenticate(contract: Contract, data: AuthenticationData): Promise<AuthenticationResult> {
    const isAuthentic = await contract.authenticate(data.walletAddress, data.sectorId);
    return { isAuthenticated: isAuthentic };
  }
}
