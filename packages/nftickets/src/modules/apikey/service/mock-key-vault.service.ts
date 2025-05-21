import crypto from 'crypto';

interface ApiKeyData {
  walletAddress: string;
  signature: string;
}

/**
 * A mock implementation of the key vault service for testing
 * Uses in-memory storage instead of Azure Key Vault
 */
export class MockKeyVaultService {
  // In-memory storage for API keys: key = API key, value = ApiKeyData
  private apiKeys: Map<string, ApiKeyData> = new Map();

  /**
   * Generate a new API key for a wallet address
   * @param walletAddress Ethereum wallet address
   * @param signature The signature used to verify wallet ownership
   * @returns The generated API key
   */
  async generateApiKey(walletAddress: string, signature: string): Promise<string> {
    console.log('Generating API key for wallet:', walletAddress);

    // Generate a random API key
    const apiKey = crypto.randomBytes(16).toString('hex');

    // Store in memory
    this.apiKeys.set(apiKey, { walletAddress, signature });
    console.log('API key generated:', apiKey);

    return apiKey;
  }

  /**
   * Validate an API key and return the associated wallet address
   * @param apiKey The API key to validate
   * @returns The wallet address associated with the API key or null if invalid
   */
  async validateApiKey(apiKey: string): Promise<string | null> {
    console.log('Validating API key:', apiKey);
    const data = this.apiKeys.get(apiKey);
    return data ? data.walletAddress : null;
  }

  /**
   * Get the complete API key data
   * @param apiKey The API key
   * @returns The API key data or null if invalid
   */
  async getApiKeyData(apiKey: string): Promise<ApiKeyData | null> {
    console.log('Getting API key data for:', apiKey);
    return this.apiKeys.get(apiKey) || null;
  }

  /**
   * Revoke an API key
   * @param apiKey The API key to revoke
   * @returns True if the key was successfully revoked
   */
  async revokeApiKey(apiKey: string): Promise<boolean> {
    console.log('Revoking API key:', apiKey);
    return this.apiKeys.delete(apiKey);
  }

  /**
   * List all API keys for a specific wallet address
   * @param walletAddress The wallet address to find keys for
   * @returns Array of API keys
   */
  async listApiKeysForWallet(walletAddress: string): Promise<string[]> {
    console.log('Listing API keys for wallet:', walletAddress);
    const keys: string[] = [];

    for (const [key, data] of this.apiKeys.entries()) {
      if (data.walletAddress.toLowerCase() === walletAddress.toLowerCase()) {
        keys.push(key);
      }
    }

    return keys;
  }
}
