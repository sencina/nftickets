import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { IssueTicketModal } from './IssueTicketModal';
import EventDetailModal from './EventDetailModal';
import TicketScanner from './TicketScanner';
import {
  AlertCircle, RefreshCw, Scan, Calendar, Users,
  Activity, Clock, PieChart as PieChartIcon, TrendingUp,
  BarChart as BarChart3, Eye, Ticket, ExternalLink, Target, Maximize2
} from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  walletAddress: string;
  apiKey: string;
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
  stats?: {
    totalTickets: number;
    ticketsScanned: number;
    successRate: number;
  };
}

interface Sector {
  id: string;
  name: string;
  capacity: number;
  description?: string;
}

interface EventWithStats extends Event {
  stats: {
    totalTickets: number;
    ticketsScanned: number;
    successRate: number;
  };
}

interface CreatorStats {
  totalEvents: number;
  totalTicketsIssued: number;
  totalTicketsScanned: number;
  averageSuccessRate: number;
}

interface ScanAnalytics {
  totalScans: number;
  successRate: number;
  peakHours: {
    hour: number;
    scans: number;
  }[];
}

export const Dashboard: React.FC<DashboardProps> = ({ walletAddress, apiKey }) => {
  const [scanAnalytics, setScanAnalytics] = useState<ScanAnalytics | null>(null);
  const [creatorStats, setCreatorStats] = useState<CreatorStats | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventForTicket, setSelectedEventForTicket] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [eventsWithStats, setEventsWithStats] = useState<EventWithStats[]>([]);
  const scannerRef = useRef<HTMLDivElement>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [eventsRes, scanRes] = await Promise.all([
        fetch(`${API_BASE}/event/creator/${walletAddress}/events`),
        fetch(`${API_BASE}/event/creator/${walletAddress}/scan-analytics`)
      ]);

      if (!eventsRes.ok || !scanRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [events, scan] = await Promise.all([
        eventsRes.json(),
        scanRes.json()
      ]);

      setEventsWithStats(events.events);
      setScanAnalytics(scan);

      const totalStats = events.events.reduce((acc: CreatorStats, event: Event) => ({
        totalEvents: acc.totalEvents + 1,
        totalTicketsIssued: acc.totalTicketsIssued + (event.stats?.totalTickets || 0),
        totalTicketsScanned: acc.totalTicketsScanned + (event.stats?.ticketsScanned || 0),
        averageSuccessRate: 0
      }), {
        totalEvents: 0,
        totalTicketsIssued: 0,
        totalTicketsScanned: 0,
        averageSuccessRate: 0
      });

      totalStats.averageSuccessRate = totalStats.totalTicketsScanned > 0 
        ? (totalStats.totalTicketsScanned / totalStats.totalTicketsIssued) * 100 
        : 0;

      setCreatorStats(totalStats);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [walletAddress]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleIssueTicket = async (event: Event) => {
    try {
      // Fetch complete event data with sectors
      const response = await fetch(`${API_BASE}/event/${event.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      const eventData = await response.json();
      setSelectedEventForTicket(eventData);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const scrollToScanner = () => {
    scannerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <RefreshCw className="spin" size={32} />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={handleRefresh}>Retry</button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const usageData = creatorStats ? [
    { name: 'Used Tickets', value: creatorStats.totalTicketsScanned, color: '#10b981' },
    { name: 'Unused Tickets', value: creatorStats.totalTicketsIssued - creatorStats.totalTicketsScanned, color: '#e5e7eb' }
  ] : [];

  const scanSuccessData = scanAnalytics ? [
    { name: 'Successful', value: scanAnalytics.totalScans - scanAnalytics.successRate, color: '#10b981' },
    { name: 'Failed', value: scanAnalytics.successRate, color: '#ef4444' }
  ] : [];

  const eventPerformanceData = scanAnalytics ? scanAnalytics.peakHours.map(item => ({
    name: `${item.hour}:00`,
    scans: item.scans
  })) : [];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>NFTickets Dashboard</h1>
          <p className="wallet-info">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>
        <div className="header-actions">
          <button 
            onClick={scrollToScanner} 
            className="scan-tickets-btn"
          >
            <Scan size={20} />
            Scan Tickets
          </button>
          <button 
            onClick={handleRefresh} 
            className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
            disabled={refreshing}
          >
            <RefreshCw className={refreshing ? 'spin' : ''} size={20} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3>{creatorStats?.totalEvents || 0}</h3>
            <p>Total Events</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <h3>{creatorStats?.totalTicketsIssued || 0}</h3>
            <p>Tickets Issued</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity />
          </div>
          <div className="stat-content">
            <h3>{creatorStats?.averageSuccessRate.toFixed(1) || 0}%</h3>
            <p>Usage Rate</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Scan />
          </div>
          <div className="stat-content">
            <h3>{scanAnalytics?.totalScans || 0}</h3>
            <p>Total Scans</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Peak Scan Times */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><Clock size={20} /> Peak Scan Times</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scanAnalytics?.peakHours.map(item => ({
                hour: `${item.hour}:00`,
                scans: item.scans
              })) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [value, 'Scans']}
                  labelFormatter={(hour) => `Hour: ${hour}`}
                />
                <Bar dataKey="scans" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage Rate Pie Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><PieChartIcon size={20} /> Ticket Usage</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scan Success Rate */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><TrendingUp size={20} /> Scan Success Rate</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scanSuccessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {scanSuccessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event Performance */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><BarChart3 size={20} /> Event Scan Activity</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scans" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ticket Scanner Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Maximize2 size={24} />
            Ticket Scanner
          </h2>
          <span className="section-description">Scan and verify tickets for your events</span>
        </div>
        <TicketScanner apiKey={apiKey} walletAddress={walletAddress} />
      </section>

      {/* Enhanced Events Table */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Calendar size={24} />
            My Events
          </h2>
          <span className="section-description">Detailed analytics for all your events</span>
        </div>
        
        <div className="events-table-enhanced">
          <div className="table-header">
            <div className="col-name">Event</div>
            <div className="col-tickets">Tickets</div>
            <div className="col-usage">Usage</div>
            <div className="col-scans">Scans</div>
            <div className="col-performance">Performance</div>
            <div className="col-actions">Actions</div>
          </div>
          
          {eventsWithStats.map((event) => (
            <div key={event.id} className="table-row-enhanced">
              <div className="col-name">
                <div className="event-info">
                  <h4>{event.name}</h4>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <span className="meta-item">
                      <Calendar size={14} />
                      {new Date(event.created_at).toLocaleDateString()}
                    </span>
                    {event.start_date && (
                      <span className="meta-item">
                        <Clock size={14} />
                        {new Date(event.start_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="col-tickets">
                <div className="stat-group">
                  <div className="stat-value">{event.stats?.totalTickets || 0}</div>
                  <div className="stat-label">Total</div>
                  <div className="stat-subvalue">{event.stats?.ticketsScanned || 0} scanned</div>
                </div>
              </div>
              
              <div className="col-usage">
                <div className="usage-indicator">
                  <div className="usage-bar">
                    <div 
                      className="usage-fill" 
                      style={{ width: `${event.stats?.successRate || 0}%` }}
                    ></div>
                  </div>
                  <span className="usage-percentage">
                    {(event.stats?.successRate || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="col-scans">
                <div className="stat-group">
                  <div className="stat-value">{event.stats?.ticketsScanned || 0}</div>
                  <div className="stat-label">Total</div>
                  <div className="stat-subvalue">
                    {(event.stats?.successRate || 0).toFixed(1)}% success
                  </div>
                </div>
              </div>
              
              <div className="col-performance">
                <div className="performance-indicators">
                  <div 
                    className={`performance-badge ${
                      (event.stats?.successRate || 0) > 70 ? 'excellent' : 
                      (event.stats?.successRate || 0) > 40 ? 'good' : 
                      (event.stats?.successRate || 0) > 20 ? 'average' : 'poor'
                    }`}
                  >
                    {(event.stats?.successRate || 0) > 70 ? 'Excellent' : 
                     (event.stats?.successRate || 0) > 40 ? 'Good' : 
                     (event.stats?.successRate || 0) > 20 ? 'Average' : 'Low'}
                  </div>
                  {(event.stats?.ticketsScanned || 0) === 0 && (
                    <div className="warning-indicator">
                      <AlertCircle size={14} />
                      <span>No scans yet</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-actions">
                <button 
                  className="btn-view-details"
                  onClick={() => setSelectedEvent(event)}
                >
                  <Eye size={16} />
                  View Details
                </button>
                <button 
                  className="btn-issue-ticket"
                  onClick={() => handleIssueTicket(event)}
                >
                  <Ticket size={16} />
                  Issue Ticket
                </button>
                {event.address && (
                  <button 
                    className="btn-contract"
                    onClick={() => window.open(`https://etherscan.io/address/${event.address}`, '_blank')}
                  >
                    <ExternalLink size={16} />
                    Contract
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {eventsWithStats.length === 0 && (
          <div className="empty-state">
            <Target size={48} />
            <h4>No events created yet</h4>
            <p>Create your first event to start tracking analytics and managing tickets.</p>
          </div>
        )}
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* Issue Ticket Modal */}
      {selectedEventForTicket && (
        <IssueTicketModal
          event={selectedEventForTicket}
          onClose={() => setSelectedEventForTicket(null)}
          onSuccess={() => {
            setSelectedEventForTicket(null);
            fetchData();
          }}
          apiKey={apiKey}
        />
      )}
    </div>
  );
};

export default Dashboard; 