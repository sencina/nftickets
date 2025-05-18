import { Contract } from 'ethers';
import { AuthenticationData, AuthenticationResult, AuthenticationStrategy } from './authentication-strategy.interface';

export class NFTicket721AuthStrategy implements AuthenticationStrategy {
  async authenticate(contract: Contract, data: AuthenticationData): Promise<AuthenticationResult> {
    const isAuthentic = await contract.authenticateBySector(data.walletAddress, data.sectorId);
    return { isAuthenticated: isAuthentic };
  }
}
