import type { CSSProperties } from "react";

/**
 * How an element enters: "up" rises into place (text), "scale" rises and settles (large blocks),
 * "visual" drifts in lightly and slowly (product visuals), and "from-left"/"from-right" do the same
 * from the side on wide screens.
 */
export type RevealFrom = "up" | "scale" | "visual" | "from-left" | "from-right";

/** Props that mark an element for the scroll reveal (see globals.css and RevealObserver). */
export function reveal(from: RevealFrom = "up", delayMs = 0) {
  return {
    "data-reveal": from,
    style: delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined,
  };
}

/**
 * Runs in <head> before first paint: arms the hidden state only when motion is welcome and the
 * observer can run. If the app has not taken over within a few seconds (script blocked, slow
 * device), it disarms so content is never left invisible.
 */
export const revealBootScript = `(function(){try{var d=document.documentElement;if(!("IntersectionObserver" in window)||!matchMedia("(prefers-reduced-motion: no-preference)").matches)return;d.setAttribute("data-motion","ready");window.__revealTimer=setTimeout(function(){window.__revealExpired=true;d.removeAttribute("data-motion")},4000)}catch(e){}})()`;
