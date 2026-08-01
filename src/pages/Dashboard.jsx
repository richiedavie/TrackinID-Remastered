import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Gate from '../components/Gate';
import ProtectedRoute from '../components/ProtectedRoute';
import { TIERS } from '../config/tiers';
import './Dashboard.css';

export default function Dashboard() {
  const { user, subscriptionTier, vehicles, alerts, maintenance, team, triggerDemoAlert, logout } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const tier = subscriptionTier ? TIERS[subscriptionTier] : null;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'vehicles', label: 'Vehicle Management', icon: 'car' },
    { id: 'drivers', label: 'Driver Management', icon: 'user' },
    { id: 'maintenance', label: 'Maintenance Schedule', icon: 'wrench' },
    { id: 'tracking', label: 'Real-Time Tracking', icon: 'map-pin' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'bar-chart' },
    { id: 'settings', label: 'Settings & Account', icon: 'gear' },
    { id: 'logout', label: 'Logout', icon: 'lock' },
  ];

  const handleLogout = () => {
    logout();
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
      case 'car':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="21" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="12" x2="23" y2="12"></line>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        );
      case 'user':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      case 'wrench':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        );
      case 'map-pin':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'bar-chart':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        );
      case 'gear':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      case 'lock':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <h1>Dashboard Overview</h1>
            <div className="overview-cards">
              <div className="overview-card">
                <h3>Current Plan</h3>
                <p className="plan-name">{tier?.name || 'No plan'}</p>
                <p className="plan-detail">
                  {subscriptionTier ? 'Active' : 'No active plan'}
                </p>
                <Link to="/billing" className="btn btn-outline btn-sm">
                  Manage Plan
                </Link>
              </div>
              <div className="overview-card">
                <h3>Vehicles</h3>
                <p className="stat-number">{vehicles.length}</p>
                <p className="stat-detail">
                  Max: {tier?.maxVehicles === Infinity ? 'Unlimited' : tier?.maxVehicles || 0}
                </p>
              </div>
              <div className="overview-card">
                <h3>Active Alerts</h3>
                <p className="stat-number">{alerts.filter((a) => !a.isRead).length}</p>
                <p className="stat-detail">Unread alerts</p>
              </div>
              <div className="overview-card">
                <h3>Team Members</h3>
                <p className="stat-number">{team.length}</p>
                <p className="stat-detail">Active users</p>
              </div>
            </div>

            <Gate feature="driverBehavior">
              <div className="dashboard-section">
                <h2>Driver Behavior Analytics</h2>
                <p>This feature is available on your current plan.</p>
              </div>
            </Gate>

            <Gate feature="aiPredictiveMaintenance">
              <div className="dashboard-section">
                <h2>AI Predictive Maintenance</h2>
                <p>AI-powered maintenance predictions are available on your plan.</p>
              </div>
            </Gate>

            <Gate feature="videoTelematics">
              <div className="dashboard-section">
                <h2>Video Telematics</h2>
                <p>Live video feeds and telematics are available on your plan.</p>
              </div>
            </Gate>
          </div>
        );

      case 'vehicles':
        return (
          <div className="dashboard-section">
            <h1>Vehicle Management</h1>
            <div className="vehicle-list">
              {vehicles.map((v) => (
                <div key={v.id} className="card vehicle-card">
                  <div className="vehicle-card-header">
                    <h3>{v.name}</h3>
                    <span className={`status-badge ${v.status}`}>{v.status}</span>
                  </div>
                  <div className="vehicle-card-details">
                    <p>Plate: {v.plate}</p>
                    <p>Location: {v.location?.address || `${v.location.lat.toFixed(4)}, ${v.location.lng.toFixed(4)}`}</p>
                    <p>Speed: {v.speed} km/h | Fuel: {v.fuel}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'drivers':
        return (
          <div className="dashboard-section">
            <h1>Driver Management</h1>
            <div className="driver-list">
              {team.map((d) => (
                <div key={d.id} className="card driver-card">
                  <div className="driver-card-header">
                    <div className="driver-avatar">{d.name.charAt(0)}</div>
                    <div>
                      <strong>{d.name}</strong>
                      <span className="driver-role">{d.role}</span>
                    </div>
                  </div>
                  <p className="driver-email">{d.email}</p>
                  <span className={`status-badge ${d.status === 'Active' ? 'online' : 'offline'}`}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="dashboard-section">
            <h1>Maintenance Schedule</h1>
            <div className="maintenance-list">
              {maintenance.map((m) => (
                <div key={m.id} className="card maintenance-card">
                  <div className="maintenance-card-header">
                    <strong>{m.serviceType}</strong>
                    <span className={`severity-badge ${m.status}`}>{m.status}</span>
                  </div>
                  <p>Vehicle: {m.vehicle}</p>
                  <p>Due: {m.dueDate} | Est. Cost: {m.estimatedCost}</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${m.progressPct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tracking':
        return (
          <div className="dashboard-section">
            <h1>Real-Time Tracking</h1>
            <p>Live vehicle tracking is available on your current plan.</p>
            <div className="vehicle-list">
              {vehicles.filter((v) => v.status === 'online').map((v) => (
                <div key={v.id} className="card vehicle-card">
                  <div className="vehicle-card-header">
                    <h3>{v.name}</h3>
                    <span className="status-badge online">Tracking</span>
                  </div>
                  <p>Speed: {v.speed} km/h | Fuel: {v.fuel}%</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="dashboard-section">
            <h1>Reports & Analytics</h1>
            <p>Detailed analytics and reports are available on your plan.</p>
            <div className="card">
              <p>Generate fleet reports, cost analysis, and driver performance summaries.</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="dashboard-section">
            <h1>Settings & Account</h1>
            <div className="card">
              <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Plan:</strong> {tier?.name || 'None'}</p>
            </div>
          </div>
        );

      case 'logout':
        handleLogout();
        return null;

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="dashboard-page">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <Link to="/" className="logo-text">Trackin.ID</Link>
          </div>
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (item.id === 'logout') {
                      handleLogout();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                >
                  <span className="sidebar-icon">{getIcon(item.icon)}</span>
                  <span className="sidebar-label">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <div className="header-actions">
              <span className="user-info">
                {user?.name} ({subscriptionTier})
              </span>
            </div>
          </header>
          {renderContent()}
        </main>
      </div>
    </ProtectedRoute>
  );
}