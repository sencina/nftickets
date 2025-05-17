import { Sector, PrismaClient } from '@prisma/client';
import { ISectorRepository } from './sector.repository.interface';
import { db } from '@utils/database';

export class SectorRepository implements ISectorRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  async findById(id: string): Promise<Sector | null> {
    return this.prisma.sector.findUnique({
      where: { id },
    });
  }

  async findByEventIdAndName(eventId: string, name: string): Promise<Sector | null> {
    return this.prisma.sector.findFirst({
      where: {
        event_id: eventId,
        name,
      },
    });
  }

  async findByEventId(eventId: string): Promise<Sector[]> {
    return this.prisma.sector.findMany({
      where: {
        event_id: eventId,
      },
    });
  }
}
