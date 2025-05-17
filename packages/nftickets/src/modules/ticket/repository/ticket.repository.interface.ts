import { Ticket } from '@prisma/client';

export interface ITicketRepository {
  create(data: { sector_id: string; contract_token_id: string }): Promise<Ticket>;

  findById(id: string): Promise<Ticket | null>;

  findBySectorId(sectorId: string): Promise<Ticket[]>;

  updateTokenId(id: string, contractTokenId: string): Promise<Ticket>;
}
