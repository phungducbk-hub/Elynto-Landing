import { daysBetween } from "./time";
import type { StatsEvent } from "./types";

export type Granularity = "day" | "month" | "year";

export type Totals = {
  demoViews: number;
  workCards: number;
  workLists: number;
  signupAfterDemo: number;

  /** Distinct browsers (the random visitor ID), however often they came back. */
  visitors: number;
  /** Distinct visits; a visit ends after 30 minutes without activity. */
  visits: number;
  pageviews: number;
  newVisitors: number;
  returningVisitors: number;
  signupClicks: number;
  loginClicks: number;
  /** Distinct visitors who clicked Start free trial at least once. */
  signupVisitors: number;
  loginVisitors: number;
  /** Share of visits that saw a single page (0–1). */
  bounceRate: number;
  pagesPerVisit: number;
};

export type PeriodRow = {
  demoViews: number;
  workCards: number;
  workLists: number;
  signupAfterDemo: number;

  key: string;
  visitors: number;
  visits: number;
  pageviews: number;
  signupClicks: number;
  loginClicks: number;
};

export type BreakdownRow = { value: string; visitors: number; pageviews: number };

export const breakdownDimensions = [
  "device",
  "browser",
  "os",
  "country",
  "lang",
  "path",
  "referrer",
  "utmSource",
  "utmCampaign",
] as const;
export type BreakdownDimension = (typeof breakdownDimensions)[number];

export type CtaLocationRow = { location: string; signup: number; login: number };

export type StatsReport = {
  from: string;
  to: string;
  granularity: Granularity;
  totals: Totals;
  periods: PeriodRow[];
  breakdowns: Record<BreakdownDimension, BreakdownRow[]>;
  ctaLocations: CtaLocationRow[];
};

export function periodKey(day: string, granularity: Granularity) {
  return granularity === "day" ? day : granularity === "month" ? day.slice(0, 7) : day.slice(0, 4);
}

/** Ordered milestones, counted once per visit. Replays and duplicate beacons do not inflate the funnel. */
export function demoFunnel(events: StatsEvent[]) {
  const visits = new Map<string, { view: boolean; card: boolean; list: boolean; signup: boolean }>();
  const order = (event: StatsEvent) => event.type === "demo"
    ? event.stage === "view" ? 1 : event.stage === "work_card" ? 2 : 3
    : event.type === "cta" ? 4 : 0;
  for (const event of [...events].sort((a, b) => a.ts - b.ts || order(a) - order(b))) {
    const key = `${event.visitor}:${event.visit}`;
    const state = visits.get(key) ?? { view: false, card: false, list: false, signup: false };
    if (event.type === "demo") {
      if (event.stage === "view") state.view = true;
      if (event.stage === "work_card" && state.view) state.card = true;
      if (event.stage === "work_list" && state.card) state.list = true;
    }
    if (event.type === "cta" && event.cta === "signup" && state.list) state.signup = true;
    visits.set(key, state);
  }
  const rows = [...visits.values()];
  return {
    demoViews: rows.filter(row => row.view).length,
    workCards: rows.filter(row => row.card).length,
    workLists: rows.filter(row => row.list).length,
    signupAfterDemo: rows.filter(row => row.signup).length,
  };
}

function totalsOf(events: StatsEvent[]): Totals {
  const visitors = new Set<string>();
  const visits = new Set<string>();
  const newVisitors = new Set<string>();
  const signupVisitors = new Set<string>();
  const loginVisitors = new Set<string>();
  const pagesInVisit = new Map<string, number>();
  let pageviews = 0;
  let signupClicks = 0;
  let loginClicks = 0;

  for (const event of events) {
    visitors.add(event.visitor);
    visits.add(event.visit);
    if (event.type === "pageview") {
      pageviews++;
      pagesInVisit.set(event.visit, (pagesInVisit.get(event.visit) ?? 0) + 1);
      if (event.isNewVisitor) newVisitors.add(event.visitor);
    } else if (event.cta === "signup") {
      signupClicks++;
      signupVisitors.add(event.visitor);
    } else if (event.cta === "login") {
      loginClicks++;
      loginVisitors.add(event.visitor);
    }
  }

  const viewedVisits = pagesInVisit.size;
  const bounced = [...pagesInVisit.values()].filter((count) => count === 1).length;
  return {
    ...demoFunnel(events),
    visitors: visitors.size,
    visits: visits.size,
    pageviews,
    newVisitors: newVisitors.size,
    returningVisitors: visitors.size - newVisitors.size,
    signupClicks,
    loginClicks,
    signupVisitors: signupVisitors.size,
    loginVisitors: loginVisitors.size,
    bounceRate: viewedVisits ? bounced / viewedVisits : 0,
    pagesPerVisit: viewedVisits ? pageviews / viewedVisits : 0,
  };
}

/** Turns raw events into everything the dashboard shows for one date range. */
export function aggregate(allEvents: StatsEvent[], from: string, to: string, granularity: Granularity): StatsReport {
  const events = allEvents.filter((event) => event.day >= from && event.day <= to);

  // Every period in the range appears, including ones with no traffic.
  const keys = [...new Set(daysBetween(from, to).map((day) => periodKey(day, granularity)))];
  const byPeriod = new Map<string, StatsEvent[]>(keys.map((key) => [key, []]));
  for (const event of events) byPeriod.get(periodKey(event.day, granularity))?.push(event);

  const periods = keys.map((key) => {
    const t = totalsOf(byPeriod.get(key)!);
    return {
      key,
      demoViews: t.demoViews, workCards: t.workCards, workLists: t.workLists, signupAfterDemo: t.signupAfterDemo,
      visitors: t.visitors,
      visits: t.visits,
      pageviews: t.pageviews,
      signupClicks: t.signupClicks,
      loginClicks: t.loginClicks,
    };
  });

  const breakdowns = Object.fromEntries(
    breakdownDimensions.map((dimension) => {
      const rows = new Map<string, { visitors: Set<string>; pageviews: number }>();
      for (const event of events) {
        if (event.type !== "pageview") continue;
        const value = String(event[dimension] ?? "");
        const row = rows.get(value) ?? { visitors: new Set<string>(), pageviews: 0 };
        row.visitors.add(event.visitor);
        row.pageviews++;
        rows.set(value, row);
      }
      const sorted = [...rows.entries()]
        .map(([value, row]) => ({ value, visitors: row.visitors.size, pageviews: row.pageviews }))
        .sort((a, b) => b.visitors - a.visitors || b.pageviews - a.pageviews || a.value.localeCompare(b.value));
      return [dimension, sorted];
    }),
  ) as Record<BreakdownDimension, BreakdownRow[]>;

  const locations = new Map<string, CtaLocationRow>();
  for (const event of events) {
    if (event.type !== "cta" || !event.cta) continue;
    const location = event.location ?? "";
    const row = locations.get(location) ?? { location, signup: 0, login: 0 };
    row[event.cta]++;
    locations.set(location, row);
  }
  const ctaLocations = [...locations.values()].sort(
    (a, b) => b.signup + b.login - (a.signup + a.login) || a.location.localeCompare(b.location),
  );

  return { from, to, granularity, totals: totalsOf(events), periods, breakdowns, ctaLocations };
}
