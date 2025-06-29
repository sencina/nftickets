import React, { useState, useEffect } from 'react';
import { IssueTicketModal } from './IssueTicketModal';
import EventDetailModal from './EventDetailModal';
import TicketScanner from './TicketScanner';
import {
  AlertCircle, RefreshCw, Calendar,
  Eye, Ticket, ExternalLink, Target,
  Users, Activity, TrendingUp, BarChart2, PieChart as PieChartIcon,
  QrCode
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type { Event } from '../types';
import './Dashboard.css';

// Function to format hour in Argentina timezone (UTC-3)
const formatArgentinaHour = (hour: number) => {
  // Convert to Argentina time (UTC-3)
  const argentinaHour = (hour - 3 + 24) % 24;
  return `${argentinaHour.toString().padStart(2, '0')}:00`;
};

// Function to format date in Argentina timezone
const formatArgentinaDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

interface DashboardProps {
  apiKey: string;
  walletAddress: string;
}

type EventWithStats = Event;

interface DashboardAnalytics {
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
  peakHours: Array<{
    hour: number;
    scans: number;
    successRate: number;
  }>;
}

const getPerformanceBadgeClass = (successRate: number): string => {
  if (successRate > 70) return 'excellent';
  if (successRate > 40) return 'good';
  if (successRate > 20) return 'average';
  return 'poor';
};

const getPerformanceLabel = (successRate: number): string => {
  if (successRate > 70) return 'EXCELLENT';
  if (successRate > 40) return 'GOOD';
  if (successRate > 20) return 'AVERAGE';
  return 'LOW';
};

export const Dashboard: React.FC<DashboardProps> = ({ walletAddress, apiKey }) => {
  const [eventsWithStats, setEventsWithStats] = useState<EventWithStats[]>([]);
  const [dashboardAnalytics, setDashboardAnalytics] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventWithStats | null>(null);
  const [selectedEventForTicket, setSelectedEventForTicket] = useState<EventWithStats | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  const fetchData = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    setError(null);

    try {
      const [eventsResponse, analyticsResponse] = await Promise.all([
        fetch(`${API_BASE}/event/creator/${walletAddress}/events`),
        fetch(`${API_BASE}/event/creator/${walletAddress}/scan-analytics`)
      ]);

      if (!eventsResponse.ok || !analyticsResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const eventsData = await eventsResponse.json();
      const analyticsData = await analyticsResponse.json();
      setDashboardAnalytics(analyticsData);

      // Fetch stats for each event
      const eventsWithStatsPromises = eventsData.events.map(async (event: Event) => {
        try {
          const [statsRes, scanRes] = await Promise.all([
            fetch(`${API_BASE}/event/${event.id}/stats`),
            fetch(`${API_BASE}/event/${event.id}/scan-analytics`)
          ]);

          const stats = statsRes.ok ? await statsRes.json() : null;
          const scanAnalytics = scanRes.ok ? await scanRes.json() : null;

          return {
            ...event,
            stats: {
              totalTickets: stats?.totalTickets || 0,
              usedTickets: stats?.usedTickets || 0,
              successRate: scanAnalytics?.successRate || 0
            },
            sectors: event.sectors || []
          };
        } catch (error) {
          console.error(`Failed to fetch stats for event ${event.id}:`, error);
          return {
            ...event,
            stats: {
              totalTickets: 0,
              usedTickets: 0,
              successRate: 0
            },
            sectors: event.sectors || []
          };
        }
      });

      const resolvedEventsWithStats = await Promise.all(eventsWithStatsPromises);
      setEventsWithStats(resolvedEventsWithStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [walletAddress]);

  const handleRefresh = () => {
    fetchData();
  };

  // Calculate total stats
  const totalStats = eventsWithStats.reduce((acc, event) => {
    return {
      totalTickets: acc.totalTickets + (event.stats?.totalTickets || 0),
      usedTickets: acc.usedTickets + (event.stats?.usedTickets || 0),
      totalEvents: acc.totalEvents + 1
    };
  }, { totalTickets: 0, usedTickets: 0, totalEvents: 0 });

  const usageRate = totalStats.totalTickets > 0
    ? (totalStats.usedTickets / totalStats.totalTickets * 100).toFixed(1)
    : '0.0';

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
            onClick={() => setShowScanner(!showScanner)} 
            className="scan-btn"
          >
            <QrCode size={20} />
            {showScanner ? 'Hide Scanner' : 'Scan Ticket'}
          </button>
          <button 
            onClick={handleRefresh} 
            className="refresh-btn"
          >
            <RefreshCw size={20} />
            Refresh
          </button>
        </div>
      </div>

      {/* Scanner Section */}
      {showScanner && (
        <div className="scanner-section">
          <TicketScanner apiKey={apiKey} walletAddress={walletAddress} />
        </div>
      )}

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <Ticket size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalStats.totalTickets}</h3>
            <p>Total Tickets</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalStats.usedTickets}</h3>
            <p>Tickets Used</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalStats.totalEvents}</h3>
            <p>Total Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>{usageRate}%</h3>
            <p>Usage Rate</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      {dashboardAnalytics && (
        <div className="charts-grid">
          {/* Daily Activity Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>
                <TrendingUp size={20} />
                Daily Activity
              </h3>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardAnalytics.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94A3B8"
                    tick={{ fill: '#94A3B8' }}
                    tickFormatter={formatArgentinaDate}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    tick={{ fill: '#94A3B8' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    labelFormatter={formatArgentinaDate}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="successful" stroke="#10b981" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="failed" stroke="#ef4444" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scan Distribution Pie Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>
                <PieChartIcon size={20} />
                Scan Distribution
              </h3>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Successful', value: dashboardAnalytics.successfulScans },
                      { name: 'Failed', value: dashboardAnalytics.failedScans }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Hours Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>
                <BarChart2 size={20} />
                Peak Hours (ART)
              </h3>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardAnalytics.hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#94A3B8"
                    tick={{ fill: '#94A3B8' }}
                    tickFormatter={formatArgentinaHour}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    tick={{ fill: '#94A3B8' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    labelFormatter={(hour) => `Hora: ${formatArgentinaHour(hour)}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="scans" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Events Section */}
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
            <div>EVENT</div>
            <div>TICKETS</div>
            <div>USAGE</div>
            <div>SCANS</div>
            <div>PERFORMANCE</div>
            <div>ACTIONS</div>
          </div>

          {eventsWithStats.length > 0 ? (
            eventsWithStats.map((event) => (
              <div key={event.id} className="table-row-enhanced">
                <div className="event-info">
                  <h4>{event.name}</h4>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <span className="meta-item">
                      <Calendar size={14} />
                      {formatArgentinaDate(event.created_at)}
                    </span>
                  </div>
                </div>

                <div className="stat-group" data-label="TICKETS">
                  <div className="stat-value">{event.stats?.totalTickets || 0}</div>
                  <div className="stat-label">TOTAL</div>
                  <div className="stat-subvalue">{event.stats?.usedTickets || 0} scanned</div>
                </div>

                <div className="usage-indicator" data-label="USAGE">
                  <div className="usage-bar">
                    <div 
                      className="usage-fill" 
                      style={{ 
                        width: `${event.stats?.totalTickets ? (event.stats.usedTickets / event.stats.totalTickets * 100) : 0}%` 
                      }}
                    />
                  </div>
                  <span className="usage-percentage">
                    {event.stats?.totalTickets ? ((event.stats.usedTickets / event.stats.totalTickets * 100) || 0).toFixed(1) : '0.0'}%
                  </span>
                </div>

                <div className="stat-group" data-label="SCANS">
                  <div className="stat-value">{event.stats?.usedTickets || 0}</div>
                  <div className="stat-label">TOTAL</div>
                  <div className="stat-subvalue">{event.stats?.successRate?.toFixed(1) || '0.0'}% success</div>
                </div>

                <div className="performance-indicators" data-label="PERFORMANCE">
                  <div className={`performance-badge ${getPerformanceBadgeClass(event.stats?.successRate || 0)}`}>
                    {event.stats?.successRate === 0 ? 'LOW' : getPerformanceLabel(event.stats?.successRate || 0)}
                  </div>
                  {event.stats?.usedTickets === 0 && (
                    <div className="warning-indicator">
                      <AlertCircle size={14} />
                      No scans yet
                    </div>
                  )}
                </div>

                <div className="col-actions">
                  <button className="btn-view-details" onClick={() => setSelectedEvent(event)}>
                    <Eye size={16} /> View Details
                  </button>
                  <button className="btn-issue-ticket" onClick={() => setSelectedEventForTicket(event)}>
                    <Ticket size={16} /> Issue Ticket
                  </button>
                  <button className="btn-contract" onClick={() => window.open(`https://amoy.polygonscan.com/address/${event.address}`, '_blank')}>
                    <ExternalLink size={16} /> Contract
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Target size={48} />
              <h4>No Events Found</h4>
              <p>You haven't created any events yet. Start by creating your first event!</p>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {selectedEventForTicket && (
        <IssueTicketModal
          event={selectedEventForTicket}
          onClose={() => setSelectedEventForTicket(null)}
          apiKey={apiKey}
        />
      )}
    </div>
  );
};

export default Dashboard; 