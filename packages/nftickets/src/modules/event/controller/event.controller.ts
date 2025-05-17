import { Router } from 'express';
import { BodyValidation } from '@utils/validation';
import { CreateEventDTO, IssueTicketDTO } from '../dto';
import httpStatus from 'http-status';
import 'express-async-errors';
import { renderTemplate } from '@utils/template';
import { createEventService } from '../service/event.service.factory';
import path from 'path';

export const eventRouter = Router();

const service = createEventService();

eventRouter.post('/', BodyValidation(CreateEventDTO), async (req, res) => {
  const event: CreateEventDTO = req.body;
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

/**
 * Endpoint to verify a ticket by checking blockchain ownership
 * @route GET /event/verify/:eventId/:walletAddress/:sectorId
 */
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
