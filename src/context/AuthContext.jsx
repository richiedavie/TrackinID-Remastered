import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  createUser,
  validateLogin,
  setSession,
  clearSession,
  updateUser
} from '../lib/mockDb';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signup = async ({ name, email, password, companyName }) => {
    const newUser = createUser({ name, email, password, companyName });
    setSession(newUser.id);
    setUser(newUser);
    return newUser;
  };

  const login = async (email, password) => {
    const validated = validateLogin(email, password);
    if (!validated) {
      throw new Error('Invalid email or password');
    }
    setSession(validated.id);
    setUser(validated);
    return validated;
  };

  const logout = async () => {
    clearSession();
    setUser(null);
  };

  const completeOnboarding = async (userType) => {
    if (!user) return null;
    const updated = updateUser(user.id, { userType });
    setUser(updated);
    return updated;
  };

  const activatePlan = async (plan, billingCycle) => {
    if (!user) return null;
    const updated = updateUser(user.id, {
      plan,
      planActivatedAt: new Date().toISOString(),
      billingCycle: billingCycle || 'monthly'
    });
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signup,
        login,
        logout,
        completeOnboarding,
        activatePlan
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
