import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTier } from '../hooks/useTier';
import Gate from '../components/Gate';
import Toast from '../components/Toast';

import { vehicles } from '../data/mock/vehicles';
import { drivers } from '../data/mock/drivers';
import { alerts } from '../data/mock/alerts';
import { maintenance } from '../data/mock/maintenance';

import './Dashboard.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout, toggleDarkMode, darkMode } = useApp();
  const { currentTier } = useTier();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    // Redirect to Landing Page as requested
    navigate('/');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '🏠', color: '#ffffff' },
    { id: 'vehicles', label: 'Vehicle Management', icon: '🚘', color: '#e53e3e' },
    { id: 'drivers', label: 'Driver Management', icon: '👤', color: '#3182ce' },
    { id: 'maintenance', label: 'Maintenance Schedule', icon: '🛠️', color: '#dd6b20' },
    { id: 'tracking', label: 'Real-Time Tracking', icon: '📍', color: '#e53e3e' },
    { id: 'reports', label: 'Reports & Analytics', icon: '📊', color: '#38a169' },
    { id: 'settings', label: 'Settings & Account', icon: '⚙️', color: '#cbd5e0' },
    { id: 'logout', label: 'Logout', icon: '🔒', color: '#d69e2e' }
  ];

  const handleNavClick = (id) => {
    if (id === 'logout') {
      setShowLogoutModal(true);
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="dashboard-grid-layout">
      <Toast />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div
              style={{
                fontSize: '2rem',
                marginBottom: '12px',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-alternate)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              🔒
            </div>
            <h3 style={{ margin: '0 0 8px' }}>Log Out Confirmation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Are you sure you want to log out of your Trackin.ID session? You will be redirected to the landing page.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-outline"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: '#e53e3e', borderColor: '#e53e3e' }}
                onClick={handleConfirmLogout}
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <span>Trackin.ID</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '4px' }}>
              Tier: <strong style={{ color: '#ffffff' }}>{currentTier.name}</strong>
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="nav-icon" style={{ color: isActive ? '#ffffff' : item.color }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-mini-card">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="dashboard-main">
        {/* Topbar */}
        <div className="dashboard-topbar">
          <div className="dashboard-title-group">
            <h1>
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard Overview'}
            </h1>
            <p>Real-time vehicle telemetry & fleet operation management</p>
          </div>

          <div className="dashboard-actions">
            <button
              onClick={toggleDarkMode}
              className="btn btn-outline"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              onClick={() => navigate('/plans')}
              className="btn btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              Manage Plan
            </button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-card-title">Vehicles Active</div>
                <div className="metric-card-value">{vehicles.length}</div>
                <span style={{ fontSize: '0.8rem', color: '#38a169' }}>3 moving • 2 idle</span>
              </div>
              <div className="metric-card">
                <div className="metric-card-title">Active Drivers</div>
                <div className="metric-card-value">{drivers.length}</div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>All drivers assigned</span>
              </div>
              <div className="metric-card">
                <div className="metric-card-title">Alerts Today</div>
                <div className="metric-card-value">{alerts.length}</div>
                <span style={{ fontSize: '0.8rem', color: '#e53e3e' }}>2 unread security alerts</span>
              </div>
              <div className="metric-card">
                <div className="metric-card-title">Maintenance Due</div>
                <div className="metric-card-value">{maintenance.filter((m) => m.status !== 'Completed').length}</div>
                <span style={{ fontSize: '0.8rem', color: '#dd6b20' }}>1 overdue service</span>
              </div>
            </div>

            <div className="grid grid-cols-2" style={{ marginBottom: '32px' }}>
              {/* Recent Alerts Feed */}
              <div className="card">
                <h4 style={{ marginBottom: '16px' }}>Recent Security & Maintenance Alerts</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {alerts.map((alt) => (
                    <div
                      key={alt.id}
                      style={{
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-alternate)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{alt.message}</div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{alt.timestamp}</span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: alt.type === 'security' ? '#FED7D7' : '#FEEBC8',
                          color: alt.type === 'security' ? '#9B2C2C' : '#9C4221',
                          fontWeight: 600
                        }}
                      >
                        {alt.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Vehicle Status Overview */}
              <div className="card">
                <h4 style={{ marginBottom: '16px' }}>Vehicle Fleet Snapshot</h4>
                <div className="table-responsive">
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                        <th style={{ padding: '8px' }}>Plate</th>
                        <th style={{ padding: '8px' }}>Location</th>
                        <th style={{ padding: '8px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.slice(0, 4).map((v) => (
                        <tr key={v.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '10px 8px', fontWeight: 600 }}>{v.plate}</td>
                          <td style={{ padding: '10px 8px' }}>{v.location}</td>
                          <td style={{ padding: '10px 8px' }}>
                            <span
                              style={{
                                fontSize: '0.8rem',
                                color: v.status === 'Shipping' ? '#38a169' : '#dd6b20'
                              }}
                            >
                              ● {v.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vehicle Management */}
        {activeTab === 'vehicles' && (
          <div className="card">
            <h3 style={{ marginBottom: '20px' }}>Fleet Vehicles ({vehicles.length})</h3>
            <div className="table-responsive">
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '12px' }}>Plate Number</th>
                    <th style={{ padding: '12px' }}>Vehicle Name</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Current Location</th>
                    <th style={{ padding: '12px' }}>Fuel Level</th>
                    <th style={{ padding: '12px' }}>Assigned Driver</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v) => (
                    <tr key={v.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--accent)' }}>{v.plate}</td>
                      <td style={{ padding: '12px' }}>{v.name}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            backgroundColor: v.status === 'Shipping' ? '#C6F6D5' : '#EDF2F7',
                            color: v.status === 'Shipping' ? '#22543D' : '#4A5568'
                          }}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>{v.location}</td>
                      <td style={{ padding: '12px' }}>{v.fuelLevel}%</td>
                      <td style={{ padding: '12px' }}>{v.driver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Driver Management */}
        {activeTab === 'drivers' && (
          <Gate feature="driverBehavior">
            <div className="card">
              <h3 style={{ marginBottom: '20px' }}>Assigned Fleet Drivers</h3>
              <div className="grid grid-cols-2">
                {drivers.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={d.avatar}
                      alt={d.name}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ margin: '0 0 4px' }}>{d.name}</h4>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{d.email}</div>
                      <div style={{ fontSize: '0.85rem', marginTop: '6px', color: 'var(--accent)' }}>
                        Status: <strong>{d.status}</strong> ({d.lastTrip})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Gate>
        )}

        {/* Tab 4: Maintenance Schedule */}
        {activeTab === 'maintenance' && (
          <div className="card">
            <h3 style={{ marginBottom: '20px' }}>Maintenance & Service Schedule</h3>
            <div className="table-responsive">
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '12px' }}>Plate</th>
                    <th style={{ padding: '12px' }}>Service Task</th>
                    <th style={{ padding: '12px' }}>Due Date</th>
                    <th style={{ padding: '12px' }}>Est. Cost</th>
                    <th style={{ padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenance.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{m.plate}</td>
                      <td style={{ padding: '12px' }}>{m.task}</td>
                      <td style={{ padding: '12px' }}>{m.date}</td>
                      <td style={{ padding: '12px' }}>{m.cost}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            backgroundColor:
                              m.status === 'Completed' ? '#C6F6D5' : m.status === 'Overdue' ? '#FED7D7' : '#FEEBC8',
                            color:
                              m.status === 'Completed' ? '#22543D' : m.status === 'Overdue' ? '#9B2C2C' : '#9C4221'
                          }}
                        >
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Real-Time Tracking */}
        {activeTab === 'tracking' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ margin: 0 }}>Real-Time Live Vehicle Map</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Simulated per-second telemetry feed across Bandung & Jakarta hubs.
              </p>
            </div>
            <div
              style={{
                width: '100%',
                height: '420px',
                backgroundColor: 'var(--bg-alternate)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                alt="Live Telematics Map"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: 'var(--surface)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>📍 Vehicle BYD-typeshi</div>
                <div style={{ fontSize: '0.8rem', color: '#38a169' }}>Speed: 0 km/h (Idle at Bandung Hub)</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Reports & Analytics */}
        {activeTab === 'reports' && (
          <Gate feature="reports">
            <div className="card">
              <h3 style={{ marginBottom: '16px' }}>Fleet Analytics & Reports</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Operational efficiency and fuel consumption trend analysis.
              </p>

              <div
                style={{
                  height: '240px',
                  backgroundColor: 'var(--bg-alternate)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)',
                  marginBottom: '24px'
                }}
              >
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                  [ Interactive Chart: Fuel vs Route Efficiency ]
                </span>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-alternate)',
                  border: '1px solid var(--border)'
                }}
              >
                <h4 style={{ margin: '0 0 8px' }}>🤖 AI Operational Insight Summary</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Fleet efficiency improved <strong>4.2%</strong> this month following optimized route deployments between
                  Jakarta and Bandung. Vehicle <strong>B 8899 FLT</strong> shows elevated brake wear patterns — recommend
                  servicing within 7 days.
                </p>
              </div>
            </div>
          </Gate>
        )}

        {/* Tab 7: Settings & Account */}
        {activeTab === 'settings' && (
          <div className="card" style={{ maxWidth: '640px' }}>
            <h3 style={{ marginBottom: '24px' }}>Settings & Account Profile</h3>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Account Name</label>
              <input type="text" className="form-input" defaultValue={user.name} readOnly />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Email Address</label>
              <input type="email" className="form-input" defaultValue={user.email} readOnly />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label>API Integration Key</label>
              <input type="text" className="form-input" defaultValue="trk_live_9988234187623a" readOnly />
            </div>
            <button onClick={() => setShowLogoutModal(true)} className="btn btn-outline" style={{ color: '#e53e3e', borderColor: '#e53e3e' }}>
              Log Out of Account
            </button>
          </div>
        )}
      </main>
    </div>
  );
}