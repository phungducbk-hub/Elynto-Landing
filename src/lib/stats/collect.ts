import { dayKey } from "./time";
import type { CollectPayload, StatsEvent } from "./types";
import { describeUserAgent } from "./user-agent";

const ID = /^[a-zA-Z0-9-]{8,64}$/;
const SLUG = /^[a-z0-9_-]{1,40}$/;

function clean(value: unknown, max = 80) {
  if (typeof value !== "string") return undefined;
  const text = value.trim().slice(0, max);
  return text || undefined;
}

/** Host of an external referrer; internal navigation and unparsable values count as direct. */
function referrerHost(value: unknown, ownHost: string | null) {
  if (typeof value !== "string" || !value) return undefined;
  try {
    const host = new URL(value).hostname.replace(/^www\./, "");
    const own = ownHost?.split(":")[0].replace(/^www\./, "");
    return host && host !== own ? host.slice(0, 80) : undefined;
  } catch {
    return undefined;
  }
}

/** Validates what the browser sent and turns it into a stored event, or null if it's not acceptable. */
export function toStatsEvent(
  body: unknown,
  context: { userAgent: string; country: string | null; host: string | null; now?: number },
): StatsEvent | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Partial<CollectPayload>;
  if (input.consentVersion !== 1) return null;

  if (input.type !== "pageview" && input.type !== "cta" && input.type !== "demo") return null;
  if (typeof input.visitor !== "string" || !ID.test(input.visitor)) return null;
  if (typeof input.visit !== "string" || !ID.test(input.visit)) return null;
  if (typeof input.path !== "string" || !input.path.startsWith("/") || input.path.length > 200) return null;
  if (input.type === "cta" && input.cta !== "signup" && input.cta !== "login") return null;

  if (input.type === "demo" && input.stage !== "view" && input.stage !== "work_card" && input.stage !== "work_list") return null;

  const now = context.now ?? Date.now();
  // Beacons may reach the server out of order. Bound browser clock drift and never accept arbitrary dates.
  const occurredAt = typeof input.occurredAt === "number" && Number.isFinite(input.occurredAt)
    && Math.abs(input.occurredAt - now) <= 5 * 60 * 1000 ? input.occurredAt : now;
  const country = context.country && /^[A-Z]{2}$/.test(context.country) ? context.country : undefined;
  const location = typeof input.location === "string" && SLUG.test(input.location) ? input.location : undefined;

  return {
    ts: occurredAt,
    day: dayKey(occurredAt),
    type: input.type,
    visitor: input.visitor,
    visit: input.visit,
    ...(input.isNewVisitor === true && input.type === "pageview" ? { isNewVisitor: true } : {}),
    path: input.path.split(/[?#]/)[0],
    lang: input.lang === "vi" || input.lang === "en" ? input.lang : undefined,
    ...describeUserAgent(context.userAgent, input.touch === true),
    country,
    referrer: referrerHost(input.referrer, context.host),
    utmSource: clean(input.utmSource),
    utmMedium: clean(input.utmMedium),
    utmCampaign: clean(input.utmCampaign),
    ...(input.type === "cta" ? { cta: input.cta, location } : {}),
    ...(input.type === "demo" ? { stage: input.stage } : {}),
  };
}
