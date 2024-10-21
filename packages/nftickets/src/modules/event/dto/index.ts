import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateEventDTO {
  @IsString()
  name: string;
  @IsString()
  description: string;

  @IsNotEmpty()
  sectors: SectorDTO[];

  constructor(name: string, description: string, sectors: SectorDTO[]) {
    this.name = name;
    this.description = description;
    this.sectors = sectors;
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
