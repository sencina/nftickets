export interface Sector {
  id?: string;
  name: string;
  capacity: number;
  description?: string;
  contractSectorId: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  address: string;
  metadata_hash: string;
  contract_type: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  creator_wallet_address: string;
  sectors: Sector[];
  stats?: {
    totalTickets: number;
    ticketsScanned: number;
    successRate: number;
  };
}

export interface TokenResponse {
  tokenId: number;
  address: string;
  ticketId: string;
  qrCodeData: string;
} 