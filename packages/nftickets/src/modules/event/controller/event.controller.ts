import { Router } from 'express';
import { EventService } from '../service/event.service';

export const eventRouter = Router();
const eventService = new EventService();

eventRouter.post('/', async (req, res, next) => {
  try {
    await eventService.create();
  } catch (error) {
    next(error);
  }
});
