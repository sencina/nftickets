import { Sector } from '@prisma/client';

export interface ISectorRepository {
  findById(id: string): Promise<Sector | null>;

  findByEventIdAndName(eventId: string, name: string): Promise<Sector | null>;

  findByEventId(eventId: string): Promise<Sector[]>;
}
