# API Key Authentication

This module provides API key authentication for the NFTickets service. It uses Azure Key Vault to securely store and manage API keys.

## Setup

1. Create an Azure Key Vault in your Azure account
2. Set up a service principal with access to the Key Vault
3. Add the following environment variables to your `.env` file:

```
AZURE_KEY_VAULT_URL="https://your-key-vault-name.vault.azure.net/"
AZURE_TENANT_ID="your-tenant-id"
AZURE_CLIENT_ID="your-app-registration-client-id"
AZURE_CLIENT_SECRET="your-app-registration-client-secret"
```

## API Endpoints

### Generate API Key
- **URL**: `/api/apikey/generate`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "walletAddress": "0x...",
    "signature": "0x...",
    "message": "Generate API key for NFTickets"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "apiKey": "generated-api-key"
  }
  ```

### Validate API Key
- **URL**: `/api/apikey/validate`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "apiKey": "your-api-key"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "walletAddress": "0x..."
  }
  ```

### Revoke API Key
- **URL**: `/api/apikey/revoke`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "apiKey": "your-api-key",
    "walletAddress": "0x...",
    "signature": "0x...",
    "message": "Revoke API key for NFTickets"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "API key revoked successfully"
  }
  ```

### List API Keys
- **URL**: `/api/apikey/list`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "walletAddress": "0x...",
    "signature": "0x...",
    "message": "List API keys for NFTickets"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "apiKeys": ["api-key-1", "api-key-2"]
  }
  ```

## Using API Keys in Requests

To authenticate a request with an API key, either:

1. Include it in the Authorization header:
   ```
   Authorization: Bearer your-api-key
   ```

2. Or include it as a query parameter:
   ```
   ?apiKey=your-api-key
   ```

## Integration Example

To protect a route with API key authentication:

```typescript
import { apiKeyAuth } from '@modules/apikey/middleware/apikey.middleware';
import { Router } from 'express';

const router = Router();

// Apply the middleware to protect a route
router.get('/protected-route', apiKeyAuth, (req, res) => {
  // Access the authenticated wallet address
  const walletAddress = req.walletAddress;
  
  res.json({
    success: true,
    message: `Hello ${walletAddress}!`
  });
});
``` 