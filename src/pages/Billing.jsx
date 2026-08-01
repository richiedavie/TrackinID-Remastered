import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PricingCards from '../components/PricingCards';
import ProtectedRoute from '../components/ProtectedRoute';
import { TIERS } from '../config/tiers';
import './Plans.css';

export default function BillingPage() {
  const { subscriptionTier } = useApp();
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="plans-page">
        <div className="container">
          <div className="plans-header">
            <h1>Upgrade Your Plan</h1>
            <p>
              Current plan: <strong>{subscriptionTier ? TIERS[subscriptionTier]?.name || subscriptionTier : 'None'}</strong>
            </p>
          </div>

          <PricingCards
            onPlanSelect={(tier) => {
              navigate(`/checkout?plan=${tier}`);
            }}
            userType={null}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}