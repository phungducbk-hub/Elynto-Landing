"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowUp, BookOpen, CalendarDays, ChartColumn, ChevronDown, CircleCheck, Flag, FolderKanban, Inbox, ListChecks, MessageSquare, Mic, PanelLeftClose, Pause, Play, Plus, RotateCcw, Search, Settings, SlidersHorizontal, Sparkles, Sun, TriangleAlert, UserRoundCheck, UsersRound } from "lucide-react";
import { LoaderSkeleton } from "@/components/ui/loaders-skeleton";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { observeVisibility, usePrefersReducedMotion } from "./useMotionPreference";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

type Screen = "Today" | "My Work" | "Delegated";
const screens: Screen[] = ["Today", "My Work", "Delegated"];
const navigation = [
  [Sun, "Today"], [Inbox, "Inbox"], [MessageSquare, "Chat"], [CalendarDays, "Meetings"],
  [ListChecks, "My Work"], [UserRoundCheck, "Delegated"], [FolderKanban, "Projects"],
  [UsersRound, "Team"], [ChartColumn, "Reports"], [BookOpen, "Knowledge"],
] as const;

/** The live beta shell observed on 2026-11-14. All content below is fictional. */
export function ProductShell({ active, children, compact = false }: { active: string; children: ReactNode; compact?: boolean }) {
  return (
    <div lang="en" className={cn("product-shell overflow-hidden rounded-xl border border-line bg-canvas text-ink", compact && "product-shell-compact")}>
      <aside aria-hidden="true" className="product-sidebar border-r border-line bg-white">
        <div className="flex h-12 items-center justify-between border-b border-line px-4"><Logo title={null} className="h-6 w-auto text-brand" /><PanelLeftClose className="size-3.5 text-ink-muted" /></div>
        <div className="space-y-0.5 p-2">
          {navigation.map(([Icon, label]) => <div key={label} className={cn("flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs", active === label ? "bg-[#e9eef0] font-medium text-[#234056]" : "text-ink-muted")}><Icon className="size-3.5 shrink-0" />{label}</div>)}
        </div>
        <div className="mt-auto border-t border-line p-4 text-xs text-ink-muted"><span className="flex items-center gap-2"><Settings className="size-3.5" />Settings</span><span className="mt-4 block font-mono text-[8px] tracking-widest">V0.1.0 · FOUNDATION</span></div>
      </aside>
      <div className="min-w-0">
        <div className="flex h-12 items-center justify-between gap-2 border-b border-line px-4 text-xs sm:px-5">
          <span className="font-medium">STUDIO DEMO</span>
          <span className="flex items-center gap-3"><span className="flex items-center gap-1.5 rounded-md border border-line bg-canvas px-2 py-1.5"><Sparkles className="size-3.5 text-brand" />Ask Elynto<span className="hidden rounded border border-line px-1 font-mono text-[8px] text-ink-muted sm:inline">Ctrl K</span></span><span className="grid size-6 place-items-center rounded-full bg-brand text-[10px] text-white">A</span></span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function TodayScreen({ command, composer, loading, paused }: { command: string; composer?: ReactNode; loading?: boolean; paused?: boolean }) {
  return <div className="flex min-h-[410px] flex-col px-4 pt-8 pb-5 sm:min-h-[470px] sm:px-10">
    <div className="mx-auto w-full max-w-[600px]">
      <p className="text-lg font-semibold tracking-tight sm:text-xl">Hi Alex, what would you like to assign today?</p>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">Write a sentence as you normally would. Elynto creates exactly one piece of work and gives it to exactly one person.</p>
      {loading ? <LoadingWork paused={paused} /> : <div className="mt-5 rounded-xl border border-line bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2"><p className="text-sm font-medium">Today at a glance</p><span className="rounded-full border border-line px-2 py-0.5 font-mono text-[8px] tracking-widest text-ink-muted">SAMPLE DATA</span></div>
        <p className="mt-1 text-[10px] leading-relaxed text-ink-muted">An interface preview. Real figures arrive with observation and reporting.</p>
        <ul className="mt-4 space-y-3 text-xs">
          <li className="flex gap-2.5"><TriangleAlert className="size-3.5 shrink-0 text-[#ad5a28]" /><span>2 work items are overdue<span className="mt-1 block text-[10px] text-ink-muted">Deal with these before assigning new work.</span></span></li>
          <li className="flex gap-2.5"><CalendarDays className="size-3.5 text-ink-muted" />3 work items are due this week</li>
          <li className="flex gap-2.5"><UsersRound className="size-3.5 text-ink-muted" />Minh is overloaded — 6 open work items</li>
          <li className="flex gap-2.5"><CircleCheck className="size-3.5 text-ink-muted" />To finish today: review the website proposal.</li>
        </ul>
      </div>}
    </div>
    <div className="mx-auto mt-auto w-full max-w-[600px] pt-10">
      {composer ?? <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-sm"><p className="flex-1 text-xs leading-relaxed text-ink-muted">{command}</p><Mic className="size-3.5 shrink-0 text-ink-muted" /><span className="grid size-7 shrink-0 place-items-center rounded-full bg-sunken text-ink-muted"><ArrowUp className="size-3.5" /></span></div>}
    </div>
  </div>;
}

export type DemoWorkRow = { title: string; name: string; due: string; status: string };

const sampleRows: DemoWorkRow[] = [
  { title: "Prepare the monthly report", name: "Minh", due: "20/11/2026", status: "Assigned" },
  { title: "Review the website proposal", name: "Alex", due: "20/11/2026", status: "In progress" },
  { title: "Finalise campaign visuals", name: "Lan", due: "23/11/2026", status: "Assigned" },
  { title: "Confirm the launch schedule", name: "Alex", due: "25/11/2026", status: "In progress" },
  { title: "Send the client quotation", name: "Minh", due: "27/11/2026", status: "Assigned" },
];

export function WorkTableScreen({ delegated = false, createdRow }: { delegated?: boolean; createdRow?: DemoWorkRow | null }) {
  const rows = createdRow ? [createdRow, ...sampleRows] : sampleRows;
  return <div className="min-h-[410px] p-3 sm:min-h-[470px] sm:p-5">
    <div className="mb-4 flex items-center justify-between gap-2 border-b border-line">
      <div className="flex min-w-0 gap-4 overflow-x-auto text-xs whitespace-nowrap"><span className="border-b-2 border-brand py-3">Upcoming</span><span className="py-3 text-[#a4592d]">Overdue (1)</span><span className="py-3 text-ink-muted">{delegated ? "Approval" : "Rework"}</span><span className="py-3 text-ink-muted">Completed</span><span className="py-3 text-ink-muted">Archived</span></div>
      <div aria-hidden="true" className="hidden shrink-0 items-center gap-3 text-ink-muted xl:flex"><Search className="size-3.5" /><SlidersHorizontal className="size-3.5" /><CalendarDays className="size-3.5" /><Plus className="size-3.5" /></div>
    </div>
    <div role="region" aria-label={delegated ? "Sample delegated work table" : "Sample My Work table"} tabIndex={0} className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full min-w-[560px] text-left text-[11px]">
        <thead className="border-b border-line text-[9px] font-normal text-ink-muted uppercase"><tr>{["Work", delegated ? "Assigned to" : "Assigned by", "Created", "Due", "Priority", "Status", "Files"].map(label => <th scope="col" className="px-3 py-3 font-normal" key={label}>{label}</th>)}</tr></thead>
        <tbody className="divide-y divide-line">
          {!delegated && <tr className="bg-canvas"><td colSpan={7} className="px-3 py-2 text-ink-muted"><ChevronDown className="mr-2 inline size-3" />Other work <span className="ml-1">{rows.length}</span></td></tr>}
          {rows.map((row, i) => <tr key={`${row.title}-${i}`} data-created-work={createdRow === row ? "" : undefined} className={createdRow === row ? "bg-brand-50 motion-safe:animate-rise" : undefined}><td className="max-w-[180px] px-3 py-4 leading-relaxed"><Flag className={cn("mr-2 inline size-3", i === 1 ? "fill-[#b95050] text-[#b95050]" : "text-ink-muted")} />{row.title}</td><td className="px-3 py-4"><span className="mr-1.5 inline-grid size-4 place-items-center rounded-full bg-brand/10 text-[8px] text-brand">{delegated ? row.name[0] : "A"}</span>{delegated ? row.name : "You"}</td><td className="px-3 py-4 whitespace-nowrap text-ink-muted">14/11/2026</td><td className="px-3 py-4 whitespace-nowrap text-ink-muted">{row.due}</td><td className="px-3 py-4 text-ink-muted">Medium</td><td className="px-3 py-4"><span className={cn("whitespace-nowrap rounded border border-line px-1.5 py-0.5 text-[10px]", row.status === "In progress" ? "bg-[#e8f0fa] text-[#305b83]" : "bg-sunken text-ink")}>{row.status}</span></td><td className="px-3 py-4 text-ink-muted">{i === 1 ? "1" : "—"}</td></tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}

type DemoPhase = "typing" | "ready" | "processing" | "done";
type DemoSnapshot = { phase: DemoPhase; chars: number };

function demoTimeline(length: number) {
  const typingEnd = 300 + length * 38;
  const processingAt = typingEnd + 850;
  const doneAt = processingAt + 1900;
  return { typingEnd, processingAt, doneAt, total: doneAt + 7500 };
}

function demoSnapshot(time: number, length: number, timeline: ReturnType<typeof demoTimeline>): DemoSnapshot {
  if (time < timeline.typingEnd) return { phase: "typing", chars: Math.max(0, Math.min(length, Math.floor((time - 300) / 38))) };
  if (time < timeline.processingAt) return { phase: "ready", chars: length };
  if (time < timeline.doneAt) return { phase: "processing", chars: length };
  return { phase: "done", chars: length };
}

function LoadingWork({ paused }: { paused?: boolean }) {
  return (
    <div data-demo-loading className="mt-5 rounded-xl border border-line bg-white p-5">
      <div className="flex items-center gap-3">
        <LoaderSkeleton width={40} height={40} borderRadius={9999} paused={paused} />
        <div className="flex flex-1 flex-col gap-2">
          <LoaderSkeleton width="70%" height={12} paused={paused} />
          <LoaderSkeleton width="40%" height={10} paused={paused} />
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <LoaderSkeleton height={10} paused={paused} />
        <LoaderSkeleton height={10} paused={paused} />
        <LoaderSkeleton width="80%" height={10} paused={paused} />
      </div>
      <LoaderSkeleton className="mt-5" height={58} borderRadius={8} paused={paused} />
    </div>
  );
}

/** A working, browser-local sample: the send action creates a new work row in demo state. */
export function ProductDemo({ copy, examples, lang, label, caption }: {
  copy: Dictionary["demo"];
  examples: Dictionary["command"]["examples"];
  lang: Locale;
  label: string;
  caption: string;
}) {
  const [screen, setScreen] = useState<Screen>("Today");
  const [exampleIndex, setExampleIndex] = useState(0);
  const scenarios = useMemo(() => examples.map(example => ({
    label: example.label,
    self: example.assignee.self ?? false,
    command: example.segments.map(segment => typeof segment === "string" ? segment : segment.text).join(""),
    task: { title: example.task, name: example.assignee.name, due: example.due, status: "Assigned" },
  })), [examples]);
  const scenario = scenarios[exampleIndex];
  const chars = useMemo(() => Array.from(scenario.command), [scenario.command]);
  const timeline = useMemo(() => demoTimeline(chars.length), [chars.length]);
  const elapsed = useRef(0);
  const created = useRef(false);
  const [snap, setSnap] = useState<DemoSnapshot>({ phase: "typing", chars: 0 });
  const [createdWork, setCreatedWork] = useState<DemoWorkRow | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [motionOverride, setMotionOverride] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const paused = userPaused || (reducedMotion && !motionOverride);
  const running = screen === "Today" && inView && pageVisible && !paused;
  const figureRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const isVietnamese = lang === "vi";

  useEffect(() => {
    const element = figureRef.current;
    if (!element) return;
    return observeVisibility(element, 0.15, (visible, ratio) => setInView(visible && ratio >= 0.15));
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      if (elapsed.current >= timeline.total) {
        elapsed.current = 0;
        created.current = false;
        setCreatedWork(null);
      }
      const next = demoSnapshot(elapsed.current, chars.length, timeline);
      if (next.phase === "done" && !created.current) {
        created.current = true;
        setCreatedWork({ ...scenario.task });
      }
      setSnap(previous => previous.phase === next.phase && previous.chars === next.chars ? previous : next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, timeline, chars.length, scenario]);

  const replay = useCallback((source: string) => {
    elapsed.current = 0;
    created.current = false;
    setCreatedWork(null);
    setSnap({ phase: "typing", chars: 0 });
    setScreen("Today");
    setUserPaused(false);
    setMotionOverride(true);
    track("demo_replay", { demo: "create_work", source });
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href="#demo"]')) replay("link");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [replay]);

  function send() {
    elapsed.current = timeline.processingAt;
    created.current = false;
    setCreatedWork(null);
    setSnap({ phase: "processing", chars: chars.length });
    setUserPaused(false);
    setMotionOverride(true);
    track("demo_play", { demo: "create_work", source: "send" });
  }

  function select(index: number, focus = false) {
    setScreen(screens[index]);
    if (focus) tabRefs.current[index]?.focus();
    track("demo_screen_select", { screen: screens[index] });
  }

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % screens.length;
    else if (event.key === "ArrowLeft") next = (index + screens.length - 1) % screens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screens.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  }

  const typed = chars.slice(0, snap.chars).join("");
  const status = snap.phase === "done" ? copy.success : snap.phase === "processing" ? copy.processing : isVietnamese ? "Viết yêu cầu như cách bạn giao việc." : "Write a request as you would to a teammate.";
  const composer = (
    <div className="flex items-end gap-3 rounded-2xl border border-brand/40 bg-white p-3 shadow-sm">
      <p lang={lang} className="min-h-10 flex-1 text-xs leading-relaxed text-ink">
        {typed || <span className="text-ink-muted">{copy.placeholder}</span>}
        {snap.phase === "typing" && <span aria-hidden="true" className="ml-0.5 inline-block h-3 w-px animate-caret bg-brand motion-reduce:animate-none" />}
      </p>
      <button type="button" onClick={send} disabled={snap.phase === "processing"} aria-label={copy.send} className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover disabled:bg-sunken disabled:text-ink-muted">
        <ArrowUp className="size-4" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <figure ref={figureRef} id="demo" tabIndex={-1} aria-label={label} data-demo-phase={snap.phase} className="outline-none">
      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="flex items-center gap-2 text-xs font-medium text-ink-muted"><span className="size-1.5 rounded-full bg-brand" />{label}</span>
        <div role="tablist" aria-label={label} className="inline-flex rounded-lg border border-line bg-white p-1">
          {screens.map((item, index) => (
            <button key={item} type="button" ref={element => { tabRefs.current[index] = element; }} role="tab" id={`${id}-${index}`} aria-selected={screen === item} aria-controls={`${id}-panel`} tabIndex={screen === item ? 0 : -1} onClick={() => select(index)} onKeyDown={event => onKey(event, index)} className={cn("rounded-md px-3 py-2 text-xs transition-colors sm:px-4", screen === item ? "bg-brand text-white" : "text-ink-muted hover:bg-canvas")}>
              {item === "Today" ? isVietnamese ? "Tạo công việc" : "Create work" : item}
            </button>
          ))}
        </div>
      </div>
      {screen === "Today" && (
        <div className="mb-3 flex flex-wrap gap-2" aria-label={isVietnamese ? "Chọn yêu cầu mẫu" : "Choose a sample request"}>
          {scenarios.map((item, index) => <button key={item.label} type="button" aria-pressed={index === exampleIndex} onClick={() => { setExampleIndex(index); replay("example"); }} className={cn("rounded-full border px-3 py-1.5 text-xs transition-colors", index === exampleIndex ? "border-brand/30 bg-white font-medium text-brand" : "border-line text-ink-muted hover:bg-white")}>{item.label}</button>)}
        </div>
      )}
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${screens.indexOf(screen)}`} tabIndex={0}>
        <ProductShell active={screen === "Today" && createdWork ? scenario.self ? "My Work" : "Delegated" : screen}>
          {screen === "Today" ? createdWork ? <WorkTableScreen delegated={!scenario.self} createdRow={createdWork} /> : <TodayScreen command={scenario.command} composer={composer} loading={snap.phase === "processing"} paused={paused} /> : <WorkTableScreen delegated={screen === "Delegated"} createdRow={(screen === "Delegated" && !scenario.self) || (screen === "My Work" && scenario.self) ? createdWork : null} />}
        </ProductShell>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p aria-live="polite" aria-atomic="true" className={cn("text-xs font-medium", snap.phase === "done" ? "text-status-done" : "text-ink-muted")}>
          {screen === "Today" ? status : caption}
        </p>
        <div className="flex shrink-0 gap-1">
          <button type="button" onClick={() => { setUserPaused(!paused); setMotionOverride(true); setScreen("Today"); track(paused ? "demo_play" : "demo_pause", { demo: "create_work" }); }} aria-label={paused ? copy.controls.play : copy.controls.pause} className="grid size-9 place-items-center rounded-lg border border-line bg-white text-ink-muted hover:text-brand">
            {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => replay("button")} aria-label={copy.controls.replay} className="grid size-9 place-items-center rounded-lg border border-line bg-white text-ink-muted hover:text-brand"><RotateCcw className="size-4" aria-hidden="true" /></button>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

export function CommandScreen({ command, badge }: { command: string; badge: string }) {
  return <div><div lang="en" className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
    <div className="flex items-center gap-2 border-b border-line px-5 py-4 text-sm font-semibold"><Sparkles className="size-4 text-brand" />Ask Elynto<span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-normal text-ink-muted">Project page</span></div>
    <div className="flex min-h-[310px] flex-col p-5"><p className="text-sm leading-relaxed text-ink-muted">Create or assign work in your own words — the same command as on Today.</p><p className="mt-3 text-sm leading-relaxed text-ink-muted">New work goes into this project only when you say “this project”.</p><div className="mt-auto flex items-end gap-3 rounded-2xl border border-brand/50 p-3 text-sm"><p className="flex-1 leading-relaxed">{command}</p><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-sunken"><ArrowUp className="size-3.5" /></span></div></div>
  </div><p className="mt-3 text-xs text-ink-muted">{badge}</p></div>;
}
