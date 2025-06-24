# NFTickets API Documentation

## Overview

NFTickets is a blockchain-based ticketing system that allows event organizers to create events and issue NFT tickets. The API provides endpoints for managing API keys, creating events, issuing tickets, and verifying ticket authenticity.

**Base URL:** `http://localhost:PORT/api` (where PORT is configured in environment variables)

## Authentication

The API uses signature-based authentication for secure access. Users must:

1. Generate an API key using their Ethereum wallet signature
2. Include the API key in requests to protected endpoints

### API Key Format
- **Header:** `Authorization: Bearer <your-api-key>`

## Data Models

### Event
```typescript
{
  id: string (UUID),
  name: string,
  description: string,
  address: string (contract address),
  metadata_hash: string,
  contract_type: string (default: "NFTicket1155"),
  start_date?: Date,
  end_date?: Date,
  created_at: Date,
  sectors: Sector[]
}
```

### Sector
```typescript
{
  id: string (UUID),
  event_id: string (UUID),
  name: string,
  description: string,
  capacity: number,
  contract_sector_id: number,
  created_at: Date
}
```

### Ticket
```typescript
{
  id: string (UUID),
  sector_id: string (UUID),
  contract_token_id: string,
  transfer_strategy_type: string,
  transfer_strategy_data?: object,
  is_used: boolean,
  used_at?: Date,
  used_by?: string,
  created_at: Date
}
```

### Transfer Strategy Types
- `NORMAL`: Standard transferable ticket
- `NON_TRANSFERABLE`: Cannot be transferred after minting
- `FALLBACK`: Can be transferred to predefined fallback addresses
- `ONE_TIME_USE`: Single-use ticket

## API Endpoints

---

## Health Check

