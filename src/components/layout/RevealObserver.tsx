"use client";

import { useLayoutEffect } from "react";

declare global {
  interface Window {
    __revealTimer?: number;
    __revealExpired?: boolean;
  }
}

/** Marks [data-reveal] elements as revealed when they scroll into view, so they slide in once. */
export function RevealObserver() {
  // Layout effect: re-arm before paint (dev Strict Mode resets <html> attributes on remount).
  useLayoutEffect(() => {
    const root = document.documentElement;
    window.clearTimeout(window.__revealTimer);

    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (window.__revealExpired || !motionOk || !("IntersectionObserver" in window)) {
      root.removeAttribute("data-motion");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((element) => observer.observe(element));
    root.setAttribute("data-motion", "live");

    return () => observer.disconnect();
  }, []);

  return null;
}
