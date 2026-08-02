import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';
import PricingCards from '../components/PricingCards';
import StepIndicator from '../components/StepIndicator';
import ProtectedRoute from '../components/ProtectedRoute';
import './Plans.css';

export default function PlansPage() {
  const { subscriptionTier } = useApp();

  return (
    <ProtectedRoute>
      <div className="plans-page">
        <div className="container">
          <StepIndicator currentStep={1} totalSteps={3} />

          <div className="plans-header">
            <h1>Choose Your Plan</h1>
            <p>
              {subscriptionTier
                ? `Current plan: ${TIERS[subscriptionTier]?.name || subscriptionTier}`
                : 'Select the plan that fits your fleet\'s needs.'}
            </p>
          </div>

          <PricingCards
            onPlanSelect={(tier, billingCycle) => {
              sessionStorage.setItem(
                'trackin_id_pending_plan',
                JSON.stringify({ plan: tier, billingCycle })
              );
              window.location.href = `/checkout?plan=${tier}`;
            }}
            userType={null}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}