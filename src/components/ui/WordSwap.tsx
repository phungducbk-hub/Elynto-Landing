"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type SwapWord = {
  text: string;
  /** Pill background for this word. */
  pillClassName: string;
};

/** How long each word stays before the next one rolls in. */
const HOLD_MS = 2600;

// Vertical padding clears ascenders and descenders inside the clipped pill; the matching negative
// margin keeps the pill from making its line taller than the others.
const pillBase =
  "-my-[0.12em] inline-block rounded-full px-[0.32em] py-[0.12em] text-[0.92em] font-semibold whitespace-nowrap align-baseline";

/**
 * A word in a tinted pill that cycles through alternatives, after Notion's hero: the old word rolls
 * up and out, the new one rolls in, and the pill changes colour and eases to the new width, carrying
 * the rest of the line with it. Decorative — the caller gives assistive tech the full sentence.
 * Holds the first word under reduced motion, and only cycles while on screen.
 */
export function WordSwap({ words }: { words: SwapWord[] }) {
  const [{ index, previous }, setState] = useState<{ index: number; previous: number | null }>({
    index: 0,
    previous: null,
  });
  const [widths, setWidths] = useState<number[]>([]);
  const pillRef = useRef<HTMLSpanElement>(null);
  const measureRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Width of each word's pill, measured from hidden copies. Re-measured when the web font arrives
  // or the heading's fluid type size changes.
  useLayoutEffect(() => {
    const measure = () => setWidths(measureRefs.current.map((el) => el?.offsetWidth ?? 0));
    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    const line = pillRef.current?.closest("[data-swap-line]");
    if (line) observer.observe(line);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill || words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let onScreen = false;
    const schedule = () => {
      window.clearTimeout(timer);
      if (onScreen && !document.hidden) timer = window.setTimeout(advance, HOLD_MS);
    };
    const advance = () => {
      setState((s) => ({ index: (s.index + 1) % words.length, previous: s.index }));
      schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      schedule();
    });
    observer.observe(pill);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [words.length]);

  const current = words[index];

  return (
    <span className="relative inline-block">
      <span
        ref={pillRef}
        className={cn(
          pillBase,
          "[overflow:clip] transition-[width,background-color] duration-500 ease-[var(--ease-out-expo)]",
          current.pillClassName,
        )}
        style={{ width: widths[index] || undefined }}
      >
        <span className="relative inline-block">
          {previous !== null ? (
            <span key={`out-${previous}`} className="absolute top-0 left-0 animate-word-out">
              {words[previous].text}
            </span>
          ) : null}
          <span key={`in-${index}`} className={cn("inline-block", previous !== null && "animate-word-in")}>
            {current.text}
          </span>
        </span>
      </span>

      {words.map((word, i) => (
        <span
          key={word.text}
          ref={(el) => {
            measureRefs.current[i] = el;
          }}
          className={cn(pillBase, "pointer-events-none invisible absolute top-0 left-0")}
        >
          {word.text}
        </span>
      ))}
    </span>
  );
}
