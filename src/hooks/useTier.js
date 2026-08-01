import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';

export function useTier() {
  const { subscriptionTier } = useApp();
  const currentTier = TIERS[subscriptionTier] || TIERS.basic;

  const canAccess = (featureKey) => {
    const val = currentTier.features?.[featureKey];
    return Boolean(val);
  };

  const getFeatureValue = (featureKey) => {
    return currentTier.features?.[featureKey];
  };

  const maxVehiclesAllowed = currentTier.maxVehicles;
  const canAccessPredictiveMaintenance = Boolean(currentTier.features?.aiPredictiveMaintenance);
  const canAccessRouteOptimization = Boolean(currentTier.features?.aiRouteOptimization);
  const canAccessVideoTelematics = Boolean(currentTier.features?.videoTelematics);
  const canAccessReports = Boolean(currentTier.features?.reports);

  return {
    subscriptionTier,
    currentTier,
    canAccess,
    getFeatureValue,
    maxVehiclesAllowed,
    canAccessPredictiveMaintenance,
    canAccessRouteOptimization,
    canAccessVideoTelematics,
    canAccessReports,
  };
}