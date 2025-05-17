/**
 * Generates a verification URL for ticket validation
 *
 * @param protocol The URL protocol (http/https)
 * @param host The host domain
 * @param eventId The event ID
 * @param walletAddress The wallet address of the ticket owner
 * @param contractSectorId The sector ID in the contract
 * @returns Complete verification URL
 */
export const VERIFICATION_URL = (
  protocol: string,
  host: string,
  eventId: string,
  walletAddress: string,
  contractSectorId: number
): string => {
  return `${protocol}://${host}/api/event/verify/${eventId}/${walletAddress}/${contractSectorId}`;
};
