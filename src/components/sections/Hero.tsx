import { ArrowRight, Play } from "lucide-react";
import { ProductDemo } from "@/components/demo/ProductDemo";
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

const demoEntrance = "[--enter-delay:200ms] motion-safe:animate-visual-in lg:motion-safe:animate-enter-right";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { hero, demo } = dict;
  const video = productMedia.heroDemo[lang];

  return (
    <section aria-labelledby="hero-title" className="harbor-hero relative overflow-hidden border-b border-line">
      {/* Brand atmosphere; product media remains explicitly illustrative until verified. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(ellipse_at_50%_0%,var(--color-brand-100),transparent_70%)]"
      />
      <Container className="flex flex-col items-center gap-12 pt-14 pb-16 sm:gap-16 sm:pt-20 lg:pt-24 lg:pb-24">
        {/* @container: the vision sizes itself to this column so its longest line never wraps. */}
        <div className="@container w-full max-w-4xl text-center">
          <h1 id="hero-title">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface/70 px-4 py-2 text-xs font-medium tracking-wide text-brand motion-safe:animate-rise sm:text-[0.9375rem]">
              {hero.eyebrow}
            </span>
            <span
              lang="en"
              className="mt-7 block text-[clamp(2.25rem,8.5cqi,4.8rem)] leading-[1.1] font-semibold tracking-[-0.055em] text-ink [--enter-delay:80ms] motion-safe:animate-rise"
            >
              <span className="sr-only">{heroVisionText}</span>
              <span aria-hidden="true" className="block">
                <span className="block">{heroVision.lead} {heroVision.bridge}</span>
                <span data-swap-line className="mt-2 block whitespace-nowrap text-brand">
                  <WordSwap words={subjects} /> {heroVision.tail}
                </span>
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty [--enter-delay:160ms] motion-safe:animate-rise sm:text-lg sm:leading-relaxed">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 [--enter-delay:240ms] motion-safe:animate-rise sm:flex-row sm:items-center">
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
        <div className="harbor-demo-stage w-full max-w-6xl rounded-2xl border border-brand-200/70 bg-brand-50 p-3 shadow-[0_32px_100px_-50px_rgb(26_98_137/0.35)] sm:p-5">
          {video ? (
            <DemoVideo video={video} copy={demo} className={demoEntrance} />
          ) : (
            <ProductDemo command={demo.command} label={lang === "vi" ? "Khám phá giao diện Elynto beta" : "Explore the Elynto beta interface"} caption={lang === "vi" ? "Bản dựng từ giao diện beta thực tế · Dữ liệu mẫu · Chọn tab để khám phá" : "Recreated from the live beta interface · Sample data · Select a tab to explore"} />
          )}
        </div>
      </Container>
    </section>
  );
}
