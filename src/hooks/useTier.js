import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';

export function useTier() {
  const { plan, vehicles } = useApp();
  const currentTier = TIERS[plan] || TIERS.basic;

  const canAccess = (featureKey) => {
    const val = currentTier.features[featureKey];
    return Boolean(val);
  };

  const getFeatureValue = (featureKey) => {
    return currentTier.features[featureKey];
  };

  const isVehicleCapReached = vehicles.length >= currentTier.maxVehicles;

  return {
    currentTier,
    plan,
    canAccess,
    getFeatureValue,
    maxVehicles: currentTier.maxVehicles,
    isVehicleCapReached,
  };
}
