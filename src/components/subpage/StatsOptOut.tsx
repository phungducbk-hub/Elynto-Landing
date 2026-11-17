"use client";

import { useSyncExternalStore } from "react";
import { serverStatisticsChoice, setStatsOptOut, statisticsChoice, subscribeStatisticsChoice } from "@/lib/stats/client";

type Copy = { on: string; off: string; signal: string; disable: string; enable: string };

export function StatsOptOut({ copy }: { copy: Copy }) {
  const choice = useSyncExternalStore(subscribeStatisticsChoice, statisticsChoice, serverStatisticsChoice);
  const allowed = choice === "allow";
  return (
    <div className="mt-5">
      <button type="button" onClick={() => setStatsOptOut(allowed)} disabled={choice === "server" || choice === "signal"}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line-strong bg-surface px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-60">
        {allowed ? copy.disable : copy.enable}
      </button>
      <p role="status" className="mt-3 min-h-6 text-sm leading-relaxed text-ink-muted">
        {choice === "server" ? "" : choice === "signal" ? copy.signal : allowed ? copy.on : copy.off}
      </p>
    </div>
  );
}
