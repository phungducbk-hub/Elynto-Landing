"use client";

import { CalendarDays, ChartGantt, Columns3, Flag, List, PanelsTopLeft } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ProductSurface } from "@/components/ui/ProductSurface";
import { StatusPill } from "@/components/ui/StatusPill";
import type { Dictionary, TaskStatus, ViewKey } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Copy = Dictionary["views"];

type Props = {
  copy: Copy;
  label: string;
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

export function ViewsShowcase({ copy, label, views }: Props) {
  const [active, setActive] = useState<ViewKey>(views[0]);
  const tabRefs = useRef<Partial<Record<ViewKey, HTMLButtonElement | null>>>({});
  const baseId = useId();
  const firstProjectView = views.find((view) => projectViews.includes(view));

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
      <div className="flex flex-col gap-3 border-b border-rule md:flex-row md:items-end md:justify-between">
        <div role="tablist" aria-label={copy.tabsLabel} className="-mb-px flex flex-wrap gap-x-6">
          {views.map((view) => {
            const Icon = icons[view];
            const selected = view === active;
            return (
              <span key={view} className="contents">
                {view === firstProjectView && view !== views[0] ? (
                  <span aria-hidden="true" className="my-3 hidden w-px bg-rule sm:block" />
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
                    "inline-flex min-h-12 items-center gap-2 border-b-2 text-[0.9375rem] font-semibold transition-colors",
                    selected ? "border-navy text-navy" : "border-transparent text-muted hover:text-navy",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {copy.tabs[view].label}
                </button>
              </span>
            );
          })}
        </div>
        <p className="pb-3 text-[0.9375rem] text-muted" aria-live="polite">
          {copy.tabs[active].description}
        </p>
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} tabIndex={0} className="mt-6 rounded-2xl">
        <ProductSurface label={label}>
          <p className="flex items-baseline gap-3 border-b border-rule px-5 py-4 text-lg font-semibold text-ink stretch-wide sm:px-6">
            {isProject ? copy.project.name : copy.myWorkTitle}
            {isProject ? <span className="text-sm font-normal text-muted">{copy.projectLabel}</span> : null}
          </p>
          <div className="min-h-[20rem] p-4 sm:p-6">
            {active === "list" && <ListView copy={copy} />}
            {active === "kanban" && <KanbanView copy={copy} />}
            {active === "calendar" && <CalendarView copy={copy} />}
            {active === "timeline" && <TimelineView copy={copy} />}
            {active === "gantt" && <GanttView copy={copy} />}
          </div>
        </ProductSurface>
      </div>
    </div>
  );
}

function ImportantFlag({ label }: { label: string }) {
  return (
    <span className="inline-flex text-late" title={label}>
      <Flag className="size-3.5" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function StatusDot({ status }: { status: TaskStatus }) {
  if (status === "done") {
    return (
      <span aria-hidden="true" className="inline-grid size-4 shrink-0 place-items-center rounded-full bg-done text-white">
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
        "size-4 shrink-0 rounded-full border-[1.5px]",
        status === "inProgress"
          ? "border-progress bg-[conic-gradient(var(--color-progress)_0_50%,transparent_50%)]"
          : "border-rule-strong",
      )}
    />
  );
}

function ListView({ copy }: { copy: Copy }) {
  return (
    <div>
      <div className="hidden grid-cols-[minmax(0,1fr)_10rem_7rem_8rem] gap-4 border-b border-rule pb-2.5 text-sm text-muted md:grid">
        <span>{copy.listHeaders.task}</span>
        <span>{copy.listHeaders.project}</span>
        <span>{copy.listHeaders.due}</span>
        <span>{copy.listHeaders.status}</span>
      </div>
      <ul className="divide-y divide-rule">
        {copy.tasks.map((task) => (
          <li
            key={task.title}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-3 text-[0.9375rem] md:grid-cols-[minmax(0,1fr)_10rem_7rem_8rem]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <StatusDot status={task.status} />
              <span className={cn("leading-snug font-medium md:truncate", task.status === "done" ? "text-muted line-through" : "text-ink")}>
                {task.title}
              </span>
              {task.important ? <ImportantFlag label={copy.importantLabel} /> : null}
            </span>
            <span className="col-start-1 row-start-2 truncate pl-6.5 text-sm text-muted md:col-start-auto md:row-start-auto md:pl-0 md:text-[0.9375rem]">
              {task.project}
            </span>
            <span className="hidden text-body md:block">{task.due}</span>
            <span className="col-start-2 row-span-2 row-start-1 justify-self-end md:col-start-auto md:row-span-1 md:row-start-auto md:justify-self-start">
              <StatusPill status={task.status} label={copy.statuses[task.status]} />
            </span>
          </li>
        ))}
      </ul>
    </div>
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
            <div key={status} className="rounded-xl bg-fog p-2.5">
              <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2.5">
                <StatusPill status={status} label={copy.statuses[status]} />
                <span className="text-sm text-muted">{tasks.length}</span>
              </div>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.title} className="rounded-lg border border-rule bg-paper p-3">
                    <p className="text-[0.9375rem] leading-snug font-medium text-ink">{task.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-sm text-muted">
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
              "flex gap-3 rounded-xl border p-2.5 sm:min-h-[16rem] sm:flex-col sm:gap-2",
              isToday ? "border-navy/30 bg-fog" : "border-rule bg-paper",
            )}
          >
            <p className="w-24 shrink-0 text-sm font-semibold text-ink sm:w-auto">
              {day}
              {isToday ? (
                <span className="mt-0.5 block text-xs font-medium text-navy sm:mt-0 sm:ml-1.5 sm:inline">{copy.todayLabel}</span>
              ) : null}
            </p>
            <ul className="min-w-0 flex-1 space-y-1.5">
              {tasks.map((task) => (
                <li
                  key={task.title}
                  className={cn(
                    "rounded-md border-l-[3px] bg-paper px-2 py-1.5 text-[0.8125rem] leading-snug ring-1 ring-rule",
                    task.status === "done" && "border-done text-muted line-through",
                    task.status === "inProgress" && "border-progress text-ink",
                    task.status === "todo" && "border-rule-strong text-ink",
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
    <div className="grid grid-cols-3 border-b border-rule text-sm text-muted">
      {weeks.map((week) => (
        <span key={week} className="border-l border-rule px-2 py-2 first:border-l-0">
          {week}
        </span>
      ))}
    </div>
  );
}

function TimelineView({ copy }: { copy: Copy }) {
  const { project } = copy;
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="min-w-[34rem] rounded-xl border border-rule">
        <WeekScale weeks={project.weeks} />
        <ul className="space-y-3 px-3 py-4">
          {project.phases.map((phase, index) => (
            <li key={phase.name} className="relative h-10">
              <span
                className={cn(
                  "absolute inset-y-0 flex items-center rounded-lg px-3 text-sm font-semibold whitespace-nowrap",
                  index === 0 ? "bg-navy text-white" : index === 1 ? "bg-progress text-white" : "bg-navy-tint text-navy",
                )}
                style={{ left: pct(phase.start), width: `calc(${pct(phase.end - phase.start)} - 4px)` }}
              >
                {phase.name}
              </span>
            </li>
          ))}
          <li className="relative h-6">
            {project.milestones.map((milestone) => (
              <span
                key={milestone.name}
                className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2"
                style={{ left: pct(Math.min(milestone.at, DAYS - 0.2)) }}
              >
                <span aria-hidden="true" className="size-3 rotate-45 rounded-[2px] bg-navy ring-2 ring-paper" />
                <span className="sr-only">{milestone.name}</span>
              </span>
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
      <div className="grid min-w-[40rem] grid-cols-[11rem_minmax(0,1fr)] rounded-xl border border-rule">
        <div className="border-r border-rule">
          <div className="border-b border-rule px-3 py-2 text-sm text-muted">{copy.listHeaders.task}</div>
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
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              {project.tasks.map((task, index) => {
                if (task.after === undefined) return null;
                const from = project.tasks[task.after];
                const y1 = 8 + task.after * rowHeight + rowHeight / 2;
                const y2 = 8 + index * rowHeight + rowHeight / 2;
                const x = `${(Math.max(from.end, task.start) / DAYS) * 100}%`;
                return (
                  <line
                    key={task.name}
                    x1={x}
                    y1={y1}
                    x2={x}
                    y2={y2 - 10}
                    stroke="var(--color-muted)"
                    strokeWidth="1.25"
                    strokeDasharray="3 3"
                  />
                );
              })}
            </svg>
            <ul>
              {project.tasks.map((task, index) => (
                <li key={task.name} className="relative" style={{ height: rowHeight }}>
                  <span
                    className={cn(
                      "absolute top-1/2 h-5 -translate-y-1/2 rounded-md",
                      index < 3 ? "bg-navy" : index < 5 ? "bg-progress" : "bg-navy-tint ring-1 ring-navy/30 ring-inset",
                    )}
                    style={{ left: pct(task.start), width: `calc(${pct(task.end - task.start)} - 3px)` }}
                  />
                </li>
              ))}
            </ul>
            {project.milestones.map((milestone) => (
              <span key={milestone.name} className="absolute inset-y-2" style={{ left: pct(Math.min(milestone.at, DAYS - 0.2)) }}>
                <span aria-hidden="true" className="absolute inset-y-0 w-px -translate-x-1/2 bg-navy/30" />
                <span aria-hidden="true" className="absolute -top-1 size-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-navy ring-2 ring-paper" />
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
    <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-rule px-3 py-2.5 text-sm text-muted">
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="size-2.5 rotate-45 rounded-[2px] bg-navy" />
        {copy.project.milestoneLabel}: {copy.project.milestones.map((m) => m.name).join(", ")}
      </span>
      {showDependency ? (
        <span className="inline-flex items-center gap-2">
          <svg aria-hidden="true" width="18" height="6">
            <line x1="0" y1="3" x2="18" y2="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          {copy.project.dependencyLabel}
        </span>
      ) : null}
    </div>
  );
}
