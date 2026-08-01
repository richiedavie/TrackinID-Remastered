import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ children, requirePlan = false }) {
  const { isAuthenticated, hasUserType, hasPlan } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasUserType) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  if (requirePlan && !hasPlan) {
    return <Navigate to="/plans" state={{ from: location }} replace />;
  }

  return children;
}