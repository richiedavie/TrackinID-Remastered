import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import './Onboarding.css';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('business');
  const [loadingStep, setLoadingStep] = useState(0);
  const { setUserType, login } = useApp();
  const navigate = useNavigate();

  const loadingMessages = [
    'Verifying device ID & telematics frequency...',
    'Syncing location GPS signals...',
    'Finalizing account configuration...'
  ];

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= 2) {
            clearInterval(interval);
            setTimeout(() => {
              login();
              navigate('/dashboard');
            }, 600);
            return prev;
          }
          return prev + 1;
        });
      }, 900);

      return () => clearInterval(interval);
    }
  }, [step, login, navigate]);

  const handleTrackSubmit = () => {
    setUserType(selectedTrack);
    setStep(2);
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <StepIndicator currentStep={step === 1 ? 2 : 3} />

        {step === 1 ? (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>What are you tracking?</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Select your track to customize dashboard metrics and scaling tools.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <div
                className={`track-option-card ${selectedTrack === 'business' ? 'active' : ''}`}
                onClick={() => setSelectedTrack('business')}
              >
                <div className="track-option-icon">🚚</div>
                <div>
                  <h4 style={{ margin: 0 }}>Business / Fleet Track</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
                    Logistics, delivery fleets, or rental car operations managing multiple vehicles & drivers.
                  </p>
                </div>
              </div>

              <div
                className={`track-option-card ${selectedTrack === 'consumer' ? 'active' : ''}`}
                onClick={() => setSelectedTrack('consumer')}
              >
                <div className="track-option-icon">🚗</div>
                <div>
                  <h4 style={{ margin: 0 }}>Consumer / Individual Track</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
                    Tracking 1 personal vehicle, family car, or single asset.
                  </p>
                </div>
              </div>
            </div>

            <button onClick={handleTrackSubmit} className="btn btn-primary w-full">
              Connecting GPS Device →
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <h3 style={{ marginBottom: '12px' }}>Connecting your GPS Device...</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{loadingMessages[loadingStep]}</p>

            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${((loadingStep + 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}