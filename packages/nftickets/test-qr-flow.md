# NFTickets QR Code Flow Testing Guide

## Overview

The NFTickets system generates ticket images with **embedded QR codes** containing complete verification data. When a ticket is issued, the QR code is burned directly into the ticket image with all necessary information for verification.

## QR Code Integration

### 🎫 Ticket Image Generation
- **QR Code Embedded**: The QR code is rendered directly into the ticket image
- **Complete Data**: Contains all verification information (no external lookups needed)
- **Visual Design**: QR code positioned prominently with event details
- **High Quality**: Error correction and optimal sizing for scanning

### 📱 Mobile App Flow
1. **Display**: Show ticket image with embedded QR code
2. **Offline Info**: Extract ticket details from QR data for offline display
3. **Verification**: Scanner reads QR from image and verifies with API

## Complete QR Code Data Structure

The QR code embedded in the ticket image contains **ALL** information needed for verification (with security considerations):

```json
{
  "tokenId": "1",
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "eventId": "550e8400-e29b-41d4-a716-446655440000",
  "eventName": "Test Concert",
  "sectorName": "VIP",
  "sectorId": 0,
  "ticketOwner": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  "timestamp": 1687123456789,
  "signature": "0x1234567890abcdef..."
}
```

### 🔒 **Security Note**: 
The verification URL is **NOT included** in the QR code for security reasons:
- Prevents information disclosure about server endpoints
- Reduces enumeration attack surface
- Scanner apps should have the verification endpoint pre-configured
- The verification URL is still available in the metadata for reference

## Prerequisites

1. **Environment Setup**:
   - Database running: `docker compose up db -d`
   - Server running: `npm run dev`
   - `.env` file configured with:
     ```
     DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
     POSTGRES_USER=postgres
     POSTGRES_PASSWORD=postgres
     POSTGRES_DB=postgres
     WALLET_PRIVATE_KEY=your_server_wallet_private_key_here
     ```

2. **Postman Setup**:
   - Import `postman/NFTickets_QR_Testing.postman_collection.json`
   - Import `postman/NFTickets_Testing_Environment.postman_environment.json`
   - Set your wallet address in the environment variables

## Testing Steps

### Step 1: Generate API Key
1. Sign the message "Generate API key for NFTickets" with your wallet
2. Update the request body with your signature
3. Send the request - API key will be automatically saved to environment

### Step 2: Create Event
1. Send the request as-is
2. Event ID and contract address will be automatically saved to environment

### Step 3: Issue Ticket (Generates Image with QR)
1. Send the request as-is (uses your wallet address from environment)
2. Token ID will be automatically saved to environment
3. **The ticket image is generated with the QR code embedded**
4. Image contains:
   - Background design
   - QR code with complete verification data
   - Event name and sector information
   - Token number

### Step 4: Get Token URI (View Generated Image)
1. Send the request to get the ticket metadata
2. The response contains:
   - `image`: IPFS URL of the generated ticket image with embedded QR
   - `qrCodeData`: JSON string with the same data that's in the QR code
   ```json
   {
     "tokenURI": "ipfs://metadata-hash",
     "metadata": {
       "name": "Test Concert - VIP",
       "description": "Ticket for Test Concert, sector VIP",
       "image": "ipfs://image-hash-with-embedded-qr",
       "qrCodeData": "{\"tokenId\":\"1\",\"contractAddress\":\"0x...\",\"eventId\":\"uuid\",\"eventName\":\"Test Concert\",\"sectorName\":\"VIP\",\"sectorId\":0,\"ticketOwner\":\"0x...\",\"timestamp\":1687123456789,\"signature\":\"0x...\"}"
     }
   }
   ```

### Step 5: Authenticate Ticket by Sector
1. Send the request to verify the ticket exists for the sector
2. Should return `{"isAuthenticated": true, "eventName": "Test Concert", "sectorName": "VIP"}`