### GET `/health`
Check API health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "memoryUsage": {
    "rss": 50331648,
    "heapTotal": 20971520,
    "heapUsed": 15728640,
    "external": 1048576
  }
}
```

---

## API Key Management

### POST `/apikey/generate`
Generate a new API key for a wallet address.

**Request Body:**
```json
{
  "walletAddress": "0x1234567890123456789012345678901234567890",
  "signature": "0xabc123...",
  "message": "Generate API key for NFTickets"
}
```

**Response:**
```json
{
  "success": true,
  "apiKey": "nft_12345678901234567890123456789012"
}
```

**Validation Rules:**
- `walletAddress`: Must be a valid Ethereum address
- `signature`: Must be a valid signature of the message by the wallet
- `message`: Required string (typically "Generate API key for NFTickets")

### POST `/apikey/validate`
Validate an existing API key.

**Request Body:**
```json
{
  "apiKey": "nft_12345678901234567890123456789012"
}
```

**Response:**
```json
{
  "success": true,
  "valid": true,
  "walletAddress": "0x1234567890123456789012345678901234567890"
}
```

### POST `/apikey/revoke` (If implemented)
Revoke an API key.

**Request Body:**
```json
{
  "apiKey": "nft_12345678901234567890123456789012",
  "walletAddress": "0x1234567890123456789012345678901234567890",
  "signature": "0xabc123...",
  "message": "Revoke API key"
}
```

---

## Development/Testing Endpoints (Non-Production Only)

### POST `/apikey/test-signature`
Test signature verification (development only).

**Request Body:**
```json
{
  "walletAddress": "0x1234567890123456789012345678901234567890",
  "signature": "0xabc123...",
  "message": "Test message"
}
```

### POST `/apikey/generate-signature`
Generate a signature from a private key (development only).

**Request Body:**
```json
{
  "privateKey": "0x1234...",
  "message": "Generate API key for NFTickets"
}
```

**⚠️ WARNING:** This endpoint should never be used in production.

---

## Event Management

### POST `/event`
Create a new event.

**Authentication:** Required (API Key)

**Request Body:**
```json
{
  "name": "Concert 2024",
  "description": "Amazing concert event",
  "sectors": [
    {
      "name": "VIP",
      "capacity": 100,
      "description": "VIP section"
    },
    {
      "name": "General",
      "capacity": 500,
      "description": "General admission"
    }
  ],
  "contractType": "NFTicket1155",
  "maxMintPerTransaction": 10
}
```

**Response:**
```json
{
  "id": "uuid-here",
  "name": "Concert 2024",
  "description": "Amazing concert event",
  "address": "0xcontractaddress...",
  "metadata_hash": "QmHash...",
  "contract_type": "NFTicket1155",
  "created_at": "2024-01-15T10:30:00.000Z",
  "sectors": [
    {
      "id": "sector-uuid",
      "name": "VIP",
      "capacity": 100,
      "description": "VIP section",
      "contract_sector_id": 1
    }
  ]
}
```

### GET `/event/:id`
Get event details by ID.

**Response:**
```json
{
  "id": "uuid-here",
  "name": "Concert 2024",
  "description": "Amazing concert event",
  "address": "0xcontractaddress...",
  "metadata_hash": "QmHash...",
  "contract_type": "NFTicket1155",
  "created_at": "2024-01-15T10:30:00.000Z",
  "sectors": [...]
}
```

### POST `/event/issue-ticket`
Issue a ticket for an event.

**Authentication:** Required (API Key)

**Request Body:**
```json
{
  "eventId": "event-uuid",
  "sectorName": "VIP",
  "transferStrategy": {
    "type": "NORMAL"
  }
}
```

**Transfer Strategy Examples:**

**Normal (transferable):**
```json
{
  "type": "NORMAL"
}
```

**Non-transferable:**
```json
{
  "type": "NON_TRANSFERABLE"
}
```

**Fallback addresses:**
```json
{
  "type": "FALLBACK",
  "fallbackAddresses": [
    "0x1111111111111111111111111111111111111111",
    "0x2222222222222222222222222222222222222222"
  ]
}
```

**Response:**
```json
{
  "tokenId": 1,
  "address": "0xcontractaddress...",
  "ticketId": "ticket-uuid",
  "qrCodeData": "eyJpdiI6IjEyMzQ1Njc4OTBhYmNkZWYiLCJlbmNyeXB0ZWQiOiJlbmNyeXB0ZWRfZGF0YV9oZXJlIn0="
}
```

**QR Code Data:**
The `qrCodeData` field contains encrypted ticket information that can be used for QR code generation and verification. This data includes:
- Token ID
- Contract address
- Event information
- Sector details
- Ticket owner address
- Timestamp
- Server signature for verification

### POST `/event/authenticate-ticket`
Authenticate a ticket for an event sector.

**Authentication:** Required (API Key)

**Request Body:**
```json
{
  "eventId": "event-uuid",
  "walletAddress": "0x1234567890123456789012345678901234567890",
  "sectorId": 1
}
```

**Response:**
```json
{
  "isAuthenticated": true,
  "eventName": "Concert 2024",
  "sectorName": "VIP"
}
```

### POST `/event/verify-qr`
Verify a QR code for ticket authentication.

**Authentication:** Required (API Key)

**Request Body:**
```json
{
  "qrCodeData": "encrypted-qr-data-string",
  "scannerWalletAddress": "0x1234567890123456789012345678901234567890"
}
```

**Response:**
```json
{
  "isValid": true,
  "eventName": "Concert 2024",
  "sectorName": "VIP",
  "walletAddress": "0x1234567890123456789012345678901234567890"
}
```

### GET `/event/verify/:eventId/:walletAddress/:sectorId`
Browser-based ticket verification (returns HTML page).

**Parameters:**
- `eventId`: Event UUID
- `walletAddress`: Ethereum address
- `sectorId`: Sector ID (number)

**Response:** HTML page showing verification status

### GET `/event/token-uri/:contractAddress/:tokenId`
Get token URI for NFT metadata.

**Authentication:** Required (API Key)

**Parameters:**
- `contractAddress`: Contract address
- `tokenId`: Token ID (number)

**Response:**
```json
{
  "tokenURI": "https://gateway.pinata.cloud/ipfs/QmHash..."
}
```

---

## Error Responses

### Validation Errors
```json
{
  "message": "Validation Error",
  "code": 400,
  "errors": [
    {
      "message": "Wallet address is required",
      "field": "walletAddress"
    }
  ]
}
```

### Authentication Errors
```json
{
  "success": false,
  "message": "Invalid signature: Signer address does not match provided wallet address",
  "details": {
    "providedAddress": "0x1234...",
    "recoveredAddress": "0x5678..."
  }
}
```

### Insufficient Funds Error
```json
{
  "message": "Validation Error",
  "code": 400,
  "errors": [
    {
      "message": "Insufficient balance for contract deployment",
      "details": {
        "currentBalance": "0.001 ETH",
        "requiredAmount": "0.01 ETH",
        "missingAmount": "0.009 ETH"
      }
    }
  ]
}
```

## Usage Examples

### 1. Generate API Key

```bash
# Step 1: Sign a message with your wallet (using MetaMask or similar)
# Message: "Generate API key for NFTickets"

# Step 2: Make API request
curl -X POST http://localhost:3000/api/apikey/generate \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x1234567890123456789012345678901234567890",
    "signature": "0xabc123...",
    "message": "Generate API key for NFTickets"
  }'
```

### 2. Create Event

```bash
curl -X POST http://localhost:3000/api/event \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key-here" \
  -d '{
    "name": "My Concert",
    "description": "Amazing live music event",
    "sectors": [
      {
        "name": "VIP",
        "capacity": 50,
        "description": "VIP access with premium amenities"
      },
      {
        "name": "General",
        "capacity": 200,
        "description": "General admission"
      }
    ]
  }'
