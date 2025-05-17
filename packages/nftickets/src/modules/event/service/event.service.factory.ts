import { EventService } from './event.service';
import { getContractConfig, ContractConfig } from '@modules/nft/config/contracts.config';

/**
 * Factory function to create an EventService with a specific contract configuration
 *
 * @param contractType Optional contract type to use. If not provided, the default contract is used.
 * @returns A new EventService instance configured with the specified contract
 */
export function createEventService(contractType?: string): EventService {
  const contractConfig = getContractConfig(contractType);
  return new EventService(contractConfig);
}

/**
 * Factory function to create an EventService with a custom contract configuration
 *
 * @param contractConfig The contract configuration to use
 * @returns A new EventService instance configured with the provided contract configuration
 */
export function createEventServiceWithConfig(contractConfig: ContractConfig): EventService {
  return new EventService(contractConfig);
}
