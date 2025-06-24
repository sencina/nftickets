import { Ticket } from '@prisma/client';

export interface CreateTicketData {
  sector_id: string;
  contract_token_id: string;
  transfer_strategy_type: 'NORMAL' | 'NON_TRANSFERABLE' | 'FALLBACK' | 'ONE_TIME_USE';
  transfer_strategy_data?: Record<string, any>;
}

export interface ITicketRepository {
  create(data: CreateTicketData): Promise<Ticket>;

  findById(id: string): Promise<Ticket | null>;

  findByTokenId(tokenId: string): Promise<Ticket | null>;

  findByTokenIdAndEvent(tokenId: string, eventId: string): Promise<Ticket | null>;

  findBySectorId(sectorId: string): Promise<Ticket[]>;

  updateTokenId(id: string, contractTokenId: string): Promise<Ticket>;

  markAsUsed(id: string, usedBy: string): Promise<Ticket>;
}
