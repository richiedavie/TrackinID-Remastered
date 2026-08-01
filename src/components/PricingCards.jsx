import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Pricing.css';

const tiers = [
  {
    name: "Basic Pack",
    monthly: "140K",
    yearly: "240K",
    features: ["Real-time GPS tracking", "Security notifications", "1-vehicle dashboard", "Basic maintenance reminders"]
  },
  {
    name: "Advanced TrackID",
    monthly: "400K",
    yearly: "500K",
    features: ["All Basic features", "Up to 5 vehicles", "Driver behavior monitoring"]
  },
  {
    name: "Pro TrackID",
    monthly: "800K",
    yearly: "960K",
    popular: true,
    features: ["All Advanced features", "Up to 20 vehicles", "WhatsApp/SMS alerts", "Advanced maintenance scheduler", "Cost analysis", "Multi-user access", "API/ERP integration"]
  },
  {
    name: "Elite TrackID",
    monthly: "1.2JT",
    yearly: "2.3JT",
    features: ["All Pro features", "Unlimited vehicles", "AI predictive maintenance", "AI route optimization", "Weekly/quarterly AI insight reports", "24/7 dedicated support", "Video telematics + 9+ AI dashboard tools"]
  }
];

export default function PricingCards({ onPlanSelect, userType, compact }) {
  const [isYearly, setIsYearly] = useState(false);

  const recommendedTiers = userType === 'consumer' ? ['basic', 'advanced'] : ['pro', 'elite'];
  const tierKeys = ['basic', 'advanced', 'pro', 'elite'];

  return (
    <div className={`pricing-cards-wrapper ${compact ? 'compact' : ''}`}>
      <div className="pricing-toggle">
        <span className={!isYearly ? "active" : ""}>Monthly</span>
        <button
          className={`toggle-btn ${isYearly ? "active" : ""}`}
          onClick={() => setIsYearly(!isYearly)}
          aria-label="Toggle billing period"
        >
          <div className="toggle-slider"></div>
        </button>
        <span className={isYearly ? "active" : ""}>Yearly (Save 20%)</span>
      </div>

      <div className={`grid pricing-grid ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {tiers.map((tier, idx) => {
          const tierKey = tierKeys[idx];
          const isRecommended = recommendedTiers.includes(tierKey);
          return (
            <div key={idx} className={`card pricing-card ${tier.popular ? 'popular' : ''} ${isRecommended ? 'recommended' : ''}`}>
              {isRecommended && <div className="recommended-badge">Recommended for you</div>}
              {tier.popular && <div className="popular-badge">Most Popular</div>}
              <div className="pricing-card-header">
                <h3>{tier.name}</h3>
                <div className="price">
                  <span className="currency">Rp</span>
                  <span className="amount">{isYearly ? tier.yearly : tier.monthly}</span>
                  <span className="period">/{isYearly ? 'yr' : 'mo'}</span>
                </div>
              </div>
              <ul className="pricing-features">
                {tier.features.map((feat, fidx) => (
                  <li key={fidx}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              {onPlanSelect ? (
                <button
                  className={`btn ${tier.popular ? 'btn-primary' : 'btn-outline'} w-full`}
                  onClick={() => onPlanSelect(tierKey, isYearly ? 'yearly' : 'monthly')}
                >
                  Choose Plan
                </button>
              ) : (
                <Link to="/login" className={`btn ${tier.popular ? 'btn-primary' : 'btn-outline'} w-full`}>
                  Get Started
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { tiers };