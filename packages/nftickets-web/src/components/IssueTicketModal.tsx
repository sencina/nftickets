import React, { useState } from 'react';
import { X, Ticket, AlertCircle, Copy, Check, Eye, EyeOff } from 'lucide-react';
import './IssueTicketModal.css';
import type { Event, Sector, TokenResponse } from '../types';

interface IssueTicketModalProps {
  event: Event | null;
  onClose: () => void;
  apiKey: string;
}

export const IssueTicketModal: React.FC<IssueTicketModalProps> = ({ event, onClose, apiKey }) => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenData, setTokenData] = useState<TokenResponse | null>(null);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});
  const [showQRData, setShowQRData] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(prev => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [field]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSector || !recipientAddress || !event) return;

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
          sectorId: selectedSector.id,
          sectorName: selectedSector.name,
          walletAddress: recipientAddress
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to issue ticket');
      }

      const data = await response.json();
      setTokenData(data);
      setSuccess(true);
    } catch (err) {
      console.error('Error issuing ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to issue ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!event || !selectedValue) {
      setSelectedSector(null);
      return;
    }
    
    const sector = event.sectors.find(s => s.contractSectorId.toString() === selectedValue);
    setSelectedSector(sector || null);
  };

  if (!event) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{success ? 'Ticket Issued Successfully' : 'Issue Ticket'}</h2>
          <button className="close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="modal-content">
            <div className="form-group">
              <label htmlFor="sector">Sector</label>
              <select
                id="sector"
                value={selectedSector?.contractSectorId?.toString() || ''}
                onChange={handleSectorChange}
                required
                disabled={isLoading}
              >
                <option value="">Select a sector</option>
                {event?.sectors.map((sector) => (
                  <option key={sector.id} value={sector.contractSectorId.toString()}>
                    {sector.name} ({sector.capacity} seats)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="walletAddress">Recipient Wallet Address</label>
              <input
                id="walletAddress"
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Ticket className="spin" />
                  Issuing...
                </>
              ) : (
                <>
                  <Ticket />
                  Issue Ticket
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="modal-content success">
            <div className="success-header">
              <Ticket size={48} />
              <h3>Ticket Issued Successfully!</h3>
              <p>The ticket has been minted and is now available for the recipient.</p>
            </div>

            {tokenData && (
              <>
                <div className="token-info">
                  <div className="info-group">
                    <label>Token ID</label>
                    <div className="copy-field">
                      <span>#{tokenData.tokenId}</span>
                      <button
                        onClick={() => copyToClipboard(tokenData.tokenId.toString(), 'tokenId')}
                        className="copy-button"
                      >
                        {copyStatus.tokenId ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="info-group">
                    <label>Contract Address</label>
                    <div className="copy-field">
                      <span>{tokenData.address.slice(0, 6)}...{tokenData.address.slice(-4)}</span>
                      <button
                        onClick={() => copyToClipboard(tokenData.address, 'address')}
                        className="copy-button"
                      >
                        {copyStatus.address ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="info-group">
                    <label>Ticket ID</label>
                    <div className="copy-field">
                      <span>{tokenData.ticketId}</span>
                      <button
                        onClick={() => copyToClipboard(tokenData.ticketId, 'ticketId')}
                        className="copy-button"
                      >
                        {copyStatus.ticketId ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="info-group">
                    <label>Recipient Address</label>
                    <div className="copy-field">
                      <span>{recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}</span>
                      <button
                        onClick={() => copyToClipboard(recipientAddress, 'recipient')}
                        className="copy-button"
                      >
                        {copyStatus.recipient ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="qr-section">
                  <div className="qr-header">
                    <label>QR Code Data for Scanner</label>
                    <button
                      onClick={() => setShowQRData(!showQRData)}
                      className="toggle-qr-btn"
                      type="button"
                    >
                      {showQRData ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showQRData ? 'Hide' : 'Show'} QR Data
                    </button>
                  </div>
                  
                  {showQRData && (
                    <div className="qr-data">
                      <textarea
                        value={tokenData.qrCodeData}
                        readOnly
                        className="qr-textarea"
                        rows={6}
                        placeholder="QR Code data will appear here..."
                      />
                      <button
                        onClick={() => copyToClipboard(tokenData.qrCodeData, 'qrData')}
                        className="copy-qr-btn"
                        type="button"
                      >
                        {copyStatus.qrData ? (
                          <>
                            <Check size={16} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy QR Data
                          </>
                        )}
                      </button>
                      <p className="qr-note">
                        💡 This QR code contains encrypted ticket data that can be scanned at the event entrance.
                      </p>
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button 
                    onClick={onClose} 
                    className="submit-button" 
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 