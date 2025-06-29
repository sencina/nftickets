import React, { useState } from 'react';
import { Plus, Users, Calendar, Save, X, Key } from 'lucide-react';
import { BrowserProvider } from 'ethers';
import SignatureGenerator from '../modules/auth/components/SignatureGenerator';
import ApiKeyGenerator from '../modules/auth/components/ApiKeyGenerator';
import './EventCreator.css';

interface EventCreatorProps {
  apiKey?: string;
  walletAddress: string;
  provider: BrowserProvider;
  onEventCreated: () => void;
  onClose: () => void;
  onApiKeyGenerated: (apiKey: string) => void;
}

interface Sector {
  name: string;
  capacity: number;
  price: number;
  transferable: boolean;
}

const EventCreator: React.FC<EventCreatorProps> = ({ 
  apiKey, 
  walletAddress, 
  provider, 
  onEventCreated, 
  onClose, 
  onApiKeyGenerated 
}) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    maxCapacity: 100,
    contractType: 'NFTicket721' as 'NFTicket721' | 'NFTicket1155'
  });

  const [sectors, setSectors] = useState<Sector[]>([
    { name: 'General Admission', capacity: 50, price: 0.1, transferable: true }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication state
  const [signature, setSignature] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<'signature' | 'apikey' | 'complete'>('signature');

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  // Authentication handlers
  const handleSignature = (generatedSignature: string, signedMessage: string) => {
    setSignature(generatedSignature);
    setMessage(signedMessage);
    setAuthStep('apikey');
  };

  const handleApiKey = (generatedApiKey: string) => {
    onApiKeyGenerated(generatedApiKey);
    setAuthStep('complete');
  };

  const handleEventDataChange = (field: string, value: unknown) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleSectorChange = (index: number, field: string, value: unknown) => {
    setSectors(prev => prev.map((sector, i) => 
      i === index ? { ...sector, [field]: value } : sector
    ));
  };

  const addSector = () => {
    setSectors(prev => [...prev, { 
      name: `Sector ${prev.length + 1}`, 
      capacity: 25, 
      price: 0.1, 
      transferable: true 
    }]);
  };

  const removeSector = (index: number) => {
    if (sectors.length > 1) {
      setSectors(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey) {
      setError('API key is required to create events');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };

      // Prepare sectors data for the backend
      const sectorsData = sectors.map(sector => ({
        name: sector.name,
        capacity: sector.capacity,
        description: sector.name, // Use name as description if needed
      }));

      // Create the event with sectors included
      const eventResponse = await fetch(`${API_BASE}/event`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: eventData.name,
          description: eventData.description,
          sectors: sectorsData,
          contractType: eventData.contractType
        })
      });

      if (!eventResponse.ok) {
        const errorData = await eventResponse.json();
        console.error('Event creation error:', errorData);
        throw new Error(errorData.message || 'Failed to create event');
      }

      const createdEvent = await eventResponse.json();
      console.log('Event created successfully:', createdEvent);

      onEventCreated();
      onClose();
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const totalCapacity = sectors.reduce((sum, sector) => sum + sector.capacity, 0);

  // If no API key, show authentication flow
  if (!apiKey) {
    return (
      <div className="event-creator-overlay">
        <div className="event-creator-modal">
          <div className="modal-header">
            <h2>
              <Key size={24} />
              Authentication Required
            </h2>
            <button onClick={onClose} className="close-btn">
              <X size={24} />
            </button>
          </div>

          <div className="auth-content">
            <div className="auth-info">
              <p>To create events, you need to authenticate with an API key.</p>
              <p>This process involves signing a message with your wallet and generating a secure API key.</p>
            </div>

            {authStep === 'signature' && (
              <div className="auth-step">
                <h3>Step 1: Sign Message</h3>
                <SignatureGenerator 
                  walletAddress={walletAddress}
                  provider={provider}
                  onSignatureGenerated={handleSignature}
                />
              </div>
            )}

            {authStep === 'apikey' && signature && message && (
              <div className="auth-step">
                <h3>Step 2: Generate API Key</h3>
                <ApiKeyGenerator 
                  walletAddress={walletAddress}
                  signature={signature}
                  message={message}
                  onApiKeyGenerated={handleApiKey}
                />
              </div>
            )}

            {authStep === 'complete' && (
              <div className="auth-step">
                <div className="success-message">
                  <h3>✓ Authentication Complete!</h3>
                  <p>You can now create events. The form will appear automatically.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="event-creator-overlay">
      <div className="event-creator-modal">
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          {/* Basic Event Information */}
          <div className="form-section">
            <h3>Event Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Event Name *</label>
                <input
                  type="text"
                  value={eventData.name}
                  onChange={(e) => handleEventDataChange('name', e.target.value)}
                  required
                  placeholder="Concert, Conference, Sports Event..."
                />
              </div>

              <div className="form-group">
                <label>Contract Type *</label>
                <select
                  value={eventData.contractType}
                  onChange={(e) => handleEventDataChange('contractType', e.target.value as 'NFTicket721' | 'NFTicket1155')}
                >
                  <option value="NFTicket721">ERC-721 (Unique NFTs)</option>
                  <option value="NFTicket1155">ERC-1155 (Semi-Fungible)</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => handleEventDataChange('description', e.target.value)}
                  placeholder="Describe your event..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) => handleEventDataChange('location', e.target.value)}
                  placeholder="Venue name or address"
                />
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleEventDataChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={eventData.time}
                  onChange={(e) => handleEventDataChange('time', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Max Capacity</label>
                <input
                  type="number"
                  value={eventData.maxCapacity}
                  onChange={(e) => handleEventDataChange('maxCapacity', parseInt(e.target.value))}
                  min={1}
                />
              </div>
            </div>
          </div>

          {/* Sectors */}
          <div className="form-section">
            <div className="section-header">
              <h3>Event Sectors</h3>
              <button type="button" onClick={addSector} className="add-sector-btn">
                <Plus size={16} />
                Add Sector
              </button>
            </div>

            <div className="sectors-grid">
              {sectors.map((sector, index) => (
                <div key={index} className="sector-card">
                  <div className="sector-header">
                    <h4>Sector {index + 1}</h4>
                    {sectors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSector(index)}
                        className="remove-sector-btn"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="sector-fields">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={sector.name}
                        onChange={(e) => handleSectorChange(index, 'name', e.target.value)}
                        placeholder="VIP, General, etc."
                      />
                    </div>

                    <div className="form-group">
                      <label>Capacity</label>
                      <input
                        type="number"
                        value={sector.capacity}
                        onChange={(e) => handleSectorChange(index, 'capacity', parseInt(e.target.value))}
                        min={1}
                      />
                    </div>

                    <div className="form-group">
                      <label>Price (ETH)</label>
                      <input
                        type="number"
                        step="0.001"
                        value={sector.price}
                        onChange={(e) => handleSectorChange(index, 'price', parseFloat(e.target.value))}
                        min={0}
                      />
                    </div>

                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={sector.transferable}
                          onChange={(e) => handleSectorChange(index, 'transferable', e.target.checked)}
                        />
                        Transferable
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="capacity-summary">
              <div className="summary-item">
                <Users size={20} />
                <span>Total Capacity: {totalCapacity}</span>
              </div>
              <div className="summary-item">
                <Calendar size={20} />
                <span>Sectors: {sectors.length}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              <Save size={16} />
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreator; 