"use client";

import { CalendarDays, ChartGantt, Columns3, Flag, List, PanelsTopLeft } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { IllustrationFrame } from "@/components/ui/IllustrationFrame";
import { StatusPill } from "@/components/ui/StatusPill";
import type { Dictionary, TaskStatus, ViewKey } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Copy = Dictionary["views"];

type Props = {
  copy: Copy;
  badge: string;
  /** Tabs to show, in order. Project views are only passed in when their feature flag is on. */
  views: ViewKey[];
};

const icons: Record<ViewKey, typeof List> = {
  list: List,
  kanban: Columns3,
  calendar: CalendarDays,
  timeline: PanelsTopLeft,
  gantt: ChartGantt,
};

const projectViews: ViewKey[] = ["timeline", "gantt"];

export function ViewsShowcase({ copy, badge, views }: Props) {
  const [active, setActive] = useState<ViewKey>(views[0]);
  const tabRefs = useRef<Partial<Record<ViewKey, HTMLButtonElement | null>>>({});
  const baseId = useId();
  const hasProjectViews = views.some((view) => projectViews.includes(view));

  const select = (view: ViewKey, focus = false) => {
    setActive(view);
    if (focus) tabRefs.current[view]?.focus();
    track("view_tab_select", { view });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = views.indexOf(active);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % views.length;
    if (event.key === "ArrowLeft") next = (index - 1 + views.length) % views.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = views.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(views[next], true);
  };

  const isProject = projectViews.includes(active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div
          role="tablist"
          aria-label={copy.tabsLabel}
          className="inline-flex max-w-full flex-wrap gap-1 rounded-xl bg-sunken p-1 ring-1 ring-line ring-inset"
        >
          {views.map((view, index) => {
            const Icon = icons[view];
            const selected = view === active;
            const startsProjectGroup = hasProjectViews && view === views.find((v) => projectViews.includes(v));
            return (
              <span key={view} className="contents">
                {startsProjectGroup && index > 0 ? (
                  <span aria-hidden="true" className="mx-1 my-1.5 hidden w-px bg-line-strong sm:block" />
                ) : null}
                <button
                  ref={(el) => {
                    tabRefs.current[view] = el;
                  }}
                  id={`${baseId}-tab-${view}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(view)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-colors",
                    selected ? "bg-surface text-ink shadow-sm ring-1 ring-line" : "text-ink-muted hover:text-ink",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {copy.tabs[view].label}
                </button>
              </span>
            );
          })}
        </div>
        <p className="text-sm text-ink-subtle" aria-live="polite">
          {copy.tabs[active].description}
        </p>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="mt-5 rounded-2xl"
      >
        <IllustrationFrame
          badge={badge}
          title={
            <span className="flex items-baseline gap-2">
              <span className="text-ink">{isProject ? copy.project.name : copy.myWorkTitle}</span>
              {isProject ? <span className="font-normal text-ink-subtle">· {copy.projectLabel}</span> : null}
            </span>
          }
          bodyClassName="min-h-[21rem]"
        >
          {active === "list" && <ListView copy={copy} />}
          {active === "kanban" && <KanbanView copy={copy} />}
          {active === "calendar" && <CalendarView copy={copy} />}
          {active === "timeline" && <TimelineView copy={copy} />}
          {active === "gantt" && <GanttView copy={copy} />}
        </IllustrationFrame>
      </div>
    </div>
  );
}

function ImportantFlag({ label }: { label: string }) {
  return (
    <span className="inline-flex text-status-overdue" title={label}>
      <Flag className="size-3.5" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function ListView({ copy }: { copy: Copy }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="hidden grid-cols-[minmax(0,1fr)_10rem_7rem_8rem] gap-4 border-b border-line bg-canvas px-4 py-2.5 text-xs font-semibold tracking-wide text-ink-subtle uppercase md:grid">
        <span>{copy.listHeaders.task}</span>
        <span>{copy.listHeaders.project}</span>
        <span>{copy.listHeaders.due}</span>
        <span>{copy.listHeaders.status}</span>
      </div>
      <ul className="divide-y divide-line bg-surface">
        {copy.tasks.map((task) => (
          <li
            key={task.title}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-3 text-sm md:grid-cols-[minmax(0,1fr)_10rem_7rem_8rem]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <StatusDot status={task.status} />
              <span className={cn("leading-snug font-medium md:truncate", task.status === "done" ? "text-ink-subtle line-through" : "text-ink")}>
                {task.title}
              </span>
              {task.important ? <ImportantFlag label={copy.importantLabel} /> : null}
            </span>
            <span className="col-start-1 row-start-2 truncate pl-6.5 text-xs text-ink-subtle md:col-start-auto md:row-start-auto md:pl-0 md:text-sm">
              {task.project}
            </span>
            <span className="hidden text-ink-muted md:block">{task.due}</span>
            <span className="col-start-2 row-span-2 row-start-1 justify-self-end md:col-start-auto md:row-span-1 md:row-start-auto md:justify-self-start">
              <StatusPill status={task.status} label={copy.statuses[task.status]} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusDot({ status }: { status: TaskStatus }) {
  if (status === "done") {
    return (
      <span aria-hidden="true" className="inline-grid size-4 shrink-0 place-items-center rounded-full bg-status-done text-white">
        <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 rounded-full border-2",
        status === "inProgress" ? "border-status-progress bg-[conic-gradient(var(--color-status-progress)_0_50%,transparent_50%)]" : "border-line-strong",
      )}
    />
  );
}

function KanbanView({ copy }: { copy: Copy }) {
  const columns: TaskStatus[] = ["todo", "inProgress", "done"];
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <div className="grid min-w-[34rem] grid-cols-3 gap-3">
        {columns.map((status) => {
          const tasks = copy.tasks.filter((task) => task.status === status);
          return (
            <div key={status} className="rounded-xl bg-sunken p-2.5">
              <div className="flex items-center justify-between px-1 pb-2.5">
                <StatusPill status={status} label={copy.statuses[status]} />
                <span className="text-xs font-medium text-ink-subtle">{tasks.length}</span>
              </div>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.title} className="rounded-lg border border-line bg-surface p-3 shadow-[0_1px_1px_rgb(16_28_43/0.04)]">
                    <p className="text-sm leading-snug font-medium text-ink">{task.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-xs text-ink-subtle">
                      <span className="truncate">{task.project}</span>
                      <span className="inline-flex shrink-0 items-center gap-1.5">
                        {task.important ? <ImportantFlag label={copy.importantLabel} /> : null}
                        {task.due}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarView({ copy }: { copy: Copy }) {
  const todayIndex = 1;
  return (
    <div className="grid gap-2 sm:grid-cols-5">
      {copy.weekdays.map((day, index) => {
        const tasks = copy.tasks.filter((task) => task.day === index);
        const isToday = index === todayIndex;
        return (
          <div
            key={day}
            className={cn(
              "flex gap-3 rounded-xl border p-2.5 sm:min-h-[17rem] sm:flex-col sm:gap-2",
              isToday ? "border-brand-200 bg-brand-50/60" : "border-line bg-surface",
            )}
          >
            <p className="w-24 shrink-0 text-xs font-semibold text-ink-muted sm:w-auto">
              {day}
              {isToday ? (
                <span className="mt-1 block w-fit rounded-full bg-brand px-1.5 py-0.5 text-[0.625rem] font-semibold text-white sm:ml-1.5 sm:inline sm:align-middle">
                  {copy.todayLabel}
                </span>
              ) : null}
            </p>
            <ul className="min-w-0 flex-1 space-y-1.5">
              {tasks.map((task) => (
                <li
                  key={task.title}
                  className={cn(
                    "rounded-md border-l-[3px] bg-surface px-2 py-1.5 text-xs leading-snug shadow-[0_1px_1px_rgb(16_28_43/0.05)] ring-1 ring-line",
                    task.status === "done" && "border-status-done text-ink-subtle line-through",
                    task.status === "inProgress" && "border-status-progress text-ink",
                    task.status === "todo" && "border-line-strong text-ink",
                  )}
                >
                  {task.title}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

const DAYS = 15;
const pct = (day: number) => `${(day / DAYS) * 100}%`;

function WeekScale({ weeks }: { weeks: string[] }) {
  return (
    <div className="grid grid-cols-3 border-b border-line text-xs font-semibold text-ink-subtle">
      {weeks.map((week) => (
        <span key={week} className="border-l border-line px-2 py-2 first:border-l-0">
          {week}
        </span>
      ))}
    </div>
  );
}

function Milestone({ at, name }: { at: number; name: string }) {
  return (
    <span className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center" style={{ left: pct(at) }}>
      <span aria-hidden="true" className="size-3 rotate-45 rounded-[2px] bg-field-due ring-2 ring-surface" />
      <span className="sr-only">{name}</span>
    </span>
  );
}

function TimelineView({ copy }: { copy: Copy }) {
  const { project } = copy;
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="min-w-[34rem] rounded-xl border border-line">
        <WeekScale weeks={project.weeks} />
        <ul className="space-y-3 px-3 py-4">
          {project.phases.map((phase, index) => (
            <li key={phase.name} className="relative h-10">
              <span
                className={cn(
                  "absolute inset-y-0 flex items-center rounded-lg px-3 text-sm font-semibold whitespace-nowrap text-white",
                  index === 0 ? "bg-brand" : index === 1 ? "bg-brand-700" : "bg-brand-600",
                )}
                style={{ left: pct(phase.start), width: `calc(${pct(phase.end - phase.start)} - 4px)` }}
              >
                {phase.name}
              </span>
            </li>
          ))}
          <li className="relative h-6">
            {project.milestones.map((milestone) => (
              <Milestone key={milestone.name} at={Math.min(milestone.at, DAYS - 0.2)} name={milestone.name} />
            ))}
          </li>
        </ul>
        <Legend copy={copy} showDependency={false} />
      </div>
    </div>
  );
}

function GanttView({ copy }: { copy: Copy }) {
  const { project } = copy;
  const rowHeight = 40;
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="grid min-w-[40rem] grid-cols-[11rem_minmax(0,1fr)] rounded-xl border border-line">
        <div className="border-r border-line">
          <div className="border-b border-line px-3 py-2 text-xs font-semibold text-ink-subtle">{copy.listHeaders.task}</div>
          <ul className="py-2">
            {project.tasks.map((task) => (
              <li key={task.name} className="flex items-center px-3 text-sm text-ink" style={{ height: rowHeight }}>
                <span className="truncate" title={task.name}>
                  {task.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <WeekScale weeks={project.weeks} />
          <div className="relative py-2">
            {/* Dependency connectors */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
              {project.tasks.map((task, index) => {
                if (task.after === undefined) return null;
                const from = project.tasks[task.after];
                const y1 = 8 + task.after * rowHeight + rowHeight / 2;
                const y2 = 8 + index * rowHeight + rowHeight / 2;
                const x1 = (from.end / DAYS) * 100;
                const x2 = (task.start / DAYS) * 100;
                return (
                  <g key={task.name} stroke="var(--color-ink-subtle)" strokeWidth="1.25" fill="none" strokeDasharray="3 3">
                    <line x1={`${x1}%`} y1={y1} x2={`${Math.max(x1, x2)}%`} y2={y1} />
                    <line x1={`${Math.max(x1, x2)}%`} y1={y1} x2={`${Math.max(x1, x2)}%`} y2={y2 - 10} />
                  </g>
                );
              })}
            </svg>
            <ul>
              {project.tasks.map((task, index) => (
                <li key={task.name} className="relative" style={{ height: rowHeight }}>
                  <span
                    className={cn(
                      "absolute top-1/2 h-5 -translate-y-1/2 rounded-md",
                      index < 3 ? "bg-brand" : index < 5 ? "bg-brand-700" : "bg-brand-600",
                    )}
                    style={{ left: pct(task.start), width: `calc(${pct(task.end - task.start)} - 3px)` }}
                  />
                </li>
              ))}
            </ul>
            {project.milestones.map((milestone) => (
              <span key={milestone.name} className="absolute inset-y-2" style={{ left: pct(Math.min(milestone.at, DAYS - 0.2)) }}>
                <span aria-hidden="true" className="absolute inset-y-0 w-px -translate-x-1/2 bg-field-due/40" />
                <span aria-hidden="true" className="absolute -top-1 size-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-field-due ring-2 ring-surface" />
                <span className="sr-only">{milestone.name}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <Legend copy={copy} showDependency />
        </div>
      </div>
    </div>
  );
}

function Legend({ copy, showDependency }: { copy: Copy; showDependency: boolean }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-3 py-2.5 text-xs text-ink-subtle">
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="size-2.5 rotate-45 rounded-[2px] bg-field-due" />
        {copy.project.milestoneLabel}
        <span className="text-ink-muted">({copy.project.milestones.map((m) => m.name).join(", ")})</span>
      </span>
      {showDependency ? (
        <span className="inline-flex items-center gap-2">
          <svg aria-hidden="true" width="18" height="6" className="text-ink-subtle">
            <line x1="0" y1="3" x2="18" y2="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          {copy.project.dependencyLabel}
        </span>
      ) : null}
    </div>
  );
}
