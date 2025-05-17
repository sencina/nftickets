import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsUUID, IsDate, IsArray } from 'class-validator';

export class IssueTicketDTO {
  @IsString()
  walletAddress: string;

  @IsUUID()
  eventId: string;

  @IsString()
  sectorName: string;

  constructor(walletAddress: string, eventId: string, sectorName: string) {
    this.walletAddress = walletAddress;
    this.eventId = eventId;
    this.sectorName = sectorName;
  }
}

export class MintTicketDTO {
  @IsString()
  eventAddress: string;

  @IsString()
  walletAddress: string;

  @IsNumber()
  @IsPositive()
  sectorId: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsOptional()
  metadataURI?: string;

  constructor(eventAddress: string, walletAddress: string, sectorId: number, amount: number, metadataURI?: string) {
    this.eventAddress = eventAddress;
    this.walletAddress = walletAddress;
    this.sectorId = sectorId;
    this.amount = amount;
    this.metadataURI = metadataURI;
  }
}

export class CreateEventDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  sectors: SectorDTO[];

  @IsString()
  contractType?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  metadata_hash?: string;

  constructor(
    name: string,
    description: string,
    sectors: SectorDTO[],
    contractType?: string,
    address?: string,
    metadata_hash?: string
  ) {
    this.name = name;
    this.description = description;
    this.sectors = sectors;
    this.contractType = contractType || 'NFTicket1155';
    this.address = address;
    this.metadata_hash = metadata_hash;
  }
}

export class SectorDTO {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  contractSectorId?: number;

  constructor(name: string, capacity: number, description?: string, contractSectorId?: number) {
    this.name = name;
    this.capacity = capacity;
    this.description = description;
    this.contractSectorId = contractSectorId;
  }
}

export class EventDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  metadata_hash: string;

  @IsDate()
  @IsOptional()
  start_date?: Date;

  @IsDate()
  @IsOptional()
  end_date?: Date;

  @IsDate()
  created_at: Date;

  @IsArray()
  @IsOptional()
  sectors?: SectorDTO[];

  constructor(
    id: string,
    name: string,
    description: string,
    address: string,
    metadata_hash: string,
    created_at: Date,
    start_date?: Date,
    end_date?: Date,
    sectors?: SectorDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.metadata_hash = metadata_hash;
    this.created_at = created_at;
    this.start_date = start_date;
    this.end_date = end_date;
    this.sectors = sectors;
  }

  // Factory method to create EventDTO from entity
  static fromEntity(event: any, includeSectors = false): EventDTO {
    return new EventDTO(
      event.id,
      event.name,
      event.description,
      event.address,
      event.metadata_hash,
      event.created_at,
      event.start_date,
      event.end_date,
      includeSectors && event.sectors
        ? event.sectors.map((s: any) => new SectorDTO(s.name, s.capacity, s.description, s.contract_sector_id))
        : undefined
    );
  }
}
