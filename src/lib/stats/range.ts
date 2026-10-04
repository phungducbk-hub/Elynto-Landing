import type { Granularity } from "./aggregate";
import { addDays, dayKey, isDayKey, spanInDays } from "./time";

export const rangePresets = ["today", "7d", "30d", "90d", "12m", "ytd", "custom"] as const;
export type RangePreset = (typeof rangePresets)[number];

export type StatsRange = {
  preset: RangePreset;
  from: string;
  to: string;
  granularity: Granularity;
  /** The same number of days just before `from`, for the "vs previous period" figures. */
  previous: { from: string; to: string };
};

/** Longest range the dashboard reads at once. */
const MAX_DAYS = 3 * 366;

type Params = Record<string, string | string[] | undefined>;
const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export function resolveRange(params: Params, now = Date.now()): StatsRange {
  const today = dayKey(now);
  const requested = one(params.range);
  const preset: RangePreset = rangePresets.includes(requested as RangePreset) ? (requested as RangePreset) : "30d";

  let from = today;
  let to = today;
  if (preset === "7d") from = addDays(today, -6);
  else if (preset === "30d") from = addDays(today, -29);
  else if (preset === "90d") from = addDays(today, -89);
  else if (preset === "12m") {
    const [y, m] = today.split("-").map(Number);
    const start = new Date(Date.UTC(y, m - 1 - 11, 1));
    from = start.toISOString().slice(0, 10);
  } else if (preset === "ytd") from = `${today.slice(0, 4)}-01-01`;
  else if (preset === "custom") {
    const a = one(params.from);
    const b = one(params.to);
    from = isDayKey(a) ? a : addDays(today, -29);
    to = isDayKey(b) ? b : today;
    if (from > to) [from, to] = [to, from];
    if (to > today) to = today;
    if (from > to) from = to;
    if (spanInDays(from, to) > MAX_DAYS) from = addDays(to, -(MAX_DAYS - 1));
  }

  const span = spanInDays(from, to);
  const requestedGranularity = one(params.by);
  let granularity: Granularity =
    requestedGranularity === "day" || requestedGranularity === "month" || requestedGranularity === "year"
      ? requestedGranularity
      : span <= 92
        ? "day"
        : "month";
  // A bar per day stops being readable past about a year.
  if (granularity === "day" && span > 400) granularity = "month";

  const previousTo = addDays(from, -1);
  return { preset, from, to, granularity, previous: { from: addDays(previousTo, -(span - 1)), to: previousTo } };
}
