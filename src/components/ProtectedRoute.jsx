import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  // 1. If user is null (no session at all) -> redirect to /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Else if user.userType is null -> redirect to /onboarding
  if (user.userType === null) {
    if (path !== '/onboarding') {
      return <Navigate to="/onboarding" replace />;
    }
  } else {
    // Prevent going back to onboarding if already completed
    if (path === '/onboarding') {
      if (user.plan === null) {
        return <Navigate to="/plans" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  // 3. Else if user.plan is null -> redirect to /plans (allow /checkout as the next step of plans)
  if (user.plan === null) {
    if (path !== '/plans' && path !== '/checkout') {
      return <Navigate to="/plans" replace />;
    }
  } else {
    // Prevent going to plans or checkout if already on a plan
    if (path === '/plans' || path === '/checkout') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // 4. Else -> render requested page normally
  return children;
}