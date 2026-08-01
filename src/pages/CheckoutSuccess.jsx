import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';
import './CheckoutSuccess.css';

export default function CheckoutSuccess() {
  const { subscriptionTier } = useApp();
  const activeTier = TIERS[subscriptionTier] || TIERS.elite;

  return (
    <div className="checkout-success-page">
      <div className="success-card">
        <div className="success-icon-badge">✓</div>
        <h2>Payment Successful!</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>
          Your subscription has been updated to <strong>{activeTier.name}</strong>. All associated fleet features and vehicle limits are now fully unlocked.
        </p>

        <div
          style={{
            backgroundColor: 'var(--bg-alternate)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '28px',
            fontSize: '0.9rem',
            textAlign: 'left'
          }}
        >
          <div><strong>Order Reference:</strong> #TRK-{Math.floor(100000 + Math.random() * 900000)}</div>
          <div><strong>Activated Tier:</strong> {activeTier.name}</div>
          <div><strong>Max Vehicles:</strong> {activeTier.maxVehicles === Infinity ? 'Unlimited' : activeTier.maxVehicles}</div>
        </div>

        <Link to="/dashboard" className="btn btn-primary w-full">
          Launch Dashboard
        </Link>
      </div>
    </div>
  );
}