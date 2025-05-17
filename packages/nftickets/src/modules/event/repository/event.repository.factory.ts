import { IEventRepository } from './event.repository.interface';
import { PrismaEventRepository } from './event.repository.prisma';

/**
 * Factory function to create an EventRepository
 *
 * @returns A new EventRepository instance
 */
export function createEventRepository(): IEventRepository {
  return new PrismaEventRepository();
}
