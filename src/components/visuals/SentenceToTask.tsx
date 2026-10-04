"use client";

import { ArrowDown, CalendarDays, Check } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { IllustrationFrame } from "@/components/ui/IllustrationFrame";
import type { Dictionary, FieldKey } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { FieldHighlight, fieldStyles } from "./FieldHighlight";

type Props = { copy: Dictionary["command"]; badge: string };

const order: FieldKey[] = ["task", "assignee", "due"];

/** Illustration: how the parts of one sentence map onto task fields. Uses fixed examples only. */
export function SentenceToTask({ copy, badge }: Props) {
  const [activeId, setActiveId] = useState(copy.examples[0].id);
  const example = copy.examples.find((item) => item.id === activeId) ?? copy.examples[0];

  return (
    <IllustrationFrame badge={badge} title={<span className="text-ink-muted">{copy.examplesLabel}</span>}>
      <div role="group" aria-label={copy.examplesLabel} className="flex flex-wrap gap-2">
        {copy.examples.map((item) => {
          const active = item.id === example.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveId(item.id);
                track("example_select", { example: item.id, section: "command" });
              }}
              className={cn(
                "inline-flex min-h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand text-white"
                  : "bg-surface text-ink-muted ring-1 ring-line-strong ring-inset hover:bg-sunken hover:text-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        <blockquote className="mt-5 rounded-xl border border-line bg-canvas px-4 py-4 text-[1.0625rem] leading-[2.1] text-ink sm:px-5">
          <span aria-hidden="true">“</span>
          {example.segments.map((segment, index) =>
            typeof segment === "string" ? (
              <span key={index}>{segment}</span>
            ) : (
              <FieldHighlight key={index} field={segment.field}>
                {segment.text}
              </FieldHighlight>
            ),
          )}
          <span aria-hidden="true">”</span>
        </blockquote>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-subtle" aria-hidden="true">
          {order.map((field) => (
            <li key={field} className="inline-flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", fieldStyles[field].dot)} />
              {copy.legend[field]}
            </li>
          ))}
        </ul>

        <div className="my-3 flex justify-center text-ink-subtle" aria-hidden="true">
          <ArrowDown className="size-5" />
        </div>

        <div className="rounded-xl border border-line bg-surface shadow-card">
          <p className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-sm font-semibold text-status-done">
            <span className="inline-grid size-4.5 place-items-center rounded-full bg-status-done text-white">
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {copy.resultLabel}
          </p>
          <dl className="grid grid-cols-[8.75rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 px-4 py-4 text-sm sm:grid-cols-[9.5rem_minmax(0,1fr)]">
            <dt className="flex items-center gap-2 text-ink-subtle">
              <span aria-hidden="true" className={cn("size-2 rounded-full", fieldStyles.task.dot)} />
              {copy.legend.task}
            </dt>
            <dd className="font-semibold text-ink">{example.task}</dd>
            <dt className="flex items-center gap-2 text-ink-subtle">
              <span aria-hidden="true" className={cn("size-2 rounded-full", fieldStyles.assignee.dot)} />
              {copy.legend.assignee}
            </dt>
            <dd>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-field-assignee-soft py-0.5 pr-2.5 pl-0.5 font-medium text-field-assignee">
                <Avatar person={example.assignee} />
                {example.assignee.name}
              </span>
            </dd>
            <dt className="flex items-center gap-2 text-ink-subtle">
              <span aria-hidden="true" className={cn("size-2 rounded-full", fieldStyles.due.dot)} />
              {copy.legend.due}
            </dt>
            <dd>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-field-due-soft px-2.5 py-1 font-medium text-field-due">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {example.due}
              </span>
            </dd>
          </dl>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">{copy.savedLabel}</p>
        <ul className="mt-2 divide-y divide-line rounded-xl border border-line bg-surface text-sm">
          <li className="flex items-center gap-3 bg-brand-50/60 px-3.5 py-2.5">
            <span aria-hidden="true" className="size-4 shrink-0 rounded-full border-2 border-line-strong" />
            <span className="min-w-0 flex-1 truncate font-medium text-ink">{example.task}</span>
            <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
              {copy.newBadge}
            </span>
            <Avatar person={example.assignee} size="sm" />
            <span className="hidden w-28 shrink-0 truncate text-right text-ink-subtle sm:block">{example.due}</span>
          </li>
          {copy.existing.map((task) => (
            <li key={task.title} className="flex items-center gap-3 px-3.5 py-2.5">
              <span aria-hidden="true" className="size-4 shrink-0 rounded-full border-2 border-line-strong" />
              <span className="min-w-0 flex-1 truncate text-ink-muted">{task.title}</span>
              <Avatar person={task.assignee} size="sm" />
              <span className="hidden w-28 shrink-0 truncate text-right text-ink-subtle sm:block">{task.due}</span>
            </li>
          ))}
        </ul>
      </div>
    </IllustrationFrame>
  );
}
