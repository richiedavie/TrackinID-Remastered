export const initialAlerts = [
  {
    id: 'a1',
    type: 'geofence', // geofence, speed, maintenance, theft, engine
    title: 'Geofence Exit Violation',
    message: 'Executive Sedan #02 exited assigned zone (Tanah Abang Depot).',
    severity: 'critical', // info, warning, critical
    vehicle: 'Executive Sedan #02',
    timestamp: '10 mins ago',
    sentViaChannels: true,
    read: false
  },
  {
    id: 'a2',
    type: 'speed',
    title: 'Excessive Speed Warning',
    message: 'Heavy Truck TX-04 exceeded speed limit (82 km/h in 60 zone).',
    severity: 'warning',
    vehicle: 'Heavy Truck TX-04',
    timestamp: '45 mins ago',
    sentViaChannels: true,
    read: false
  },
  {
    id: 'a3',
    type: 'maintenance',
    title: 'Scheduled Brake Service Due',
    message: 'Logistics Van #01 has reached 40% brake efficiency rating.',
    severity: 'info',
    vehicle: 'Logistics Van #01',
    timestamp: '2 hours ago',
    sentViaChannels: false,
    read: true
  },
  {
    id: 'a4',
    type: 'engine',
    title: 'Battery Voltage Low',
    message: 'Heavy Truck TX-04 reported low battery voltage (11.4V).',
    severity: 'warning',
    vehicle: 'Heavy Truck TX-04',
    timestamp: '5 hours ago',
    sentViaChannels: true,
    read: true
  }
];
