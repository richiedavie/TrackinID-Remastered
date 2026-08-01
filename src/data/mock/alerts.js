export const alerts = [
  {
    id: 'a1',
    type: 'security',
    message: 'Geofence Exit Violation: Vehicle BYD-typeshi exited Bandung hub.',
    timestamp: '2 hours ago',
    isRead: false
  },
  {
    id: 'a2',
    type: 'maintenance',
    message: 'Oil Change & Brake pads inspection required for B 8899 FLT.',
    timestamp: '5 hours ago',
    isRead: false
  },
  {
    id: 'a3',
    type: 'security',
    message: 'Sudden acceleration / harsh braking event logged by Rusdih on Route 4.',
    timestamp: '1 day ago',
    isRead: true
  },
  {
    id: 'a4',
    type: 'maintenance',
    message: 'Tire pressure low warning on D 4567 LGT.',
    timestamp: '2 days ago',
    isRead: true
  }
];

export const initialAlerts = alerts;
