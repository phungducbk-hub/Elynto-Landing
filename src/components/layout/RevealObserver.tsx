"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

declare global {
  interface Window {
    __revealTimer?: number;
    __revealExpired?: boolean;
  }
}

/** Marks [data-reveal] elements as revealed when they scroll into view, so they slide in once. */
export function RevealObserver() {
  const pathname = usePathname();

  // Layout effect: re-arm before paint (dev Strict Mode resets <html> attributes on remount).
  // Runs again on each route change, so pages reached by client-side navigation are observed too.
  useLayoutEffect(() => {
    const root = document.documentElement;
    window.clearTimeout(window.__revealTimer);

    if (!("IntersectionObserver" in window)) {
      root.removeAttribute("data-motion");
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (media.matches) {
        root.removeAttribute("data-motion");
        document.querySelectorAll("[data-reveal]").forEach(el => el.setAttribute("data-revealed", ""));
      }
    };
    if (media.matches) { root.removeAttribute("data-motion"); return; }
    media.addEventListener("change", onMotionChange);

    // A slow hydration can expire the boot fallback. Re-enable entrances below the fold,
    // while leaving already visible content in place.
    if (window.__revealExpired) {
      document.querySelectorAll("[data-reveal]").forEach(element => {
        const box = element.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) element.setAttribute("data-revealed", "");
      });
      window.__revealExpired = false;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px 8% 0px", threshold: 0.05 },
    );
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((element) => observer.observe(element));
    root.setAttribute("data-motion", "live");

    return () => { observer.disconnect(); media.removeEventListener("change", onMotionChange); };
  }, [pathname]);

  return null;
}
