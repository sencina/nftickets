import React, { useState } from 'react';
import { X, Ticket, AlertCircle, Copy, Check } from 'lucide-react';
import './IssueTicketModal.css';

interface Sector {
  id: string;
  name: string;
  capacity: number;
  description?: string;
}

interface Event {
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
}

interface IssueTicketModalProps {
  event: Event | null;
  onClose: () => void;
  onSuccess?: () => void;
  apiKey: string;
}

interface TokenResponse {
  tokenId: number;
  address: string;
  ticketId: string;
  qrCodeData: string;
}

export const IssueTicketModal: React.FC<IssueTicketModalProps> = ({ event, onClose, onSuccess, apiKey }) => {
  const [selectedSector, setSelectedSector] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenData, setTokenData] = useState<TokenResponse | null>(null);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(prev => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [field]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const addTokenToMetaMask = async (tokenData: TokenResponse) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const tokenAddress = tokenData.address;
      const tokenId = tokenData.tokenId.toString();

      // Fetch the token metadata first
      const response = await fetch(`${API_BASE}/event/token-uri/${tokenAddress}/${tokenId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token metadata');
      }

      const metadata = await response.json();

      // Request to add the NFT to MetaMask
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: [{
          type: event?.contract_type === 'NFTicket1155' ? 'ERC1155' : 'ERC721',
          options: {
            address: tokenAddress,
            tokenId: tokenId,
            name: metadata.name || `${event?.name} Ticket`,
            symbol: 'NFTIX',
            decimals: 0,
            image: metadata.image,
            tokenURI: `${API_BASE}/event/token-uri/${tokenAddress}/${tokenId}`
          },
        }],
      });

      if (wasAdded) {
        console.log('NFT was added to MetaMask');
      }
    } catch (error) {
      console.error('Error adding token to MetaMask:', error);
      setError('Failed to add token to MetaMask. You can add it manually later.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/event/issue-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          eventId: event.id,
          sectorName: selectedSector,
          walletAddress: recipientAddress
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to issue ticket');
      }

      const tokenData: TokenResponse = await response.json();
      setTokenData(tokenData);
      setSuccess(true);

      // Add token to MetaMask
      await addTokenToMetaMask(tokenData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  if (!event) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <Ticket className="header-icon" />
            <h2>Issue Ticket - {event.name}</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="modal-content">
            <div className="form-group">
              <label htmlFor="sector">Sector</label>
              <select
                id="sector"
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                required
                disabled={isLoading}
              >
                <option value="">Select a sector</option>
                {event.sectors?.map((sector) => (
                  <option key={sector.id} value={sector.name}>
                    {sector.name} - {sector.capacity} seats
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="recipient">Recipient Wallet Address</label>
              <input
                id="recipient"
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                required
                pattern="^0x[a-fA-F0-9]{40}$"
                title="Please enter a valid Ethereum address"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="modal-footer">
              <button 
                className="btn-submit" 
                onClick={handleContinue}
                style={{ marginRight: '10px' }}
              >
                Continue
              </button>
              <button 
                className="btn-cancel" 
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        ) : (
          <div className="success-content">
            <div className="success-message">
              <Check size={24} className="success-icon" />
              <p>Ticket issued successfully!</p>
            </div>

            <div className="token-info">
              <div className="info-group">
                <label>Contract Address:</label>
                <div className="copy-field">
                  <input type="text" value={tokenData?.address} readOnly />
                  <button 
                    onClick={() => copyToClipboard(tokenData?.address || '', 'address')}
                    className="copy-button"
                    title="Copy address"
                  >
                    {copyStatus['address'] ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="info-group">
                <label>Token ID:</label>
                <div className="copy-field">
                  <input type="text" value={tokenData?.tokenId} readOnly />
                  <button 
                    onClick={() => copyToClipboard(tokenData?.tokenId.toString() || '', 'tokenId')}
                    className="copy-button"
                    title="Copy token ID"
                  >
                    {copyStatus['tokenId'] ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <p className="import-instructions">
                You can use these details to manually import the NFT in MetaMask if needed.
              </p>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-submit" 
                onClick={handleContinue}
                style={{ marginRight: '10px' }}
              >
                Continue
              </button>
              <button 
                className="btn-cancel" 
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 