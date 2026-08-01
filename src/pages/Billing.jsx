import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';
import PricingCards from '../components/PricingCards';
import ProtectedRoute from '../components/ProtectedRoute';
import './Plans.css';

export default function BillingPage() {
  const { session } = useApp();
  const navigate = useNavigate();

  return (
    <ProtectedRoute requirePlan={false}>
      <div className="plans-page">
        <div className="container">
          <div className="plans-header">
            <h1>Upgrade Your Plan</h1>
            <p>
              Current plan: <strong>{session?.plan ? TIERS[session.plan]?.name || session.plan : 'None'}</strong>
            </p>
          </div>

          <PricingCards
            onPlanSelect={(tier, billingCycle) => {
              sessionStorage.setItem(
                'trackin_id_pending_plan',
                JSON.stringify({ plan: tier, billingCycle })
              );
              navigate('/checkout');
            }}
            userType={session?.userType}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}