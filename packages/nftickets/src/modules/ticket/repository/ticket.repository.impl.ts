import { Ticket, PrismaClient } from '@prisma/client';
import { ITicketRepository } from './ticket.repository.interface';
import { db } from '@utils/database';

export class TicketRepository implements ITicketRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  async create(data: { sector_id: string; contract_token_id: string }): Promise<Ticket> {
    return this.prisma.ticket.create({
      data,
    });
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { id },
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
}
