import { Ticket, PrismaClient } from '@prisma/client';
import { ITicketRepository, CreateTicketData } from './ticket.repository.interface';
import { db } from '@utils/database';

export class TicketRepository implements ITicketRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  async create(data: CreateTicketData): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: {
        sector_id: data.sector_id,
        contract_token_id: data.contract_token_id,
        transfer_strategy_type: data.transfer_strategy_type,
        transfer_strategy_data: data.transfer_strategy_data || undefined,
      },
    });
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  async findByTokenId(tokenId: string): Promise<Ticket | null> {
    return this.prisma.ticket.findFirst({
      where: { contract_token_id: tokenId },
    });
  }

  async findBySectorId(sectorId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: { sector_id: sectorId },
    });
  }

  async updateTokenId(id: string, contractTokenId: string): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id },
      data: { contract_token_id: contractTokenId },
    });
  }

  async markAsUsed(id: string, usedBy: string): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id },
      data: {
        is_used: true,
        used_at: new Date(),
        used_by: usedBy,
      },
    });
  }
}
