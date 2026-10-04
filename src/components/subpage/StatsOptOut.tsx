"use client";

import { useEffect, useState } from "react";
import { setStatsOptOut, STATS_OPT_OUT_KEY } from "@/lib/stats/client";

type Copy = { on: string; off: string; signal: string; disable: string; enable: string };

/** Lets a visitor stop (or resume) the site's own visit statistics for this browser. */
export function StatsOptOut({ copy }: { copy: Copy }) {
  // null until mounted: the choice lives in this browser, not on the server.
  const [state, setState] = useState<{ optedOut: boolean; signal: boolean } | null>(null);

  useEffect(() => {
    let optedOut = false;
    try {
      optedOut = window.localStorage.getItem(STATS_OPT_OUT_KEY) === "1";
    } catch {
      // Storage blocked: nothing can be remembered, nothing is stored either.
    }
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    // Reading browser-only settings after hydration is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ optedOut, signal: nav.globalPrivacyControl === true || navigator.doNotTrack === "1" });
  }, []);

  const toggle = () => {
    if (!state) return;
    setStatsOptOut(!state.optedOut);
    setState({ ...state, optedOut: !state.optedOut });
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={toggle}
        disabled={!state || state.signal}
        className="inline-flex h-11 items-center rounded-xl bg-surface px-5 text-[0.9375rem] font-semibold text-ink ring-1 ring-line-strong transition-colors ring-inset hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state?.optedOut ? copy.enable : copy.disable}
      </button>
      <p role="status" className="mt-3 min-h-6 text-sm font-medium text-ink-muted">
        {state ? (state.signal ? copy.signal : state.optedOut ? copy.off : copy.on) : ""}
      </p>
    </div>
  );
}
