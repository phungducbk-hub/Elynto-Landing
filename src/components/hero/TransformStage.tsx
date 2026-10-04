"use client";

import { CalendarDays, Check, LoaderCircle, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type AnimationEvent, type CSSProperties } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Marker } from "@/components/ui/Marker";
import { StatusPill } from "@/components/ui/StatusPill";
import type { Dictionary, FieldKey } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import styles from "./TransformStage.module.css";

type Copy = Dictionary["demo"];
type RunState = "playing" | "paused" | "idle" | "done";
type Wire = { field: FieldKey; d: string; x2: number; y2: number };

/** Start time of each field's mark, matching the CSS custom properties. */
const fieldVar: Record<FieldKey, string> = {
  assignee: "var(--t-assignee)",
  task: "var(--t-task)",
  due: "var(--t-due)",
};

const fieldOrder: FieldKey[] = ["assignee", "task", "due"];

/**
 * Illustrative, non-interactive demo: one sentence becomes a task.
 * Plays once when it comes into view and rests on the finished task.
 */
export function TransformStage({ copy }: { copy: Copy }) {
  const [run, setRun] = useState(0);
  const [state, setState] = useState<RunState>("playing");
  const [reducedMotion, setReducedMotion] = useState(false);
  const figureRef = useRef<HTMLElement>(null);
  const viewed = useRef(false);

  const replay = useCallback((source: string) => {
    setRun((n) => n + 1);
    setState("playing");
    track("demo_replay", { demo: "stage", source });
  }, []);

  // The sequence starts on first paint (CSS). If the stage is off-screen at that
  // point, rewind it and wait until it scrolls into view.
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onMotion = () => setReducedMotion(media.matches);
    media.addEventListener("change", onMotion);

    const rect = el.getBoundingClientRect();
    const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    let waiting = !media.matches && visible < rect.height * 0.35;
    if (waiting) {
      setRun((n) => n + 1);
      setState("idle");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.intersectionRatio >= 0.5 && !viewed.current) {
          viewed.current = true;
          track("demo_view", { demo: "stage" });
        }
        if (waiting && entry.intersectionRatio >= 0.35) {
          waiting = false;
          setState("playing");
        }
      },
      { threshold: [0, 0.35, 0.5] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotion);
    };
  }, []);

  // "See it in action" links (href="#demo") replay the sequence.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('a[href="#demo"]')) replay("link");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [replay]);

  const onAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).dataset.final !== undefined) setState("done");
  };

  const togglePause = () => {
    if (state === "playing") {
      setState("paused");
      track("demo_pause", { demo: "stage" });
    } else if (state === "paused") {
      setState("playing");
      track("demo_play", { demo: "stage" });
    }
  };

  const canPause = state === "playing" || state === "paused";

  return (
    <figure ref={figureRef} id="demo" tabIndex={-1} aria-label={copy.regionLabel} className="outline-none">
      <div className="rounded-[1.5rem] bg-fog p-4 sm:px-8 sm:pt-5 sm:pb-8 lg:px-10 lg:pb-10">
        <div className="mb-3 flex min-h-10 items-center justify-between gap-4 sm:mb-4">
          <p className="text-sm text-muted">{copy.label}</p>
          {reducedMotion ? null : (
            <div className="flex items-center gap-1">
              {canPause ? (
                <button
                  type="button"
                  onClick={togglePause}
                  className="inline-grid size-10 place-items-center rounded-full text-navy transition-colors hover:bg-paper"
                >
                  <span className="sr-only">{state === "paused" ? copy.controls.play : copy.controls.pause}</span>
                  {state === "paused" ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => replay("button")}
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-navy transition-colors hover:bg-paper"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                <span>{copy.controls.replay}</span>
              </button>
            </div>
          )}
        </div>

        <p className="sr-only">{copy.srDescription}</p>
        <Stage key={run} copy={copy} state={state} onAnimationEnd={onAnimationEnd} />
      </div>
      <figcaption className="mt-4 text-base font-semibold text-ink stretch-wide">{copy.caption}</figcaption>
    </figure>
  );
}

type StageProps = {
  copy: Copy;
  state: RunState;
  onAnimationEnd: (event: AnimationEvent<HTMLDivElement>) => void;
};

function Stage({ copy, state, onAnimationEnd }: StageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wiresRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLSpanElement>(null);
  const [wires, setWires] = useState<Wire[]>([]);
  const [elapsed, setElapsed] = useState(0);

  // Measure where each marked phrase sits and where its field starts, then draw curves between them.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const box = wiresRef.current;
    if (!stage || !box) return;

    const measure = () => {
      // Hidden on small screens: keep existing wires mounted so their animation state survives resizes.
      if (getComputedStyle(box).visibility === "hidden") return;
      const origin = box.getBoundingClientRect();
      const next: Wire[] = [];
      for (const field of fieldOrder) {
        const mark = stage.querySelector<HTMLElement>(`[data-mark="${field}"]`);
        const slot = stage.querySelector<HTMLElement>(`[data-slot="${field}"]`);
        if (!mark || !slot) continue;
        const rects = mark.getClientRects();
        const last = rects[rects.length - 1] ?? mark.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();
        const x1 = last.left + last.width / 2 - origin.left;
        const y1 = last.bottom - origin.top + 2;
        const x2 = slotRect.left - origin.left + 2;
        const y2 = origin.height + 1;
        const k = (y2 - y1) * 0.5;
        next.push({ field, d: `M ${x1} ${y1} C ${x1} ${y1 + k}, ${x2} ${y2 - k}, ${x2} ${y2}`, x2, y2 });
      }
      setWires(next);
    };

    // Wires mount after the CSS sequence has started: offset their delays by the time already elapsed.
    const reference = finalRef.current?.getAnimations?.()[0];
    setElapsed(typeof reference?.currentTime === "number" ? reference.currentTime : 0);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer.disconnect();
  }, []);

  const { fields, result, status } = copy;

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      data-state={state}
      className={styles.stage}
      style={{ "--elapsed": `${elapsed}ms` } as CSSProperties}
      onAnimationEnd={onAnimationEnd}
    >
      <div className={styles.composer}>
        <p className={styles.sentence}>
          {copy.sentence.map((segment, index) =>
            typeof segment === "string" ? (
              <span key={index}>{segment}</span>
            ) : (
              <Marker
                key={index}
                data-mark={segment.field}
                className={styles.mark}
                style={{ "--d": fieldVar[segment.field] } as CSSProperties}
              >
                {segment.text}
              </Marker>
            ),
          )}
          <span className={styles.caret} />
        </p>
      </div>

      <div ref={wiresRef} className={cn(styles.wires, "relative")}>
        <svg className={styles.wireSvg}>
          {wires.map((wire) => (
            <g key={wire.field} style={{ "--d": `calc(${fieldVar[wire.field]} + var(--wire-lag))` } as CSSProperties}>
              <path className={styles.wire} d={wire.d} pathLength={1} />
              <circle className={styles.wireEnd} cx={wire.x2} cy={wire.y2} r={3} />
            </g>
          ))}
        </svg>
      </div>
      <div className={styles.gap} />

      <div className={styles.card}>
        <dl className={styles.fields}>
          <Field label={fields.assignee} field="assignee">
            <span className={cn(styles.value, styles.parsed)}>
              <Avatar person={result.assignee} />
              {result.assignee.name}
            </span>
          </Field>
          <Field label={fields.task} field="task">
            <span className={cn(styles.value, styles.parsed)}>{result.task}</span>
          </Field>
          <Field label={fields.due} field="due">
            <span className={cn(styles.value, styles.parsed)}>
              <CalendarDays className="size-4 text-muted" />
              {result.due}
            </span>
          </Field>
          <Field label={fields.status} field="status">
            <span className={styles.value}>
              <StatusPill status="todo" label={result.status} className="text-base" />
            </span>
          </Field>
        </dl>

        <div className={styles.statusRow}>
          <span className={cn(styles.status, styles.statusIdle)}>{status.idle}</span>
          <span className={cn(styles.status, styles.statusReading)}>
            <LoaderCircle className={cn("size-4", styles.spinner)} />
            {status.reading}
          </span>
          <span ref={finalRef} data-final="" className={cn(styles.status, styles.statusCreated)}>
            <span className={styles.check}>
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {status.created}
          </span>
        </div>
      </div>
    </div>
  );
}

const fillVar: Record<FieldKey | "status", string> = {
  assignee: "calc(var(--t-assignee) + var(--fill-lag))",
  task: "calc(var(--t-task) + var(--fill-lag))",
  due: "calc(var(--t-due) + var(--fill-lag))",
  status: "var(--t-status)",
};

function Field({ label, field, children }: { label: string; field: FieldKey | "status"; children: React.ReactNode }) {
  return (
    <div className={styles.field} style={{ "--f": fillVar[field] } as CSSProperties}>
      <dt className={styles.fieldLabel} data-slot={field}>
        {label}
      </dt>
      <dd className={styles.slot}>
        <span className={styles.placeholder} />
        {children}
      </dd>
    </div>
  );
}