```

### 3. Issue Ticket

```bash
curl -X POST http://localhost:3000/api/event/issue-ticket \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key-here" \
  -d '{
    "eventId": "event-uuid-here",
    "sectorName": "VIP",
    "transferStrategy": {
      "type": "NORMAL"
    }
  }'
```

### 4. Verify Ticket

```bash
curl -X POST http://localhost:3000/api/event/authenticate-ticket \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key-here" \
  -d '{
    "eventId": "event-uuid-here",
    "walletAddress": "0x1234567890123456789012345678901234567890",
    "sectorId": 1
  }'
```

### 5. Verify QR Code

```bash
curl -X POST http://localhost:3000/api/event/verify-qr \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key-here" \
  -d '{
    "qrCodeData": "eyJpdiI6IjEyMzQ1Njc4OTBhYmNkZWYiLCJlbmNyeXB0ZWQiOiJlbmNyeXB0ZWRfZGF0YV9oZXJlIn0=",
    "scannerWalletAddress": "0x1234567890123456789012345678901234567890"
  }'
```

## Environment Configuration

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/nftickets

# Server
PORT=3000
NODE_ENV=development

# Blockchain
WALLET_PRIVATE_KEY=0x1234...
RPC_URL=https://ethereum-rpc-url

# Azure Key Vault (if using Azure)
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
AZURE_KEYVAULT_URL=https://your-keyvault.vault.azure.net/
```

## Rate Limits

- API key generation: 5 requests per minute per IP
- Ticket operations: 100 requests per minute per API key
- Verification endpoints: 1000 requests per minute per API key

## Supported Networks

- Ethereum Mainnet
- Ethereum Testnets (Goerli, Sepolia)
- Polygon
- Binance Smart Chain
- Custom networks (configure via RPC_URL)

## Working with QR Codes

### QR Code Data Structure

When you issue a ticket, the API returns encrypted QR code data that contains:

```json
{
  "tokenId": "1",
  "contractAddress": "0xcontractaddress...",
  "eventId": "event-uuid",
  "eventName": "Concert 2024",
  "sectorName": "VIP",
  "sectorId": 0,
  "ticketOwner": "0x1234567890123456789012345678901234567890",
  "timestamp": 1640995200000,
  "signature": "0xserver_signature..."
}
```

### Using QR Code Data

1. **Generate QR Code**: Use the encrypted `qrCodeData` string to generate a QR code image
2. **Scan & Verify**: Use the `/event/verify-qr` endpoint to verify scanned QR codes
3. **Security**: The data is encrypted and server-signed for authenticity

### QR Code Generation Example

```javascript
// Frontend example using qrcode library
import QRCode from 'qrcode';

async function generateTicketQR(qrCodeData) {
  try {
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
    // Use qrCodeUrl as src for an <img> element
    return qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}
```

### QR Code Verification

The QR verification endpoint:
- Decrypts the QR code data
- Validates the server signature
- Checks blockchain ownership and usage status
- **Blockchain is the single source of truth** for ticket validity and usage
- Database is updated for audit trail only

## Authentication Architecture

### Blockchain-First Approach

NFTickets uses a **blockchain-first authentication model**:

- ✅ **Smart Contract Authority**: The blockchain smart contract is the single source of truth for ticket validity and usage
- ✅ **Decentralized Trust**: No dependency on database state for authentication decisions
- ✅ **Tamper Proof**: Ticket usage is recorded immutably on the blockchain
- ✅ **Consistent State**: Eliminates database/blockchain synchronization issues

### How It Works

1. **Ticket Issuance**: Creates NFT on blockchain + database record for metadata
2. **Authentication**: Only checks blockchain contract state
3. **Usage Validation**: Smart contract prevents double-use through `isAuthenticated` mapping
4. **Database Updates**: Records usage for audit trail without validation
5. **Database Role**: Audit trail and metadata storage only - never blocks authentication

### Benefits

- **Reliability**: No database sync issues
- **Decentralization**: True blockchain-based verification
- **Security**: Immutable usage tracking
- **Simplicity**: Single source of truth

## Security Best Practices

1. **Never expose private keys**: Use environment variables and secure storage
2. **Validate signatures**: Always verify wallet ownership through signatures
3. **Rate limiting**: Implement appropriate rate limits for your use case
4. **HTTPS only**: Use HTTPS in production environments
5. **API key rotation**: Regularly rotate API keys
6. **Input validation**: All inputs are validated using class-validator
7. **QR Code Security**: QR codes are encrypted and server-signed to prevent tampering
8. **Blockchain Trust**: Always rely on smart contract state for authentication decisions

## Support

For questions, issues, or feature requests, please refer to the project repository or documentation. 