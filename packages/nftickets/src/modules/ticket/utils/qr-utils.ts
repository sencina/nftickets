import { QRCodeData } from '../dto/qr-code.dto';

/**
 * Parse QR code data from a scanned string
 * @param qrString The raw string from QR code scan
 * @returns Parsed QR code data object
 */
export function parseQRCodeData(qrString: string): QRCodeData | null {
  try {
    const data = JSON.parse(qrString);

    // Validate that all required fields are present
    const requiredFields = [
      'tokenId',
      'contractAddress',
      'eventId',
      'eventName',
      'sectorName',
      'sectorId',
      'ticketOwner',
      'timestamp',
      'signature',
    ];

    for (const field of requiredFields) {
      if (!(field in data)) {
        console.error(`Missing required field in QR code: ${field}`);
        return null;
      }
    }

    return data as QRCodeData;
  } catch (error) {
    console.error('Failed to parse QR code data:', error);
    return null;
  }
}

/**
 * Validate QR code data structure
 * @param qrData The QR code data to validate
 * @returns Boolean indicating if data is valid
 */
export function validateQRCodeData(qrData: any): qrData is QRCodeData {
  if (!qrData || typeof qrData !== 'object') {
    return false;
  }

  const requiredStringFields = [
    'tokenId',
    'contractAddress',
    'eventId',
    'eventName',
    'sectorName',
    'ticketOwner',
    'signature',
  ];

  const requiredNumberFields = ['sectorId', 'timestamp'];

  // Check string fields
  for (const field of requiredStringFields) {
    if (typeof qrData[field] !== 'string' || !qrData[field]) {
      return false;
    }
  }

  // Check number fields
  for (const field of requiredNumberFields) {
    if (typeof qrData[field] !== 'number') {
      return false;
    }
  }

  // Validate wallet address format (basic check)
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!addressRegex.test(qrData.ticketOwner) || !addressRegex.test(qrData.contractAddress)) {
    return false;
  }

  return true;
}

/**
 * Extract display information from QR code for UI
 * @param qrData The QR code data
 * @returns Display-friendly ticket information
 */
export function extractTicketDisplayInfo(qrData: QRCodeData) {
  return {
    eventName: qrData.eventName,
    sectorName: qrData.sectorName,
    tokenId: qrData.tokenId,
    ticketOwner: qrData.ticketOwner,
    contractAddress: qrData.contractAddress,
    timestamp: new Date(qrData.timestamp).toLocaleString(),
  };
}

/**
 * Create a verification request payload from QR code data
 * @param qrData The QR code data
 * @param scannerAddress The wallet address of the scanner
 * @returns Request payload for verification endpoint
 */
export function createVerificationRequest(qrData: QRCodeData, scannerAddress: string) {
  return {
    qrCodeData: qrData,
    scannerWalletAddress: scannerAddress,
  };
}
