import { initialData } from './initialData';

const DB_KEY = 'trackinid_dummy_db';

const getDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

const saveDB = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

const simulateNetwork = (callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, 400);
  });
};

export const dummyDB = {
  getUser: () => simulateNetwork(() => getDB().user),

  processPayment: (planDetails) =>
    simulateNetwork(() => {
      const db = getDB();
      db.user.tier = planDetails.tier.toLowerCase();
      const newPayment = {
        id: `pay_${Date.now()}`,
        amount: planDetails.price,
        plan: planDetails.planName,
        status: 'completed',
        date: new Date().toISOString().split('T')[0],
      };
      db.payments.push(newPayment);
      saveDB(db);
      return { success: true, user: db.user, payment: newPayment };
    }),

  resetDB: () => simulateNetwork(() => {
    localStorage.removeItem(DB_KEY);
    return getDB();
  }),
};