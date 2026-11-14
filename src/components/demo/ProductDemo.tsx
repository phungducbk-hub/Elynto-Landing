"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowUp, BookOpen, CalendarDays, ChartColumn, ChevronDown, CircleCheck, Flag, FolderKanban, Inbox, ListChecks, MessageSquare, Mic, PanelLeftClose, Plus, Search, Settings, SlidersHorizontal, Sparkles, Sun, TriangleAlert, UserRoundCheck, UsersRound } from "lucide-react";
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

export function TodayScreen({ command }: { command: string }) {
  return <div className="flex min-h-[410px] flex-col px-4 pt-8 pb-5 sm:min-h-[470px] sm:px-10">
    <div className="mx-auto w-full max-w-[600px]">
      <p className="text-lg font-semibold tracking-tight sm:text-xl">Hi Alex, what would you like to assign today?</p>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">Write a sentence as you normally would. Elynto creates exactly one piece of work and gives it to exactly one person.</p>
      <div className="mt-5 rounded-xl border border-line bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2"><p className="text-sm font-medium">Today at a glance</p><span className="rounded-full border border-line px-2 py-0.5 font-mono text-[8px] tracking-widest text-ink-muted">SAMPLE DATA</span></div>
        <p className="mt-1 text-[10px] leading-relaxed text-ink-muted">An interface preview. Real figures arrive with observation and reporting.</p>
        <ul className="mt-4 space-y-3 text-xs">
          <li className="flex gap-2.5"><TriangleAlert className="size-3.5 shrink-0 text-[#ad5a28]" /><span>2 work items are overdue<span className="mt-1 block text-[10px] text-ink-muted">Deal with these before assigning new work.</span></span></li>
          <li className="flex gap-2.5"><CalendarDays className="size-3.5 text-ink-muted" />3 work items are due this week</li>
          <li className="flex gap-2.5"><UsersRound className="size-3.5 text-ink-muted" />Minh is overloaded — 6 open work items</li>
          <li className="flex gap-2.5"><CircleCheck className="size-3.5 text-ink-muted" />To finish today: review the website proposal.</li>
        </ul>
      </div>
    </div>
    <div className="mx-auto mt-auto w-full max-w-[600px] pt-10">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-sm"><p className="flex-1 text-xs leading-relaxed text-ink-muted">{command}</p><Mic className="size-3.5 shrink-0 text-ink-muted" /><span className="grid size-7 shrink-0 place-items-center rounded-full bg-sunken text-ink-muted"><ArrowUp className="size-3.5" /></span></div>
    </div>
  </div>;
}

const sampleRows = [
  { title: "Prepare the monthly report", name: "Minh", due: "20/11/2026", status: "Assigned" },
  { title: "Review the website proposal", name: "Alex", due: "20/11/2026", status: "In progress" },
  { title: "Finalise campaign visuals", name: "Lan", due: "23/11/2026", status: "Assigned" },
  { title: "Confirm the launch schedule", name: "Alex", due: "25/11/2026", status: "In progress" },
  { title: "Send the client quotation", name: "Minh", due: "27/11/2026", status: "Assigned" },
];

