import { Contract } from 'ethers';
import { AuthenticationData, AuthenticationResult, AuthenticationStrategy } from './authentication-strategy.interface';

export class NFTicket721AuthStrategy implements AuthenticationStrategy {
  async authenticate(contract: Contract, data: AuthenticationData): Promise<AuthenticationResult> {
    try {
      // For token-specific authentication, use the authenticate function
      if (data.tokenId && data.tokenId >= 0) {
        const isAuthentic = await contract.authenticate(data.walletAddress, data.tokenId);
        return { isAuthenticated: isAuthentic };
      } else {
        // For sector-based authentication (no specific token), use authenticateBySector
        const isAuthentic = await contract.authenticateBySector(data.walletAddress, data.sectorId);
        return { isAuthenticated: isAuthentic };
      }
    } catch (error: any) {
      console.error('NFTicket721 authentication error:', error);

      // Handle specific contract errors
      if (error.message) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('ticket already used')) {
          return { isAuthenticated: false, error: 'TICKET_ALREADY_USED' };
        } else if (errorMessage.includes('ticket not owned by sender')) {
          return { isAuthenticated: false, error: 'TICKET_NOT_OWNED' };
        } else if (errorMessage.includes('erc721: invalid token id') || errorMessage.includes('token does not exist')) {
          return { isAuthenticated: false, error: 'TICKET_NOT_EXISTS' };
        }
      }

      return { isAuthenticated: false, error: 'CONTRACT_ERROR' };
    }
  }
}
