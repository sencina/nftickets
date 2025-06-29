import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  X, Calendar, MapPin, Users, TrendingUp, Clock, 
  Activity, Zap, Target, DollarSign
} from 'lucide-react';
import './EventDetailModal.css';

interface EventDetailModalProps {
  event: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    creator_wallet_address: string;
    start_date?: string;
    end_date?: string;
    address?: string;
    metadata_hash?: string;
  };
  onClose: () => void;
}

interface EventStats {
  totalTickets: number;
  usedTickets: number;
  usageRate: number;
  sectorStats: Array<{
    sectorName: string;
    capacity: number;
    ticketsSold: number;
    ticketsUsed: number;
    usageRate: number;
    fillRate: number;
  }>;
}

interface EventScanAnalytics {
  totalScans: number;
  successfulScans: number;
  failedScans: number;
  successRate: number;
  hourlyData: Array<{
    hour: number;
    scans: number;
    successful: number;
    failed: number;
  }>;
  dailyData: Array<{
    date: string;
    scans: number;
    successful: number;
    failed: number;
  }>;
  sectorBreakdown: Array<{
    sectorName: string;
    scans: number;
    successRate: number;
  }>;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const [eventStats, setEventStats] = useState<EventStats | null>(null);
  const [scanAnalytics, setScanAnalytics] = useState<EventScanAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'scans' | 'sectors'>('overview');

  const API_BASE = 'http://localhost:8080/api';

