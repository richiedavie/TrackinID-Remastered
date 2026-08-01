import { useNavigate } from 'react-router-dom';
import { TIERS } from '../config/tiers';

export default function PricingCards({ isYearly = false }) {
  const navigate = useNavigate();

  const handleSelectPlan = (tierKey) => {
    navigate(`/checkout?plan=${tierKey}`);
  };

  const tierList = [
    {
      key: 'basic',
      priceMonthly: '140K',
      priceYearly: '240K',
      features: ['Real-time GPS tracking', 'Security notifications', '1-vehicle limit', 'Basic maintenance reminders']
    },
    {
      key: 'advanced',
      priceMonthly: '400K',
      priceYearly: '500K',
      features: ['All Basic features', 'Up to 5 vehicles', 'Driver behavior monitoring', 'Summary reports']
    },
    {
      key: 'pro',
      priceMonthly: '800K',
      priceYearly: '960K',
      popular: true,
      features: ['All Advanced features', 'Up to 20 vehicles', 'WhatsApp & SMS alerts', 'Multi-user access', 'API/ERP integration']
    },
    {
      key: 'elite',
      priceMonthly: '1.2JT',
      priceYearly: '2.3JT',
      features: ['All Pro features', 'Unlimited vehicles', 'AI predictive maintenance', 'AI route optimization', 'Video telematics & 24/7 support']
    }
  ];

  return (
    <div className="grid grid-cols-4 pricing-grid">
      {tierList.map((t) => {
        const tierData = TIERS[t.key];
        const isPopular = t.popular;

        return (
          <div key={t.key} className={`card pricing-card ${isPopular ? 'popular' : ''}`}>
            {isPopular && <div className="popular-badge">Most Popular</div>}
            <div className="pricing-card-header">
              <h3>{tierData.name}</h3>
              <div className="price">
                <span className="currency">Rp</span>
                <span className="amount">{isYearly ? t.priceYearly : t.priceMonthly}</span>
                <span className="period">/{isYearly ? 'yr' : 'mo'}</span>
              </div>
            </div>
            <ul className="pricing-features">
              {t.features.map((f, i) => (
                <li key={i}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan(t.key)}
              className={`btn ${isPopular ? 'btn-primary' : 'btn-outline'} w-full`}
            >
              Select {tierData.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}