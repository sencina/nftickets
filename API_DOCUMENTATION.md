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
- **Query Parameter:** `?apiKey=<your-api-key>`

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
  creator_wallet_address: string,
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
  "walletAddress": "0x1234567890123456789012345678901234567890"
}
```

### POST `/apikey/revoke`
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

**Response:**
```json
{
  "success": true,
  "message": "API key revoked successfully"
}
```

### POST `/apikey/list`
List all API keys for a wallet.

**Request Body:**
```json
{
  "walletAddress": "0x1234567890123456789012345678901234567890",
  "signature": "0xabc123...",
  "message": "List API keys for NFTickets"
}
```

**Response:**
```json
{
  "success": true,
  "apiKeys": ["nft_12345...", "nft_67890..."]
}
```

### POST `/apikey/get-data`
Get complete API key data including signature.

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
  "walletAddress": "0x1234567890123456789012345678901234567890",
  "signature": "0xabc123..."
}
```

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
      "description": "VIP Section",
      "capacity": 100
    }
  ],
  "startDate": "2024-07-01T19:00:00Z",
  "endDate": "2024-07-01T23:00:00Z",
  "contractType": "NFTicket1155"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Concert 2024",
  "address": "0x...",
  "sectors": [...],
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

### GET `/event/:id`
Get event details by ID.

**Response:**
```json
{
  "id": "uuid",
  "name": "Concert 2024",
  "description": "Amazing concert event",
  "address": "0x...",
  "sectors": [...],
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

### POST `/event/issue-ticket`
Issue a new ticket for an event.

**Authentication:** Required (API Key)

**Request Body:**
```json
{
  "eventId": "uuid",
  "sectorName": "VIP",
  "walletAddress": "0x1234567890123456789012345678901234567890"
}
```

**Response:**
```json
{
  "tokenId": "1",
  "address": "0x...",
  "ticketId": "uuid",
  "qrCodeData": "encrypted_data"
}
```

### POST `/event/verify-qr`
Verify a ticket QR code.

**Authentication:** Required (API Key)

**Request Body:**
```json
{
  "qrCodeData": "encrypted_data",
  "scannerWalletAddress": "0x1234567890123456789012345678901234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ticket verified successfully",
  "ticketInfo": {
    "tokenId": "1",
    "eventName": "Concert 2024",
    "sectorName": "VIP",
    "ticketOwner": "0x...",
    "contractAddress": "0x...",
    "verifiedAt": "2024-01-15T10:30:00.000Z",
    "scannedBy": "0x..."
  }
}
```

### GET `/event/token-uri/:contractAddress/:tokenId`
Get token URI for a specific ticket.

**Authentication:** Required (API Key)

**Response:**
```json
{
  "tokenURI": "ipfs://..."
}
```

### POST `/event/authenticate-ticket`
Authenticate a ticket for a specific sector.

**Authentication:** Required (API Key)

**Request Body:**
```json
{
  "eventId": "uuid",
  "walletAddress": "0x1234567890123456789012345678901234567890",
  "sectorId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "isValid": true,
  "message": "Ticket is valid for this sector"
}
```

---

## Analytics Endpoints

### GET `/event/creator/:creatorAddress/scan-analytics`
Get scan analytics for all events created by a specific creator.

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

**Response:**
```json
{
  "totalScans": 100,
  "successRate": 95.5,
  "peakHours": [
    {
      "hour": 19,
      "scans": 45
    }
  ]
}
```

### GET `/event/creator/:creatorAddress/peak-times`
Get peak scan times for dashboard graphs.

**Query Parameters:**
- `days` (optional): Number of days to analyze (default: 7)

**Response:**
```json
{
  "peakHours": [
    {
      "hour": 19,
      "scans": 45
    }
  ],
  "totalScans": 100,
  "successRate": 95.5,
  "timeRange": {
    "startDate": "2024-01-08T00:00:00.000Z",
    "endDate": "2024-01-15T00:00:00.000Z",
    "days": 7
  }
}
```

### GET `/event/creator/:creatorAddress/events`
Get events created by a specific creator.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "events": [...],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

### GET `/event/creator/:creatorAddress/stats`
Get creator statistics.

**Response:**
```json
{
  "totalEvents": 10,
  "totalTicketsIssued": 1000,
  "totalTicketsScanned": 800,
  "averageSuccessRate": 95.5
}
```

### GET `/event/:eventId/stats`
Get detailed event statistics.

**Response:**
```json
{
  "totalTickets": 1000,
  "ticketsScanned": 800,
  "successRate": 95.5,
  "sectorStats": [
    {
      "sectorName": "VIP",
      "capacity": 100,
      "ticketsIssued": 95,
      "ticketsScanned": 80
    }
  ]
}
```

### GET `/event/:eventId/scan-analytics`
Get scan analytics for a specific event.

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

**Response:**
```json
{
  "totalScans": 800,
  "successRate": 95.5,
  "peakHours": [
    {
      "hour": 19,
      "scans": 45
    }
  ],
  "sectorBreakdown": [
    {
      "sectorName": "VIP",
      "scans": 80,
      "successRate": 98.5
    }
  ]
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

**⚠️ WARNING:** Development endpoints should never be used in production. 