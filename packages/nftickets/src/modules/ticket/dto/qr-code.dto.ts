import { IsString, IsNotEmpty, IsNumber, IsEthereumAddress, IsOptional } from 'class-validator';

/**
 * Complete QR code data structure containing all information needed for verification
 */
export class QRCodeData {
  @IsNotEmpty()
  @IsString()
  tokenId!: string;

  @IsNotEmpty()
  @IsString()
  contractAddress!: string;

  @IsNotEmpty()
  @IsString()
  eventId!: string;

  @IsNotEmpty()
  @IsString()
  eventName!: string;

  @IsNotEmpty()
  @IsString()
  sectorName!: string;

  @IsNotEmpty()
  @IsNumber()
  sectorId!: number;

  @IsNotEmpty()
  @IsEthereumAddress()
  ticketOwner!: string; // The wallet address that owns this ticket

  @IsNotEmpty()
  @IsNumber()
  timestamp!: number;

  @IsNotEmpty()
  @IsString()
  signature!: string; // Server signature

  @IsOptional()
  @IsString()
  ticketId?: string; // Database ticket ID
}
