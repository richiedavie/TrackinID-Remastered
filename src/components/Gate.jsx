import { Link } from 'react-router-dom';
import { useTier } from '../hooks/useTier';
import { FEATURE_NAMES } from '../config/tiers';
import './Gate.css';

export default function Gate({ feature, children, requiredValue }) {
  const { canAccess, getFeatureValue, currentTier } = useTier();

  let hasAccess = canAccess(feature);
  if (requiredValue && hasAccess) {
    const val = getFeatureValue(feature);
    hasAccess = val === requiredValue || val === 'full' || val === 'smart' || val === 'advanced';
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  const featureTitle = FEATURE_NAMES[feature] || 'Pro Feature';

  return (
    <div className="gate-wrapper">
      <div className="gate-content-blur">{children}</div>
      <div className="gate-overlay">
        <div className="gate-card">
          <div className="gate-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3>Upgrade to Unlock {featureTitle}</h3>
          <p>
            Your current plan (<strong>{currentTier.name}</strong>) does not include access to {featureTitle.toLowerCase()}.
          </p>
          <Link to="/billing" className="btn btn-primary">
            Upgrade Plan
          </Link>
        </div>
      </div>
    </div>
  );
}