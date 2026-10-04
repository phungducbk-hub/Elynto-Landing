"use client";

import { ArrowUp, CalendarDays, Check, LoaderCircle, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { IllustrationFrame } from "@/components/ui/IllustrationFrame";
import { StatusPill } from "@/components/ui/StatusPill";
import type { Dictionary } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { observeVisibility, usePrefersReducedMotion } from "./useMotionPreference";

type Phase = "idle" | "typing" | "ready" | "sending" | "processing" | "done";
type Snapshot = { phase: Phase; chars: number };

/** Milliseconds. One loop ≈ 10 s for the default sentences. */
const TIMING = {
  start: 600,
  perChar: 42,
  beforeSend: 350,
  press: 250,
  processing: 1700,
  hold: 5000,
};

/** On first view the finished result is shown for this long before the loop restarts. */
const FIRST_HOLD = 3200;

function buildTimeline(length: number) {
  const typingEnd = TIMING.start + length * TIMING.perChar;
  const sendAt = typingEnd + TIMING.beforeSend;
  const processingAt = sendAt + TIMING.press;
  const doneAt = processingAt + TIMING.processing;
  return { typingEnd, sendAt, processingAt, doneAt, total: doneAt + TIMING.hold };
}

type Timeline = ReturnType<typeof buildTimeline>;

function snapshotAt(t: number, length: number, tl: Timeline): Snapshot {
  if (t < TIMING.start) return { phase: "idle", chars: 0 };
  if (t < tl.typingEnd) {
    return { phase: "typing", chars: Math.min(length, Math.floor((t - TIMING.start) / TIMING.perChar) + 1) };
  }
  if (t < tl.sendAt) return { phase: "ready", chars: length };
  if (t < tl.processingAt) return { phase: "sending", chars: length };
  if (t < tl.doneAt) return { phase: "processing", chars: length };
  return { phase: "done", chars: length };
}

type Props = {
  copy: Dictionary["demo"];
  className?: string;
};

/**
 * Illustrative, non-interactive animation of a sentence becoming a task.
 * It is labelled as an illustration and is not connected to the app.
 */
export function CommandDemo({ copy, className }: Props) {
  const chars = useMemo(() => Array.from(copy.command), [copy.command]);
  const tl = useMemo(() => buildTimeline(chars.length), [chars.length]);
  const startAt = tl.total - FIRST_HOLD;

  const figureRef = useRef<HTMLElement>(null);
  const elapsed = useRef(startAt);
  const viewed = useRef(false);

  const [snap, setSnap] = useState<Snapshot>(() => snapshotAt(startAt, chars.length, tl));
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const [motionOverride, setMotionOverride] = useState(false);
  // 0 until the loop restarts once; the first (server-rendered) result frame is shown without a fade.
  const [cycle, setCycle] = useState(0);

  // Reduced motion: stay on the finished frame until the visitor presses play.
  const paused = userPaused || (reducedMotion && !motionOverride);
  const running = !paused && inView && pageVisible;

  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    return observeVisibility(el, 0.3, (visible, ratio) => {
      setInView(visible && ratio >= 0.3);
      if (visible && ratio >= 0.5 && !viewed.current) {
        viewed.current = true;
        track("demo_view", { demo: "command" });
      }
    });
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      if (elapsed.current >= tl.total) {
        elapsed.current = 0;
        setCycle((c) => c + 1);
      }
      const next = snapshotAt(elapsed.current, chars.length, tl);
      setSnap((prev) => (prev.phase === next.phase && prev.chars === next.chars ? prev : next));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, tl, chars.length]);

  const replay = useCallback(
    (source: string) => {
      elapsed.current = 0;
      setCycle((c) => c + 1);
      setSnap(snapshotAt(0, chars.length, tl));
      setUserPaused(false);
      setMotionOverride(true);
      track("demo_replay", { demo: "command", source });
    },
    [chars.length, tl],
  );

  // "See it in action" links (href="#demo") restart the demo from the beginning.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('a[href="#demo"]')) replay("link");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [replay]);

  const togglePlayback = () => {
    if (paused) {
      setUserPaused(false);
      setMotionOverride(true);
      track("demo_play", { demo: "command" });
    } else {
      setUserPaused(true);
      track("demo_pause", { demo: "command" });
    }
  };

  const { phase } = snap;
  const typed = chars.slice(0, snap.chars).join("");
  const showCaret = phase === "idle" || phase === "typing";
  const sent = phase === "processing" || phase === "done";
  const done = phase === "done";
  const processing = phase === "processing";
  const animate = cycle > 0;

  return (
    <figure ref={figureRef} id="demo" tabIndex={-1} aria-label={copy.regionLabel} className={cn("outline-none", className)}>
      <p className="sr-only">{copy.srDescription}</p>

      <div aria-hidden="true">
        <IllustrationFrame
          badge={copy.badge}
          title={
            <>
              <Logo variant="mark" title={null} className="h-4 w-auto text-brand" />
              <span>Elynto</span>
            </>
          }
          bodyClassName="bg-[linear-gradient(180deg,var(--color-canvas),var(--color-surface)_40%)]"
        >
          {/* Composer */}
          <div
            className={cn(
              "flex items-end gap-3 rounded-xl border bg-surface p-3.5 shadow-sm transition-colors duration-300 sm:p-4",
              sent ? "border-line" : "border-brand-200 ring-4 ring-brand-50",
            )}
          >
            <p
              className={cn(
                "min-h-[3.25rem] flex-1 text-[0.9375rem] leading-relaxed transition-colors duration-300 sm:min-h-[3.5rem] sm:text-base",
                sent ? "text-ink-muted" : "text-ink",
              )}
            >
              {snap.chars === 0 ? (
                <>
                  <Caret />
                  <span className="text-ink-subtle">{copy.placeholder}</span>
                </>
              ) : (
                <>
                  {typed}
                  {showCaret ? <Caret /> : null}
                </>
              )}
            </p>
            <span
              className={cn(
                "inline-grid size-8 shrink-0 place-items-center rounded-lg transition-all duration-200",
                phase === "ready" || phase === "sending" ? "bg-brand text-white" : "bg-sunken text-ink-subtle",
                phase === "sending" && "scale-90",
              )}
            >
              <ArrowUp className="size-4" strokeWidth={2.5} />
            </span>
          </div>

          {/* Resulting task */}
          <div
            className={cn(
              "mt-4 rounded-xl border bg-surface transition-[border-color,box-shadow] duration-500",
              done ? "border-status-done/35 shadow-card ring-4 ring-status-done-soft" : "border-line",
            )}
          >
            <div className="flex h-11 items-center gap-2 border-b border-line px-4 text-sm font-semibold">
              {done ? (
                <>
                  <span className="inline-grid size-5 place-items-center rounded-full bg-status-done text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-status-done">{copy.success}</span>
                </>
              ) : processing ? (
                <>
                  <LoaderCircle className="size-4 animate-spin text-brand-600 motion-reduce:animate-none" />
                  <span className="text-brand-600">{copy.processing}</span>
                </>
              ) : (
                <span className="text-ink-subtle">{copy.newTask}</span>
              )}
            </div>

            <dl className="grid grid-cols-[8.25rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 px-4 py-4 text-sm sm:grid-cols-[9rem_minmax(0,1fr)]">
              <dt className="text-ink-subtle">{copy.fields.task}</dt>
              <dd className="flex min-h-7 items-center">
                {done ? (
                  <Reveal animate={animate} className="text-base font-semibold text-ink">{copy.result.task}</Reveal>
                ) : (
                  <Placeholder width="w-36" active={processing} />
                )}
              </dd>

              <dt className="text-ink-subtle">{copy.fields.assignee}</dt>
              <dd className="flex min-h-7 items-center">
                {done ? (
                  <Reveal animate={animate} delay={80} className="inline-flex items-center gap-1.5 rounded-full bg-field-assignee-soft py-0.5 pr-2.5 pl-0.5 font-medium text-field-assignee">
                    <Avatar person={copy.result.assignee} />
                    {copy.result.assignee.name}
                  </Reveal>
                ) : (
                  <Placeholder width="w-20" active={processing} />
                )}
              </dd>

              <dt className="text-ink-subtle">{copy.fields.due}</dt>
              <dd className="flex min-h-7 items-center">
                {done ? (
                  <Reveal animate={animate} delay={160} className="inline-flex items-center gap-1.5 rounded-full bg-field-due-soft px-2.5 py-1 font-medium text-field-due">
                    <CalendarDays className="size-3.5" />
                    {copy.result.due}
                  </Reveal>
                ) : (
                  <Placeholder width="w-24" active={processing} />
                )}
              </dd>

              <dt className="text-ink-subtle">{copy.fields.status}</dt>
              <dd className="flex min-h-7 items-center">
                {done ? (
                  <Reveal animate={animate} delay={240}>
                    <StatusPill status="todo" label={copy.result.status} />
                  </Reveal>
                ) : (
                  <Placeholder width="w-16" active={processing} />
                )}
              </dd>
            </dl>
          </div>
        </IllustrationFrame>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <figcaption className="text-[0.9375rem] leading-snug font-semibold text-ink">{copy.caption}</figcaption>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={togglePlayback}
            className="inline-grid size-10 place-items-center rounded-lg text-ink-muted ring-1 ring-line transition-colors ring-inset hover:bg-sunken hover:text-ink"
          >
            <span className="sr-only">{paused ? copy.controls.play : copy.controls.pause}</span>
            {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => replay("button")}
            className="inline-grid size-10 place-items-center rounded-lg text-ink-muted ring-1 ring-line transition-colors ring-inset hover:bg-sunken hover:text-ink"
          >
            <span className="sr-only">{copy.controls.replay}</span>
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </figure>
  );
}

function Caret() {
  return (
    <span className="mx-px inline-block h-[1.15em] w-[2px] translate-y-[0.2em] animate-caret bg-brand motion-reduce:animate-none" />
  );
}

function Placeholder({ width, active }: { width: string; active: boolean }) {
  return (
    <span
      className={cn(
        "block h-3 rounded-full",
        width,
        active ? "animate-shimmer bg-brand-100 motion-reduce:animate-none" : "bg-sunken",
      )}
    />
  );
}

type RevealProps = { children: ReactNode; className?: string; delay?: number; animate: boolean };

function Reveal({ children, className, delay = 0, animate }: RevealProps) {
  const [shown, setShown] = useState(!animate);
  useEffect(() => {
    if (shown) return;
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [shown]);
  return (
    <span
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-300 ease-out-soft",
        shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        className,
      )}
    >
      {children}
    </span>
  );
}
