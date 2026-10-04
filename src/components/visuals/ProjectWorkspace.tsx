"use client";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChartColumn,
  ChartGantt,
  CircleCheck,
  Ellipsis,
  FolderKanban,
  Inbox,
  List,
  ListChecks,
  Lock,
  Sparkles,
  Sun,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/brand/Logo";
import { statusAccent, WorkStatusBadge } from "@/components/ui/WorkStatus";
import type { Dictionary, PlanTask, ProjectView, WorkStatus } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { formatDay } from "@/lib/format";

type App = Dictionary["app"];
type Data = Dictionary["views"]["data"];

type Props = { data: Data; app: App; badge: string };

const views: ProjectView[] = ["list", "calendar", "gantt"];
const viewIcons = { list: List, calendar: CalendarDays, gantt: ChartGantt } as const;

/** "Today" in the illustrated month. */
const TODAY = 9;
const ME = { name: "", initials: "", self: true };

/**
 * Refined recreation of a project page in the Elynto beta: workspace shell,
 * project overview with health, and the list / calendar / Gantt views.
 */
export function ProjectWorkspace({ data, app, badge }: Props) {
  const [view, setView] = useState<ProjectView>("list");
  const tabRefs = useRef<Partial<Record<ProjectView, HTMLButtonElement | null>>>({});
  const baseId = useId();

  const select = (next: ProjectView, focus = false) => {
    setView(next);
    if (focus) tabRefs.current[next]?.focus();
    track("view_tab_select", { view: next });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = views.indexOf(view);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % views.length;
    if (event.key === "ArrowLeft") next = (index - 1 + views.length) % views.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = views.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(views[next], true);
  };

  const nav = [
    { icon: Sun, label: app.nav.today },
    { icon: Inbox, label: app.nav.inbox },
    { icon: ListChecks, label: app.nav.myWork },
    { icon: UserRoundCheck, label: app.nav.delegated },
    { icon: FolderKanban, label: app.nav.projects, active: true },
    { icon: UsersRound, label: app.nav.team },
    { icon: ChartColumn, label: app.nav.reports },
    { icon: BookOpen, label: app.nav.knowledge },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-float">
      <div className="grid lg:grid-cols-[13rem_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside aria-hidden="true" className="hidden border-r border-line bg-canvas lg:block">
          <div className="flex h-14 items-center border-b border-line px-5 text-brand">
            <Logo className="h-5 w-auto" title={null} />
          </div>
          <ul className="space-y-0.5 p-3">
            {nav.map((item) => (
              <li
                key={item.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[0.875rem]",
                  item.active ? "bg-surface font-semibold text-brand shadow-[0_0_0_1px_var(--color-line)]" : "text-ink-muted",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0">
          {/* Top bar */}
          <div className="flex h-14 items-center justify-between gap-3 border-b border-line bg-canvas px-5 sm:px-8">
            <span aria-hidden="true" className="text-[0.9375rem] font-semibold text-ink">
              {app.workspace}
            </span>
            <span className="flex items-center gap-3">
              <span className="rounded-full border border-line-strong bg-surface px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide text-ink-subtle uppercase">
                {badge}
              </span>
              <Avatar person={ME} className="hidden sm:inline-grid" />
            </span>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-7">
            {/* Overview */}
            <p className="flex items-center gap-2 text-sm text-ink-subtle">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {data.back}
            </p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <p className="text-2xl leading-tight font-semibold text-ink">{data.name}</p>
              <Ellipsis className="mt-1 size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[0.8125rem]">
              {data.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-sunken px-2 py-0.5 font-medium text-ink-muted ring-1 ring-line ring-inset">
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 text-ink-subtle">
                <Lock className="size-3.5" aria-hidden="true" />
                {data.privacy}
              </span>
            </div>
            <p className="mt-3 max-w-[46rem] text-[0.9375rem] leading-relaxed text-pretty">{data.description}</p>

            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-5">
              {data.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn("bg-surface px-4 py-3", index === data.stats.length - 1 && "col-span-2 lg:col-span-1")}
                >
                  <dt className="text-[0.8125rem] text-ink-subtle">{stat.label}</dt>
                  <dd className="mt-0.5 text-[0.9375rem] font-semibold text-ink">
                    {stat.value}
                    {index === 0 ? (
                      <span aria-hidden="true" className="mt-1.5 block h-1.5 w-full max-w-28 overflow-hidden rounded-full bg-sunken">
                        <span className="block h-full rounded-full bg-brand" style={{ width: `${data.progress}%` }} />
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.8125rem] text-ink-subtle">{data.healthLabel}</p>
                <p className="mt-0.5 flex items-center gap-2 text-[0.9375rem] font-semibold text-st-completed">
                  <CircleCheck className="size-4" aria-hidden="true" />
                  {data.health}
                </p>
                <p className="mt-0.5 text-sm text-ink-subtle">{data.healthNote}</p>
              </div>
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-fit shrink-0 items-center gap-2 rounded-lg bg-surface px-3.5 text-sm font-semibold text-brand ring-1 ring-line-strong ring-inset"
              >
                <Sparkles className="size-4" />
                {data.analyse}
              </span>
            </div>

            {/* Views */}
            <div className="mt-7 flex flex-col gap-2 border-b border-line md:flex-row md:items-end md:justify-between">
              <div role="tablist" aria-label={data.viewsLabel} className="-mb-px flex gap-6">
                {views.map((key) => {
                  const Icon = viewIcons[key];
                  const selected = key === view;
                  return (
                    <button
                      key={key}
                      ref={(el) => {
                        tabRefs.current[key] = el;
                      }}
                      id={`${baseId}-tab-${key}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`${baseId}-panel`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(key)}
                      onKeyDown={onKeyDown}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-2 border-b-2 text-[0.9375rem] font-semibold transition-colors",
                        selected ? "border-brand text-brand" : "border-transparent text-ink-subtle hover:text-brand",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {data.views[key]}
                    </button>
                  );
                })}
              </div>
              {view === "gantt" ? <p className="pb-2.5 text-sm text-ink-subtle">{data.dragHint}</p> : null}
            </div>

            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${view}`}
              tabIndex={0}
              className="mt-5 min-h-[30rem] rounded-lg"
            >
              {view === "list" && <ListView data={data} app={app} />}
              {view === "calendar" && <CalendarView data={data} app={app} />}
              {view === "gantt" && <GanttView data={data} app={app} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function phaseRange(tasks: PlanTask[]) {
  return { start: Math.min(...tasks.map((t) => t.start)), due: Math.max(...tasks.map((t) => t.due)) };
}

function PriorityText({ priority, app }: { priority: PlanTask["priority"]; app: App }) {
  return (
    <span className={priority === "high" ? "font-semibold text-ink" : "text-ink-subtle"}>{app.priorities[priority]}</span>
  );
}

/* ---------------- List, grouped by phase ---------------- */

const listCols = "md:grid-cols-[minmax(0,1fr)_9rem_4.25rem_4.25rem_6rem_7rem]";

function ListView({ data, app }: { data: Data; app: App }) {
  const { columns } = data;
  return (
    <div className="overflow-hidden rounded-xl border border-line text-[0.875rem]">
      <div className={cn("hidden gap-3 border-b border-line px-4 py-2.5 text-[0.8125rem] text-ink-subtle md:grid", listCols)}>
        <span>{columns.task}</span>
        <span>{columns.assignee}</span>
        <span>{columns.start}</span>
        <span>{columns.due}</span>
        <span>{columns.priority}</span>
        <span>{columns.status}</span>
      </div>
      {data.phases.map((phase, index) => {
        const { start, due } = phaseRange(phase.tasks);
        const done = phase.tasks.filter((t) => t.status === "completed").length;
        return (
          <section key={phase.name} aria-label={phase.name} className="border-b border-line last:border-b-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-canvas px-4 py-2.5">
              <span className="inline-grid size-5 place-items-center rounded-full bg-surface text-[0.75rem] font-semibold text-brand ring-1 ring-line">
                {index + 1}
              </span>
              <span className="font-semibold text-ink">{phase.name}</span>
              <span className="text-ink-subtle">{phase.tasks.length}</span>
              <span aria-hidden="true" className="h-1.5 w-14 overflow-hidden rounded-full bg-line">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${(done / phase.tasks.length) * 100}%` }} />
              </span>
              <span className="text-[0.8125rem] text-ink-subtle">
                {formatDay(app.datePattern, start)} – {formatDay(app.datePattern, due)}
              </span>
            </div>
            <ul className="divide-y divide-line">
              {phase.tasks.map((task) => (
                <li
                  key={task.title}
                  className={cn("grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-4 py-2.5", listCols)}
                >
                  <span className="leading-snug font-medium text-ink">{task.title}</span>
                  <span className="col-start-1 row-start-2 flex items-center gap-2 text-[0.8125rem] text-ink-subtle md:col-start-auto md:row-start-auto md:text-[0.875rem] md:text-ink-muted">
                    <Avatar person={task.assignee} size="sm" />
                    <span className="truncate">{task.assignee.name}</span>
                    <span className="-ml-1.5 md:hidden">, {formatDay(app.datePattern, task.due)}</span>
                  </span>
                  <span className="hidden text-ink-subtle md:block">{formatDay(app.datePattern, task.start)}</span>
                  <span className="hidden text-ink md:block">{formatDay(app.datePattern, task.due)}</span>
                  <span className="hidden md:block">
                    <PriorityText priority={task.priority} app={app} />
                  </span>
                  <span className="col-start-2 row-span-2 row-start-1 justify-self-end md:col-start-auto md:row-span-1 md:row-start-auto md:justify-self-start">
                    <WorkStatusBadge status={task.status} label={app.statuses[task.status]} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/* ---------------- Month calendar ---------------- */

// October, weeks starting Monday 28 September.
const CAL_START = -2; // day number of the first cell (28 Sep = Oct -2)
const CAL_CELLS = 35;

function CalendarView({ data, app }: { data: Data; app: App }) {
  const tasks = data.phases.flatMap((phase) => phase.tasks);
  const shown = new Set<WorkStatus>(tasks.map((task) => task.status));
  const cells = Array.from({ length: CAL_CELLS }, (_, i) => CAL_START + i);
  const label = (day: number) => {
    if (day < 1) return String(30 + day);
    if (day > 31) return String(day - 31);
    return String(day);
  };

  return (
    <div>
      <p className="mb-3 text-lg font-semibold text-ink">{app.monthTitle}</p>
      <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        <div className="min-w-[44rem] overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-7 border-b border-line bg-canvas text-[0.8125rem] text-ink-subtle">
            {app.weekdaysShort.map((day) => (
              <span key={day} className="px-2.5 py-2">
                {day}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, index) => {
              const inMonth = day >= 1 && day <= 31;
              const dayTasks = tasks.filter((task) => task.due === day);
              return (
                <div
                  key={day}
                  className={cn(
                    "min-h-[5.75rem] border-line p-1.5",
                    index % 7 !== 6 && "border-r",
                    index < CAL_CELLS - 7 && "border-b",
                    !inMonth && "bg-canvas",
                  )}
                >
                  <span
                    className={cn(
                      "inline-grid size-6 place-items-center rounded-full text-[0.8125rem]",
                      day === TODAY ? "bg-brand font-semibold text-white" : inMonth ? "text-ink" : "text-ink-subtle",
                    )}
                  >
                    {label(day)}
                  </span>
                  <ul className="mt-1 space-y-1">
                    {dayTasks.map((task) => (
                      <li
                        key={task.title}
                        title={task.title}
                        className={cn(
                          "truncate rounded-[0.3rem] border-l-[3px] bg-surface px-1.5 py-0.5 text-[0.75rem] leading-snug text-ink ring-1 ring-line",
                          statusAccent[task.status],
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
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {(Object.keys(app.statuses) as WorkStatus[])
          .filter((status) => shown.has(status))
          .map((status) => (
            <li key={status}>
              <WorkStatusBadge status={status} label={app.statuses[status]} />
            </li>
          ))}
      </ul>
    </div>
  );
}

/* ---------------- Gantt ---------------- */

const G_FIRST = 5;
const G_LAST = 25;
const G_DAYS = G_LAST - G_FIRST + 1;
const WEEKEND = new Set([10, 11, 17, 18, 24, 25]);
const gx = (day: number) => `${((day - G_FIRST) / G_DAYS) * 100}%`;
const gw = (start: number, due: number) => `${((due - start + 1) / G_DAYS) * 100}%`;

function barTone(status: WorkStatus) {
  if (status === "completed" || status === "approved") return "bg-brand";
  if (status === "accepted" || status === "inProgress" || status === "submitted" || status === "rework") return "bg-status-progress";
  return "bg-brand-100 ring-1 ring-inset ring-brand/25";
}

function GanttView({ data, app }: { data: Data; app: App }) {
  const days = Array.from({ length: G_DAYS }, (_, i) => G_FIRST + i);
  const rowH = "h-9";

  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
      <div className="grid min-w-[54rem] grid-cols-[15rem_minmax(0,1fr)] overflow-hidden rounded-xl border border-line text-[0.8125rem]">
        {/* Header */}
        <div className="flex items-end border-r border-b border-line px-3 pb-2 text-ink-subtle">{data.columns.task}</div>
        <div className="relative border-b border-line">
          <p className="px-2 pt-2 text-ink-subtle">{app.monthTitle}</p>
          <div className="relative grid pb-1.5" style={{ gridTemplateColumns: `repeat(${G_DAYS}, minmax(0, 1fr))` }}>
            {days.map((day) => (
              <span
                key={day}
                className={cn("text-center", day === TODAY ? "font-semibold text-brand" : "text-ink-subtle")}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="border-r border-line">
          {data.phases.map((phase, index) => (
            <div key={phase.name}>
              <div className={cn("flex items-center gap-2 border-b border-line bg-canvas px-3 font-semibold text-ink", rowH)}>
                <span className="text-brand">{index + 1}</span>
                <span className="truncate">{phase.name}</span>
              </div>
              {phase.tasks.map((task) => (
                <div key={task.title} className={cn("flex items-center border-b border-line px-3 pl-7 text-ink-muted last:border-b-0", rowH)}>
                  <span className="truncate" title={task.title}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="relative">
          {/* Weekend shading and today line */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {days.map((day) =>
              WEEKEND.has(day) ? (
                <span key={day} className="absolute inset-y-0 bg-sunken" style={{ left: gx(day), width: gw(day, day) }} />
              ) : null,
            )}
            <span className="absolute inset-y-0 w-px bg-brand/60" style={{ left: `calc(${gx(TODAY)} + ${gw(TODAY, TODAY)} / 2)` }} />
          </div>

          {data.phases.map((phase) => {
            const { start, due } = phaseRange(phase.tasks);
            return (
              <div key={phase.name}>
                <div className={cn("relative border-b border-line bg-canvas", rowH)}>
                  <span
                    className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-ink-subtle/50"
                    style={{ left: gx(start), width: gw(start, due) }}
                  />
                </div>
                {phase.tasks.map((task) => (
                  <div key={task.title} className={cn("relative border-b border-line last:border-b-0", rowH)}>
                    <span
                      title={`${task.title}: ${formatDay(app.datePattern, task.start)} – ${formatDay(app.datePattern, task.due)}`}
                      className={cn("absolute top-1/2 h-4 -translate-y-1/2 rounded-[0.3rem]", barTone(task.status))}
                      style={{ left: `calc(${gx(task.start)} + 2px)`, width: `calc(${gw(task.start, task.due)} - 4px)` }}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.8125rem] text-ink-subtle">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-px bg-brand/60" />
          {app.todayLabel}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-5 rounded-sm bg-brand" />
          {app.barLegend.done}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-5 rounded-sm bg-status-progress" />
          {app.barLegend.active}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-5 rounded-sm bg-brand-100 ring-1 ring-inset ring-brand/25" />
          {app.barLegend.notStarted}
        </span>
      </p>
    </div>
  );
}
