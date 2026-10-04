export type Device = "mobile" | "tablet" | "desktop";
export type StatsCta = "signup" | "login";

/** One recorded event. No IP address, no raw user agent, nothing that names a person. */
export type StatsEvent = {
  /** Epoch milliseconds. */
  ts: number;
  /** Calendar day in the stats time zone (YYYY-MM-DD). */
  day: string;
  type: "pageview" | "cta";
  /** Random ID kept in the visitor's browser: one per browser, across days. */
  visitor: string;
  /** Random ID for one visit; a new one starts after 30 minutes without activity. */
  visit: string;
  /** Set on the first pageview of a browser never seen before. */
  isNewVisitor?: boolean;
  path: string;
  lang?: string;
  device: Device;
  browser: string;
  os: string;
  /** ISO 3166 country code from the hosting edge (IP is not kept). */
  country?: string;
  /** Host of the external page that linked here; empty for direct visits. */
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  cta?: StatsCta;
  /** Where the button sat: hero, header, footer, final_cta… */
  location?: string;
};

/** What the browser sends to /api/collect. Device, browser, OS and country are derived on the server. */
export type CollectPayload = {
  type: "pageview" | "cta";
  visitor: string;
  visit: string;
  isNewVisitor?: boolean;
  path: string;
  lang?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  touch?: boolean;
  cta?: StatsCta;
  location?: string;
};
