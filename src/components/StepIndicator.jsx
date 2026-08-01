import './StepIndicator.css';

export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="step-indicator">
      <div className="step-indicator-track">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className={`step-dot ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}>
            {i < currentStep ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
        ))}
      </div>
      <div className="step-labels">
        {['Account', 'Details', 'Payment'].map((label, i) => (
          <span key={i} className={`step-label ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}