import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import './Onboarding.css';

export default function Onboarding() {
  const [selectedType, setSelectedType] = useState(null);
  const { setUserType } = useApp();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedType) return;
    setUserType(selectedType);
    navigate('/plans', { replace: true });
  };

  return (
    <div className="onboarding-page">
      <div className="container">
        <StepIndicator currentStep={0} totalSteps={3} />

        <div className="onboarding-card">
          <h1 className="onboarding-title">Get Started</h1>
          <p className="onboarding-subtitle">
            Are you tracking a personal vehicle or managing a fleet?
          </p>

          <div className="onboarding-options">
            <div
              className={`onboarding-option ${selectedType === 'consumer' ? 'selected' : ''}`}
              onClick={() => setSelectedType('consumer')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedType('consumer')}
            >
              <div className="option-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 2v4m0 12v4M2 12h4m12 0h4"></path>
                  <path d="m4.93 4.93 2.83 2.83m8.48 8.48 2.83 2.83m0-14.14-2.83 2.83M4.93 19.07l2.83-2.83"></path>
                </svg>
              </div>
              <h3>Personal Vehicle</h3>
              <p>Track a single car with real-time GPS, alerts, and maintenance reminders.</p>
            </div>

            <div
              className={`onboarding-option ${selectedType === 'business' ? 'selected' : ''}`}
              onClick={() => setSelectedType('business')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedType('business')}
            >
              <div className="option-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                  <line x1="12" y1="12" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3>Fleet / Business</h3>
              <p>Manage multiple vehicles, drivers, and teams with advanced analytics.</p>
            </div>
          </div>

          <button
            className="btn btn-primary w-full"
            onClick={handleContinue}
            disabled={!selectedType}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}