import { useMemo } from 'react';
import { isFeatureFlagOn, trackEvent, setUserAttribute } from '../lib/apptimize';

/**
 * Hook to access Apptimize feature flags and event tracking.
 *
 * Usage:
 *   const { isFeatureOn, track } = useApptimize();
 *   if (isFeatureOn('new-profile-ui')) { ... }
 *   track('profile_saved');
 */
export function useApptimize() {
  return useMemo(
    () => ({
      isFeatureOn: isFeatureFlagOn,
      track: trackEvent,
      setUserAttribute,
    }),
    []
  );
}
