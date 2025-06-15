import { eventRouter } from '@modules/event/controller/event.controller';
import { apikeyRouter } from '@modules/apikey/controller/apikey.controller';
import { healthRouter } from '@modules/health/router/health.router';
import { Router } from 'express';
import 'express-async-errors';

export const router = Router();

router.use('/event', eventRouter);
router.use('/apikey', apikeyRouter);
router.use('/health', healthRouter);
