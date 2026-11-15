import { ArrowRight, BookOpen, Play, Rocket, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperienceCopy } from "@/content/experience";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { reveal } from "@/lib/reveal";

export function Confidence({ lang }: { lang: Locale }) {
  const { proof } = getExperienceCopy(lang);
  return (
    <section aria-labelledby="proof-title" className="border-b border-line bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading id="proof-title" eyebrow={proof.eyebrow} title={proof.title} intro={proof.body} />
            <div {...reveal()} className="mt-7"><ButtonLink href="#demo" dataAttrs={{ "data-track": "cta_click", "data-track-cta": "see_demo", "data-track-location": "proof" }}>{proof.cta}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink></div>
          </div>
          <ol {...reveal("from-right")} className="divide-y divide-line rounded-3xl border border-line bg-canvas px-5 sm:px-7">
            {proof.steps.map((step, index) => <li key={step.title} className="flex gap-4 py-6">
              <span aria-hidden="true" className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand">{index + 1}</span>
              <div><h3 className="text-base font-semibold text-ink">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p></div>
            </li>)}
          </ol>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-line pt-6 text-sm font-medium text-ink-muted">
          <a href={`/${lang}/getting-started`} className="inline-flex items-center gap-2 hover:text-brand"><BookOpen aria-hidden="true" className="size-4" />{proof.help}</a>
          <a href={`/${lang}/privacy`} className="inline-flex items-center gap-2 hover:text-brand"><ShieldCheck aria-hidden="true" className="size-4" />{proof.privacy}</a>
          <a href={`/${lang}/about`} className="inline-flex items-center gap-2 hover:text-brand">{proof.about}<ArrowRight aria-hidden="true" className="size-4" /></a>
          {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-brand">{siteConfig.contactEmail}</a> : null}
        </div>
      </Container>
    </section>
  );
}

export function StartWithElynto({ lang }: { lang: Locale }) {
  const { start } = getExperienceCopy(lang);
  return (
    <section id="start" aria-labelledby="start-title">
      <Container className="py-16 sm:py-20">
        <SectionHeading id="start-title" eyebrow={start.eyebrow} title={start.title} intro={start.body} align="center" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          <div {...reveal()} className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8">
            <Play aria-hidden="true" className="size-6 text-brand" />
            <h3 className="mt-5 text-xl font-semibold text-ink">{start.demoTitle}</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted">{start.demoBody}</p>
            <ButtonLink href="#demo" variant="secondary" className="mt-7 w-full" dataAttrs={{ "data-track": "cta_click", "data-track-cta": "see_demo", "data-track-location": "start" }}>{start.demoCta}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
          </div>
          <div {...reveal()} className="flex flex-col rounded-3xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
            <Rocket aria-hidden="true" className="size-6 text-brand" />
            <h3 className="mt-5 text-xl font-semibold text-ink">{start.trialTitle}</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted">{start.trialBody}</p>
            <ButtonLink href={siteConfig.signupUrl} className="mt-7 w-full" dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "start" }}>{start.trialCta}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-ink-muted">
          <a href={siteConfig.loginUrl} data-track="cta_click" data-track-cta="login" data-track-location="start" className="mt-4 inline-block font-medium text-brand underline underline-offset-4">{start.login}</a>
        </div>
      </Container>
    </section>
  );
}
