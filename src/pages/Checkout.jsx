import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';
import StepIndicator from '../components/StepIndicator';
import './Checkout.css';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const planKey = searchParams.get('plan') || 'elite';
  const { setTier, login } = useApp();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardHolder, setCardHolder] = useState('Rusdih Operations');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('889');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTier = TIERS[planKey] || TIERS.elite;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Set subscription tier in global context & localStorage and authenticate
      setTier(planKey);
      login({ name: cardHolder || 'Rusdih Operations', email: 'rusdih@trackin.id', role: 'Fleet Manager' });
      setIsSubmitting(false);
      // Strictly navigate to checkout-success / dashboard
      navigate('/checkout-success', { replace: true });
    }, 1200);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <StepIndicator currentStep={3} />

        <div className="checkout-header">
          <h2>Complete Your Subscription</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Enter payment details to activate your fleet plan</p>
        </div>

        <div className="plan-summary-box">
          <div>
            <div className="plan-summary-title">{selectedTier.name}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Max Vehicles: {selectedTier.maxVehicles === Infinity ? 'Unlimited' : selectedTier.maxVehicles}
            </span>
          </div>
          <div className="plan-summary-price">
            {planKey === 'elite' ? 'Rp 2.3JT/yr' : planKey === 'pro' ? 'Rp 960K/yr' : 'Rp 500K/yr'}
          </div>
        </div>

        <div className="payment-methods-grid">
          <button
            type="button"
            className={`payment-method-tile ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            💳 Credit Card
          </button>
          <button
            type="button"
            className={`payment-method-tile ${paymentMethod === 'qris' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('qris')}
          >
            📱 QRIS Instant
          </button>
          <button
            type="button"
            className={`payment-method-tile ${paymentMethod === 'bank' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('bank')}
          >
            🏦 Bank Transfer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              className="form-input"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              className="form-input"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-row-dual">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                className="form-input"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label>CVV Security Code</label>
              <input
                type="text"
                className="form-input"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
            style={{ marginTop: '12px' }}
          >
            {isSubmitting ? 'Processing Payment...' : `Confirm & Pay for ${selectedTier.name}`}
          </button>
        </form>
      </div>
    </div>
  );
}