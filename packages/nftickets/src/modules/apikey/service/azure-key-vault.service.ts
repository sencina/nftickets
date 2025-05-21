import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';
import crypto from 'crypto';

interface ApiKeyData {
  walletAddress: string;
  signature: string;
}

export class AzureKeyVaultService {
  private secretClient: SecretClient;
  private keyPrefix = 'nftickets-';

  constructor() {
    // Get Azure Key Vault URL from environment variables
    const keyVaultUrl = process.env.AZURE_KEY_VAULT_URL;

    if (!keyVaultUrl) {
      throw new Error('AZURE_KEY_VAULT_URL environment variable is not set');
    }

    // Create a secret client using the DefaultAzureCredential
    const credential = new DefaultAzureCredential();
    this.secretClient = new SecretClient(keyVaultUrl, credential);
  }

  /**
   * Generate a new API key for a wallet address
   * @param walletAddress Ethereum wallet address
   * @param signature The signature used to verify wallet ownership
   * @returns The generated API key
   */
  async generateApiKey(walletAddress: string, signature: string): Promise<string> {
    // Generate a random API key
    const apiKey = crypto.randomBytes(32).toString('hex');

    // Store the wallet address and signature as a JSON object
    const apiKeyData: ApiKeyData = {
      walletAddress,
      signature,
    };

    // Store the data as a JSON string
    const secretName = `${this.keyPrefix}${apiKey}`;
    const secretValue = JSON.stringify(apiKeyData);

    // Store in Azure Key Vault
    await this.secretClient.setSecret(secretName, secretValue);

    console.log('API key stored in Azure Key Vault:', secretName);

    return apiKey;
  }

  /**
   * Validate an API key and return the associated wallet address
   * @param apiKey The API key to validate
   * @returns The wallet address associated with the API key or null if invalid
   */
  async validateApiKey(apiKey: string): Promise<string | null> {
    try {
      const secretName = `${this.keyPrefix}${apiKey}`;

      // Get the secret from Azure Key Vault
      const secret = await this.secretClient.getSecret(secretName);

      if (!secret.value) {
        return null;
      }

      // Parse the JSON data
      try {
        const apiKeyData: ApiKeyData = JSON.parse(secret.value);
        return apiKeyData.walletAddress || null;
      } catch (error) {
        // For backward compatibility - if it's not a JSON object, assume it's just the wallet address
        return secret.value;
      }
    } catch (error) {
      // If the secret is not found or another error occurs, return null
      console.error('Error validating API key:', error);
      return null;
    }
  }

  /**
   * Get the complete API key data
   * @param apiKey The API key
   * @returns The API key data or null if invalid
   */
  async getApiKeyData(apiKey: string): Promise<ApiKeyData | null> {
    try {
      const secretName = `${this.keyPrefix}${apiKey}`;

      // Get the secret from Azure Key Vault
      const secret = await this.secretClient.getSecret(secretName);

      if (!secret.value) {
        return null;
      }

      // Parse the JSON data
      try {
        return JSON.parse(secret.value) as ApiKeyData;
      } catch (error) {
        // For backward compatibility - if it's not a JSON object, assume it's just the wallet address
        return {
          walletAddress: secret.value,
          signature: '',
        };
      }
    } catch (error) {
      console.error('Error getting API key data:', error);
      return null;
    }
  }

  /**
   * Revoke an API key
   * @param apiKey The API key to revoke
   * @returns True if the key was successfully revoked
   */
  async revokeApiKey(apiKey: string): Promise<boolean> {
    try {
      const secretName = `${this.keyPrefix}${apiKey}`;

      // Delete the secret from Azure Key Vault
      await this.secretClient.beginDeleteSecret(secretName);
      return true;
    } catch (error) {
      console.error('Error revoking API key:', error);
      return false;
    }
  }

  /**
   * List all API keys for a specific wallet address
   * @param walletAddress The wallet address to find keys for
   * @returns Array of API keys
   */
  async listApiKeysForWallet(walletAddress: string): Promise<string[]> {
    const apiKeys: string[] = [];

    // List all secrets with our prefix
    for await (const secretProperties of this.secretClient.listPropertiesOfSecrets()) {
      // Only process secrets with our prefix
      if (secretProperties.name?.startsWith(this.keyPrefix)) {
        try {
          // Get the secret to check if it matches our wallet address
          const secret = await this.secretClient.getSecret(secretProperties.name);

          if (secret.value) {
            try {
              // Try to parse as JSON first
              const apiKeyData: ApiKeyData = JSON.parse(secret.value);
              if (apiKeyData.walletAddress === walletAddress) {
                // Extract the API key from the secret name
                const apiKey = secretProperties.name.substring(this.keyPrefix.length);
                apiKeys.push(apiKey);
              }
            } catch {
              // For backward compatibility - if it's not JSON, check if it's the wallet address
              if (secret.value === walletAddress) {
                const apiKey = secretProperties.name.substring(this.keyPrefix.length);
                apiKeys.push(apiKey);
              }
            }
          }
        } catch (error) {
          console.error(`Error retrieving secret ${secretProperties.name}:`, error);
        }
      }
    }

    return apiKeys;
  }
}
