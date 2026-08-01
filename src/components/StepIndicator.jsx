import './StepIndicator.css';

export default function StepIndicator({ currentStep = 3 }) {
  const steps = [
    { number: 1, label: 'Account' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Payment' }
  ];

  return (
    <div className="step-indicator-wrapper">
      <div className="step-indicator">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div key={step.number} className="step-item-container">
              <div className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-circle">
                  {isCompleted ? '✓' : step.number}
                </div>
                <span className="step-label">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`step-line ${isCompleted ? 'completed' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}