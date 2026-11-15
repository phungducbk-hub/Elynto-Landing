"use client";
import { usePrefersReducedMotion } from "@/components/demo/useMotionPreference";
import type { Locale } from "@/lib/i18n";

/** Page-only display preference; the OS setting always takes precedence. */
export function MotionPreference({lang}:{lang:Locale}) {
  const reduced = usePrefersReducedMotion();
  return <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-ink-muted">
    <input type="checkbox" checked={reduced} onChange={event => {
      document.documentElement.toggleAttribute("data-reduced-motion",event.target.checked);
      window.dispatchEvent(new Event("elynto-motion-change"));
    }} className="size-4 accent-brand" />
    {lang === "vi" ? "Giảm chuyển động" : "Reduce motion"}
  </label>;
}
