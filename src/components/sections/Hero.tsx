import { ArrowRight, Play } from "lucide-react";
import { CommandDemo } from "@/components/demo/CommandDemo";
import { DemoVideo } from "@/components/demo/DemoVideo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { WordSwap, type SwapWord } from "@/components/ui/WordSwap";
import { productMedia } from "@/config/media";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

const { heroVision } = siteConfig;
/** What screen readers hear: the sentence as first shown. */
const heroVisionText = [heroVision.lead, heroVision.bridge, heroVision.subjects[0], heroVision.tail].join(" ");

/** "you" on the brand blue tint, "your team" on the teal used for people across the product visuals. */
const subjectTints = ["bg-field-task-soft", "bg-field-assignee-soft"];
const subjects: SwapWord[] = heroVision.subjects.map((text, i) => ({
  text,
  pillClassName: subjectTints[i % subjectTints.length],
}));

const demoEntrance = "[--enter-delay:200ms] motion-safe:animate-rise lg:motion-safe:animate-enter-right";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { hero, demo } = dict;
  const video = productMedia.heroDemo[lang];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Soft warm backdrop — no strong gradients. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(60%_60%_at_75%_30%,var(--color-brand-50),transparent_70%)]"
      />
      <Container className="grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14 lg:pt-20 lg:pb-24">
        {/* @container: the vision sizes itself to this column so its longest line never wraps. */}
        <div className="@container max-w-xl">
          <h1 id="hero-title">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand ring-1 ring-brand-100 ring-inset motion-safe:animate-rise sm:text-[0.9375rem]">
              {hero.eyebrow}
            </span>
            <span
              lang="en"
              className="mt-5 block text-[clamp(1.75rem,10cqi,3.6rem)] leading-[1.08] font-bold tracking-[-0.025em] text-brand [--enter-delay:80ms] motion-safe:animate-rise"
            >
              <span className="sr-only">{heroVisionText}</span>
              <span aria-hidden="true" className="block">
                <span className="block text-field-task">{heroVision.lead}</span>
                <span className="block">{heroVision.bridge}</span>
                <span data-swap-line className="block whitespace-nowrap">
                  <WordSwap words={subjects} /> {heroVision.tail}
                </span>
              </span>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted text-pretty [--enter-delay:160ms] motion-safe:animate-rise sm:text-xl sm:leading-relaxed">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 [--enter-delay:240ms] motion-safe:animate-rise sm:flex-row sm:items-center">
            <ButtonLink
              href={siteConfig.signupUrl}
              size="lg"
              className="w-full sm:w-auto"
              dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "hero" }}
            >
              {hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href="#demo"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              dataAttrs={{ "data-track": "cta_click", "data-track-cta": "see_demo", "data-track-location": "hero" }}
            >
              <Play className="size-4" aria-hidden="true" />
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        {/* On load: the copy rises line by line, then the demo slides in from the right. */}
        {video ? (
          <DemoVideo video={video} copy={demo} className={demoEntrance} />
        ) : (
          <CommandDemo copy={demo} className={demoEntrance} />
        )}
      </Container>
    </section>
  );
}