export function WorkTableScreen({ delegated = false }: { delegated?: boolean }) {
  return <div className="min-h-[410px] p-3 sm:min-h-[470px] sm:p-5">
    <div className="mb-4 flex items-center justify-between gap-2 border-b border-line">
      <div className="flex min-w-0 gap-4 overflow-x-auto text-xs whitespace-nowrap"><span className="border-b-2 border-brand py-3">Upcoming</span><span className="py-3 text-[#a4592d]">Overdue (1)</span><span className="py-3 text-ink-muted">{delegated ? "Approval" : "Rework"}</span><span className="py-3 text-ink-muted">Completed</span><span className="py-3 text-ink-muted">Archived</span></div>
      <div aria-hidden="true" className="hidden shrink-0 items-center gap-3 text-ink-muted xl:flex"><Search className="size-3.5" /><SlidersHorizontal className="size-3.5" /><CalendarDays className="size-3.5" /><Plus className="size-3.5" /></div>
    </div>
    <div role="region" aria-label={delegated ? "Sample delegated work table" : "Sample My Work table"} tabIndex={0} className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full min-w-[560px] text-left text-[11px]">
        <thead className="border-b border-line text-[9px] font-normal text-ink-muted uppercase"><tr>{["Work", delegated ? "Assigned to" : "Assigned by", "Created", "Due", "Priority", "Status", "Files"].map(label => <th scope="col" className="px-3 py-3 font-normal" key={label}>{label}</th>)}</tr></thead>
        <tbody className="divide-y divide-line">
          {!delegated && <tr className="bg-canvas"><td colSpan={7} className="px-3 py-2 text-ink-muted"><ChevronDown className="mr-2 inline size-3" />Other work <span className="ml-1">5</span></td></tr>}
          {sampleRows.map((row, i) => <tr key={row.title}><td className="max-w-[180px] px-3 py-4 leading-relaxed"><Flag className={cn("mr-2 inline size-3", i === 1 ? "fill-[#b95050] text-[#b95050]" : "text-ink-muted")} />{row.title}</td><td className="px-3 py-4"><span className="mr-1.5 inline-grid size-4 place-items-center rounded-full bg-brand/10 text-[8px] text-brand">{delegated ? row.name[0] : "A"}</span>{delegated ? row.name : "You"}</td><td className="px-3 py-4 whitespace-nowrap text-ink-muted">14/11/2026</td><td className="px-3 py-4 whitespace-nowrap text-ink-muted">{row.due}</td><td className="px-3 py-4 text-ink-muted">Medium</td><td className="px-3 py-4"><span className={cn("whitespace-nowrap rounded border border-line px-1.5 py-0.5 text-[10px]", row.status === "In progress" ? "bg-[#e8f0fa] text-[#305b83]" : "bg-sunken text-ink")}>{row.status}</span></td><td className="px-3 py-4 text-ink-muted">{i === 1 ? "1" : "—"}</td></tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}

/** Real screen structure, sample content; navigation only, with no app/API connection. */
export function ProductDemo({ command, label, caption }: { command: string; label: string; caption: string }) {
  const [screen, setScreen] = useState<Screen>("Today");
  const id = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  function select(index: number, focus = false) {
    setScreen(screens[index]);
    if (focus) refs.current[index]?.focus();
    track("demo_screen_select", { screen: screens[index] });
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % screens.length;
    else if (event.key === "ArrowLeft") next = (index + screens.length - 1) % screens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screens.length - 1;
    else return;
    event.preventDefault(); select(next, true);
  }
  return <figure id="demo" tabIndex={-1} aria-label={label} className="outline-none">
    <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <span className="flex items-center gap-2 text-xs font-medium text-ink-muted"><span className="size-1.5 rounded-full bg-brand" />{label}</span>
      <div role="tablist" aria-label={label} className="inline-flex rounded-lg border border-line bg-white p-1">
        {screens.map((item, index) => <button key={item} ref={el => { refs.current[index] = el; }} role="tab" id={`${id}-${index}`} aria-selected={screen === item} aria-controls={`${id}-panel`} tabIndex={screen === item ? 0 : -1} onClick={() => select(index)} onKeyDown={event => onKey(event, index)} className={cn("rounded-md px-3 py-2 text-xs transition-colors sm:px-4", screen === item ? "bg-brand text-white" : "text-ink-muted hover:bg-canvas")}>{item}</button>)}
      </div>
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${screens.indexOf(screen)}`} tabIndex={0}>
      <ProductShell active={screen}>{screen === "Today" ? <TodayScreen command={command} /> : <WorkTableScreen delegated={screen === "Delegated"} />}</ProductShell>
    </div>
    <figcaption className="mt-4 text-center text-xs leading-relaxed text-ink-muted">{caption}</figcaption>
  </figure>;
}

export function CommandScreen({ command, badge }: { command: string; badge: string }) {
  return <div><div lang="en" className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
    <div className="flex items-center gap-2 border-b border-line px-5 py-4 text-sm font-semibold"><Sparkles className="size-4 text-brand" />Ask Elynto<span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-normal text-ink-muted">Project page</span></div>
    <div className="flex min-h-[310px] flex-col p-5"><p className="text-sm leading-relaxed text-ink-muted">Create or assign work in your own words — the same command as on Today.</p><p className="mt-3 text-sm leading-relaxed text-ink-muted">New work goes into this project only when you say “this project”.</p><div className="mt-auto flex items-end gap-3 rounded-2xl border border-brand/50 p-3 text-sm"><p className="flex-1 leading-relaxed">{command}</p><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-sunken"><ArrowUp className="size-3.5" /></span></div></div>
  </div><p className="mt-3 text-xs text-ink-muted">{badge}</p></div>;
}
