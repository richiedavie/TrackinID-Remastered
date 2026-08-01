import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'trackin_id_app_state_v2';

export function AppProvider({ children }) {
  const saved = localStorage.getItem(STORAGE_KEY);
  const parsed = saved ? JSON.parse(saved) : null;

  const [isAuthenticated, setIsAuthenticated] = useState(parsed?.isAuthenticated ?? true);
  const [user, setUser] = useState(
    parsed?.user ?? { name: 'Rusdih Operations', email: 'rusdih@trackin.id', role: 'Fleet Manager' }
  );
  const [subscriptionTier, setSubscriptionTier] = useState(parsed?.subscriptionTier ?? 'pro');
  const [userType, setUserType] = useState(parsed?.userType ?? 'business');
  const [darkMode, setDarkMode] = useState(parsed?.darkMode ?? false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isAuthenticated,
        user,
        subscriptionTier,
        userType,
        darkMode,
      })
    );
  }, [isAuthenticated, user, subscriptionTier, userType, darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const login = (userData) => {
    setIsAuthenticated(true);
    if (userData) setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const setTier = (tier) => {
    setSubscriptionTier(tier);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        subscriptionTier,
        userType,
        darkMode,
        toasts,
        login,
        logout,
        setTier,
        setUserType,
        toggleDarkMode,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}