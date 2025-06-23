import { Contract } from 'ethers';
import { AuthenticationData, AuthenticationResult, AuthenticationStrategy } from './authentication-strategy.interface';

export class NFTicket1155AuthStrategy implements AuthenticationStrategy {
  async authenticate(contract: Contract, data: AuthenticationData): Promise<AuthenticationResult> {
    try {
      // For token-specific authentication, use the tokenId directly
      if (data.tokenId && data.tokenId > 0) {
        const isAuthentic = await contract.authenticate(data.walletAddress, data.tokenId);
        return { isAuthenticated: isAuthentic };
      } else {
        // For sector-based authentication, we need to check if user has any tokens in the sector
        // This is more complex for 1155 as we don't have a direct authenticateBySector function
        // For now, we'll use the existing authenticate function with sectorId
        const isAuthentic = await contract.authenticate(data.walletAddress, data.sectorId);
        return { isAuthenticated: isAuthentic };
      }
    } catch (error: any) {
      console.error('NFTicket1155 authentication error:', error);

      // Handle specific contract errors
      if (error.message) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('ticket already used')) {
          return { isAuthenticated: false, error: 'TICKET_ALREADY_USED' };
        } else if (errorMessage.includes('ticket not owned by sender')) {
          return { isAuthenticated: false, error: 'TICKET_NOT_OWNED' };
        } else if (errorMessage.includes('token does not exist')) {
          return { isAuthenticated: false, error: 'TICKET_NOT_EXISTS' };
        }
      }

      return { isAuthenticated: false, error: 'CONTRACT_ERROR' };
    }
  }
}