  useEffect(() => {
    fetchEventData();
  }, [event.id]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch event stats and scan analytics
      const [statsRes, scanRes] = await Promise.all([
        fetch(`${API_BASE}/event/${event.id}/stats`),
        fetch(`${API_BASE}/event/${event.id}/scan-analytics`)
      ]);

      if (!statsRes.ok) {
        throw new Error('Failed to fetch event stats');
      }

      const stats = await statsRes.json();
      setEventStats(stats);

      if (scanRes.ok) {
        const scanData = await scanRes.json();
        setScanAnalytics(scanData);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch event data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="event-detail-overlay">
        <div className="event-detail-modal">
          <div className="loading-state">
            <Activity className="spin" size={32} />
            <p>Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  const sectorUsageData = eventStats?.sectorStats.map(sector => ({
    name: sector.sectorName,
    used: sector.ticketsUsed,
    unused: sector.ticketsSold - sector.ticketsUsed,
    capacity: sector.capacity,
  })) || [];

  const sectorFillData = eventStats?.sectorStats.map(sector => ({
    name: sector.sectorName,
    fillRate: sector.fillRate,
    usageRate: sector.usageRate,
  })) || [];

  const overallUsageData = eventStats ? [
    { name: 'Used', value: eventStats.usedTickets, color: '#10b981' },
    { name: 'Unused', value: eventStats.totalTickets - eventStats.usedTickets, color: '#e5e7eb' }
  ] : [];

  return (
    <div className="event-detail-overlay">
      <div className="event-detail-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2>{event.name}</h2>
            <p className="event-meta">
              <Calendar size={16} />
              Created: {new Date(event.created_at).toLocaleDateString()}
              {event.start_date && (
                <>
                  <span className="divider">•</span>
                  <Calendar size={16} />
                  Event: {new Date(event.start_date).toLocaleDateString()}
                </>
              )}
            </p>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Target size={16} />
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sectors' ? 'active' : ''}`}
            onClick={() => setActiveTab('sectors')}
          >
            <Users size={16} />
            Sectors
          </button>
          <button 
            className={`tab-btn ${activeTab === 'scans' ? 'active' : ''}`}
            onClick={() => setActiveTab('scans')}
          >
            <Zap size={16} />
            Scan Activity
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="overview-tab">
              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <Users />
                  </div>
                  <div className="stat-details">
                    <h3>{eventStats?.totalTickets || 0}</h3>
                    <p>Total Tickets</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Activity />
                  </div>
                  <div className="stat-details">
                    <h3>{eventStats?.usedTickets || 0}</h3>
                    <p>Tickets Used</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <TrendingUp />
                  </div>
                  <div className="stat-details">
                    <h3>{eventStats ? ((eventStats.usedTickets / eventStats.totalTickets) * 100).toFixed(1) : 0}%</h3>
                    <p>Usage Rate</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Zap />
                  </div>
                  <div className="stat-details">
                    <h3>{scanAnalytics?.totalScans || 0}</h3>
                    <p>Total Scans</p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="overview-charts">
                <div className="chart-container">
                  <h4>Ticket Usage</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={overallUsageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {overallUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <h4>Sector Performance</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={sectorFillData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="fillRate" fill="#3b82f6" name="Fill Rate %" />
                      <Bar dataKey="usageRate" fill="#10b981" name="Usage Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sectors' && (
            <div className="sectors-tab">
              <h4>Sector Details</h4>
              <div className="sectors-grid">
                {eventStats?.sectorStats.map((sector, index) => (
                  <div key={index} className="sector-card">
                    <div className="sector-header">
                      <h5>{sector.sectorName}</h5>
                      <div className="sector-metrics">
                        <span className={`metric ${sector.fillRate > 80 ? 'good' : sector.fillRate > 60 ? 'warning' : 'poor'}`}>
                          {sector.fillRate.toFixed(1)}% Full
                        </span>
                        <span className={`metric ${sector.usageRate > 70 ? 'good' : sector.usageRate > 50 ? 'warning' : 'poor'}`}>
                          {sector.usageRate.toFixed(1)}% Used
                        </span>
                      </div>
                    </div>
                    <div className="sector-stats">
                      <div className="stat-row">
                        <span>Capacity:</span>
                        <span>{sector.capacity}</span>
                      </div>
                      <div className="stat-row">
                        <span>Sold:</span>
                        <span>{sector.ticketsSold} / {sector.capacity}</span>
                      </div>
                      <div className="stat-row">
                        <span>Used:</span>
                        <span>{sector.ticketsUsed} / {sector.ticketsSold}</span>
                      </div>
                      <div className="stat-row">
                        <span>Available:</span>
                        <span>{sector.capacity - sector.ticketsSold}</span>
                      </div>
                    </div>
                    <div className="sector-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${sector.fillRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sector-chart">
                <h5>Sector Usage Comparison</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sectorUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="used" stackId="a" fill="#10b981" name="Used" />
                    <Bar dataKey="unused" stackId="a" fill="#6b7280" name="Unused" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'scans' && (
            <div className="scans-tab">
              <div className="scan-overview">
                <div className="scan-stats">
                  <div className="scan-stat">
                    <h4>{scanAnalytics?.totalScans || 0}</h4>
                    <p>Total Scans</p>
                  </div>
                  <div className="scan-stat">
                    <h4>{scanAnalytics?.successfulScans || 0}</h4>
                    <p>Successful</p>
                  </div>
                  <div className="scan-stat">
                    <h4>{scanAnalytics?.failedScans || 0}</h4>
                    <p>Failed</p>
                  </div>
                  <div className="scan-stat">
                    <h4>{scanAnalytics?.successRate.toFixed(1) || 0}%</h4>
                    <p>Success Rate</p>
                  </div>
                </div>
              </div>

              {(!scanAnalytics || scanAnalytics.totalScans === 0) && (
                <div className="no-data">
                  <Activity size={48} />
                  <h4>No scan data available</h4>
                  <p>Scan data will appear here once tickets start being verified.</p>
                </div>
              )}

              {scanAnalytics && scanAnalytics.totalScans > 0 && (
                <div className="scan-charts">
                  <div className="chart-container">
                    <h4>Hourly Scan Activity</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={scanAnalytics.hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="hour" 
                          tickFormatter={(hour) => `${hour}:00`}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [value, name === 'scans' ? 'Total Scans' : name]}
                          labelFormatter={(hour) => `Hour: ${hour}:00`}
                        />
                        <Bar dataKey="successful" stackId="a" fill="#10b981" name="Successful" />
                        <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {scanAnalytics.sectorBreakdown.length > 0 && (
                    <div className="chart-container">
                      <h4>Sector Scan Distribution</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={scanAnalytics.sectorBreakdown}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="sectorName" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="scans" fill="#8b5cf6" name="Total Scans" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal; 