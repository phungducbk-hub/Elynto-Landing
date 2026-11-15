import { CalendarDays, Ellipsis, ListChecks, MessageSquare, Mic, MicOff, Phone, UserRound, Video } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

const participantTones = ["bg-[#244b65]", "bg-[#326c78]", "bg-[#405977]"];

/** A sample composition of Elynto's communication tools, not a live call or message thread. */
export function CollaborationWorkspace({ copy, lang }: { copy: Dictionary["collaboration"]["mock"]; lang: Locale }) {
  return (
    <figure lang={lang}>
      <div className="overflow-hidden rounded-2xl border border-line bg-canvas shadow-card">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 sm:px-5">
          <Logo className="h-5 w-auto text-brand" />
          <span className="text-right text-[10px] font-medium text-ink-muted sm:text-xs">{copy.label}</span>
        </div>

        <div className="p-3 sm:p-4">
          <div className="overflow-hidden rounded-xl bg-[#192d3c] p-3 text-white sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-xs font-medium"><Video aria-hidden="true" className="size-3.5" />{copy.meeting}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 text-[9px] text-white/90"><span aria-hidden="true" className="size-1.5 rounded-full bg-[#8fcdb7]" />{copy.live}</span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[10px] text-white/70"><CalendarDays aria-hidden="true" className="size-3" />{copy.time}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {copy.participants.map((name, index) => (
                <div key={name} className={`relative flex aspect-[1.2] min-w-0 flex-col items-center justify-center overflow-hidden rounded-lg sm:aspect-[1.45] ${participantTones[index % participantTones.length]}`}>
                  <span aria-hidden="true" className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 sm:size-14"><UserRound className="size-6 text-white/85 sm:size-8" /></span>
                  <span className="absolute bottom-1.5 left-2 flex max-w-[calc(100%-1rem)] items-center gap-1 text-[9px] font-medium sm:bottom-2 sm:text-[10px]">{index === 1 ? <MicOff aria-hidden="true" className="size-2.5 shrink-0" /> : <Mic aria-hidden="true" className="size-2.5 shrink-0" />}<span className="truncate">{name}</span></span>
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="mt-3 flex justify-center gap-2">
              {[Mic, Video, Ellipsis].map((Icon, index) => <span key={index} className="grid size-7 place-items-center rounded-full bg-white/10"><Icon className="size-3" /></span>)}
              <span className="grid h-7 w-11 place-items-center rounded-full bg-[#b64550]"><Phone className="size-3 rotate-[135deg]" /></span>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div className="min-w-0 rounded-xl border border-line bg-white p-3 sm:p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-ink"><MessageSquare aria-hidden="true" className="size-3.5 text-brand" />{copy.chat}</p>
              <p className="mt-1 text-[10px] text-ink-muted">{copy.project}</p>
              <ol className="mt-4 space-y-3">
                {copy.messages.map((message, index) => <li key={message.name} className="flex items-start gap-2">
                  <span aria-hidden="true" className={`grid size-6 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white ${participantTones[index % participantTones.length]}`}>{message.name[0]}</span>
                  <div className="min-w-0"><p className="text-[10px] font-semibold text-ink">{message.name}</p><p className="mt-1 text-[10px] leading-relaxed text-ink-muted">{message.text}</p></div>
                </li>)}
              </ol>
            </div>

            <div className="min-w-0 rounded-xl border border-brand-100 bg-brand-50/60 p-3 sm:p-4">
              <p className="flex items-center gap-2 text-[10px] font-medium text-brand"><ListChecks aria-hidden="true" className="size-3.5 shrink-0" />{copy.workLabel}</p>
              <p className="mt-3 text-sm font-semibold leading-snug text-ink">{copy.task}</p>
              <p className="mt-2 text-[10px] text-ink-muted">{copy.project}</p>
              <dl className="mt-4 space-y-3 text-[10px]">
                <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-ink-muted">{copy.assigneeLabel}</dt><dd className="font-medium text-ink">{copy.assignee}</dd></div>
                <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-ink-muted">{copy.dueLabel}</dt><dd className="font-medium text-ink">{copy.due}</dd></div>
              </dl>
              <span className="mt-4 inline-flex rounded-full border border-brand-100 bg-white px-2 py-1 text-[9px] font-medium text-brand">{copy.status}</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-ink-muted">{copy.caption}</figcaption>
    </figure>
  );
}
