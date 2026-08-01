export const TIERS = {
  basic: {
    id: 'basic',
    name: 'Basic Pack',
    maxVehicles: 1,
    features: {
      liveMap: true,
      alerts: 'basic',        // 'basic' | 'smart'
      maintenance: 'basic',   // 'basic' | 'advanced'
      driverBehavior: false,
      reports: false,         // false | 'summary' | 'full'
      teamManagement: false,
      apiIntegration: false,
      aiPredictiveMaintenance: false,
      aiRouteOptimization: false,
      videoTelematics: false,
    },
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced TrackID',
    maxVehicles: 5,
    features: {
      liveMap: true,
      alerts: 'basic',
      maintenance: 'basic',
      driverBehavior: true,
      reports: 'summary',
      teamManagement: false,
      apiIntegration: false,
      aiPredictiveMaintenance: false,
      aiRouteOptimization: false,
      videoTelematics: false,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro TrackID',
    maxVehicles: 20,
    features: {
      liveMap: true,
      alerts: 'smart',
      maintenance: 'advanced',
      driverBehavior: true,
      reports: 'full',
      teamManagement: true,
      apiIntegration: true,
      aiPredictiveMaintenance: false,
      aiRouteOptimization: false,
      videoTelematics: false,
    },
  },
  elite: {
    id: 'elite',
    name: 'Elite TrackID',
    maxVehicles: Infinity,
    features: {
      liveMap: true,
      alerts: 'smart',
      maintenance: 'advanced',
      driverBehavior: true,
      reports: 'full',
      teamManagement: true,
      apiIntegration: true,
      aiPredictiveMaintenance: true,
      aiRouteOptimization: true,
      videoTelematics: true,
    },
  },
};

export const FEATURE_NAMES = {
  driverBehavior: 'Driver Behavior Analytics',
  reports: 'Reports & Export',
  teamManagement: 'Team Management & Roles',
  apiIntegration: 'API & ERP Integration',
  aiPredictiveMaintenance: 'AI Predictive Maintenance',
  aiRouteOptimization: 'AI Route Optimization',
  videoTelematics: 'Video Telematics & Live Feeds',
};
