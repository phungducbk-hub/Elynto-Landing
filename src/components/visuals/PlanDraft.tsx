import { Pencil, Sparkles, Target } from "lucide-react";
import { IllustrationFrame } from "@/components/ui/IllustrationFrame";
import type { Dictionary } from "@/content/types";

type Props = { copy: Dictionary["planning"]["mock"]; badge: string };

/** Illustration of an AI-drafted plan: goal → phases → tasks, waiting for the user's review. */
export function PlanDraft({ copy, badge }: Props) {
  return (
    <IllustrationFrame badge={badge} title={<span className="text-ink-muted">{copy.draftTitle}</span>} padded={false}>
      {/* Goal */}
      <div className="border-b border-line bg-canvas px-4 py-4 sm:px-6 sm:py-5">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-ink-subtle uppercase">
          <Target className="size-3.5" aria-hidden="true" />
          {copy.goalLabel}
        </p>
        <p className="mt-1.5 text-lg leading-snug font-semibold text-ink sm:text-xl">“{copy.goal}”</p>
      </div>

      {/* Draft */}
      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand ring-1 ring-brand-100 ring-inset">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {copy.aiBadge}
          </p>
          <p className="text-sm text-ink-subtle">{copy.summary}</p>
        </div>

        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {copy.phases.map((phase, index) => (
            <li key={phase.name} className="flex flex-col rounded-xl border border-line bg-surface">
              <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-3">
                <span className="inline-grid size-6 shrink-0 place-items-center rounded-md bg-brand text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="sr-only">
                    {copy.phaseLabel} {index + 1}:{" "}
                  </span>
                  <span className="block text-[0.9375rem] leading-snug font-semibold text-ink">{phase.name}</span>
                </span>
              </div>
              <ul className="flex-1 space-y-1 px-2 py-2">
                {phase.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-2.5 rounded-lg px-1.5 py-1.5 text-sm leading-snug text-ink-muted">
                    <span aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 rounded-[0.3rem] border-[1.5px] border-line-strong" />
                    {task}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* Review step — visual only */}
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-dashed border-line-strong bg-canvas px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <Pencil className="size-4 text-brand-600" aria-hidden="true" />
            {copy.reviewHint}
          </p>
          <div aria-hidden="true" className="flex shrink-0 gap-2">
            <span className="inline-flex h-8 items-center rounded-lg bg-surface px-3 text-sm font-medium text-ink ring-1 ring-line-strong ring-inset">
              {copy.edit}
            </span>
            <span className="inline-flex h-8 items-center rounded-lg bg-brand px-3 text-sm font-semibold text-white">
              {copy.create}
            </span>
          </div>
        </div>
      </div>
    </IllustrationFrame>
  );
}
