import type { CollectPayload, DemoStage, StatsCta } from "./types";

const VISITOR_KEY = "elynto-vid";
const VISIT_KEY = "elynto-visit";
export const STATS_OPT_OUT_KEY = "elynto-stats-optout";
export const STATS_CONSENT_KEY = "elynto-stats-consent";
export const STATS_CHOICE_EVENT = "elynto:statistics-choice";
export type StatisticsChoice = "allow" | "deny" | "unset" | "signal" | "server";

/** A visit ends after this long without a page view or click. */
const VISIT_TIMEOUT_MS = 30 * 60 * 1000;

// Used when storage is blocked, so a page still counts once.
const memory = new Map<string, string>();

function read(key: string) {
  if (memory.has(key)) return memory.get(key)!;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
    memory.delete(key);
  } catch {
    memory.set(key, value);
  }
}

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** No optional collection or visitor ID until explicit, versioned consent. */
export function statisticsChoice(): StatisticsChoice {
  if (typeof window === "undefined") return "server";
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.globalPrivacyControl === true || navigator.doNotTrack === "1") return "signal";
  if (read(STATS_OPT_OUT_KEY) === "1" || read(STATS_CONSENT_KEY) === "v1:no") return "deny";
  return read(STATS_CONSENT_KEY) === "v1:yes" ? "allow" : "unset";
}

export function serverStatisticsChoice(): StatisticsChoice { return "server"; }

export function subscribeStatisticsChoice(listener: () => void) {
  window.addEventListener(STATS_CHOICE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(STATS_CHOICE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

export function statsOptedOut() {
  return statisticsChoice() !== "allow";
}

export function setStatsOptOut(optOut: boolean) {
  write(STATS_CONSENT_KEY, optOut ? "v1:no" : "v1:yes");
  if (optOut) {
    write(STATS_OPT_OUT_KEY, "1");
    for (const key of [VISITOR_KEY, VISIT_KEY]) {
      memory.delete(key);
      try { window.localStorage.removeItem(key); } catch { /* Blocked storage. */ }
    }
  } else {
    memory.delete(STATS_OPT_OUT_KEY);
    try {
      window.localStorage.removeItem(STATS_OPT_OUT_KEY);
    } catch {
      memory.delete(STATS_OPT_OUT_KEY);
    }
  }
  if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event(STATS_CHOICE_EVENT));
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

function send(payload: Omit<CollectPayload, "visitor" | "visit" | "isNewVisitor" | "touch" | "consentVersion">) {
  if (statsOptedOut()) return;
  const { visitor, visit, isNewVisitor } = identity();
  const body = JSON.stringify({
    ...payload,
    consentVersion: 1,
    visitor,
    visit,
    isNewVisitor: payload.type === "pageview" && isNewVisitor,
    touch: navigator.maxTouchPoints > 0,
    occurredAt: Date.now(),
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

/** Only the milestone is recorded, never the sample command, names or work content. */
export function recordDemoStage(stage: DemoStage) {
  send({ type: "demo", stage, path: window.location.pathname, lang: document.documentElement.lang });
}
