import { useNavigate } from 'react-router-dom';

const tiers = [
  {
    id: 'basic',
    name: 'Basic Pack',
    monthlyPrice: '140K',
    yearlyPrice: '240K',
    features: ['Real-time GPS tracking', 'Security notifications', '1-vehicle dashboard', 'Basic maintenance reminders'],
  },
  {
    id: 'advanced',
    name: 'Advanced TrackID',
    monthlyPrice: '400K',
    yearlyPrice: '500K',
    features: ['All Basic features', 'Up to 5 vehicles', 'Driver behavior monitoring'],
  },
  {
    id: 'pro',
    name: 'Pro TrackID',
    monthlyPrice: '800K',
    yearlyPrice: '960K',
    popular: true,
    features: ['All Advanced features', 'Up to 20 vehicles', 'WhatsApp/SMS alerts', 'Advanced maintenance scheduler', 'Cost analysis', 'Multi-user access', 'API/ERP integration'],
  },
  {
    id: 'elite',
    name: 'Elite TrackID',
    monthlyPrice: '1.2JT',
    yearlyPrice: '2.3JT',
    features: ['All Pro features', 'Unlimited vehicles', 'AI predictive maintenance', 'AI route optimization', 'Weekly/quarterly AI insight reports', '24/7 dedicated support', 'Video telematics + 9+ AI dashboard tools'],
  },
];

export default function PricingCards({ isYearly = false }) {
  const navigate = useNavigate();

  return (
    <div className="pricing-cards-wrapper">
      <div className="pricing-cards-grid">
        {tiers.map((tierData) => (
          <div key={tierData.id} className={`pricing-card ${tierData.popular ? 'popular' : ''}`}>
            {tierData.popular && <div className="popular-badge">Most Popular</div>}
            <div className="pricing-card-header">
              <h3>{tierData.name}</h3>
              <div className="price">
                <span className="currency">Rp</span>
                <span className="amount">{isYearly ? tierData.yearlyPrice : tierData.monthlyPrice}</span>
                <span className="period">/{isYearly ? 'yr' : 'mo'}</span>
              </div>
            </div>
            <ul className="pricing-card-features">
              {tierData.features.map((feat, idx) => (
                <li key={idx}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>
            <button
              className={`btn ${tierData.popular ? 'btn-primary' : 'btn-outline'} w-full`}
              onClick={() => navigate(`/checkout?plan=${tierData.id}`)}
            >
              Select {tierData.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { tiers };