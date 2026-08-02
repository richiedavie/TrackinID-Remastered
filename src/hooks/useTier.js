import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { TIERS } from '../config/tiers';

export function useTier() {
  const { user } = useAuth();
  const { subscriptionTier: appTier } = useApp();
  const subscriptionTier = user?.plan || appTier;
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