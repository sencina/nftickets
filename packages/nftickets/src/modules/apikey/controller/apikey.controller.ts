import { Router, Request, Response } from 'express';
import { AzureKeyVaultService } from '../service/azure-key-vault.service';
import { MockKeyVaultService } from '../service/mock-key-vault.service';
import { ethers } from 'ethers';
import { validateBody } from '../middleware/validation.middleware';
import { GenerateApiKeyDto, ValidateApiKeyDto, RevokeApiKeyDto, ListApiKeysDto } from '../domain/apikey.dto';
import { generateSignature } from '../utils/signature.utils';

export const apikeyRouter = Router();
const keyVaultService = new AzureKeyVaultService();

/**
 * [DEVELOPMENT/TEST ONLY] Test endpoint to verify a signature
 * This helps debug signature verification issues
 */
if (process.env.NODE_ENV !== 'production') {
  apikeyRouter.post('/test-signature', async (req: Request, res: Response) => {
    try {
      const { walletAddress, signature, message } = req.body;

      if (!walletAddress || !signature || !message) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters (walletAddress, signature, message)',
        });
      }

      console.log('Test Signature Endpoint - Input:');
      console.log('Wallet Address:', walletAddress);
      console.log('Signature:', signature);
      console.log('Message:', message);

      // Verify signature
      try {
        const recoveredAddress = ethers.verifyMessage(message, signature);

        console.log('Recovered Address:', recoveredAddress);
        console.log('Match:', recoveredAddress.toLowerCase() === walletAddress.toLowerCase());

        return res.status(200).json({
          success: true,
          providedWalletAddress: walletAddress,
          recoveredWalletAddress: recoveredAddress,
          isMatch: recoveredAddress.toLowerCase() === walletAddress.toLowerCase(),
          signature: signature,
          message: message,
        });
      } catch (error) {
        console.error('Error verifying signature:', error);
        return res.status(400).json({
          success: false,
          message: 'Invalid signature format',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    } catch (error) {
      console.error('Error in test signature endpoint:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error when testing signature',
      });
    }
  });
}

/**
 * [DEVELOPMENT/TEST ONLY] Generate a signature from a private key
 * WARNING: This endpoint should never be exposed in production
 */
if (process.env.NODE_ENV !== 'production') {
  apikeyRouter.post('/generate-signature', async (req: Request, res: Response) => {
    try {
      const { privateKey, message = 'Generate API key for NFTickets' } = req.body;

      if (!privateKey) {
        return res.status(400).json({
          success: false,
          message: 'Private key is required',
        });
      }

      // Generate signature from private key
      const { walletAddress, signature } = await generateSignature(privateKey, message);

      // Verify the signature (sanity check)
      const recoveredAddress = ethers.verifyMessage(message, signature);
      const isValid = recoveredAddress.toLowerCase() === walletAddress.toLowerCase();

      console.log('Signature Generated:');
      console.log('Wallet Address:', walletAddress);
      console.log('Signature:', signature);
      console.log('Message:', message);
      console.log('Verification Result:', isValid ? 'Valid' : 'Invalid');

      if (!isValid) {
        console.error('WARNING: Generated signature failed verification!');
      }

      return res.status(200).json({
        success: true,
        walletAddress,
        signature,
        message,
        verification: {
          recoveredAddress,
          isValid,
        },
        // Include full request object for direct API key generation
        requestObject: {
          walletAddress,
          signature,
          message,
        },
      });
    } catch (error) {
      console.error('Error generating signature:', error);
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to generate signature',
      });
    }
  });
}

/**
 * Generate a new API key for a wallet
 * Requires a signature to prove wallet ownership
 */
apikeyRouter.post('/generate', validateBody(GenerateApiKeyDto), async (req: Request, res: Response) => {
  try {
    const { walletAddress, signature, message } = req.body;

    console.log('API Key Generation Request:');
    console.log('Wallet Address:', walletAddress);
    console.log('Message:', message);
    console.log('Signature:', signature);

    // Verify signature to confirm wallet ownership
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);

      console.log('Recovered Address:', recoveredAddress);
      console.log('Match:', recoveredAddress.toLowerCase() === walletAddress.toLowerCase());

      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return res.status(401).json({
          success: false,
          message: 'Invalid signature: Signer address does not match provided wallet address',
          details: {
            providedAddress: walletAddress,
            recoveredAddress: recoveredAddress,
          },
        });
      }
    } catch (error) {
      console.error('Error verifying signature format:', error);
      return res.status(400).json({
        success: false,
        message: 'Invalid signature format',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Generate API key
    try {
      const apiKey = await keyVaultService.generateApiKey(walletAddress, signature);

      if (!apiKey) {
        throw new Error('Failed to generate API key - key is empty');
      }

      return res.status(201).json({
        success: true,
        apiKey,
      });
    } catch (error) {
      console.error('Error in key generation service:', error);
      return res.status(500).json({
        success: false,
        message: 'Error in key vault service',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } catch (error) {
    console.error('Error generating API key:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate API key',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Validate an API key
 */
apikeyRouter.post('/validate', validateBody(ValidateApiKeyDto), async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.body;

    const walletAddress = await keyVaultService.validateApiKey(apiKey);

    if (!walletAddress) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key',
      });
    }

    return res.status(200).json({
      success: true,
      walletAddress,
    });
  } catch (error) {
    console.error('Error validating API key:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to validate API key',
    });
  }
});

/**
 * Revoke an API key
 * Requires wallet signature to prove ownership
 */
apikeyRouter.post('/revoke', validateBody(RevokeApiKeyDto), async (req: Request, res: Response) => {
  try {
    const { apiKey, walletAddress, signature, message } = req.body;

    // Verify signature
    const signerAddress = ethers.verifyMessage(message, signature);

    if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    // Verify the API key belongs to this wallet
    const storedWalletAddress = await keyVaultService.validateApiKey(apiKey);

    if (!storedWalletAddress || storedWalletAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: 'API key does not belong to this wallet address',
      });
    }

    // Revoke the API key
    const revoked = await keyVaultService.revokeApiKey(apiKey);

    if (!revoked) {
      return res.status(500).json({
        success: false,
        message: 'Failed to revoke API key',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'API key revoked successfully',
    });
  } catch (error) {
    console.error('Error revoking API key:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to revoke API key',
    });
  }
});

/**
 * List all API keys for a wallet
 * Requires wallet signature to prove ownership
 */
apikeyRouter.post('/list', validateBody(ListApiKeysDto), async (req: Request, res: Response) => {
  try {
    const { walletAddress, signature, message } = req.body;

    // Verify signature
    const signerAddress = ethers.verifyMessage(message, signature);

    if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    // Get API keys for this wallet
    const apiKeys = await keyVaultService.listApiKeysForWallet(walletAddress);

    return res.status(200).json({
      success: true,
      apiKeys,
    });
  } catch (error) {
    console.error('Error listing API keys:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to list API keys',
    });
  }
});

/**
 * Get complete API key data including the signature
 */
apikeyRouter.post('/get-data', validateBody(ValidateApiKeyDto), async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.body;

    const apiKeyData = await keyVaultService.getApiKeyData(apiKey);

    if (!apiKeyData) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key',
      });
    }

    return res.status(200).json({
      success: true,
      walletAddress: apiKeyData.walletAddress,
      signature: apiKeyData.signature,
    });
  } catch (error) {
    console.error('Error getting API key data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve API key data',
    });
  }
});
