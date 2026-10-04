"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Tracks clicks on any element carrying `data-track="<event>"`.
 * `data-track-foo="bar"` attributes become `{ foo: "bar" }` event properties.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const el = target?.closest<HTMLElement>("[data-track]");
      if (!el) return;

      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track" && value !== undefined) {
          const name = key.slice("track".length);
          props[name.charAt(0).toLowerCase() + name.slice(1)] = value;
        }
      }
      const href = el.getAttribute("href");
      if (href) props.href = href;

      track(el.dataset.track as AnalyticsEvent, props);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