### Step 6: Verify QR Code (Simulate Scanning)
1. From Step 4, parse the `qrCodeData` JSON string
2. This represents what would be scanned from the QR code in the image
3. Update the request body with the complete QR data
4. Send the request to simulate QR code verification
5. Should return success with complete ticket information

## Real-World QR Code Scanning Flow

### 📸 Scanner App Process:
1. **Camera Scan**: Scanner app reads QR code from ticket image
2. **Parse Data**: Extract JSON data from QR code
3. **Validate**: Check data structure and required fields
4. **Display Info**: Show event name, sector, owner (from QR data)
5. **Verify**: Send QR data to verification API
6. **Result**: Get verification status and mark ticket as used

### 🎫 Ticket Holder Experience:
1. **Receive Ticket**: Get NFT with embedded QR code image
2. **Display**: Mobile app shows ticket image with QR code
3. **Offline Info**: App can show event details from QR data without internet
4. **Entry**: Present QR code for scanning at venue

## QR Code Utilities

The system includes utility functions for handling QR codes:

```typescript
// Parse QR code from scanner
const qrData = parseQRCodeData(scannedString);

// Validate QR code structure
const isValid = validateQRCodeData(qrData);

// Extract display information
const displayInfo = extractTicketDisplayInfo(qrData);

// Create verification request
const verifyRequest = createVerificationRequest(qrData, scannerWallet);
```

## Enhanced Error Handling

The verification endpoint provides detailed error responses:

### Success Response:
```json
{
  "success": true,
  "message": "Ticket verified successfully",
  "ticketInfo": {
    "tokenId": "1",
    "eventName": "Test Concert",
    "sectorName": "VIP",
    "ticketOwner": "0x...",
    "contractAddress": "0x...",
    "verifiedAt": "2023-06-19T10:30:00.000Z",
    "scannedBy": "0x..."
  }
}
```

### Error Responses:
```json
// Invalid signature
{
  "success": false,
  "message": "Invalid QR code signature",
  "error": "INVALID_SIGNATURE"
}

// Ticket already used
{
  "success": false,
  "message": "Ticket has already been used",
  "error": "TICKET_ALREADY_USED",
  "usedAt": "2023-06-19T09:15:00.000Z",
  "usedBy": "0x..."
}

// Authentication failed
{
  "success": false,
  "message": "Ticket authentication failed - ticket not found or not owned by specified address",
  "error": "AUTHENTICATION_FAILED"
}
```

## Error Scenarios to Test

1. **Invalid Signature**: Modify the signature in the QR data - should return `INVALID_SIGNATURE`
2. **Wrong Owner**: Change the `ticketOwner` address - should return `AUTHENTICATION_FAILED`
3. **Already Used**: Try to verify the same QR code twice - should return `TICKET_ALREADY_USED`
4. **Non-existent Token**: Use a token ID that doesn't exist - should return `AUTHENTICATION_FAILED`
5. **Malformed QR**: Test with invalid JSON structure - should fail parsing

## Integration Benefits

### For Mobile Apps:
- **Visual Ticket**: Beautiful ticket image with embedded QR code
- **Offline Display**: Show event details from QR data without internet
- **No External Dependencies**: All info embedded in the image
- **Standard QR Scanning**: Use any QR code scanner library

### For Scanner Apps:
- **Single Scan**: Get all verification data from one QR code
- **Rich Information**: Display event name, sector, owner immediately
- **Robust Verification**: Server-side signature validation
- **Audit Trail**: Track who scanned what ticket when

### For Event Organizers:
- **Professional Tickets**: High-quality images with embedded verification
- **Security**: Server-signed QR codes prevent forgery
- **Flexibility**: QR codes work with any scanner app
- **Analytics**: Detailed verification logs and usage tracking

## Troubleshooting

- **QR Code Size**: Ensure QR scanner can handle the data size (JSON string)
- **Image Quality**: QR code is rendered at high resolution for reliable scanning
- **JSON Parsing**: QR code contains JSON string - parse before using
- **Signature Verification**: Message format must match exactly between signing and verification
- **Network Issues**: QR contains all display info, so tickets work offline for viewing 