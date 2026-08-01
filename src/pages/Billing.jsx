import { useApp } from '../context/AppContext';
import { useTier } from '../hooks/useTier';
import { TIERS } from '../config/tiers';
import PricingCards from '../components/PricingCards';

export default function Billing() {
  const { subscriptionTier } = useApp();
  const { currentTier } = useTier();

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2>Subscription & Billing</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your plan, vehicle tier limits, and active subscription.</p>
      </div>

      <div className="card" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)', fontWeight: 600 }}>
              Current Active Plan
            </span>
            <h3 style={{ margin: '4px 0 8px', fontSize: '1.75rem' }}>{currentTier.name}</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Vehicle Capacity: <strong>{currentTier.maxVehicles === Infinity ? 'Unlimited Vehicles' : `${currentTier.maxVehicles} Vehicles`}</strong>
            </p>
          </div>
          <div>
            <span className="btn btn-outline" style={{ cursor: 'default' }}>
              Status: Active ✓
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3>Change or Upgrade Subscription Plan</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Select a plan below to upgrade your tier instantly across the dashboard.</p>
      </div>

      <PricingCards />
    </div>
  );
}