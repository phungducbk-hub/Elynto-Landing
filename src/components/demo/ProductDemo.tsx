"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowUp, BookOpen, CalendarDays, ChartColumn, ChevronDown, CircleCheck, Flag, FolderKanban, Inbox, ListChecks, MessageSquare, Mic, PanelLeftClose, Pause, Play, Plus, RotateCcw, Search, Settings, SlidersHorizontal, Sparkles, Sun, TriangleAlert, UserRoundCheck, UsersRound } from "lucide-react";
import { LoaderSkeleton } from "@/components/ui/loaders-skeleton";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { getProductUi } from "@/content/product-ui";
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
export function ProductShell({ active, children, compact = false, lang = "en" }: { active: string; children: ReactNode; compact?: boolean; lang?: Locale }) {
  const ui = getProductUi(lang);
  return (
    <div lang={lang} className={cn("product-shell overflow-hidden rounded-xl border border-line bg-canvas text-ink", compact && "product-shell-compact")}>
      <aside aria-hidden="true" className="product-sidebar border-r border-line bg-white">
        <div className="flex h-12 items-center justify-between border-b border-line px-4"><Logo title={null} className="h-6 w-auto text-brand" /><PanelLeftClose className="size-3.5 text-ink-muted" /></div>
        <div className="space-y-0.5 p-2">
          {navigation.map(([Icon, label]) => <div key={label} className={cn("flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs", active === label ? "bg-[#e9eef0] font-medium text-[#234056]" : "text-ink-muted")}><Icon className="size-3.5 shrink-0" />{ui.nav[label]}</div>)}
        </div>
        <div className="mt-auto border-t border-line p-4 text-xs text-ink-muted"><span className="flex items-center gap-2"><Settings className="size-3.5" />{ui.settings}</span><span className="mt-4 block font-mono text-[8px] tracking-widest">{ui.version}</span></div>
      </aside>
      <div className="min-w-0">
        <div className="flex h-12 items-center justify-between gap-2 border-b border-line px-4 text-xs sm:px-5">
          <span className="font-medium">{ui.workspace}</span>
          <span className="flex items-center gap-3"><span className="flex items-center gap-1.5 rounded-md border border-line bg-canvas px-2 py-1.5"><Sparkles className="size-3.5 text-brand" />{ui.ask}<span className="hidden rounded border border-line px-1 font-mono text-[8px] text-ink-muted sm:inline">Ctrl K</span></span><span className="grid size-6 place-items-center rounded-full bg-brand text-[10px] text-white">A</span></span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function TodayScreen({ command, composer, loading, paused, result, lang = "en" }: { command: string; composer?: ReactNode; loading?: boolean; paused?: boolean; result?: ReactNode; lang?: Locale }) {
  const ui = getProductUi(lang);
  return <div className="flex min-h-[410px] flex-col px-4 pt-8 pb-5 sm:min-h-[470px] sm:px-10">
    <div className="mx-auto w-full max-w-[600px]">
      <p className="text-lg font-semibold tracking-tight sm:text-xl">{ui.greeting}</p>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">{ui.intro}</p>
      {loading ? <LoadingWork paused={paused} /> : result ?? <div className="mt-5 rounded-xl border border-line bg-white p-4 sm:p-5">
        <p className="text-sm font-medium">{ui.briefing}</p>
        <ul className="mt-4 space-y-3 text-xs">
          <li className="flex gap-2.5"><TriangleAlert className="size-3.5 shrink-0 text-[#ad5a28]" /><span>{ui.overdueBrief}<span className="mt-1 block text-[10px] text-ink-muted">{ui.overdueHint}</span></span></li>
          <li className="flex gap-2.5"><CalendarDays className="size-3.5 text-ink-muted" />{ui.dueWeek}</li>
          <li className="flex gap-2.5"><UsersRound className="size-3.5 text-ink-muted" />{ui.overloaded}</li>
          <li className="flex gap-2.5"><CircleCheck className="size-3.5 text-ink-muted" />{ui.finishToday}</li>
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

export function WorkTableScreen({ delegated = false, createdRow, lang = "en" }: { delegated?: boolean; createdRow?: DemoWorkRow | null; lang?: Locale }) {
  const ui = getProductUi(lang);
  const localizedRows = sampleRows.map((row, index) => ({ ...row, title: ui.rows[index] }));
  const rows = createdRow ? [createdRow, ...localizedRows] : localizedRows;
  return <div className="min-h-[410px] p-3 sm:min-h-[470px] sm:p-5">
    <div className="mb-4 flex items-center justify-between gap-2 border-b border-line">
      <div className="flex min-w-0 gap-4 overflow-x-auto text-xs whitespace-nowrap"><span className="border-b-2 border-brand py-3">{ui.upcoming}</span><span className="py-3 text-[#a4592d]">{ui.overdue} (1)</span><span className="py-3 text-ink-muted">{delegated ? ui.approval : ui.rework}</span><span className="py-3 text-ink-muted">{ui.completed}</span><span className="py-3 text-ink-muted">{ui.archived}</span></div>
      <div aria-hidden="true" className="hidden shrink-0 items-center gap-3 text-ink-muted xl:flex"><Search className="size-3.5" /><SlidersHorizontal className="size-3.5" /><CalendarDays className="size-3.5" /><Plus className="size-3.5" /></div>
    </div>
    <div role="region" aria-label={delegated ? ui.delegatedTable : ui.myWorkTable} tabIndex={0} className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full min-w-[560px] text-left text-xs">
        <thead className="border-b border-line text-[11px] font-normal text-ink-muted uppercase"><tr>{[ui.work, delegated ? ui.assignedTo : ui.assignedBy, ui.created, ui.due, ui.priority, ui.status, ui.files].map(label => <th scope="col" className="px-3 py-3 font-normal" key={label}>{label}</th>)}</tr></thead>
        <tbody className="divide-y divide-line">
          {!delegated && <tr className="bg-canvas"><td colSpan={7} className="px-3 py-2 text-ink-muted"><ChevronDown className="mr-2 inline size-3" />{ui.otherWork} <span className="ml-1">{rows.length}</span></td></tr>}
          {rows.map((row, i) => <tr key={`${row.title}-${i}`} data-created-work={createdRow === row ? "" : undefined} className={createdRow === row ? "bg-brand-50 motion-safe:animate-rise" : undefined}><td className="max-w-[180px] px-3 py-4 leading-relaxed"><Flag className={cn("mr-2 inline size-3", i === 1 ? "fill-[#b95050] text-[#b95050]" : "text-ink-muted")} />{row.title}</td><td className="px-3 py-4"><span className="mr-1.5 inline-grid size-4 place-items-center rounded-full bg-brand/10 text-[8px] text-brand">{delegated ? row.name[0] : "A"}</span>{delegated ? row.name : ui.you}</td><td className="px-3 py-4 whitespace-nowrap text-ink-muted">14/11/2026</td><td className="px-3 py-4 whitespace-nowrap text-ink-muted">{row.due}</td><td className="px-3 py-4 text-ink-muted">{ui.medium}</td><td className="px-3 py-4"><span className={cn("whitespace-nowrap rounded border border-line px-1.5 py-0.5 text-[10px]", row.status === "In progress" ? "bg-[#e8f0fa] text-[#305b83]" : "bg-sunken text-ink")}>{row.status === "In progress" ? ui.inProgress : ui.assigned}</span></td><td className="px-3 py-4 text-ink-muted">{i === 1 ? "1" : "-"}</td></tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}

type DemoPhase = "typing" | "ready" | "processing" | "card" | "done";
type DemoSnapshot = { phase: DemoPhase; chars: number };

function demoTimeline(length: number) {
  const typingEnd = 300 + length * 60;
  const processingAt = typingEnd + 850;
  const cardAt = processingAt + 1900;
  const doneAt = cardAt + 5000;
  return { typingEnd, processingAt, cardAt, doneAt, total: doneAt + 5000 };
}

function demoSnapshot(time: number, length: number, timeline: ReturnType<typeof demoTimeline>): DemoSnapshot {
  if (time < timeline.typingEnd) return { phase: "typing", chars: Math.max(0, Math.min(length, Math.floor((time - 300) / 60))) };
  if (time < timeline.processingAt) return { phase: "ready", chars: length };
  if (time < timeline.cardAt) return { phase: "processing", chars: length };
  if (time < timeline.doneAt) return { phase: "card", chars: length };
  return { phase: "done", chars: length };
}

function CreatedWorkCard({ work, success, lang, onOpen }: { work: DemoWorkRow; success: string; lang: Locale; onOpen: () => void }) {
  const ui = getProductUi(lang);
  return (
    <article data-work-card aria-label={success} className="mt-5 rounded-xl border border-line bg-white p-5 shadow-card motion-safe:animate-rise">
      <p className="flex items-center gap-2 text-sm font-semibold text-status-done"><CircleCheck className="size-4" aria-hidden="true" />{success}</p>
      <p className="mt-4 text-base font-semibold text-ink">{work.title}</p>
      <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-3 text-sm">
        <dt className="text-ink-muted">{ui.assignedTo}</dt><dd className="font-medium">{work.name}</dd>
        <dt className="text-ink-muted">{ui.due}</dt><dd className="font-medium">{work.due}</dd>
        <dt className="text-ink-muted">{ui.priority}</dt><dd>{ui.medium}</dd>
        <dt className="text-ink-muted">{ui.status}</dt><dd><span className="rounded border border-line bg-sunken px-2 py-0.5">{ui.assigned}</span></dd>
      </dl>
      <button type="button" onClick={onOpen} className="mt-5 rounded-lg bg-brand px-4 py-2 text-xs font-medium text-white hover:bg-brand-hover">{ui.openWork}</button>
    </article>
  );
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
export function ProductDemo({ copy, examples, lang, label }: {
  copy: Dictionary["demo"];
  examples: Dictionary["command"]["examples"];
  lang: Locale;
  label: string;
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
  const milestones = useRef(new Set<string>());
  const [snap, setSnap] = useState<DemoSnapshot>({ phase: "typing", chars: 0 });
  const [createdWork, setCreatedWork] = useState<DemoWorkRow | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const paused = userPaused;
  const running = screen === "Today" && inView && pageVisible && !paused;
  const viewportRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const isVietnamese = lang === "vi";
  const ui = getProductUi(lang);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        wasVisible = false;
        setInView(false);
        return;
      }
      if (!wasVisible && entry.intersectionRatio >= 0.5) {
        // Start from the request whenever the visitor scrolls back to the product viewport.
        elapsed.current = 0;
        created.current = false;
        setCreatedWork(null);
        setSnap({ phase: "typing", chars: 0 });
        wasVisible = true;
        setInView(true);
      }
    }, { threshold: [0, 0.5], rootMargin: "-80px 0px 0px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
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
      // Keep the demo close to wall-clock time on slower devices too.
      elapsed.current += Math.min(now - last, 1000);
      last = now;
      if (elapsed.current >= timeline.total) {
        elapsed.current = 0;
        created.current = false;
        setCreatedWork(null);
      }
      const next = demoSnapshot(elapsed.current, chars.length, timeline);
      if ((next.phase === "card" || next.phase === "done") && !created.current) {
        created.current = true;
        setCreatedWork({ ...scenario.task });
      }
      setSnap(previous => previous.phase === next.phase && previous.chars === next.chars ? previous : next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, timeline, chars.length, scenario]);

  useEffect(() => {
    if (!inView || !pageVisible) {
      // Re-entry may start a new visit after inactivity; aggregation deduplicates existing visits.
      milestones.current.clear();
      return;
    }
    const stages = ["view"];
    if (screen === "Today" && snap.phase === "card" && createdWork) stages.push("work_card");
    if (createdWork && (screen === "My Work" || (screen === "Today" && snap.phase === "done"))) stages.push("work_list");
    for (const stage of stages) {
      if (milestones.current.has(stage)) continue;
      milestones.current.add(stage);
      track("demo_milestone", { stage });
    }
  }, [inView, pageVisible, screen, snap.phase, createdWork]);

  const replay = useCallback((source: string) => {
    elapsed.current = 0;
    created.current = false;
    setCreatedWork(null);
    setSnap({ phase: "typing", chars: 0 });
    setScreen("Today");
    setUserPaused(false);
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
  const status = snap.phase === "card" || snap.phase === "done" ? copy.success : snap.phase === "processing" ? copy.processing : isVietnamese ? "Viết yêu cầu như cách bạn giao việc." : "Write a request as you would to a teammate.";
  const composer = (
    <div className="flex items-end gap-3 rounded-2xl border border-brand/40 bg-white p-3 shadow-sm">
      <p data-demo-typed lang={lang} className="min-h-10 flex-1 text-sm leading-relaxed text-ink">
        {typed || <span className="text-ink-muted">{copy.placeholder}</span>}
        {snap.phase === "typing" && <span aria-hidden="true" className="ml-0.5 inline-block h-3 w-px animate-caret bg-brand motion-reduce:animate-none" />}
      </p>
      <button type="button" onClick={send} disabled={snap.phase === "processing"} aria-label={copy.send} className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover disabled:bg-sunken disabled:text-ink-muted">
        <ArrowUp className="size-4" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <figure id="demo" tabIndex={-1} aria-label={label} data-demo-phase={snap.phase} data-demo-running={running ? "true" : "false"} className="outline-none">
      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="flex items-center gap-2 text-xs font-medium text-ink-muted"><span className="size-1.5 rounded-full bg-brand" />{label}</span>
        <div role="tablist" aria-label={label} className="inline-flex rounded-lg border border-line bg-white p-1">
          {screens.map((item, index) => (
            <button key={item} type="button" ref={element => { tabRefs.current[index] = element; }} role="tab" id={`${id}-${index}`} aria-selected={screen === item} aria-controls={`${id}-panel`} tabIndex={screen === item ? 0 : -1} onClick={() => select(index)} onKeyDown={event => onKey(event, index)} className={cn("rounded-md px-3 py-2 text-xs transition-colors sm:px-4", screen === item ? "bg-brand text-white" : "text-ink-muted hover:bg-canvas")}>
              {item === "Today" ? isVietnamese ? "Tạo công việc" : "Create work" : ui.nav[item]}
            </button>
          ))}
        </div>
      </div>
      {screen === "Today" && (
        <div className="mb-3 flex flex-wrap gap-2" aria-label={isVietnamese ? "Chọn yêu cầu" : "Choose a request"}>
          {scenarios.map((item, index) => <button key={item.label} type="button" aria-pressed={index === exampleIndex} onClick={() => { setExampleIndex(index); replay("example"); }} className={cn("rounded-full border px-3 py-1.5 text-xs transition-colors", index === exampleIndex ? "border-brand/30 bg-white font-medium text-brand" : "border-line text-ink-muted hover:bg-white")}>{item.label}</button>)}
        </div>
      )}
      <div ref={viewportRef} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${screens.indexOf(screen)}`} tabIndex={0}>
        <ProductShell lang={lang} active={screen === "Today" && snap.phase === "done" ? "My Work" : screen}>
          {screen === "Today" ? snap.phase === "done" ? (
            <WorkTableScreen lang={lang} createdRow={createdWork} />
          ) : (
            <TodayScreen lang={lang} command={scenario.command} composer={composer} loading={snap.phase === "processing"} paused={paused}
              result={snap.phase === "card" && createdWork ? <CreatedWorkCard lang={lang} work={createdWork} success={copy.success} onOpen={() => { elapsed.current = timeline.doneAt; setSnap({ phase: "done", chars: chars.length }); }} /> : undefined}
            />
          ) : <WorkTableScreen lang={lang} delegated={screen === "Delegated"} createdRow={createdWork} />}
        </ProductShell>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p aria-live="polite" aria-atomic="true" className={cn("text-xs font-medium", (snap.phase === "card" || snap.phase === "done") ? "text-status-done" : "text-ink-muted")}>
          {screen === "Today" ? status : ui.nav[screen]}
        </p>
        <div className="flex shrink-0 gap-1">
          <button type="button" onClick={() => { setUserPaused(!paused); setScreen("Today"); track(paused ? "demo_play" : "demo_pause", { demo: "create_work" }); }} aria-label={paused ? copy.controls.play : copy.controls.pause} className="grid size-9 place-items-center rounded-lg border border-line bg-white text-ink-muted hover:text-brand">
            {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => replay("button")} aria-label={copy.controls.replay} className="grid size-9 place-items-center rounded-lg border border-line bg-white text-ink-muted hover:text-brand"><RotateCcw className="size-4" aria-hidden="true" /></button>
        </div>
      </div>
    </figure>
  );
}

export function CommandScreen({ command, lang = "en" }: { command: string; lang?: Locale }) {
  const ui = getProductUi(lang);
  return <div><div lang={lang} className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
    <div className="flex items-center gap-2 border-b border-line px-5 py-4 text-sm font-semibold"><Sparkles className="size-4 text-brand" />{ui.ask}<span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-normal text-ink-muted">{ui.projectPage}</span></div>
    <div className="flex min-h-[310px] flex-col p-5"><p className="text-sm leading-relaxed text-ink-muted">{ui.commandHelp}</p><p className="mt-3 text-sm leading-relaxed text-ink-muted">{ui.commandContext}</p><div className="mt-auto flex items-end gap-3 rounded-2xl border border-brand/50 p-3 text-sm"><p className="flex-1 leading-relaxed">{command}</p><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-sunken"><ArrowUp className="size-3.5" /></span></div></div>
  </div></div>;
}
