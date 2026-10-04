import { Pencil } from "lucide-react";
import { ProductSurface } from "@/components/ui/ProductSurface";
import type { Dictionary } from "@/content/types";
import { formatDay } from "@/lib/format";

type Props = {
  mock: Dictionary["planning"]["mock"];
  phases: Dictionary["project"]["data"]["phases"];
  datePattern: string;
  label: string;
};

/** AI-drafted plan: goal → phases → dated tasks, waiting for the person's review. */
export function PlanDraft({ mock, phases, datePattern, label }: Props) {
  return (
    <ProductSurface label={label}>
      <div className="grid lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <div className="border-b border-rule px-5 py-6 sm:px-7 lg:border-r lg:border-b-0">
          <p className="text-sm text-muted">{mock.goalLabel}</p>
          <p className="mt-2 text-xl leading-snug font-semibold text-ink stretch-wide">“{mock.goal}”</p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule px-5 py-4 sm:px-7">
            <p className="text-[0.9375rem] font-semibold text-progress">{mock.draftTitle}</p>
            <p className="text-sm text-muted">{mock.summary}</p>
          </div>
          <ol className="grid md:grid-cols-2">
            {phases.map((phase, index) => {
              const start = Math.min(...phase.tasks.map((task) => task.start));
              const due = Math.max(...phase.tasks.map((task) => task.due));
              return (
                <li
                  key={phase.name}
                  className="border-b border-rule px-5 py-5 sm:px-7 md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <p className="flex items-baseline gap-2.5">
                    <span className="text-sm font-semibold text-navy">
                      <span className="sr-only">{mock.phaseLabel} </span>
                      {index + 1}
                    </span>
                    <span className="text-[1.0625rem] leading-snug font-semibold text-ink stretch-wide">{phase.name}</span>
                  </p>
                  <p className="mt-1 pl-5 text-sm text-muted">
                    {formatDay(datePattern, start)} – {formatDay(datePattern, due)}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {phase.tasks.map((task) => (
                      <li key={task.title} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug">
                        <span aria-hidden="true" className="mt-[0.2rem] size-3.5 shrink-0 rounded-[0.25rem] border-[1.5px] border-rule-strong" />
                        <span className="min-w-0 flex-1">{task.title}</span>
                        <span className="shrink-0 text-sm text-muted">{formatDay(datePattern, task.due)}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-rule bg-fog px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
          <Pencil className="size-4 text-navy" aria-hidden="true" />
          {mock.reviewHint}
        </p>
        <div aria-hidden="true" className="flex shrink-0 gap-2">
          <span className="inline-flex h-9 items-center rounded-lg bg-paper px-3.5 text-sm font-semibold text-navy ring-1 ring-rule-strong ring-inset">
            {mock.edit}
          </span>
          <span className="inline-flex h-9 items-center rounded-lg bg-navy px-3.5 text-sm font-semibold text-white">{mock.create}</span>
        </div>
      </div>
    </ProductSurface>
  );
}
