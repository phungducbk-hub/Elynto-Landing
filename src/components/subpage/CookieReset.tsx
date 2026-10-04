"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { LOCALE_COOKIE } from "@/lib/i18n";

/** Clears the remembered language (cookie + localStorage) — the only thing this site stores. */
export function CookieReset({ label, done }: { label: string; done: string }) {
  const [cleared, setCleared] = useState(false);

  const clear = () => {
    try {
      document.cookie = `${LOCALE_COOKIE}=; path=/; max-age=0; samesite=lax`;
      window.localStorage.removeItem(LOCALE_COOKIE);
    } catch {
      // Storage can be blocked; the cookie removal above still applies.
    }
    setCleared(true);
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={clear}
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-surface px-5 text-[0.9375rem] font-semibold text-ink ring-1 ring-line-strong transition-colors ring-inset hover:bg-sunken"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        {label}
      </button>
      <p role="status" className="mt-3 min-h-6 text-sm font-medium text-status-done">
        {cleared ? done : ""}
      </p>
    </div>
  );
}
