/**
 * Meta Pixel helper for firing conversion events reliably and safely.
 */

let hasFiredLead = false;

export function trackLeadOnce(): void {
  try {
    if (typeof window === 'undefined') return;

    // Guard: fire strictly once per page/browser session
    if (hasFiredLead || sessionStorage.getItem('brainoro_lead_fired') === 'true') {
      return;
    }

    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead');
      hasFiredLead = true;
      sessionStorage.setItem('brainoro_lead_fired', 'true');
    }
  } catch {
    // Fail silently so auth and navigation flows are never interrupted
  }
}
