import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './CheckoutSuccess.css';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);

  const planName = location.state?.planName || 'Pro TrackID';

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/dashboard', { replace: true });
    }
  }, [countdown, navigate]);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1>Payment Successful</h1>
        <p className="success-message">
          Your <strong>{planName}</strong> plan has been activated.
        </p>

        <div className="success-details">
          <div className="detail-row">
            <span>Plan</span>
            <strong>{planName}</strong>
          </div>
          <div className="detail-row">
            <span>Status</span>
            <strong>Active</strong>
          </div>
          <div className="detail-row">
            <span>Activated</span>
            <strong>Just now</strong>
          </div>
        </div>

        <button
          className="btn btn-primary w-full"
          onClick={() => navigate('/dashboard', { replace: true })}
        >
          Go to Dashboard
        </button>

        <p className="success-redirect">
          Redirecting to dashboard in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}