import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  console.log('[ProtectedRoute] path:', path, 'user:', user ? { id: user.id, userType: user.userType, plan: user.plan } : null);

  // 1. If user is null (no session at all) -> redirect to /login
  if (!user) {
    console.log('[ProtectedRoute] redirecting to /login (no session)');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. /onboarding route specific checks
  if (path === '/onboarding') {
    // If session AND userType is already set AND plan is already set -> skip ahead to /dashboard
    if (user.userType !== null && user.plan !== null) {
      console.log('[ProtectedRoute] redirecting to /dashboard (onboarding already completed)');
      return <Navigate to="/dashboard" replace />;
    }
    // Otherwise render onboarding normally
    console.log('[ProtectedRoute] rendering onboarding');
    return children;
  }

  // 3. /plans route specific checks
  if (path === '/plans') {
    // If session but userType is null -> redirect to /onboarding
    if (user.userType === null) {
      console.log('[ProtectedRoute] redirecting to /onboarding (userType is null)');
      return <Navigate to="/onboarding" replace />;
    }
    // If session AND userType set AND plan already set -> skip ahead to /dashboard
    if (user.plan !== null) {
      console.log('[ProtectedRoute] redirecting to /dashboard (plan already set)');
      return <Navigate to="/dashboard" replace />;
    }
    // Otherwise render plans normally
    console.log('[ProtectedRoute] rendering plans');
    return children;
  }

  // 4. /checkout / /checkout-success route specific checks
  if (path === '/checkout' || path === '/checkout-success') {
    // If session but userType is null -> redirect to /onboarding
    if (user.userType === null) {
      console.log('[ProtectedRoute] redirecting to /onboarding (userType is null)');
      return <Navigate to="/onboarding" replace />;
    }
    // If plan is already set, they don't need to checkout -> /dashboard
    if (user.plan !== null && path === '/checkout') {
      console.log('[ProtectedRoute] redirecting to /dashboard (plan already set)');
      return <Navigate to="/dashboard" replace />;
    }
  }

  // 5. Dashboard, billing & all other protected routes
  if (path.startsWith('/dashboard') || path === '/billing') {
    if (user.userType === null) {
      console.log('[ProtectedRoute] redirecting to /onboarding (userType is null)');
      return <Navigate to="/onboarding" replace />;
    }
    if (user.plan === null) {
      console.log('[ProtectedRoute] redirecting to /plans (plan is null)');
      return <Navigate to="/plans" replace />;
    }
  }

  console.log('[ProtectedRoute] rendering normally');
  return children;
}