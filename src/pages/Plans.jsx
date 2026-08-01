import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PricingCards from '../components/PricingCards';
import StepIndicator from '../components/StepIndicator';
import ProtectedRoute from '../components/ProtectedRoute';
import './Plans.css';

export default function PlansPage() {
  const { session } = useApp();
  const navigate = useNavigate();

  return (
    <ProtectedRoute requirePlan={false}>
      <div className="plans-page">
        <div className="container">
          <StepIndicator currentStep={1} totalSteps={3} />

          <div className="plans-header">
            <h1>Choose Your Plan</h1>
            <p>
              {session?.userType === 'consumer'
                ? 'Personal plans designed for individual vehicle tracking.'
                : 'Business plans built for fleet management at any scale.'}
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