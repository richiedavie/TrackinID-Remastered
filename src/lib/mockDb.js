const USERS_KEY = 'trackinid_users';
const SESSION_KEY = 'trackinid_session';

const DEFAULT_USERS = [
  {
    id: 'u_default',
    name: 'Rusdih Operations',
    email: 'rusdih@trackin.id',
    password: 'password123',
    companyName: 'PT Bandung Transport',
    userType: 'business',
    plan: 'pro',
    planActivatedAt: '2026-08-02T00:00:00.000Z',
    billingCycle: 'monthly'
  }
];

function initDb() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
}

// Initialize database when this module is imported
initDb();

export function getAllUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading users from localStorage', e);
    return [];
  }
}

export function createUser({ name, email, password, companyName }) {
  const users = getAllUsers();
  const newUser = {
    id: `u_${Date.now()}`,
    name,
    email: email.toLowerCase().trim(),
    password,
    companyName,
    userType: null,
    plan: null,
    planActivatedAt: null,
    billingCycle: null
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
}

export function findUserByEmail(email) {
  if (!email) return null;
  const users = getAllUsers();
  const targetEmail = email.toLowerCase().trim();
  return users.find((u) => u.email === targetEmail) || null;
}

export function validateLogin(email, password) {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY) || null;
}

export function setSession(userId) {
  if (userId) {
    localStorage.setItem(SESSION_KEY, userId);
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateUser(userId, partialFields) {
  const users = getAllUsers();
  const updatedUsers = users.map((u) => {
    if (u.id === userId) {
      return { ...u, ...partialFields };
    }
    return u;
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  
  const updatedUser = updatedUsers.find((u) => u.id === userId);
  return updatedUser || null;
}

export function getCurrentUser() {
  const userId = getSession();
  if (!userId) return null;
  const users = getAllUsers();
  return users.find((u) => u.id === userId) || null;
}
