import { DEFAULT_CONTRACT } from '@modules/nft/config/contracts.config';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  IsUUID,
  IsDate,
  IsArray,
  IsEthereumAddress,
  IsObject,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TransferStrategyDTO {
  @IsString()
  @IsIn(['NORMAL', 'NON_TRANSFERABLE', 'FALLBACK', 'ONE_TIME_USE'])
  type!: 'NORMAL' | 'NON_TRANSFERABLE' | 'FALLBACK' | 'ONE_TIME_USE';

  @IsArray()
  @IsEthereumAddress({ each: true })
  @IsOptional()
  fallbackAddresses?: string[];
}

export class IssueTicketDTO {
  @IsString()
  walletAddress: string;

  @IsUUID()
  eventId: string;

  @IsString()
  sectorName: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => TransferStrategyDTO)
  transferStrategy?: TransferStrategyDTO;

  constructor(walletAddress: string, eventId: string, sectorName: string, transferStrategy?: TransferStrategyDTO) {
    this.walletAddress = walletAddress;
    this.eventId = eventId;
    this.sectorName = sectorName;
    this.transferStrategy = transferStrategy;
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

export class GenerateQRDTO {
  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;

  @IsNotEmpty()
  @IsUUID()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  sectorName: string;

  constructor(walletAddress: string, eventId: string, sectorName: string) {
    this.walletAddress = walletAddress;
    this.eventId = eventId;
    this.sectorName = sectorName;
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

  @IsString()
  @IsOptional()
  creator_wallet_address?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  maxMintPerTransaction?: number;

  constructor(
    name: string,
    description: string,
    sectors: SectorDTO[],
    contractType?: string,
    address?: string,
    metadata_hash?: string,
    creator_wallet_address?: string,
    maxMintPerTransaction?: number
  ) {
    this.name = name;
    this.description = description;
    this.sectors = sectors;
    this.contractType = contractType || DEFAULT_CONTRACT;
    this.address = address;
    this.metadata_hash = metadata_hash;
    this.creator_wallet_address = creator_wallet_address;
    this.maxMintPerTransaction = maxMintPerTransaction;
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

  @IsString()
  @IsOptional()
  contractType?: string;

  @IsString()
  creator_wallet_address: string;

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
    creator_wallet_address: string,
    created_at: Date,
    start_date?: Date,
    end_date?: Date,
    sectors?: SectorDTO[],
    contractType?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.metadata_hash = metadata_hash;
    this.creator_wallet_address = creator_wallet_address;
    this.created_at = created_at;
    this.start_date = start_date;
    this.end_date = end_date;
    this.sectors = sectors;
    this.contractType = contractType || DEFAULT_CONTRACT;
  }

  // Factory method to create EventDTO from entity
  static fromEntity(event: any, includeSectors = false): EventDTO {
    return new EventDTO(
      event.id,
      event.name,
      event.description,
      event.address,
      event.metadata_hash,
      event.creator_wallet_address,
      event.created_at,
      event.start_date,
      event.end_date,
      includeSectors && event.sectors
        ? event.sectors.map((s: any) => new SectorDTO(s.name, s.capacity, s.description, s.contract_sector_id))
        : undefined,
      event.contract_type
    );
  }
}
