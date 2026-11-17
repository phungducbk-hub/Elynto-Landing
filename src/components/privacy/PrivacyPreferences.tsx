"use client";

import { ShieldCheck, X } from "lucide-react";
import { useId, useRef, useSyncExternalStore } from "react";
import { CookieReset } from "@/components/subpage/CookieReset";
import { StatsOptOut } from "@/components/subpage/StatsOptOut";
import type { PrivacyCopy } from "@/content/privacy";
import { serverStatisticsChoice, setStatsOptOut, statisticsChoice, subscribeStatisticsChoice } from "@/lib/stats/client";

type Props = {
  copy: PrivacyCopy;
  stats: { on: string; off: string; signal: string; disable: string; enable: string };
  cookies: { clear: string; cleared: string };
  policyHref: string;
};
const choiceButton = "inline-flex min-h-11 items-center justify-center rounded-xl border border-line-strong bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sunken";

export function PrivacyPreferences({ copy, stats, cookies, policyHref }: Props) {
  const choice = useSyncExternalStore(subscribeStatisticsChoice, statisticsChoice, serverStatisticsChoice);
  const dialog = useRef<HTMLDialogElement>(null);
  const footerTrigger = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const open = (button: HTMLButtonElement) => {
    opener.current = button;
    dialog.current?.showModal();
    heading.current?.focus();
  };
  return (
    <>
      <button ref={footerTrigger} type="button" onClick={(event) => open(event.currentTarget)} aria-haspopup="dialog"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg py-2 text-sm text-ink-muted hover:text-ink">
        <ShieldCheck aria-hidden="true" className="size-4" />{copy.settings}
      </button>
      {choice === "unset" ? (
        <aside aria-labelledby={`${id}-notice`} className="fixed right-4 bottom-4 z-[60] w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line-strong bg-surface p-5 shadow-float sm:right-6 sm:bottom-6 sm:p-6">
          <p id={`${id}-notice`} className="text-base font-semibold text-ink">{copy.noticeTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy.noticeBody}</p>
          <div className="mt-4 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
            <button type="button" onClick={() => setStatsOptOut(true)} className={choiceButton}>{copy.deny}</button>
            <button type="button" onClick={() => setStatsOptOut(false)} className={choiceButton}>{copy.allow}</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5">
            <a href={policyHref} className="inline-flex min-h-11 items-center text-sm text-brand underline-offset-4 hover:underline">{copy.policy}</a>
            <button type="button" onClick={(event) => open(event.currentTarget)} className="min-h-11 text-sm text-ink-muted underline-offset-4 hover:underline">{copy.settings}</button>
          </div>
        </aside>
      ) : null}
      <dialog ref={dialog} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}
        onClose={() => (opener.current?.isConnected ? opener.current : footerTrigger.current)?.focus()}
        className="privacy-dialog fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-ink shadow-float">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 ref={heading} tabIndex={-1} id={`${id}-title`} className="pt-2 text-xl font-semibold outline-none sm:text-2xl">{copy.title}</h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={copy.close} className="grid size-11 shrink-0 place-items-center rounded-xl text-ink-muted hover:bg-sunken"><X aria-hidden="true" className="size-5" /></button>
          </div>
          <p id={`${id}-description`} className="mt-3 text-sm leading-relaxed text-ink-muted">{copy.description}</p>
          <section className="mt-6 border-t border-line pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-base font-semibold">{copy.essential}</h3><span className="rounded-full bg-field-assignee-soft px-3 py-1 text-xs font-medium text-field-assignee">{copy.alwaysOn}</span></div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy.essentialBody}</p>
          </section>
          <section className="mt-5 border-t border-line pt-5">
            <h3 className="text-base font-semibold">{copy.statistics}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy.statisticsBody}</p>
            <StatsOptOut copy={stats} />
          </section>
          <section className="mt-5 border-t border-line pt-5">
            <h3 className="text-base font-semibold">{copy.language}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy.languageBody}</p>
            <CookieReset label={cookies.clear} done={cookies.cleared} />
          </section>
          <a href={policyHref} className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-brand underline-offset-4 hover:underline">{copy.policy}</a>
        </div>
      </dialog>
    </>
  );
}
