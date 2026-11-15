import { formatWorkDate } from "@/lib/format";
import Image from "next/image";
import { ArrowUpRight, Check, ListChecks, Sparkles } from "lucide-react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/** Illustrative hybrid meeting with a localized, reviewable AI Summary overlay. */
export function CollaborationWorkspace({ copy, lang }: { copy: Dictionary["collaboration"]["mock"]; lang: Locale }) {
  return (
    <figure lang={lang}>
      <div className="relative sm:pb-32">
        <div className="elynto-photo-frame">
          <Image
            src="/media/elynto-hybrid-meeting.webp"
            width={1200}
            height={900}
            alt={copy.imageAlt}
            sizes="(min-width: 1024px) 660px, (min-width: 640px) 90vw, 94vw"
            className="block h-auto w-full"
          />
        </div>
        <div className="elynto-insight-card relative z-10 -mt-8 mr-3 ml-auto w-[90%] max-w-[21rem] sm:absolute sm:right-5 sm:bottom-0 sm:m-0">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand">
            <Sparkles aria-hidden="true" className="size-3.5" />AI Summary
          </p></div>
          <p className="mt-3 text-base font-semibold leading-snug text-ink">{copy.aiTitle}</p>
          <div className="mt-4 flex items-start gap-2">
            <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand" />
            <div><p className="text-xs font-medium text-ink-muted">{copy.conclusionLabel}</p><p className="mt-1 text-sm leading-relaxed text-ink">{copy.conclusion}</p></div>
          </div>
          <div className="mt-3 flex items-start gap-2 border-t border-line pt-3">
            <ListChecks aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand" />
            <div className="min-w-0"><p className="text-xs font-medium text-ink-muted">{copy.taskLabel}</p><p className="mt-1 text-sm font-medium leading-relaxed text-ink">{copy.task}</p><p className="mt-1 text-xs text-ink-muted">{copy.assignee} · {formatWorkDate(copy.due, lang)}</p></div>
          </div>
          <a href={`/${lang}/features/natural-language-tasks`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline">{copy.action}<ArrowUpRight aria-hidden="true" className="size-3.5" /></a>
        </div>
      </div>
    </figure>
  );
}
