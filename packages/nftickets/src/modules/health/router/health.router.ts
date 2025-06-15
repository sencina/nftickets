import { Router } from 'express';
import { HealthController } from '../controller/health.controller';

export const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get('/', healthController.check);
