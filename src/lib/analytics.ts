/**
 * Analytics hooks — no third-party service is connected.
 *
 * Every event is:
 *  1. pushed to `window.dataLayer` (picked up automatically if Google Tag Manager
 *     or a compatible tag manager is added later), and
 *  2. dispatched as a `elynto:analytics` CustomEvent on `window`, so any approved
 *     tracking script can subscribe without touching component code.
 *
 * Elements can also be tracked declaratively with data attributes, handled by
 * <AnalyticsListener />:
 *   <a data-track="cta_click" data-track-location="hero" data-track-cta="signup">
 */

export type AnalyticsEvent =
  | "cta_click"
  | "nav_click"
  | "language_switch"
  | "mobile_menu_toggle"
  | "demo_view"
  | "demo_play"
  | "demo_pause"
  | "demo_replay"
  | "example_select"
  | "view_tab_select"
  | "faq_toggle"
  | "testimonials_motion_toggle";

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    ...props,
    page_language: document.documentElement.lang || undefined,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("elynto:analytics", { detail: payload }));

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }
}

/** Converts `{ event, ...props }` into data-track attributes for server components. */
export function trackAttrs(event: AnalyticsEvent, props: Record<string, string> = {}) {
  const attrs: Record<string, string> = { "data-track": event };
  for (const [key, value] of Object.entries(props)) {
    attrs[`data-track-${key}`] = value;
  }
  return attrs;
}
