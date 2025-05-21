import { Request, Response, NextFunction } from 'express';
import { AzureKeyVaultService } from '../service/azure-key-vault.service';

const keyVaultService = new AzureKeyVaultService();

/**
 * Middleware to authenticate requests using API key
 * The API key should be provided in the Authorization header as Bearer token
 * or in the query parameters as apiKey
 */
export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get API key from authorization header or query parameter
    const authHeader = req.headers.authorization;
    let apiKey = req.query.apiKey as string;

    // Extract API key from Authorization header if present
    if (authHeader && authHeader.startsWith('Bearer ')) {
      apiKey = authHeader.substring(7); // Remove "Bearer " prefix
    }

    // If no API key found, return 401
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'API key is required for authentication',
      });
    }

    // Get the complete API key data (includes both wallet address and signature)
    const apiKeyData = await keyVaultService.getApiKeyData(apiKey);

    if (!apiKeyData || !apiKeyData.walletAddress) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key',
      });
    }

    // Add wallet address and signature to request object for use in route handlers
    req.walletAddress = apiKeyData.walletAddress;
    req.signature = apiKeyData.signature;

    // Continue to the route handler
    next();
  } catch (error) {
    console.error('Error in API key authentication:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
    });
  }
};

// Extend Express Request interface to include wallet address and signature
declare global {
  namespace Express {
    interface Request {
      walletAddress?: string;
      signature?: string;
    }
  }
}
