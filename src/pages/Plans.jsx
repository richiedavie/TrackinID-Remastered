import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCards from '../components/PricingCards';
import './Plans.css';

export default function Plans() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="plans-page">
      <Navbar />
      <div className="container section-padding">
        <div className="text-center plans-header">
          <h2>Select a Subscription Plan</h2>
          <p>Choose the tier that matches your vehicle fleet size and capability requirements.</p>

          <div className="pricing-toggle">
            <span className={!isYearly ? 'active' : ''}>Monthly</span>
            <button
              className={`toggle-btn ${isYearly ? 'active' : ''}`}
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle billing frequency"
            >
              <div className="toggle-slider" />
            </button>
            <span className={isYearly ? 'active' : ''}>Yearly (Save 20%)</span>
          </div>
        </div>

        <PricingCards isYearly={isYearly} />
      </div>
      <Footer />
    </div>
  );
}