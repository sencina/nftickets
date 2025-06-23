import { Router } from 'express';
import { BodyValidation } from '@utils/validation';
import { CreateEventDTO, IssueTicketDTO } from '../dto';
import httpStatus from 'http-status';
import 'express-async-errors';
import { renderTemplate } from '@utils/template';
import { createEventService } from '../service/event.service.factory';
import { DEFAULT_CONTRACT } from '@modules/nft/config/contracts.config';
import path from 'path';
import { apiKeyAuth } from '@modules/apikey/middleware/apikey.middleware';
import { ValidationException } from '@utils/errors';
import { Wallet } from 'ethers';
import { ethers } from 'ethers';
import { WALLET_PRIVATE_KEY } from '@env';
import { decryptQRData, validateEncryptedQRData } from '@utils/encryption';

export const eventRouter = Router();

const service = createEventService(DEFAULT_CONTRACT);

eventRouter.post('/', apiKeyAuth, BodyValidation(CreateEventDTO), async (req, res) => {
  try {
    const walletAddress = req.walletAddress as string;
    const signature = req.signature as string;
    const event = await service.create(req.body, walletAddress, signature);
    res.status(httpStatus.CREATED).json(event);
  } catch (error: unknown) {
    if (error instanceof ValidationException && error.error && Array.isArray(error.error) && error.error.length > 0) {
      const firstError = error.error[0];
      if (firstError.details && 'currentBalance' in firstError.details) {
        // Format insufficient funds error
        return res.status(httpStatus.BAD_REQUEST).json({
          message: 'Validation Error',
          code: httpStatus.BAD_REQUEST,
          errors: [
            {
              message: firstError.message,
              details: {
                currentBalance: `${firstError.details.currentBalance} ${firstError.details.unit}`,
                requiredAmount: `${firstError.details.requiredAmount} ${firstError.details.unit}`,
                missingAmount: `${firstError.details.missingAmount} ${firstError.details.unit}`,
              },
            },
          ],
        });
      }
    }

    // Handle other errors
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'Validation Error',
      code: httpStatus.BAD_REQUEST,
      errors:
        error instanceof ValidationException && error.error && Array.isArray(error.error)
          ? error.error
          : [{ message: 'An unexpected error occurred' }],
    });
  }
});

eventRouter.post('/issue-ticket', apiKeyAuth, BodyValidation(IssueTicketDTO), async (req, res) => {
  const walletAddress = req.walletAddress as string;
  const signature = req.signature as string;
  const { eventId, sectorName, transferStrategy } = req.body;

  const host = req.get('host');
  const protocol = req.protocol;
  const urlMetadata = {
    host: host!,
    protocol,
  };

  let strategyData = {
    strategyId: 1, // Default to NormalTransferStrategy
    initData: '0x', // Empty initialization data
  };

  // Handle different transfer strategies
  if (transferStrategy) {
    switch (transferStrategy.type) {
      case 'NON_TRANSFERABLE':
        strategyData.strategyId = 2; // NonTransferableStrategy
        break;
      case 'FALLBACK':
        if (!transferStrategy.fallbackAddresses || !transferStrategy.fallbackAddresses.length) {
          return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Fallback addresses are required for FALLBACK transfer strategy',
          });
        }
        strategyData.strategyId = 3; // FallbackTransferStrategy
        // Encode the fallback addresses for the strategy initialization
        const abiCoder = new (require('web3').eth.abi)();
        strategyData.initData = abiCoder.encodeParameters(['address[]'], [transferStrategy.fallbackAddresses]);
        break;
      case 'NORMAL':
      default:
        // Already set to default values
        break;
    }
  }

  const { tokenId, address, ticketId } = await service.issueTicket(
    walletAddress,
    eventId,
    sectorName,
    urlMetadata,
    signature,
    transferStrategy
  );
  res.status(httpStatus.CREATED).json({ tokenId, address, ticketId });
});

// Add a route to get event details
eventRouter.get('/:id', async (req, res) => {
  const eventId = req.params.id;
  const event = await service.getEventById(eventId);
  if (!event) {
    return res.status(httpStatus.NOT_FOUND).json({ message: `Event with ID ${eventId} not found` });
  }
  res.status(httpStatus.OK).json(event);
});

eventRouter.get('/verify/:eventId/:walletAddress/:sectorId', async (req, res) => {
  const { eventId, walletAddress, sectorId } = req.params;
  const { isAuthenticated, eventName, sectorName } = await service.authenticateTicket(
    eventId,
    walletAddress,
    parseInt(sectorId, 10),
    ''
  );

  const colorClass = isAuthenticated ? 'success' : 'failure';

  const templateData = {
    title: isAuthenticated ? 'Ticket Verified' : 'Verification Failed',
    titleClass: `title-${colorClass}`,
    statusClass: `status-${colorClass}`,
    eventId,
    eventName: eventName || 'Unknown Event',
    sectorName: sectorName || 'Unknown Sector',
    walletAddress,
    statusMessage: isAuthenticated
      ? 'The ticket is valid! Blockchain verification successful.'
      : 'Verification failed. This address does not own a valid ticket for this sector.',
  };

  const templatePath = path.join(__dirname, '../templates/authentication.html');

  const htmlResponse = renderTemplate(templatePath, templateData);

  res.status(isAuthenticated ? httpStatus.OK : httpStatus.FORBIDDEN).send(htmlResponse);
});

