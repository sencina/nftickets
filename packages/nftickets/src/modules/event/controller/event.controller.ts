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
  const host = req.get('host');
  const protocol = req.protocol;
  const tokenId = await service.create(event, host!, protocol);
  res.status(httpStatus.CREATED).json(tokenId);
});

eventRouter.post('/issue-ticket', BodyValidation(IssueTicketDTO), async (req, res) => {
  const { walletAddress, eventAddress, sectorId } = req.body;
  const { tokenId } = await service.issueTicket(walletAddress, eventAddress, sectorId);
  res.status(httpStatus.CREATED).json({ tokenId });
});

eventRouter.get('/:address/:sector', async (req, res) => {
  const { address, sector } = req.params;
  const { isAuthenticated } = await service.authenticate(address, sector);

  const templateData = {
    title: isAuthenticated ? 'Verification Successful' : 'Verification Failed',
    titleColor: isAuthenticated ? '#0ef' : '#ff3860',
    statusColor: isAuthenticated ? '#0ef' : '#ff3860',
    address,
    tokenId: sector,
    statusMessage: isAuthenticated ? 'The address is verified!' : 'Verification failed.',
  };

  const htmlResponse = renderTemplate(
    'packages/nftickets/src/modules/event/templates/authentication.html',
    templateData
  );

  res.status(isAuthenticated ? httpStatus.OK : httpStatus.FORBIDDEN).send(htmlResponse);
});
