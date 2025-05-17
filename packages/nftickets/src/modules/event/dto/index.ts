import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class IssueTicketDTO {
  @IsString()
  walletAddress: string;

  @IsString()
  eventAddress: string;

  @IsNumber()
  @IsPositive()
  sectorId: number;

  constructor(walletAddress: string, eventAddress: string, sectorId: number) {
    this.walletAddress = walletAddress;
    this.eventAddress = eventAddress;
    this.sectorId = sectorId;
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

  constructor(eventAddress: string, walletAddress: string, sectorId: number, amount: number) {
    this.eventAddress = eventAddress;
    this.walletAddress = walletAddress;
    this.sectorId = sectorId;
    this.amount = amount;
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

  constructor(name: string, description: string, sectors: SectorDTO[], contractType?: string) {
    this.name = name;
    this.description = description;
    this.sectors = sectors;
    this.contractType = contractType;
  }
}

export class SectorDTO {
  @IsString()
  name: string;
  @IsNumber()
  @IsPositive()
  capacity: number;

  constructor(name: string, capacity: number) {
    this.name = name;
    this.capacity = capacity;
  }
}
