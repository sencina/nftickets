import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Activity, Calendar, TrendingUp, Users, Scan, Clock, 
  BarChart3, PieChart as PieChartIcon, RefreshCw, 
  Eye, Target, AlertCircle, ExternalLink, Ticket
} from 'lucide-react';
import EventDetailModal from './EventDetailModal';
import IssueTicketModal from './IssueTicketModal';
import TicketScanner from './TicketScanner';
import './Dashboard.css';

interface DashboardProps {
  apiKey?: string; // Optional since stats are public
  walletAddress: string;
}

interface CreatorStats {
  totalEvents: number;
  totalSectors: number;
  totalTickets: number;
  usedTickets: number;
  usageRate: number;
}

interface Event {
  id: string;
  name: string;
  description: string;
  created_at: string;
  creator_wallet_address: string;
  start_date?: string;
  end_date?: string;
  address?: string;
  metadata_hash?: string;
}

interface EventWithStats extends Event {
  totalTickets?: number;
  usedTickets?: number;
  usageRate?: number;
  totalScans?: number;
  successRate?: number;
}

interface ScanAnalytics {
  totalScans: number;
  successfulScans: number;
  failedScans: number;
  successRate: number;
  eventBreakdown: Array<{
    eventId: string;
    eventName: string;
    scans: number;
    successRate: number;
  }>;
  peakHours: Array<{
    hour: number;
    scans: number;
  }>;
}

interface PeakTimesData {
  peakHours: Array<{
    hour: number;
    scans: number;
  }>;
  totalScans: number;
  successRate: number;
  timeRange: {
    startDate: string;
    endDate: string;
    days: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ apiKey, walletAddress }) => {
  const [creatorStats, setCreatorStats] = useState<CreatorStats | null>(null);
  const [myEvents, setMyEvents] = useState<{ events: Event[]; total: number } | null>(null);
  const [scanAnalytics, setScanAnalytics] = useState<ScanAnalytics | null>(null);
  const [peakTimes, setPeakTimes] = useState<PeakTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventForTicket, setSelectedEventForTicket] = useState<Event | null>(null);
  const [eventsWithStats, setEventsWithStats] = useState<EventWithStats[]>([]);
  const scannerRef = useRef<HTMLDivElement>(null);

  const API_BASE = 'http://localhost:8080/api'; // Adjust based on your backend URL

  const fetchData = async () => {
    try {
      // Fetch all dashboard data in parallel
      const [eventsRes, scanRes] = await Promise.all([
        fetch(`${API_BASE}/event/creator/${walletAddress}/events?page=1&limit=10`),
        fetch(`${API_BASE}/event/creator/${walletAddress}/scan-analytics`)
      ]);

      if (!eventsRes.ok || !scanRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [events, scan] = await Promise.all([
        eventsRes.json(),
        scanRes.json()
      ]);

      setMyEvents(events);
      setScanAnalytics(scan);

      // Enhance events with stats from scan analytics
      const enhancedEvents: EventWithStats[] = await Promise.all(events.events.map(async (event: Event) => {
        const eventScanData = scan.eventBreakdown?.find((e: any) => e.eventId === event.id);
        // Fetch real event stats
        const statsRes = await fetch(`${API_BASE}/event/${event.id}/stats`);
        const eventStats = await statsRes.json();
        
        return {
          ...event,
          totalScans: eventScanData?.scans || 0,
          successRate: eventScanData?.successRate || 0,
          totalTickets: eventStats.totalTickets || 0,
          usedTickets: eventStats.usedTickets || 0,
          usageRate: eventStats.usageRate || 0
        };
      }));
      setEventsWithStats(enhancedEvents);

      // Calculate creator stats from event stats
      const totalStats = enhancedEvents.reduce((acc, event) => ({
        totalEvents: acc.totalEvents + 1,
        totalTickets: acc.totalTickets + (event.totalTickets || 0),
        usedTickets: acc.usedTickets + (event.usedTickets || 0),
      }), {
        totalEvents: 0,
        totalTickets: 0,
        usedTickets: 0,
      });

      setCreatorStats({
        ...totalStats,
        totalSectors: events.events.reduce((acc: number, event: any) => acc + (event.sectors?.length || 0), 0),
        usageRate: totalStats.totalTickets > 0 ? (totalStats.usedTickets / totalStats.totalTickets) * 100 : 0,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setRefreshing(false);
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
    { name: 'Used Tickets', value: creatorStats.usedTickets, color: '#10b981' },
    { name: 'Unused Tickets', value: creatorStats.totalTickets - creatorStats.usedTickets, color: '#e5e7eb' }
  ] : [];

  const scanSuccessData = scanAnalytics ? [
    { name: 'Successful', value: scanAnalytics.successfulScans, color: '#10b981' },
    { name: 'Failed', value: scanAnalytics.failedScans, color: '#ef4444' }
  ] : [];

  const peakHoursData = peakTimes ? peakTimes.peakHours.map(item => ({
    hour: `${item.hour}:00`,
    scans: item.scans
  })) : [];

  const eventPerformanceData = scanAnalytics ? scanAnalytics.eventBreakdown.map(event => ({
    name: event.eventName.substring(0, 15) + (event.eventName.length > 15 ? '...' : ''),
    scans: event.scans,
    successRate: event.successRate
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
            <h3>{creatorStats?.totalTickets || 0}</h3>
            <p>Tickets Issued</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity />
          </div>
          <div className="stat-content">
            <h3>{creatorStats?.usageRate.toFixed(1) || 0}%</h3>
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
      <div className="scanner-section" ref={scannerRef}>
        <div className="section-header">
          <h3><Scan size={24} /> Ticket Scanner</h3>
          <p className="section-subtitle">Scan and verify tickets for your events</p>
        </div>
        <TicketScanner apiKey={apiKey || ''} walletAddress={walletAddress} />
      </div>

      {/* Enhanced Events Table */}
      <div className="events-section">
        <div className="section-header">
          <h3>My Events</h3>
          <p className="section-subtitle">Detailed analytics for all your events</p>
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
                  <div className="stat-value">{event.totalTickets || 0}</div>
                  <div className="stat-label">Total</div>
                  <div className="stat-subvalue">{event.usedTickets || 0} used</div>
                </div>
              </div>
              
              <div className="col-usage">
                <div className="usage-indicator">
                  <div className="usage-bar">
                    <div 
                      className="usage-fill" 
                      style={{ width: `${event.usageRate || 0}%` }}
                    ></div>
                  </div>
                  <span className="usage-percentage">
                    {(event.usageRate || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="col-scans">
                <div className="stat-group">
                  <div className="stat-value">{event.totalScans || 0}</div>
                  <div className="stat-label">Total</div>
                  <div className="stat-subvalue">
                    {(event.successRate || 0).toFixed(1)}% success
                  </div>
                </div>
              </div>
              
              <div className="col-performance">
                <div className="performance-indicators">
                  <div 
                    className={`performance-badge ${
                      (event.usageRate || 0) > 70 ? 'excellent' : 
                      (event.usageRate || 0) > 40 ? 'good' : 
                      (event.usageRate || 0) > 20 ? 'average' : 'poor'
                    }`}
                  >
                    {(event.usageRate || 0) > 70 ? 'Excellent' : 
                     (event.usageRate || 0) > 40 ? 'Good' : 
                     (event.usageRate || 0) > 20 ? 'Average' : 'Low'}
                  </div>
                  {(event.totalScans || 0) === 0 && (
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
      </div>

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
          apiKey={apiKey || ''}
        />
      )}
    </div>
  );
};

export default Dashboard; 