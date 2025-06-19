import { Router } from 'express';
import { healthRouter } from '@modules/health';
import { apikeyRouter } from '@modules/apikey/controller/apikey.controller';
import { eventRouter } from '@modules/event/controller/event.controller';

const router = Router();

router.use('/health', healthRouter);
router.use('/apikey', apikeyRouter);
router.use('/event', eventRouter);

export { router };
