import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import StepIndicator from '../components/StepIndicator';
import ProtectedRoute from '../components/ProtectedRoute';
import './Checkout.css';

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : digits;
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return digits.slice(0, 2) + '/' + digits.slice(2);
  }
  return digits;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTier, addToast } = useApp();
  const { activatePlan } = useAuth();

  const planParam = new URLSearchParams(location.search).get('plan');
  const pendingPlan = sessionStorage.getItem('trackin_id_pending_plan');
  const pendingPlanParsed = pendingPlan ? JSON.parse(pendingPlan) : null;
  const plan = planParam || pendingPlanParsed?.plan || 'pro';
  const billingCycle = pendingPlanParsed?.billingCycle || 'monthly';


  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [vaNumber] = useState(() => {
    const digits = '8888' + Math.random().toString().slice(2, 10);
    return digits.match(/.{1,4}/g)?.join(' ') || digits;
  });
  const [qrTimer, setQrTimer] = useState(60);

  useEffect(() => {
    if (paymentMethod === 'qris' && qrTimer > 0) {
      const interval = setInterval(() => {
        setQrTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (paymentMethod === 'qris') {
      setQrTimer(60);
    }
  }, [paymentMethod]);

  const tierNames = {
    basic: 'Basic Pack',
    advanced: 'Advanced TrackID',
    pro: 'Pro TrackID',
    elite: 'Elite TrackID',
  };

  const tierPrices = {
    basic: { monthly: '140K', yearly: '240K' },
    advanced: { monthly: '400K', yearly: '500K' },
    pro: { monthly: '800K', yearly: '960K' },
    elite: { monthly: '1.2JT', yearly: '2.3JT' },
  };

  const selectedTier = {
    name: tierNames[plan] || plan,
    price: tierPrices[plan]?.monthly || '140K',
  };

  const handlePay = () => {
    setProcessing(true);
    setProgressText('Verifying payment...');

    setTimeout(() => {
      setProgressText('Activating your plan...');
    }, 1500);

    setTimeout(async () => {
      try {
        await activatePlan(plan, billingCycle);
        setTier(plan);
      } catch (err) {
        console.error('Error activating plan', err);
      }
      sessionStorage.removeItem('trackin_id_pending_plan');
      setProcessing(false);
      addToast(`Plan ${tierNames[plan]} activated!`, 'success');
      navigate('/dashboard', {
        replace: true,
        state: { planName: tierNames[plan] || plan, paymentSuccess: true },
      });
    }, 3000);
  };

  if (!plan) return null;

  return (
    <div className="checkout-page">
      <div className="container">
        <StepIndicator currentStep={2} totalSteps={3} />

        <div className="checkout-layout">
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-plan">
              <span className="summary-plan-name">{selectedTier.name}</span>
            </div>
            <div className="summary-price">
              <span className="currency">Rp</span>
              <span className="amount">{selectedTier.price}</span>
              <span className="period">/month</span>
            </div>
          </div>

          <div className="checkout-payment">
            <h2>Payment Method</h2>

            <div className="payment-tabs">
              <button
                className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Card
              </button>
              <button
                className={`payment-tab ${paymentMethod === 'qris' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('qris')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
                QRIS
              </button>
              <button
                className={`payment-tab ${paymentMethod === 'transfer' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('transfer')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <polyline points="4 12 20 12"></polyline>
                  <polyline points="4 18 20 18"></polyline>
                </svg>
                Bank Transfer
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="payment-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    autoComplete="cc-number"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry</label>
                    <input
                      id="cardExpiry"
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV</label>
                    <input
                      id="cardCvv"
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    id="cardName"
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    autoComplete="cc-name"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'qris' && (
              <div className="payment-qris">
                <div className="qr-placeholder">
                  <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                    <rect width="160" height="160" fill="white" rx="8"/>
                    <g fill="var(--text-primary)">
                      <rect x="10" y="10" width="30" height="30" rx="2"/>
                      <rect x="10" y="10" width="10" height="10"/>
                      <rect x="10" y="20" width="10" height="10"/>
                      <rect x="20" y="10" width="10" height="10"/>
                      <rect x="120" y="10" width="30" height="30" rx="2"/>
                      <rect x="120" y="10" width="10" height="10"/>
                      <rect x="120" y="20" width="10" height="10"/>
                      <rect x="130" y="10" width="10" height="10"/>
                      <rect x="10" y="120" width="30" height="30" rx="2"/>
                      <rect x="10" y="120" width="10" height="10"/>
                      <rect x="10" y="130" width="10" height="10"/>
                      <rect x="20" y="120" width="10" height="10"/>
                      <rect x="50" y="50" width="10" height="10"/>
                      <rect x="70" y="50" width="10" height="10"/>
                      <rect x="90" y="50" width="10" height="10"/>
                      <rect x="50" y="70" width="10" height="10"/>
                      <rect x="70" y="70" width="10" height="10"/>
                      <rect x="90" y="70" width="10" height="10"/>
                      <rect x="50" y="90" width="10" height="10"/>
                      <rect x="70" y="90" width="10" height="10"/>
                      <rect x="90" y="90" width="10" height="10"/>
                      <rect x="110" y="50" width="10" height="10"/>
                      <rect x="110" y="70" width="10" height="10"/>
                      <rect x="110" y="90" width="10" height="10"/>
                      <rect x="130" y="50" width="10" height="10"/>
                      <rect x="130" y="70" width="10" height="10"/>
                      <rect x="130" y="90" width="10" height="10"/>
                    </g>
                  </svg>
                </div>
                <p className="qris-label">Scan the QR code with your banking app</p>
                <div className="qris-timer">
                  <span className="timer-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </span>
                  {qrTimer}s remaining
                </div>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="payment-transfer">
                <div className="transfer-va">
                  <div className="va-label">Virtual Account Number</div>
                  <div className="va-number">
                    <span>{vaNumber}</span>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(vaNumber);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="transfer-bank">
                  <div className="bank-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                      <line x1="12" y1="12" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <span>Bank Mandiri</span>
                </div>
                <p className="transfer-instructions">
                  Transfer the exact amount to the virtual account above from your bank app or internet banking. Payment will be confirmed automatically once the transfer is received.
                </p>
              </div>
            )}

            {processing ? (
              <div className="processing-state">
                <div className="spinner"></div>
                <p className="processing-text">{progressText}</p>
              </div>
            ) : (
              <button className="btn btn-primary w-full pay-btn" onClick={handlePay} disabled={processing}>
                Pay Now — Rp {selectedTier.price}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}