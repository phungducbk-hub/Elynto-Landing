"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type SwapWord = {
  text: string;
  pillClassName: string;
};

type Phase = "holding" | "deleting" | "typing";
const HOLD_MS = 2_800;
const DELETE_MS = 85;
const TYPE_MS = 120;
const EMPTY_MS = 300;

/** Decorative typewriter; the heading supplies the full accessible sentence. */
export function WordSwap({ words }: { words: SwapWord[] }) {
  const [state, setState] = useState<{ index: number; chars: number; phase: Phase }>({
    index: 0,
    chars: Array.from(words[0]?.text ?? "").length,
    phase: "holding",
  });
  const [active, setActive] = useState(false);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    let inView = false;
    const sync = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => setState(current => ({
      ...current,
      chars: Array.from(words[current.index]?.text ?? "").length,
      phase: "holding",
    }));
    observer.observe(pill);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", onPreference);
    };
  }, [words]);

  useEffect(() => {
    if (!active || words.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced || state.phase === "holding" ? HOLD_MS
      : state.phase === "typing" ? TYPE_MS
      : state.chars === 0 ? EMPTY_MS : DELETE_MS;
    const timer = window.setTimeout(() => setState(current => {
      const nextIndex = (current.index + 1) % words.length;
      if (reduced) return { index: nextIndex, chars: Array.from(words[nextIndex].text).length, phase: "holding" };
      if (current.phase === "holding") return { ...current, chars: Math.max(0, current.chars - 1), phase: "deleting" };
      if (current.phase === "deleting") return current.chars > 0
        ? { ...current, chars: current.chars - 1 }
        : { index: nextIndex, chars: 0, phase: "typing" };
      const length = Array.from(words[current.index].text).length;
      const chars = Math.min(length, current.chars + 1);
      return { ...current, chars, phase: chars === length ? "holding" : "typing" };
    }), delay);
    return () => window.clearTimeout(timer);
  }, [active, state, words]);

  const current = words[state.index];
  if (!current) return null;
  const text = Array.from(current.text).slice(0, state.chars).join("");

  return (
    <span ref={pillRef} data-typewriter-phase={state.phase}
      className={cn("-my-[0.12em] inline-block min-w-[2.45em] rounded-full px-[0.32em] py-[0.12em] text-[0.92em] font-semibold whitespace-nowrap align-baseline", current.pillClassName)}>
      <span data-current-word className="inline-block">{text}</span>
      <span aria-hidden="true" className={cn("ml-[0.035em] inline-block h-[0.8em] w-[0.025em] bg-current align-[-0.025em] motion-reduce:hidden", state.phase === "holding" && "motion-safe:animate-caret")} />
    </span>
  );
}
