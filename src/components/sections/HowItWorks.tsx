import { Check, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlanDraft } from "@/components/visuals/PlanDraft";
import { SentenceTable } from "@/components/visuals/SentenceTable";
import { TodayView } from "@/components/visuals/TodayView";
import { ViewsShowcase } from "@/components/visuals/ViewsShowcase";
import { features } from "@/config/features";
import { productMedia } from "@/config/media";
import type { Dictionary, ViewKey } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { FeatureText } from "./FeatureText";

export function HowItWorks({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { howItWorks, sentences, planning, today, views, illustration } = dict;

  const enabledViews: ViewKey[] = [
    "list",
    "kanban",
    "calendar",
    ...(features.projectTimeline ? (["timeline"] as const) : []),
    ...(features.projectGantt ? (["gantt"] as const) : []),
  ];
  const showProjectViews = features.projectTimeline || features.projectGantt;

  const commandShot = productMedia.command[lang];
  const planningShot = productMedia.planning[lang];
  const todayShot = productMedia.today[lang];

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-rule">
      <Container className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <SectionHeading id="how-title" title={howItWorks.title} intro={howItWorks.intro} />

        <article aria-labelledby="feature-sentences" className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <FeatureText id="feature-sentences" name={sentences.name} title={sentences.title} body={sentences.body}>
              <p className="mt-6 max-w-[34rem] border-l-2 border-marker pl-4 text-[0.9375rem] leading-relaxed text-muted">
                {sentences.tip}
              </p>
            </FeatureText>
          </div>
          <div className="lg:col-span-8">
            {commandShot ? <ProductShot image={commandShot} /> : <SentenceTable copy={sentences} label={illustration} />}
          </div>
        </article>
      </Container>

      {/* AI project planning: the key differentiator, given its own band and the full width. */}
      <div className="bg-fog">
        <Container className="py-20 sm:py-28">
          <article aria-labelledby="feature-planning">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <FeatureText id="feature-planning" name={planning.name} title={planning.title} body={planning.body} />
              </div>
              <ol className="grid gap-6 sm:grid-cols-3 lg:col-span-7 lg:self-end">
                {planning.steps.map((step, index) => (
                  <li key={step.title} className="border-t-2 border-navy pt-4">
                    <p className="text-sm font-semibold text-navy">{index + 1}</p>
                    <p className="mt-1 text-lg leading-snug font-semibold text-ink stretch-wide">{step.title}</p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12 sm:mt-16">
              {planningShot ? (
                <ProductShot image={planningShot} />
              ) : (
                <PlanDraft copy={planning.mock} label={illustration} />
              )}
            </div>

            <p className="mt-6 flex max-w-[40rem] items-start gap-2.5 text-[0.9375rem] leading-relaxed">
              <Info className="mt-1 size-4 shrink-0 text-navy" aria-hidden="true" />
              {planning.note}
            </p>
          </article>
        </Container>
      </div>

      <Container className="py-24 sm:py-32">
        <article aria-labelledby="feature-today" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <FeatureText id="feature-today" name={today.name} title={today.title} body={today.body}>
              <ul className="mt-6 space-y-3">
                {today.points.map((point) => (
                  <li key={point} className="flex gap-3 text-base leading-relaxed text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-navy" strokeWidth={2.5} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </FeatureText>
          </div>
          <div className="lg:col-span-7">
            {todayShot ? <ProductShot image={todayShot} /> : <TodayView copy={today.mock} label={illustration} />}
          </div>
        </article>

        <article aria-labelledby="feature-views" className="mt-24 sm:mt-32">
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 id="feature-views" className="type-h3 text-balance">
                {views.title}
              </h3>
            </div>
            <div className="max-w-[36rem] text-lg leading-relaxed text-pretty lg:col-span-7">
              <p>
                <strong className="font-semibold text-ink">{views.name}</strong> {views.body}
              </p>
              {showProjectViews ? <p className="mt-3">{views.projectBody}</p> : null}
            </div>
          </div>
          <div className="mt-10">
            <ViewsShowcase copy={views} label={illustration} views={enabledViews} />
          </div>
        </article>
      </Container>
    </section>
  );
}
