import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TIERS } from '../config/tiers';
import PricingCards from '../components/PricingCards';
import StepIndicator from '../components/StepIndicator';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Plans.css';

export default function PlansPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const subscriptionTier = user?.plan;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Navbar />
      <div className="plans-page" style={{ flex: 1 }}>
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
              navigate(`/checkout?plan=${tier}`);
            }}
            userType={user?.userType}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}