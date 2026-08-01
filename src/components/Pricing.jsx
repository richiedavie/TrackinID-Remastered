import PricingCards from './PricingCards';
import './Pricing.css';

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding pricing-section">
      <div className="container">
        <div className="text-center pricing-header">
          <h2>Transparent Pricing</h2>
          <p>Choose the plan that fits your fleet's needs.</p>
        </div>
        <PricingCards />
      </div>
    </section>
  );
}