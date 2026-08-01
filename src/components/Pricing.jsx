import { useState } from 'react';
import './Pricing.css';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

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

  return (
    <section id="pricing" className="section-padding pricing-section">
      <div className="container">
        <div className="text-center pricing-header">
          <h2>Transparent Pricing</h2>
          <p>Choose the plan that fits your fleet's needs.</p>
          
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
        </div>

        <div className="grid grid-cols-4 pricing-grid">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`card pricing-card ${tier.popular ? 'popular' : ''}`}>
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
              <a href="#" className={`btn ${tier.popular ? 'btn-primary' : 'btn-outline'} w-full`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
