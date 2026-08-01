import { createContext, useContext, useState, useEffect } from 'react';
import { dummyDB } from '../data/db';
import { TIERS } from '../config/tiers';
import { initialVehicles } from '../data/mock/vehicles';
import { initialDrivers } from '../data/mock/drivers';
import { initialAlerts } from '../data/mock/alerts';
import { initialMaintenance } from '../data/mock/maintenance';
import { initialTeam } from '../data/mock/team';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [team, setTeam] = useState(initialTeam);

  useEffect(() => {
    dummyDB.getUser().then((userData) => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const result = await dummyDB.getUser();
    const mockUser = {
      id: result.id,
      name: email.split('@')[0],
      email,
      tier: result.tier || 'basic',
      role: result.role || 'Admin',
    };
    setUser(mockUser);
    setLoading(false);
    return mockUser;
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    const mockUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      tier: 'basic',
      role: 'User',
    };
    const db = dummyDB.getUser();
    db.user = mockUser;
    dummyDB.resetDB();
    setUser(mockUser);
    setLoading(false);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
  };

  const handleUpgradeTier = async (planDetails) => {
    setLoading(true);
    const result = await dummyDB.processPayment(planDetails);
    if (result.success) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  const toggleDarkMode = () => {};

  const addToast = (message, type = 'info') => {
    console.log(`Toast: ${message}`);
  };

  const removeToast = (id) => {};

  const triggerDemoAlert = () => {};

  const addVehicle = (newVeh) => {};

  const markMaintenanceDone = (id) => {};

  const inviteTeamMember = (member) => {};

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: user !== null,
        subscriptionTier: user?.tier || null,
        vehicles,
        drivers,
        alerts,
        maintenance,
        team,
        login,
        signup,
        logout,
        handleUpgradeTier,
        toggleDarkMode,
        addToast,
        removeToast,
        triggerDemoAlert,
        addVehicle,
        markMaintenanceDone,
        inviteTeamMember,
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