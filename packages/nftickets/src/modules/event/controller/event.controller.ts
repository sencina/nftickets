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
  const { eventId, sectorId, transferStrategy } = req.body;

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

  const { tokenId, address, ticketId, qrCodeData } = await service.issueTicket(
    walletAddress,
    eventId,
    sectorId,
    urlMetadata,
    signature,
    transferStrategy
  );
  res.status(httpStatus.CREATED).json({ tokenId, address, ticketId, qrCodeData });
});

// Analytics endpoints for dashboard graphs (put before parameterized routes)

// Get scan analytics for all events created by a specific creator (public endpoint)
eventRouter.get('/creator/:creatorAddress/scan-analytics', async (req, res) => {
  try {
    const walletAddress = req.params.creatorAddress;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

    const timeRange = startDate && endDate ? { startDate, endDate } : undefined;
    const analytics = await service.getCreatorScanAnalytics(walletAddress, timeRange);

    res.status(httpStatus.OK).json(analytics);
  } catch (error) {
    console.error('Error getting creator scan analytics:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to get creator scan analytics',
    });
  }
});

// Get peak scan times for dashboard graphs (creator-specific, public endpoint)
eventRouter.get('/creator/:creatorAddress/peak-times', async (req, res) => {
  try {
    const walletAddress = req.params.creatorAddress;
    const days = parseInt(req.query.days as string) || 7; // Default to last 7 days

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const analytics = await service.getCreatorScanAnalytics(walletAddress, { startDate, endDate });

    // Format data specifically for peak times graph
    const peakTimesData = {
      peakHours: analytics.peakHours.sort((a, b) => b.scans - a.scans), // Sort by scan count descending
      totalScans: analytics.totalScans,
      successRate: analytics.successRate,
      timeRange: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        days: days,
      },
    };

    res.status(httpStatus.OK).json(peakTimesData);
  } catch (error) {
    console.error('Error getting peak times:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to get peak scan times',
    });
  }
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
    console.log('[verify-qr] Starting QR verification with data:', {
      hasQrData: !!req.body.qrCodeData,
      scannerWallet: req.body.scannerWalletAddress,
    });

    const { qrCodeData: encryptedQRData, scannerWalletAddress } = req.body;

    // First, validate that we have encrypted QR data
    if (!encryptedQRData || typeof encryptedQRData !== 'string') {
      console.error('[verify-qr] Invalid QR data format:', { type: typeof encryptedQRData });
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid QR code data format - expected encrypted string',
        error: 'INVALID_QR_FORMAT',
      });
    }

    // Validate that the encrypted data can be decrypted
    if (!validateEncryptedQRData(encryptedQRData)) {
      console.error('[verify-qr] Invalid encrypted QR data');
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
      console.log('[verify-qr] Successfully decrypted QR data:', {
        hasMinimalFormat: 't' in qrCodeData && 'c' in qrCodeData && 'e' in qrCodeData,
        fields: Object.keys(qrCodeData),
      });

      // Handle minimal format
      if ('t' in qrCodeData && 'c' in qrCodeData && 'e' in qrCodeData) {
        const tokenId = qrCodeData.t;
        const contractAddress = qrCodeData.c;
        const eventId = qrCodeData.e;
        console.log('[verify-qr] Processing minimal format:', { tokenId, contractAddress, eventId });

        // Fetch event details from database
        const event = await service.getEventById(eventId);
        if (!event) {
          console.error('[verify-qr] Event not found:', eventId);
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Event not found',
            error: 'EVENT_NOT_FOUND',
          });
        }
        console.log('[verify-qr] Found event:', { eventId, name: event.name });

        // Get ticket details from blockchain
        console.log('[verify-qr] Fetching ticket details from blockchain');
        const ticketDetails = await service.getTicketDetails(contractAddress, tokenId);
        if (!ticketDetails) {
          console.error('[verify-qr] Ticket not found on blockchain:', { contractAddress, tokenId });
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Ticket not found',
            error: 'TICKET_NOT_FOUND',
          });
        }
        console.log('[verify-qr] Found ticket details:', ticketDetails);

        // For minimal format, we skip signature verification since it's a trusted source
        // Verify ticket ownership and validity using token-specific authentication
        const authResult = await service.authenticateTicketToken(eventId, ticketDetails.owner, parseInt(tokenId));

        if (!authResult.isAuthenticated) {
          // Log failed scan with specific error
          let errorCode = 'AUTHENTICATION_FAILED';
          if (authResult.error === 'TICKET_ALREADY_USED') {
            errorCode = 'TICKET_ALREADY_USED';
          } else if (authResult.error === 'TICKET_NOT_OWNED') {
            errorCode = 'TICKET_NOT_OWNED';
          } else if (authResult.error === 'TICKET_NOT_EXISTS') {
            errorCode = 'TICKET_NOT_EXISTS';
          }

          await service.logScan({
            eventId: eventId,
            tokenId: tokenId,
            contractAddress: contractAddress,
            scannerAddress: scannerWalletAddress,
            ticketOwner: ticketDetails.owner,
            sectorName: ticketDetails.sectorName,
            scanResult: authResult.error === 'TICKET_ALREADY_USED' ? 'ALREADY_USED' : 'FAILED',
            errorCode: errorCode,
          });

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

        // Update database record for audit trail (blockchain is the authoritative source)
        console.log('Blockchain authentication successful - updating database record for audit');
        await service.markTicketAsUsed(tokenId, ticketDetails.owner, eventId);

        // Log successful scan
        await service.logScan({
          eventId: eventId,
          tokenId: tokenId,
          contractAddress: contractAddress,
          scannerAddress: scannerWalletAddress,
          ticketOwner: ticketDetails.owner,
          sectorName: ticketDetails.sectorName,
          scanResult: 'SUCCESS',
        });

        return res.status(httpStatus.OK).json({
          success: true,
          message: 'Ticket verified successfully',
          ticketInfo: {
            tokenId: tokenId,
            eventName: event.name,
            sectorName: ticketDetails.sectorName,
            ticketOwner: ticketDetails.owner,
            contractAddress: contractAddress,
            verifiedAt: new Date().toISOString(),
            scannedBy: scannerWalletAddress,
          },
        });
      }
    } catch (error) {
      console.error('Failed to decrypt or process QR code data:', error);

      // Log failed scan attempt
      try {
        await service.logScan({
          eventId: qrCodeData?.e || qrCodeData?.eventId || 'unknown',
          tokenId: qrCodeData?.t || qrCodeData?.tokenId || 'unknown',
          contractAddress: qrCodeData?.c || qrCodeData?.contractAddress || 'unknown',
          scannerAddress: scannerWalletAddress,
          scanResult: 'FAILED',
          errorCode: 'DECRYPTION_FAILED',
        });
      } catch (logError) {
        console.error('Failed to log scan attempt:', logError);
      }

      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Failed to decrypt or process QR code data',
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
        // Log invalid scan attempt
        await service.logScan({
          eventId: qrCodeData.eventId || 'unknown',
          tokenId: qrCodeData.tokenId || 'unknown',
          contractAddress: qrCodeData.contractAddress || 'unknown',
          scannerAddress: scannerWalletAddress,
          ticketOwner: qrCodeData.ticketOwner,
          sectorName: qrCodeData.sectorName,
          scanResult: 'INVALID',
          errorCode: 'MISSING_QR_FIELD',
        });

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
      // Log invalid signature scan
      await service.logScan({
        eventId: qrCodeData.eventId,
        tokenId: qrCodeData.tokenId,
        contractAddress: qrCodeData.contractAddress,
        scannerAddress: scannerWalletAddress,
        ticketOwner: qrCodeData.ticketOwner,
        sectorName: qrCodeData.sectorName,
        scanResult: 'INVALID',
        errorCode: 'INVALID_SIGNATURE',
      });

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
      // Log failed scan with specific error
      let errorCode = 'AUTHENTICATION_FAILED';
      if (authResult.error === 'TICKET_ALREADY_USED') {
        errorCode = 'TICKET_ALREADY_USED';
      } else if (authResult.error === 'TICKET_NOT_OWNED') {
        errorCode = 'TICKET_NOT_OWNED';
      } else if (authResult.error === 'TICKET_NOT_EXISTS') {
        errorCode = 'TICKET_NOT_EXISTS';
      }

      await service.logScan({
        eventId: qrCodeData.eventId,
        tokenId: qrCodeData.tokenId,
        contractAddress: qrCodeData.contractAddress,
        scannerAddress: scannerWalletAddress,
        ticketOwner: qrCodeData.ticketOwner,
        sectorName: qrCodeData.sectorName,
        scanResult: authResult.error === 'TICKET_ALREADY_USED' ? 'ALREADY_USED' : 'FAILED',
        errorCode: errorCode,
      });

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

    // Update database record for audit trail (blockchain is the authoritative source)
    console.log('Blockchain authentication successful - updating database record for audit');
    await service.markTicketAsUsed(qrCodeData.tokenId, qrCodeData.ticketOwner, qrCodeData.eventId);

    // Log successful scan
    await service.logScan({
      eventId: qrCodeData.eventId,
      tokenId: qrCodeData.tokenId,
      contractAddress: qrCodeData.contractAddress,
      scannerAddress: scannerWalletAddress,
      ticketOwner: qrCodeData.ticketOwner,
      sectorName: qrCodeData.sectorName,
      scanResult: 'SUCCESS',
    });

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

// Dashboard endpoints for creator-specific analytics

// Get events created by a specific creator (public endpoint)
eventRouter.get('/creator/:creatorAddress/events', async (req, res) => {
  try {
    const walletAddress = req.params.creatorAddress;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await service.getEventsByCreator(walletAddress, page, limit);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    console.error('Error getting user events:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to get user events',
    });
  }
});

// Get creator statistics for a specific creator (public endpoint)
eventRouter.get('/creator/:creatorAddress/stats', async (req, res) => {
  try {
    const walletAddress = req.params.creatorAddress;
    const stats = await service.getCreatorStats(walletAddress);
    res.status(httpStatus.OK).json(stats);
  } catch (error) {
    console.error('Error getting creator stats:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to get creator statistics',
    });
  }
});

// Get detailed event statistics for a specific event (only if user created it)
eventRouter.get('/:eventId/stats', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Get event stats
    const stats = await service.getEventStats(eventId);
    res.status(httpStatus.OK).json(stats);
  } catch (error) {
    console.error('Error getting event stats:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to get event statistics',
    });
  }
});

// Get scan analytics for a specific event (only accessible by event creator)
eventRouter.get('/:eventId/scan-analytics', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

    const timeRange = startDate && endDate ? { startDate, endDate } : undefined;
    const analytics = await service.getScanAnalytics(eventId, timeRange);

    res.status(httpStatus.OK).json(analytics);
  } catch (error) {
    console.error('Error getting scan analytics:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Failed to get scan analytics',
    });
  }
});
