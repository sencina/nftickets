import { Event } from '@prisma/client';
import { CreateEventDTO, EventDTO } from '../dto';

export interface IEventRepository {
  // Event CRUD operations
  create(data: CreateEventDTO): Promise<EventDTO>;
  findAll(page: number, limit: number): Promise<{ events: EventDTO[]; total: number }>;
  findById(id: string): Promise<EventDTO | null>;
  delete(id: string): Promise<EventDTO>;

  // Creator-specific queries for dashboard
  findByCreator(
    creatorWalletAddress: string,
    page: number,
    limit: number
  ): Promise<{ events: EventDTO[]; total: number }>;
  getCreatorStats(creatorWalletAddress: string): Promise<{
    totalEvents: number;
    totalSectors: number;
    totalTickets: number;
    usedTickets: number;
  }>;
  getEventStats(eventId: string): Promise<{
    totalTickets: number;
    usedTickets: number;
    sectorStats: Array<{
      sectorName: string;
      capacity: number;
      ticketsSold: number;
      ticketsUsed: number;
    }>;
  }>;

  // Scan analytics for dashboard graphs
  logScan(scanData: {
    eventId: string;
    tokenId: string;
    contractAddress: string;
    scannerAddress?: string;
    ticketOwner?: string;
    sectorName?: string;
    scanResult: 'SUCCESS' | 'FAILED' | 'INVALID' | 'ALREADY_USED';
    errorCode?: string;
    locationInfo?: Record<string, any>;
  }): Promise<void>;

  getScanAnalytics(
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
  }>;

  getCreatorScanAnalytics(
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
  }>;
}
