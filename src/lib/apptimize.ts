/**
 * Apptimize SDK Integration
 *
 * Apptimize is an A/B testing and feature flagging platform.
 * The web SDK is loaded via a script tag. This module provides
 * a typed wrapper around the global Apptimize API.
 *
 * Setup: Add the Apptimize script tag to index.html with your app key:
 * <script src="https://sdk.apptimize.com/apptimize-web-sdk.min.js"
 *         data-apptimize-app-key="YOUR_APP_KEY"></script>
 */

// Declare the global Apptimize object injected by the SDK script
declare global {
  interface Window {
    Apptimize?: {
      setup(appKey: string): void;
      isFeatureFlagOn(flagName: string): boolean;
      track(eventName: string, value?: number): void;
      setUserAttribute(key: string, value: string | number | boolean): void;
      getUserAttribute(key: string): string | number | boolean | undefined;
      removeUserAttribute(key: string): void;
      removeAllUserAttributes(): void;
      getVariantInfo(): Record<string, unknown>[];
      forceVariant(experimentId: string, variantId: string): void;
    };
  }
}

/**
 * Check if a feature flag is enabled.
 * Returns false if Apptimize SDK is not loaded.
 */
export function isFeatureFlagOn(flagName: string): boolean {
  if (!window.Apptimize) {
    console.warn('Apptimize SDK not loaded. Feature flag check skipped.');
    return false;
  }
  return window.Apptimize.isFeatureFlagOn(flagName);
}

/**
 * Track an event in Apptimize for A/B test analysis.
 */
export function trackEvent(eventName: string, value?: number): void {
  if (!window.Apptimize) {
    console.warn('Apptimize SDK not loaded. Event tracking skipped.');
    return;
  }
  window.Apptimize.track(eventName, value);
}

/**
 * Set a user attribute for targeting in experiments.
 */
export function setUserAttribute(
  key: string,
  value: string | number | boolean
): void {
  if (!window.Apptimize) {
    console.warn('Apptimize SDK not loaded. User attribute skipped.');
    return;
  }
  window.Apptimize.setUserAttribute(key, value);
}

/**
 * Initialize Apptimize with an app key.
 * Call this once at app startup if not using the script tag data attribute.
 */
export function initApptimize(appKey: string): void {
  if (!window.Apptimize) {
    console.warn('Apptimize SDK script not loaded in index.html.');
    return;
  }
  window.Apptimize.setup(appKey);
}
