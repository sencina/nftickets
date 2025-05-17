import { ITicketRepository } from './ticket.repository.interface';
import { TicketRepository } from './ticket.repository.impl';

export function createTicketRepository(): ITicketRepository {
  return new TicketRepository();
}
