import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Copy, 
  CheckCircle, 
  ExternalLink, 
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  ChevronDown,
  Search
} from 'lucide-react';
import './UserNFTs.css';

interface NFTTicket {
  tokenId: string;
  contractAddress: string;
  eventId: string;
  eventName: string;
  sectorName: string;
  sectorId: number;
  isUsed: boolean;
  usedAt?: string;
  qrCodeData: string;
  metadata?: {
    name: string;
    description: string;
    image: string;
  };
}

interface Event {
  id: string;
  name: string;
  address: string;
  contractType: string;
}

interface UserNFTsProps {
  apiKey: string;
  walletAddress: string;
}

const UserNFTs: React.FC<UserNFTsProps> = ({ apiKey, walletAddress }) => {
  const [nfts, setNfts] = useState<NFTTicket[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedQR, setCopiedQR] = useState<string | null>(null);
  const [showQRData, setShowQRData] = useState<{ [key: string]: boolean }>({});
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const [showImageModal, setShowImageModal] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  // Fetch all events for the selector
  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/event/creator/${walletAddress}/events`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.events || []);
      
      // Auto-select first event if available
      if (data.events && data.events.length > 0) {
        setSelectedEventId(data.events[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setEventsLoading(false);
    }
  };

  // Fetch NFTs for the selected event
  const fetchEventNFTs = async (eventId: string) => {
    if (!eventId) {
      setNfts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/event/${eventId}/user/nfts`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }

      const data = await response.json();
      const nfts = data.nfts || [];
      setNfts(nfts);
      
      // Initialize image loading state for NFTs with images
      const loadingState: { [key: string]: boolean } = {};
      nfts.forEach((nft: NFTTicket) => {
        if (nft.metadata?.image) {
          loadingState[nft.tokenId] = true;
        }
      });
      setImageLoading(loadingState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch NFTs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [walletAddress]);

  useEffect(() => {
    if (selectedEventId) {
      fetchEventNFTs(selectedEventId);
    }
  }, [selectedEventId, apiKey]);

  const handleEventChange = (eventId: string) => {
    setSelectedEventId(eventId);
    setNfts([]); // Clear current NFTs while loading new ones
  };

  const copyQRCode = async (tokenId: string, qrData: string) => {
    try {
      await navigator.clipboard.writeText(qrData);
      setCopiedQR(tokenId);
      setTimeout(() => setCopiedQR(null), 2000);
    } catch (err) {
      console.error('Failed to copy QR code:', err);
    }
  };

  const toggleQRData = (tokenId: string) => {
    setShowQRData(prev => ({
      ...prev,
      [tokenId]: !prev[tokenId]
    }));
  };

  const openImageModal = (imageUrl: string) => {
    setShowImageModal(imageUrl);
  };

  const closeImageModal = () => {
    setShowImageModal(null);
  };

  const getStatusColor = (isUsed: boolean) => {
    return isUsed ? 'var(--status-used)' : 'var(--status-valid)';
  };

  const getStatusText = (isUsed: boolean) => {
    return isUsed ? 'Used' : 'Valid';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    
    // Convert IPFS URLs to HTTP gateway URLs for better browser compatibility
    if (imageUrl.startsWith('ipfs://')) {
      const hash = imageUrl.replace('ipfs://', '');
      return `https://ipfs.io/ipfs/${hash}`;
    }
    
    return imageUrl;
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);

  if (eventsLoading) {
    return (
      <div className="user-nfts-container">
        <div className="loading-state">
          <RefreshCw className="spin" size={32} />
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-nfts-container">
        <div className="error-state">
          <AlertCircle size={32} />
          <p>{error}</p>
          <button onClick={fetchEvents} className="retry-btn">
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-nfts-container">
      <div className="nfts-header">
        <div className="header-content">
          <h1>My NFT Tickets</h1>
          <p className="wallet-info">
            Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>
        <div className="header-actions">
          <button onClick={() => fetchEventNFTs(selectedEventId)} className="refresh-btn">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Event Selector */}
      <div className="event-selector">
        <div className="selector-header">
          <Search size={20} />
          <h3>Select Event</h3>
        </div>
        <div className="selector-dropdown">
          <select 
            value={selectedEventId} 
            onChange={(e) => handleEventChange(e.target.value)}
            className="event-select"
          >
            <option value="">Choose an event...</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="dropdown-icon" />
        </div>
        {selectedEvent && (
          <div className="selected-event-info">
            <p><strong>Selected:</strong> {selectedEvent.name}</p>
            <p><strong>Contract:</strong> {selectedEvent.address.slice(0, 6)}...{selectedEvent.address.slice(-4)}</p>
            <p><strong>Type:</strong> {selectedEvent.contractType}</p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <RefreshCw className="spin" size={32} />
          <p>Loading NFT tickets...</p>
        </div>
      ) : !selectedEventId ? (
        <div className="empty-state">
          <Search size={48} />
          <h3>Select an Event</h3>
          <p>Choose an event from the dropdown above to view your NFT tickets.</p>
        </div>
      ) : nfts.length === 0 ? (
        <div className="empty-state">
          <Ticket size={48} />
          <h3>No NFT Tickets Found</h3>
          <p>You don't have any NFT tickets for this event yet.</p>
        </div>
      ) : (
        <div className="nfts-grid">
          {nfts.map((nft) => (
            <div key={`${nft.contractAddress}-${nft.tokenId}`} className="nft-card">
              <div className="nft-header">
                <div className="nft-info">
                  <h3>{nft.eventName}</h3>
                  <p className="sector-name">{nft.sectorName}</p>
                </div>
                <div 
                  className="nft-status"
                  style={{ backgroundColor: getStatusColor(nft.isUsed) }}
                >
                  {getStatusText(nft.isUsed)}
                </div>
              </div>

              <div className="nft-image" onClick={() => getImageUrl(nft.metadata?.image) && openImageModal(getImageUrl(nft.metadata?.image)!)}>
                {getImageUrl(nft.metadata?.image) ? (
                  <>
                    <img 
                      src={getImageUrl(nft.metadata?.image)!} 
                      alt={nft.metadata?.name || nft.eventName}
                      onLoad={() => {
                        setImageLoading(prev => ({ ...prev, [nft.tokenId]: false }));
                      }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        setImageLoading(prev => ({ ...prev, [nft.tokenId]: false }));
                        // Show fallback
                        const fallback = img.parentElement?.querySelector('.image-fallback') as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                      style={{ display: imageLoading[nft.tokenId] ? 'none' : 'block' }}
                    />
                    {imageLoading[nft.tokenId] && (
                      <div className="image-loading">
                        <RefreshCw className="spin" size={32} />
                        <p>Loading image...</p>
                      </div>
                    )}
                  </>
                ) : null}
                <div className="image-fallback" style={{ display: getImageUrl(nft.metadata?.image) && !imageLoading[nft.tokenId] ? 'none' : 'flex' }}>
                  <Ticket size={48} />
                  <p>{nft.eventName}</p>
                  <span>{nft.sectorName}</span>
                </div>
              </div>

              <div className="nft-details">
                <div className="detail-row">
                  <span className="label">Token ID:</span>
                  <span className="value">#{nft.tokenId}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Contract:</span>
                  <span className="value contract-address">
                    {nft.contractAddress.slice(0, 6)}...{nft.contractAddress.slice(-4)}
                    <button
                      onClick={() => window.open(`https://etherscan.io/address/${nft.contractAddress}`, '_blank')}
                      className="external-link-btn"
                    >
                      <ExternalLink size={12} />
                    </button>
                  </span>
                </div>
                {nft.isUsed && nft.usedAt && (
                  <div className="detail-row">
                    <span className="label">Used:</span>
                    <span className="value">{formatDate(nft.usedAt)}</span>
                  </div>
                )}
              </div>

              <div className="qr-section">
                <div className="qr-header">
                  <h4>QR Code for Scanner</h4>
                  <button
                    onClick={() => toggleQRData(nft.tokenId)}
                    className="toggle-qr-btn"
                  >
                    {showQRData[nft.tokenId] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {showQRData[nft.tokenId] && (
                  <div className="qr-data">
                    <textarea
                      value={nft.qrCodeData}
                      readOnly
                      className="qr-textarea"
                      rows={4}
                    />
                    <button
                      onClick={() => copyQRCode(nft.tokenId, nft.qrCodeData)}
                      className="copy-qr-btn"
                    >
                      {copiedQR === nft.tokenId ? (
                        <>
                          <CheckCircle size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy QR Data
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {nft.metadata?.description && (
                <div className="nft-description">
                  <h4>Description</h4>
                  <p>{nft.metadata.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {nfts.length > 0 && (
        <div className="nfts-footer">
          <p>Total NFT Tickets: {nfts.length}</p>
          <p>Valid Tickets: {nfts.filter(nft => !nft.isUsed).length}</p>
          <p>Used Tickets: {nfts.filter(nft => nft.isUsed).length}</p>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeImageModal}>
              ×
            </button>
            <img 
              src={showImageModal} 
              alt="NFT Full Size"
              className="image-modal-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNFTs; 