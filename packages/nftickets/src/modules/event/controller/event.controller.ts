import { Router } from 'express';
import { BodyValidation } from '@utils/validation';
import { CreateEventDTO, IssueTicketDTO } from '../dto';
import httpStatus from 'http-status';
import 'express-async-errors';
import { renderTemplate } from '@utils/template';
import { createEventService } from '../service/event.service.factory';

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
  const { tokenId, address } = await service.issueTicket(walletAddress, eventId, sectorName, urlMetadata);
  res.status(httpStatus.CREATED).json({ tokenId, address });
});

eventRouter.get('/:eventId/:sectorName', async (req, res) => {
  const { eventId, sectorName } = req.params;
  const { isAuthenticated } = await service.authenticate(eventId, sectorName);
  const templateData = {
    title: isAuthenticated ? 'Verification Successful' : 'Verification Failed',
    titleColor: isAuthenticated ? '#0ef' : '#ff3860',
    statusColor: isAuthenticated ? '#0ef' : '#ff3860',
    eventId,
    sectorName,
    statusMessage: isAuthenticated ? 'The ticket is verified!' : 'Verification failed.',
  };

  const htmlResponse = renderTemplate(
    'packages/nftickets/src/modules/event/templates/authentication.html',
    templateData
  );

  res.status(isAuthenticated ? httpStatus.OK : httpStatus.FORBIDDEN).send(htmlResponse);
});
