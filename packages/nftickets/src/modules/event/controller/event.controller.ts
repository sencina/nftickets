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

export const eventRouter = Router();

// Create a single service instance using the default contract type
const service = createEventService(DEFAULT_CONTRACT);

// Test endpoint for API key authentication
eventRouter.get('/test-auth', apiKeyAuth, async (req, res) => {
  // If this code is executed, it means the API key middleware has authenticated the request
  // The wallet address can be accessed from req.walletAddress (added by the middleware)

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'API key authentication successful',
    authenticated: true,
    walletAddress: req.walletAddress,
    signature: req.signature,
    timestamp: new Date().toISOString(),
  });
});

eventRouter.post('/', BodyValidation(CreateEventDTO), async (req, res) => {
  const event: CreateEventDTO = req.body;
  // Contract type is passed in the event and handled by the service
  const createdEvent = await service.create(event);
  res.status(httpStatus.CREATED).json(createdEvent);
});

eventRouter.post('/issue-ticket', BodyValidation(IssueTicketDTO), async (req, res) => {
  const { walletAddress, eventId, sectorName } = req.body;
  const host = req.get('host');
  const protocol = req.protocol;
  const urlMetadata = {
    host: host!,
    protocol,
  };

  const { tokenId, address, ticketId } = await service.issueTicket(walletAddress, eventId, sectorName, urlMetadata);
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

// Add authentication endpoint
eventRouter.post('/authenticate/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const { walletAddress, sectorId } = req.body;

  if (!walletAddress || sectorId === undefined) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'walletAddress and sectorId are required',
    });
  }

  const result = await service.authenticateTicket(eventId, walletAddress, sectorId);
  res.status(httpStatus.OK).json(result);
});

// Ticket verification endpoint with UI
eventRouter.get('/verify/:eventId/:walletAddress/:sectorId', async (req, res) => {
  const { eventId, walletAddress, sectorId } = req.params;
  const { isAuthenticated, eventName, sectorName } = await service.authenticateTicket(
    eventId,
    walletAddress,
    parseInt(sectorId, 10)
  );

  // Define CSS classes based on the result
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

  // Use a relative path that works in Docker
  const templatePath = path.join(__dirname, '../templates/authentication.html');

  const htmlResponse = renderTemplate(templatePath, templateData);

  res.status(isAuthenticated ? httpStatus.OK : httpStatus.FORBIDDEN).send(htmlResponse);
});
