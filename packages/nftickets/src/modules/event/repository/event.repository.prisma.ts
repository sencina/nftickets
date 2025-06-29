import { PrismaClient, Event } from '@prisma/client';
import { IEventRepository } from './event.repository.interface';
import { CreateEventDTO, EventDTO, SectorDTO } from '../dto';
import { Prisma } from '@prisma/client';

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
        creator_wallet_address: data.creator_wallet_address || '',
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

  // Creator-specific queries for dashboard
  async findByCreator(
    creatorWalletAddress: string,
    page: number,
    limit: number
  ): Promise<{ events: EventDTO[]; total: number }> {
    const offset = (page - 1) * limit;

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where: { creator_wallet_address: creatorWalletAddress },
        orderBy: { created_at: 'desc' },
        skip: offset,
        take: limit,
      }),
      this.prisma.event.count({
        where: { creator_wallet_address: creatorWalletAddress },
      }),
    ]);

    return {
      events: events.map((event) => EventDTO.fromEntity(event)),
      total,
    };
  }

  async getCreatorStats(creatorWalletAddress: string): Promise<{
    totalEvents: number;
    totalSectors: number;
    totalTickets: number;
    usedTickets: number;
  }> {
    const stats = await this.prisma.$queryRaw<
      Array<{
        total_events: bigint;
        total_sectors: bigint;
        total_tickets: bigint;
        used_tickets: bigint;
      }>
    >`
      SELECT 
        COUNT(DISTINCT e.id) as total_events,
        COUNT(DISTINCT s.id) as total_sectors,
        COUNT(DISTINCT t.id) as total_tickets,
        COUNT(DISTINCT CASE WHEN t.is_used = true THEN t.id END) as used_tickets
      FROM "Event" e
      LEFT JOIN "Sector" s ON e.id = s.event_id
      LEFT JOIN "Ticket" t ON s.id = t.sector_id
      WHERE e.creator_wallet_address = ${creatorWalletAddress}
    `;

    const result = stats[0];
    return {
      totalEvents: Number(result?.total_events || 0),
      totalSectors: Number(result?.total_sectors || 0),
      totalTickets: Number(result?.total_tickets || 0),
      usedTickets: Number(result?.used_tickets || 0),
    };
  }

  async getEventStats(eventId: string): Promise<{
    totalTickets: number;
    usedTickets: number;
    sectorStats: Array<{
      sectorName: string;
      capacity: number;
      ticketsSold: number;
      ticketsUsed: number;
    }>;
  }> {
    // Get overall event stats
    const overallStats = await this.prisma.$queryRaw<
      Array<{
        total_tickets: bigint;
        used_tickets: bigint;
      }>
    >`
      SELECT 
        COUNT(t.id) as total_tickets,
        COUNT(CASE WHEN t.is_used = true THEN t.id END) as used_tickets
      FROM "Sector" s
      LEFT JOIN "Ticket" t ON t.sector_id = s.id
      WHERE s.event_id = ${eventId}::uuid
    `;

    // Get sector-specific stats
    const sectorStats = await this.prisma.$queryRaw<
      Array<{
        sector_name: string;
        capacity: number;
        tickets_sold: bigint;
        tickets_used: bigint;
      }>
    >`
      SELECT 
        s.name as sector_name,
        s.capacity,
        COUNT(t.id) as tickets_sold,
        COUNT(CASE WHEN t.is_used = true THEN t.id END) as tickets_used
      FROM "Sector" s
      LEFT JOIN "Ticket" t ON s.id = t.sector_id
      WHERE s.event_id = ${eventId}::uuid
      GROUP BY s.id, s.name, s.capacity
      ORDER BY s.name
    `;

    const overall = overallStats[0];
    return {
      totalTickets: Number(overall?.total_tickets || 0),
      usedTickets: Number(overall?.used_tickets || 0),
      sectorStats: sectorStats.map((stat) => ({
        sectorName: stat.sector_name,
        capacity: stat.capacity,
        ticketsSold: Number(stat.tickets_sold || 0),
        ticketsUsed: Number(stat.tickets_used || 0),
      })),
    };
  }

  // Scan analytics for dashboard graphs
  async logScan(scanData: {
    eventId: string;
    tokenId: string;
    contractAddress: string;
    scannerAddress?: string;
    ticketOwner?: string;
    sectorName?: string;
    scanResult: 'SUCCESS' | 'FAILED' | 'INVALID' | 'ALREADY_USED';
    errorCode?: string;
    locationInfo?: Record<string, any>;
  }): Promise<void> {
    await this.prisma.scan.create({
      data: {
        event_id: scanData.eventId,
        token_id: scanData.tokenId,
        contract_address: scanData.contractAddress,
        scanner_address: scanData.scannerAddress,
        ticket_owner: scanData.ticketOwner,
        sector_name: scanData.sectorName,
        scan_result: scanData.scanResult,
        error_code: scanData.errorCode,
        location_info: scanData.locationInfo || {},
        scanned_at: new Date(),
      },
    });
  }

  async getScanAnalytics(
    eventId: string,
    timeRange?: {
      startDate: Date;
      endDate: Date;
    }
  ): Promise<{
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    successRate: number;
    hourlyData: Array<{
      hour: number;
      scans: number;
      successful: number;
      failed: number;
    }>;
    dailyData: Array<{
      date: string;
      scans: number;
      successful: number;
      failed: number;
    }>;
    sectorBreakdown: Array<{
      sectorName: string;
      scans: number;
      successRate: number;
    }>;
  }> {
    const whereClause: any = { event_id: eventId };
    if (timeRange) {
      whereClause.scanned_at = {
        gte: timeRange.startDate,
        lte: timeRange.endDate,
      };
    }

    // Get overall stats
    const overallStats = await this.prisma.scan.groupBy({
      by: ['scan_result'],
      where: whereClause,
      _count: true,
    });

    const totalScans = overallStats.reduce((sum, stat) => sum + stat._count, 0);
    const successfulScans = overallStats.find((stat) => stat.scan_result === 'SUCCESS')?._count || 0;
    const failedScans = totalScans - successfulScans;

    // Get hourly data (for the last 24 hours or specified range)
    const hourlyData = await this.prisma.$queryRaw<
      Array<{
        hour: number;
        total_scans: bigint;
        successful_scans: bigint;
      }>
    >`
      SELECT 
        EXTRACT(HOUR FROM scanned_at) as hour,
        COUNT(*) as total_scans,
        COUNT(CASE WHEN scan_result = 'SUCCESS' THEN 1 END) as successful_scans
      FROM "Scan"
      WHERE event_id = ${eventId}::uuid
      ${timeRange ? Prisma.sql`AND scanned_at >= ${timeRange.startDate} AND scanned_at <= ${timeRange.endDate}` : Prisma.sql`AND scanned_at >= NOW() - INTERVAL '24 hours'`}
      GROUP BY EXTRACT(HOUR FROM scanned_at)
      ORDER BY hour
    `;

    // Get daily data (for the last 30 days or specified range)
    const dailyData = await this.prisma.$queryRaw<
      Array<{
        date: string;
        total_scans: bigint;
        successful_scans: bigint;
      }>
    >`
      SELECT 
        DATE(scanned_at) as date,
        COUNT(*) as total_scans,
        COUNT(CASE WHEN scan_result = 'SUCCESS' THEN 1 END) as successful_scans
      FROM "Scan"
      WHERE event_id = ${eventId}::uuid
      ${timeRange ? Prisma.sql`AND scanned_at >= ${timeRange.startDate} AND scanned_at <= ${timeRange.endDate}` : Prisma.sql`AND scanned_at >= NOW() - INTERVAL '30 days'`}
      GROUP BY DATE(scanned_at)
      ORDER BY date
    `;

    // Get sector breakdown
    const sectorData = await this.prisma.scan.groupBy({
      by: ['sector_name', 'scan_result'],
      where: whereClause,
      _count: true,
    });

    const sectorBreakdown = sectorData.reduce((acc: any[], item) => {
      const existing = acc.find((s) => s.sectorName === item.sector_name);
      if (existing) {
        existing.scans += item._count;
        if (item.scan_result === 'SUCCESS') {
          existing.successful += item._count;
        }
      } else {
        acc.push({
          sectorName: item.sector_name || 'Unknown',
          scans: item._count,
          successful: item.scan_result === 'SUCCESS' ? item._count : 0,
          successRate: 0, // Will be calculated below
        });
      }
      return acc;
    }, []);

    // Calculate success rates for sectors
    sectorBreakdown.forEach((sector) => {
      sector.successRate = sector.scans > 0 ? (sector.successful / sector.scans) * 100 : 0;
    });

    return {
      totalScans,
      successfulScans,
      failedScans,
      successRate: totalScans > 0 ? (successfulScans / totalScans) * 100 : 0,
      hourlyData: hourlyData.map((item) => ({
        hour: Number(item.hour),
        scans: Number(item.total_scans),
        successful: Number(item.successful_scans),
        failed: Number(item.total_scans) - Number(item.successful_scans),
      })),
      dailyData: dailyData.map((item) => ({
        date: item.date,
        scans: Number(item.total_scans),
        successful: Number(item.successful_scans),
        failed: Number(item.total_scans) - Number(item.successful_scans),
      })),
      sectorBreakdown,
    };
  }

  async getCreatorScanAnalytics(
    creatorWalletAddress: string,
    timeRange?: {
      startDate: Date;
      endDate: Date;
    }
  ): Promise<{
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    successRate: number;
    eventBreakdown: Array<{
      eventId: string;
      eventName: string;
      scans: number;
      successRate: number;
    }>;
    peakHours: Array<{
      hour: number;
      scans: number;
    }>;
  }> {
    const timeFilter = timeRange
      ? Prisma.sql`AND s.scanned_at >= ${timeRange.startDate} AND s.scanned_at <= ${timeRange.endDate}`
      : Prisma.sql`AND s.scanned_at >= NOW() - INTERVAL '30 days'`;

    // Get overall stats for creator's events
    const overallStats = await this.prisma.$queryRaw<
      Array<{
        total_scans: bigint;
        successful_scans: bigint;
      }>
    >`
      SELECT 
        COUNT(*) as total_scans,
        COUNT(CASE WHEN s.scan_result = 'SUCCESS' THEN 1 END) as successful_scans
      FROM "Scan" s
      JOIN "Event" e ON s.event_id = e.id
      WHERE e.creator_wallet_address = ${creatorWalletAddress}
      ${timeFilter}
    `;

    const totalScans = Number(overallStats[0]?.total_scans || 0);
    const successfulScans = Number(overallStats[0]?.successful_scans || 0);
    const failedScans = totalScans - successfulScans;

    // Get event breakdown
    const eventBreakdownData = await this.prisma.$queryRaw<
      Array<{
        event_id: string;
        event_name: string;
        total_scans: bigint;
        successful_scans: bigint;
      }>
    >`
      SELECT 
        e.id as event_id,
        e.name as event_name,
        COUNT(*) as total_scans,
        COUNT(CASE WHEN s.scan_result = 'SUCCESS' THEN 1 END) as successful_scans
      FROM "Scan" s
      JOIN "Event" e ON s.event_id = e.id
      WHERE e.creator_wallet_address = ${creatorWalletAddress}
      ${timeFilter}
      GROUP BY e.id, e.name
      ORDER BY total_scans DESC
    `;

    // Get peak hours
    const peakHoursData = await this.prisma.$queryRaw<
      Array<{
        hour: number;
        total_scans: bigint;
      }>
    >`
      SELECT 
        EXTRACT(HOUR FROM s.scanned_at) as hour,
        COUNT(*) as total_scans
      FROM "Scan" s
      JOIN "Event" e ON s.event_id = e.id
      WHERE e.creator_wallet_address = ${creatorWalletAddress}
      ${timeFilter}
      GROUP BY EXTRACT(HOUR FROM s.scanned_at)
      ORDER BY total_scans DESC
    `;

    return {
      totalScans,
      successfulScans,
      failedScans,
      successRate: totalScans > 0 ? (successfulScans / totalScans) * 100 : 0,
      eventBreakdown: eventBreakdownData.map((item) => ({
        eventId: item.event_id,
        eventName: item.event_name,
        scans: Number(item.total_scans),
        successRate:
          Number(item.total_scans) > 0 ? (Number(item.successful_scans) / Number(item.total_scans)) * 100 : 0,
      })),
      peakHours: peakHoursData.map((item) => ({
        hour: Number(item.hour),
        scans: Number(item.total_scans),
      })),
    };
  }
}
