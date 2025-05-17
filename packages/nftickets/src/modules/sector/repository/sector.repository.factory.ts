import { ISectorRepository } from './sector.repository.interface';
import { SectorRepository } from './sector.repository.impl';

export function createSectorRepository(): ISectorRepository {
  return new SectorRepository();
}
