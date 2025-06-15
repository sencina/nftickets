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
