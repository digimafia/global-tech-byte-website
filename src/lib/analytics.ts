/**
 * GA4 is not installed yet — this is a safe no-op wrapper so conversion
 * events are already wired at the right call sites. Once a GA4 script tag
 * (gtag.js) is added to index.html, these calls start working with no
 * further changes needed. Never pass personal form field values here —
 * event names only, with non-identifying params at most.
 */
type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GtagFn
  }
}

export type AnalyticsEvent =
  | 'project_enquiry_submit'
  | 'internship_enquiry_submit'
  | 'contact_form_submit'
  | 'phone_click'
  | 'email_click'
  | 'whatsapp_click'
  | 'career_application_click'

export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
