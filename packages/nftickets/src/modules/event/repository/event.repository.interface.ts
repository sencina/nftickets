import { Event } from '@prisma/client';
import { CreateEventDTO, EventDTO } from '../dto';

export interface IEventRepository {
  // Event CRUD operations
  create(data: CreateEventDTO): Promise<EventDTO>;
  findAll(page: number, limit: number): Promise<{ events: EventDTO[]; total: number }>;
  findById(id: string): Promise<EventDTO | null>;
  delete(id: string): Promise<EventDTO>;
}
