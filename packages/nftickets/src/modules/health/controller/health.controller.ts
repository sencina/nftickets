import { Request, Response } from 'express';

export class HealthController {
  public async check(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    });
  }
}
