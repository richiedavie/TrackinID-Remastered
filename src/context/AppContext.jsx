import { createContext, useContext, useState, useEffect } from 'react';
import { initialVehicles } from '../data/mock/vehicles';
import { initialDrivers } from '../data/mock/drivers';
import { initialAlerts } from '../data/mock/alerts';
import { initialMaintenance } from '../data/mock/maintenance';
import { initialTeam } from '../data/mock/team';
import { TIERS } from '../config/tiers';

const AppContext = createContext();

const USERS_KEY = 'trackin_id_users';
const SESSION_KEY = 'trackin_id_session';

function generateId() {
  return `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function AppProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [session, setSession] = useState(loadSession);
  const [darkMode, setDarkMode] = useState(false);

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [team, setTeam] = useState(initialTeam);

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    saveSession(session);
  }, [session]);

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
    const existing = users.find((u) => u.email === email);
    if (existing) {
      const sess = {
        userId: existing.id,
        name: existing.name,
        email: existing.email,
        userType: existing.userType,
        plan: existing.plan,
        billingCycle: existing.billingCycle,
        planActivatedAt: existing.planActivatedAt,
      };
      setSession(sess);
      if (existing.userType === 'consumer') {
        setVehicles((prev) => prev.slice(0, 1));
      } else if (vehicles.length === 1) {
        setVehicles(initialVehicles);
      }
      return sess;
    }
    const newUser = {
      id: generateId(),
      name: email.split('@')[0],
      email,
      password,
      userType: null,
      plan: null,
      billingCycle: null,
      planActivatedAt: null,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    const sess = {
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      userType: null,
      plan: null,
      billingCycle: null,
      planActivatedAt: null,
    };
    setSession(sess);
    return sess;
  };

  const signup = (name, email, password) => {
    const newUser = {
      id: generateId(),
      name,
      email,
      password,
      userType: null,
      plan: null,
      billingCycle: null,
      planActivatedAt: null,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    const sess = {
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      userType: null,
      plan: null,
      billingCycle: null,
      planActivatedAt: null,
    };
    setSession(sess);
    return sess;
  };

  const logout = () => {
    setSession(null);
    setVehicles(initialVehicles);
  };

  const setUserType = (type) => {
    if (!session) return;
    const updated = users.map((u) =>
      u.id === session.userId ? { ...u, userType: type } : u
    );
    setUsers(updated);
    const updatedSession = { ...session, userType: type };
    setSession(updatedSession);
    if (type === 'consumer') {
      setVehicles((prev) => prev.slice(0, 1));
    } else if (vehicles.length === 1) {
      setVehicles(initialVehicles);
    }
  };

  const activatePlan = (plan, billingCycle) => {
    if (!session) return;
    const updatedUsers = users.map((u) =>
      u.id === session.userId
        ? {
            ...u,
            plan,
            billingCycle,
            planActivatedAt: Date.now(),
          }
        : u
    );
    setUsers(updatedUsers);
    const updatedSession = {
      ...session,
      plan,
      billingCycle,
      planActivatedAt: Date.now(),
    };
    setSession(updatedSession);
    addToast(`Plan ${TIERS[plan]?.name || plan} activated!`, 'success');
  };

  const updatePlan = (newPlan) => {
    if (!session) return;
    const updatedUsers = users.map((u) =>
      u.id === session.userId ? { ...u, plan: newPlan } : u
    );
    setUsers(updatedUsers);
    const updatedSession = { ...session, plan: newPlan };
    setSession(updatedSession);
    addToast(`Successfully switched plan to ${TIERS[newPlan]?.name || newPlan}!`, 'success');
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
      type: 'speed',
      title: 'Demo Alert Triggered',
      message: `${randomVehicle.name} sudden acceleration detected on route.`,
      severity: 'warning',
      vehicle: randomVehicle.name,
      timestamp: 'Just now',
      sentViaChannels: TIERS[session?.plan]?.features?.alerts === 'smart',
      read: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    addToast(`ALERT: ${newAlert.title} - ${randomVehicle.name}`, 'warning');
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

  const isAuthenticated = session !== null;
  const hasPlan = session?.plan !== null && session?.plan !== undefined;
  const hasUserType = session?.userType !== null && session?.userType !== undefined;

  return (
    <AppContext.Provider
      value={{
        session,
        isAuthenticated,
        hasPlan,
        hasUserType,
        userType: session?.userType ?? null,
        plan: session?.plan ?? null,
        billingCycle: session?.billingCycle ?? null,
        planActivatedAt: session?.planActivatedAt ?? null,
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
        setUserType,
        activatePlan,
        updatePlan,
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