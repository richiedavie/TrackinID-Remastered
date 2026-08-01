import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';
import Gate from '../components/Gate';
import ProtectedRoute from '../components/ProtectedRoute';
import './Dashboard.css';

export default function Dashboard() {
  const { session, vehicles, alerts, maintenance, team, triggerDemoAlert, logout } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const tier = session?.plan ? TIERS[session.plan] : null;

  return (
    <ProtectedRoute requirePlan={true}>
      <div className="dashboard-page">
        <nav className="dashboard-nav">
          <div className="dashboard-nav-brand">
            <Link to="/dashboard" className="logo-text">Trackin.ID</Link>
          </div>
          <div className="dashboard-nav-links">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`nav-link ${activeTab === 'vehicles' ? 'active' : ''}`}
              onClick={() => setActiveTab('vehicles')}
            >
              Vehicles
            </button>
            <button
              className={`nav-link ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveTab('alerts')}
            >
              Alerts
            </button>
            <button
              className={`nav-link ${activeTab === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveTab('billing')}
            >
              Billing
            </button>
          </div>
          <div className="dashboard-nav-actions">
            <span className="user-info">
              {session.name} — {tier?.name || session.plan}
            </span>
            <button className="btn btn-outline btn-sm" onClick={logout}>
              Log out
            </button>
          </div>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="dashboard-overview">
              <h1>Dashboard Overview</h1>
              <div className="overview-cards">
                <div className="overview-card">
                  <h3>Current Plan</h3>
                  <p className="plan-name">{tier?.name || 'No plan'}</p>
                  <p className="plan-detail">
                    {session.billingCycle === 'yearly' ? 'Yearly' : 'Monthly'} billing
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
                  <p className="stat-number">{alerts.filter((a) => !a.read).length}</p>
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
          )}

          {activeTab === 'vehicles' && (
            <div className="dashboard-section">
              <h1>Vehicles</h1>
              <Gate feature="teamManagement" requiredValue={true}>
                <p>You can manage up to {tier?.maxVehicles === Infinity ? 'unlimited' : tier?.maxVehicles} vehicles on your plan.</p>
              </Gate>
              <div className="vehicle-list">
                {vehicles.map((v) => (
                  <div key={v.id} className="card vehicle-card">
                    <div className="vehicle-card-header">
                      <h3>{v.name}</h3>
                      <span className={`status-badge ${v.status}`}>{v.status}</span>
                    </div>
                    <div className="vehicle-card-details">
                      <p>Location: {v.location.lat.toFixed(4)}, {v.location.lng.toFixed(4)}</p>
                      <p>Fuel: {v.fuel}% | Mileage: {v.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="dashboard-section">
              <h1>Alerts</h1>
              <div className="alert-list">
                {alerts.length === 0 ? (
                  <p className="text-center">No alerts yet.</p>
                ) : (
                  alerts.map((a) => (
                    <div key={a.id} className={`card alert-card severity-${a.severity}`}>
                      <div className="alert-card-header">
                        <strong>{a.title}</strong>
                        <span className={`severity-badge ${a.severity}`}>{a.severity}</span>
                      </div>
                      <p>{a.message}</p>
                      <small>{a.timestamp}</small>
                    </div>
                  ))
                )}
              </div>
              <button className="btn btn-outline" onClick={triggerDemoAlert} style={{ marginTop: '16px' }}>
                Trigger Demo Alert
              </button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="dashboard-section">
              <h1>Billing</h1>
              <div className="billing-info">
                <div className="card">
                  <h3>Current Plan</h3>
                  <p><strong>{tier?.name || 'No plan'}</strong></p>
                  <p>Billing: {session.billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}</p>
                  {session.planActivatedAt && (
                    <p>Activated: {new Date(session.planActivatedAt).toLocaleDateString()}</p>
                  )}
                </div>
                <Link to="/plans" className="btn btn-primary">
                  Upgrade Plan
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}