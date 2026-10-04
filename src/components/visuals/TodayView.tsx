import { CalendarDays, Flag } from "lucide-react";
import { IllustrationFrame } from "@/components/ui/IllustrationFrame";
import type { Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = { copy: Dictionary["today"]["mock"]; badge: string };

const tones = {
  overdue: { label: "text-status-overdue", chip: "bg-status-overdue-soft text-status-overdue", bar: "bg-status-overdue" },
  today: { label: "text-ink", chip: "bg-field-due-soft text-field-due", bar: "bg-field-due" },
  upcoming: { label: "text-ink", chip: "bg-sunken text-ink-muted", bar: "bg-line-strong" },
} as const;

/** Illustration of the Today / My Work view grouping tasks by due date. */
export function TodayView({ copy, badge }: Props) {
  return (
    <IllustrationFrame
      badge={badge}
      title={
        <span className="flex items-baseline gap-2">
          <span className="text-ink">{copy.title}</span>
          <span className="font-normal text-ink-subtle">· {copy.subtitle}</span>
        </span>
      }
    >
      <div className="space-y-5">
        {copy.groups.map((group) => {
          const tone = tones[group.tone];
          return (
            <section key={group.label} aria-label={group.label}>
              <h4 className={cn("flex items-center gap-2 text-sm font-semibold", tone.label)}>
                <span aria-hidden="true" className={cn("h-3.5 w-1 rounded-full", tone.bar)} />
                {group.label}
                <span className="rounded-full bg-sunken px-1.5 text-xs font-medium text-ink-subtle">{group.items.length}</span>
              </h4>
              <ul className="mt-2 divide-y divide-line rounded-xl border border-line bg-surface">
                {group.items.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 px-3.5 py-3">
                    <span aria-hidden="true" className="mt-0.5 size-4 shrink-0 rounded-full border-2 border-line-strong" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug font-medium text-ink">{item.title}</p>
                      <p className="mt-0.5 text-xs text-ink-subtle">{item.project}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center">
                      {item.important ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-status-overdue">
                          <Flag className="size-3.5" aria-hidden="true" />
                          <span className="sr-only sm:not-sr-only">{copy.importantLabel}</span>
                        </span>
                      ) : null}
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap", tone.chip)}>
                        <CalendarDays className="size-3" aria-hidden="true" />
                        {item.due}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </IllustrationFrame>
  );
}
