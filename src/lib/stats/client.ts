import type { CollectPayload, StatsCta } from "./types";

const VISITOR_KEY = "elynto-vid";
const VISIT_KEY = "elynto-visit";
export const STATS_OPT_OUT_KEY = "elynto-stats-optout";

/** A visit ends after this long without a page view or click. */
const VISIT_TIMEOUT_MS = 30 * 60 * 1000;

// Used when storage is blocked, so a page still counts once.
const memory = new Map<string, string>();

function read(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
}

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Visitors can switch statistics off on the Cookies page; GPC and Do Not Track are honoured too. */
export function statsOptedOut() {
  if (read(STATS_OPT_OUT_KEY) === "1") return true;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || navigator.doNotTrack === "1";
}

export function setStatsOptOut(optOut: boolean) {
  if (optOut) {
    write(STATS_OPT_OUT_KEY, "1");
  } else {
    try {
      window.localStorage.removeItem(STATS_OPT_OUT_KEY);
    } catch {
      memory.delete(STATS_OPT_OUT_KEY);
    }
  }
}

function identity() {
  let visitor = read(VISITOR_KEY);
  const isNewVisitor = !visitor;
  if (!visitor) {
    visitor = randomId();
    write(VISITOR_KEY, visitor);
  }

  const now = Date.now();
  let visit: { id: string; last: number } | null = null;
  try {
    visit = JSON.parse(read(VISIT_KEY) ?? "null");
  } catch {
    visit = null;
  }
  if (!visit || typeof visit.id !== "string" || now - visit.last > VISIT_TIMEOUT_MS) visit = { id: randomId(), last: now };
  write(VISIT_KEY, JSON.stringify({ id: visit.id, last: now }));

  return { visitor, visit: visit.id, isNewVisitor };
}

function send(payload: Omit<CollectPayload, "visitor" | "visit" | "isNewVisitor" | "touch">) {
  if (statsOptedOut()) return;
  const { visitor, visit, isNewVisitor } = identity();
  const body = JSON.stringify({
    ...payload,
    visitor,
    visit,
    isNewVisitor: payload.type === "pageview" && isNewVisitor,
    touch: navigator.maxTouchPoints > 0,
  } satisfies CollectPayload);

  // sendBeacon survives the page unloading, which matters for clicks that leave the site.
  const sent = typeof navigator.sendBeacon === "function" && navigator.sendBeacon("/api/collect", new Blob([body], { type: "application/json" }));
  if (!sent) {
    fetch("/api/collect", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
  }
}

export function recordPageview() {
  const params = new URLSearchParams(window.location.search);
  send({
    type: "pageview",
    path: window.location.pathname,
    lang: document.documentElement.lang,
    referrer: document.referrer || undefined,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
  });
}

export function recordCtaClick(cta: StatsCta, location: string | undefined) {
  send({ type: "cta", cta, location, path: window.location.pathname, lang: document.documentElement.lang });
}
