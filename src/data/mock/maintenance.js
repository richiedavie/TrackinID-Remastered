export const initialMaintenance = [
  {
    id: 'm1',
    vehicleId: 'v2',
    vehicle: 'Heavy Truck TX-04',
    serviceType: 'Brake Replacement & Battery Check',
    dueDate: '2026-08-10',
    progressPct: 15,
    status: 'overdue', // upcoming, overdue, done
    estimatedCost: 'Rp 2,500,000'
  },
  {
    id: 'm2',
    vehicleId: 'v1',
    vehicle: 'Logistics Van #01',
    serviceType: 'Oil & Filter Change',
    dueDate: '2026-08-18',
    progressPct: 40,
    status: 'upcoming',
    estimatedCost: 'Rp 650,000'
  },
  {
    id: 'm3',
    vehicleId: 'v5',
    vehicle: 'City Pickup #05',
    serviceType: 'Tire Rotation & Alignment',
    dueDate: '2026-08-28',
    progressPct: 75,
    status: 'upcoming',
    estimatedCost: 'Rp 450,000'
  },
  {
    id: 'm4',
    vehicleId: 'v3',
    vehicle: 'Delivery Express #08',
    serviceType: 'Comprehensive 20k Inspection',
    dueDate: '2026-07-20',
    progressPct: 100,
    status: 'done',
    estimatedCost: 'Rp 1,200,000'
  }
];
