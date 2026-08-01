export const initialData = {
  user: {
    id: 'usr_101',
    name: 'Akina',
    email: 'sausageedric@gmail.com',
    tier: 'basic',
    role: 'Admin',
  },
  payments: [
    {
      id: 'pay_001',
      amount: '140K',
      plan: 'Basic Pack',
      status: 'completed',
      date: '2026-04-01',
    },
  ],
  vehicles: [
    { id: 'v1', plate: 'Ngawicar', status: 'Active', location: 'Jakarta' },
    { id: 'v2', plate: 'BYD-typeshi', status: 'Idle', location: 'Bandung' },
  ],
};