// Add endpoint to get token URI
eventRouter.get('/token-uri/:contractAddress/:tokenId', apiKeyAuth, async (req, res) => {
  try {
    const { contractAddress, tokenId } = req.params;

    // Find the event by contract address to get the contract type
    const events = await service.getAllEvents(); // We need to add this method
    const event = events.find((e) => e.address.toLowerCase() === contractAddress.toLowerCase());

    if (!event) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Event not found for this contract address',
      });
    }

    const tokenURI = await service.getTokenURI(contractAddress, parseInt(tokenId), event.contractType);
    res.status(httpStatus.OK).json({ tokenURI });
  } catch (error) {
    console.error('Error getting token URI:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to get token URI',
    });
  }
});

// Add endpoint for ticket authentication by sector
eventRouter.post('/authenticate-ticket', apiKeyAuth, async (req, res) => {
  try {
    const { eventId, walletAddress, sectorId } = req.body;

    const authResult = await service.authenticateTicket(eventId, walletAddress, sectorId);

    res.status(httpStatus.OK).json(authResult);
  } catch (error) {
    console.error('Error authenticating ticket:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to authenticate ticket',
    });
  }
});

eventRouter.post('/verify-qr', apiKeyAuth, async (req, res) => {
  try {
    const { qrCodeData: encryptedQRData, scannerWalletAddress } = req.body;

    // First, validate that we have encrypted QR data
    if (!encryptedQRData || typeof encryptedQRData !== 'string') {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid QR code data format - expected encrypted string',
        error: 'INVALID_QR_FORMAT',
      });
    }

    // Validate that the encrypted data can be decrypted
    if (!validateEncryptedQRData(encryptedQRData)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid or corrupted encrypted QR code data',
        error: 'INVALID_ENCRYPTED_QR',
      });
    }

    // Decrypt the QR code data
    let qrCodeData;
    try {
      qrCodeData = decryptQRData(encryptedQRData);
      console.log('QR code data successfully decrypted for verification');
    } catch (error) {
      console.error('Failed to decrypt QR code data:', error);
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Failed to decrypt QR code data',
        error: 'DECRYPTION_FAILED',
      });
    }

    // Validate that the decrypted data has all required fields
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
      if (!(field in qrCodeData)) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: `Missing required field in QR code: ${field}`,
          error: 'MISSING_QR_FIELD',
        });
      }
    }

    // Verify signature - create the same message format used during signing
    const message = `Verify ticket:\nToken ID: ${qrCodeData.tokenId}\nContract: ${qrCodeData.contractAddress}\nEvent: ${qrCodeData.eventId}\nEvent Name: ${qrCodeData.eventName}\nSector: ${qrCodeData.sectorName}\nSector ID: ${qrCodeData.sectorId}\nOwner: ${qrCodeData.ticketOwner}\nTimestamp: ${qrCodeData.timestamp}`;

    const serverWallet = new Wallet(WALLET_PRIVATE_KEY as string);
    const recoveredAddress = ethers.verifyMessage(message, qrCodeData.signature);

    // Verify server signed it
    if (recoveredAddress.toLowerCase() !== serverWallet.address.toLowerCase()) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid QR code signature',
        error: 'INVALID_SIGNATURE',
      });
    }

    // Verify ticket ownership and validity using token-specific authentication
    const authResult = await service.authenticateTicketToken(
      qrCodeData.eventId,
      qrCodeData.ticketOwner, // Use the owner from QR code
      parseInt(qrCodeData.tokenId)
    );

    if (!authResult.isAuthenticated) {
      // Handle specific contract errors
      if (authResult.error === 'TICKET_ALREADY_USED') {
        return res.status(httpStatus.CONFLICT).json({
          success: false,
          message: 'Ticket has already been used',
          error: 'TICKET_ALREADY_USED',
          eventName: authResult.eventName,
        });
      } else if (authResult.error === 'TICKET_NOT_OWNED') {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Ticket is not owned by the specified address',
          error: 'TICKET_NOT_OWNED',
          eventName: authResult.eventName,
        });
      } else if (authResult.error === 'TICKET_NOT_EXISTS') {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: 'Ticket does not exist',
          error: 'TICKET_NOT_EXISTS',
          eventName: authResult.eventName,
        });
      } else {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Ticket authentication failed - ticket not found or not owned by specified address',
          error: 'AUTHENTICATION_FAILED',
          eventName: authResult.eventName,
        });
      }
    }

    // Mark ticket as used in the database (contract already validates usage)
    await service.markTicketAsUsed(qrCodeData.tokenId, qrCodeData.ticketOwner);

    // Log the verification for audit purposes
    console.log(`Ticket verified successfully:`, {
      tokenId: qrCodeData.tokenId,
      eventName: qrCodeData.eventName,
      sectorName: qrCodeData.sectorName,
      ticketOwner: qrCodeData.ticketOwner,
      scannedBy: scannerWalletAddress,
      timestamp: new Date().toISOString(),
    });

    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Ticket verified successfully',
      ticketInfo: {
        tokenId: qrCodeData.tokenId,
        eventName: qrCodeData.eventName,
        sectorName: qrCodeData.sectorName,
        ticketOwner: qrCodeData.ticketOwner,
        contractAddress: qrCodeData.contractAddress,
        verifiedAt: new Date().toISOString(),
        scannedBy: scannerWalletAddress,
      },
    });
  } catch (error) {
    console.error('Error verifying QR code:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify QR code',
      error: 'INTERNAL_ERROR',
    });
  }
});
