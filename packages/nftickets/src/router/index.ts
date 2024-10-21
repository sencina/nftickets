import { eventRouter } from '@modules/event/controller/event.controller';
import { Router } from 'express';
import 'express-async-errors';

export const router = Router();

router.use('/event', eventRouter);
