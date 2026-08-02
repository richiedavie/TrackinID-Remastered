import { createContext, useContext, useState, useEffect } from 'react';
import { initialVehicles } from '../data/mock/vehicles';
import { initialDrivers } from '../data/mock/drivers';
import { initialAlerts } from '../data/mock/alerts';
import { initialMaintenance } from '../data/mock/maintenance';
import { initialTeam } from '../data/mock/team';
import { TIERS } from '../config/tiers';

const AppContext = createContext();

const STORAGE_KEY = 'trackin_id_session_v1';

export function AppProvider({ children }) {
  const savedState = localStorage.getItem(STORAGE_KEY);
  const initial = savedState ? JSON.parse(savedState) : null;

  const [isAuthenticated, setIsAuthenticated] = useState(initial?.isAuthenticated ?? false);
  const [user, setUser] = useState(initial?.user ?? null);
  const [subscriptionTier, setSubscriptionTier] = useState(initial?.subscriptionTier ?? null);
  const [darkMode, setDarkMode] = useState(initial?.darkMode ?? false);

  const [vehicles, setVehicles] = useState(initial?.vehicles ?? initialVehicles);
  const [drivers, setDrivers] = useState(initial?.drivers ?? initialDrivers);
  const [alerts, setAlerts] = useState(initial?.alerts ?? initialAlerts);
  const [maintenance, setMaintenance] = useState(initial?.maintenance ?? initialMaintenance);
  const [team, setTeam] = useState(initial?.team ?? initialTeam);

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isAuthenticated,
        user,
        subscriptionTier,
        darkMode,
        vehicles,
        drivers,
        alerts,
        maintenance,
        team,
      })
    );
  }, [isAuthenticated, user, subscriptionTier, darkMode, vehicles, drivers, alerts, maintenance, team]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          if (v.status !== 'online') return v;
          const latNudge = (Math.random() - 0.5) * 0.001;
          const lngNudge = (Math.random() - 0.5) * 0.001;
          return {
            ...v,
            location: {
              ...v.location,
              lat: v.location.lat + latNudge,
              lng: v.location.lng + lngNudge,
            },
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const login = (email, password) => {
    const mockUser = {
      id: 'u_1',
      name: email.split('@')[0],
      email,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  };

  const signup = (name, email, password) => {
    const mockUser = {
      id: 'u_1',
      name,
      email,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setSubscriptionTier(null);
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
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerDemoAlert = () => {
    const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)] || initialVehicles[0];
    const newAlert = {
      id: `a_${Date.now()}`,
      type: 'security',
      message: `${randomVehicle.name} sudden acceleration detected on route.`,
      timestamp: 'Just now',
      isRead: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    addToast(`ALERT: ${newAlert.message}`, 'warning');
  };

  const addVehicle = (newVeh) => {
    setVehicles((prev) => [newVeh, ...prev]);
    addToast(`Added vehicle ${newVeh.name}`, 'success');
  };

  const markMaintenanceDone = (id) => {
    setMaintenance((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'done', progressPct: 100 } : m))
    );
    addToast('Maintenance task marked as completed.', 'success');
  };

  const inviteTeamMember = (member) => {
    setTeam((prev) => [...prev, { ...member, id: `t_${Date.now()}`, status: 'Active', joinedDate: 'Just now' }]);
    addToast(`Invited ${member.email} as ${member.role}`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        subscriptionTier,
        darkMode,
        vehicles,
        drivers,
        alerts,
        maintenance,
        team,
        toasts,
        login,
        signup,
        logout,
        setTier,
        toggleDarkMode,
        triggerDemoAlert,
        addVehicle,
        markMaintenanceDone,
        inviteTeamMember,
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