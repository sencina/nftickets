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

const service = createEventService(DEFAULT_CONTRACT);

eventRouter.post('/', apiKeyAuth, BodyValidation(CreateEventDTO), async (req, res) => {
  const event: CreateEventDTO = req.body;

  const walletAddress = req.walletAddress as string;
  const signature = req.signature as string;

  const createdEvent = await service.create(event, walletAddress, signature);

  res.status(httpStatus.CREATED).json(createdEvent);
});

eventRouter.post('/issue-ticket', apiKeyAuth, BodyValidation(IssueTicketDTO), async (req, res) => {
  const walletAddress = req.walletAddress as string;
  const signature = req.signature as string;
  const { eventId, sectorName } = req.body;

  const host = req.get('host');
  const protocol = req.protocol;
  const urlMetadata = {
    host: host!,
    protocol,
  };

  const { tokenId, address, ticketId } = await service.issueTicket(
    walletAddress,
    eventId,
    sectorName,
    urlMetadata,
    signature
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
