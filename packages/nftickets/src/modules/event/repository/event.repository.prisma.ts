import { PrismaClient, Event } from '@prisma/client';
import { IEventRepository } from './event.repository.interface';
import { CreateEventDTO, EventDTO, SectorDTO } from '../dto';

export class PrismaEventRepository implements IEventRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Event CRUD operations
  async create(data: CreateEventDTO): Promise<EventDTO> {
    try {
      // Create the base event first
      const eventData: any = {
        name: data.name,
        description: data.description,
        address: data.address || '',
        metadata_hash: data.metadata_hash || '',
      };

      // Handle contract_type correctly - Prisma expects snake_case
      if (data.contractType) {
        eventData.contract_type = data.contractType;
      }

      // Create the event
      const createdEvent = await this.prisma.event.create({
        data: eventData,
      });

      // If there are sectors, create them in a separate operation
      if (data.sectors && data.sectors.length > 0) {
        await Promise.all(
          data.sectors.map(async (sectorDto: SectorDTO) => {
            // For each sector, create it with a relationship to the event
            await this.prisma.$executeRaw`
              INSERT INTO "Sector" (id, event_id, name, description, capacity, contract_sector_id, created_at)
              VALUES (gen_random_uuid(), ${createdEvent.id}::uuid, ${sectorDto.name}, ${sectorDto.description || sectorDto.name}, ${sectorDto.capacity || 0}, ${sectorDto.contractSectorId || 0}, now())
            `;
          })
        );
      }

      // Convert entity to DTO
      return EventDTO.fromEntity(createdEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async findAll(page: number, limit: number): Promise<{ events: EventDTO[]; total: number }> {
    const skip = (page - 1) * limit;

    // Get basic events
    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        skip,
        take: limit,
      }),
      this.prisma.event.count(),
    ]);

    // For each event, get its sectors from the database using raw query
    const eventsWithSectors = await Promise.all(
      events.map(async (event) => {
        const sectors = await this.prisma.$queryRaw`
          SELECT id, event_id, name, description, capacity, contract_sector_id, created_at
          FROM "Sector"
          WHERE event_id = ${event.id}::uuid
        `;
        return { ...event, sectors };
      })
    );

    // Convert entities to DTOs
    return {
      events: eventsWithSectors.map((event) => EventDTO.fromEntity(event, true)),
      total,
    };
  }

  async findById(id: string): Promise<EventDTO | null> {
    // Get event
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) return null;

    // Get sectors with raw query
    const sectors = await this.prisma.$queryRaw`
      SELECT id, event_id, name, description, capacity, contract_sector_id, created_at
      FROM "Sector"
      WHERE event_id = ${id}::uuid
    `;

    const eventWithSectors = { ...event, sectors };

    // Convert entity to DTO
    return EventDTO.fromEntity(eventWithSectors, true);
  }

  async delete(id: string): Promise<EventDTO> {
    // Get event with sectors before deletion
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }

    // Get sectors with raw query
    const sectors = await this.prisma.$queryRaw`
      SELECT id, event_id, name, description, capacity, contract_sector_id, created_at
      FROM "Sector"
      WHERE event_id = ${id}::uuid
    `;

    // Delete the event (cascading delete will remove sectors due to FK constraint)
    await this.prisma.event.delete({
      where: { id },
    });

    const eventWithSectors = { ...event, sectors };

    // Convert entity to DTO
    return EventDTO.fromEntity(eventWithSectors, true);
  }
}
