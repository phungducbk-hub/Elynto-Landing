import { DemoVideo } from "@/components/demo/DemoVideo";
import { Logo } from "@/components/brand/Logo";
import { TransformStage } from "@/components/hero/TransformStage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { productMedia } from "@/config/media";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { hero, demo } = dict;
  const video = productMedia.heroDemo[lang];

  return (
    <section aria-labelledby="hero-title">
      <Container className="pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14">
        <h1 id="hero-title">
          <span className="flex items-center gap-2.5 text-lg leading-snug font-medium text-navy stretch-wide sm:text-xl">
            <Logo variant="mark" title={null} className="h-5 w-auto shrink-0 sm:h-6" />
            {hero.label}
          </span>
          <span lang="en" className="mt-4 block type-display text-balance sm:mt-5">
            {siteConfig.vision}
          </span>
        </h1>

        <div className="mt-6 grid gap-7 sm:mt-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <p className="max-w-[36rem] type-lead text-pretty lg:col-span-7">{hero.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ButtonLink
              href={siteConfig.signupUrl}
              className="w-full sm:w-auto"
              dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "hero" }}
            >
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink
              href="#demo"
              variant="secondary"
              className="w-full sm:w-auto"
              dataAttrs={{ "data-track": "cta_click", "data-track-cta": "see_demo", "data-track-location": "hero" }}
            >
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          {video ? <DemoVideo video={video} copy={demo} /> : <TransformStage copy={demo} />}
        </div>
      </Container>
    </section>
  );
}
