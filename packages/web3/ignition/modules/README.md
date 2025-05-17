# NFTicket1155 Testing

This directory contains scripts for testing the NFTicket1155 contract.

## NFTicket1155Test.ts

This script tests minting two different tickets for the same sector with different metadata URIs (and therefore different images).

### What the script does

1. Deploys the NFTicket1155 contract with three sectors: VIP, General, and Backstage
2. Updates the base URI
3. Mints two different tickets for the General sector, each with its own metadata URI
4. Displays token URIs, sector ticket counts, and balance information
5. Tests the authentication functionality

### How to run

```bash
npx hardhat run ignition/modules/NFTicket1155Test.ts
```

To run on a specific network:

```bash
npx hardhat run ignition/modules/NFTicket1155Test.ts --network <network-name>
```

## Metadata Structure

For the tickets to display correctly in wallets like Metamask, ensure your metadata JSON files follow this structure:

```json
{
  "name": "Ticket Name",
  "description": "Ticket Description",
  "image": "https://example.com/images/ticket-image.png",
  "properties": {
    "qrCode": "https://example.com/qr/ticket-qr.png",
    "sector": "General",
    "date": "2023-12-31",
    "additionalInfo": "Any other information you want to include"
  }
}
```

The `image` field is what will be displayed in Metamask and other wallets, while the QR code can be stored in the properties section for your application to use for authentication. 