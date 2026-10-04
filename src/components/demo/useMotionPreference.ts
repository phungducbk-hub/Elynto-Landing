"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** True when the visitor asked the OS/browser to reduce motion. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/** Fires `onChange(true|false)` as the element enters/leaves the viewport. */
export function observeVisibility(element: Element, threshold: number, onChange: (visible: boolean, ratio: number) => void) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) onChange(entry.isIntersecting, entry.intersectionRatio);
    },
    { threshold: [0, threshold, 0.5] },
  );
  observer.observe(element);
  return () => observer.disconnect();
}
