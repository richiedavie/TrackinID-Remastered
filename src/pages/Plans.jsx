import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PricingCards from '../components/PricingCards';
import StepIndicator from '../components/StepIndicator';
import ProtectedRoute from '../components/ProtectedRoute';
import './Plans.css';

export default function PlansPage() {
  const { subscriptionTier } = useApp();
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="plans-page">
        <div className="container">
          <StepIndicator currentStep={1} totalSteps={3} />

          <div className="plans-header">
            <h1>Choose Your Plan</h1>
            <p>Select the plan that fits your fleet's needs.</p>
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