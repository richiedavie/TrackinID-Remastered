import { useApp } from '../context/AppContext';
import { TIERS } from '../config/tiers';

export function useTier() {
  const { subscriptionTier } = useApp();
  const tier = subscriptionTier ? TIERS[subscriptionTier] : null;

  const canAccess = (feature) => {
    if (!tier || !tier.features) return false;
    return tier.features[feature] !== false && tier.features[feature] !== undefined;
  };

  const getFeatureValue = (feature) => {
    if (!tier || !tier.features) return false;
    return tier.features[feature];
  };

  const isVehicleCapReached = (count) => {
    if (!tier) return true;
    return count >= tier.maxVehicles;
  };

  const currentTier = tier;

  return { canAccess, getFeatureValue, isVehicleCapReached, currentTier };
}