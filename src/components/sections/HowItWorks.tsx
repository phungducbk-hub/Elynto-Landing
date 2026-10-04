import { Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlanDraft } from "@/components/visuals/PlanDraft";
import { SentenceToTask } from "@/components/visuals/SentenceToTask";
import { TodayView } from "@/components/visuals/TodayView";
import { ViewsShowcase } from "@/components/visuals/ViewsShowcase";
import { features } from "@/config/features";
import { productMedia } from "@/config/media";
import type { Dictionary, ViewKey } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { FeatureRow } from "./FeatureRow";

export function HowItWorks({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { howItWorks, command, planning, today, views, illustration } = dict;

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
    <section id="how-it-works" aria-labelledby="how-title">
      <Container className="pt-20 sm:pt-28">
        <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} />

        <div className="mt-14 sm:mt-20">
          <FeatureRow
            id="feature-command"
            eyebrow={command.eyebrow}
            title={command.title}
            body={command.body}
            points={command.points}
            tip={command.tip}
          >
            {commandShot ? <ProductShot image={commandShot} /> : <SentenceToTask copy={command} badge={illustration} />}
          </FeatureRow>
        </div>
      </Container>

      {/* AI project planning — the key differentiator, given its own band. */}
      <div className="mt-24 border-y border-line bg-sunken sm:mt-32">
        <Container className="py-20 sm:py-24">
          <article id="feature-planning" aria-labelledby="feature-planning-title">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-wide text-brand-600">{planning.eyebrow}</p>
              <h3
                id="feature-planning-title"
                className="mt-3 text-[1.75rem] leading-[1.2] font-bold tracking-tight text-ink text-balance sm:text-[2.25rem]"
              >
                {planning.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted text-pretty">{planning.body}</p>
            </div>

            <ol className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-6">
              {planning.steps.map((step, index) => (
                <li key={step.title} className="flex gap-3 sm:flex-col sm:items-center sm:text-center">
                  <span className="inline-grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-ink sm:mt-1">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mx-auto mt-12 max-w-5xl">
              {planningShot ? <ProductShot image={planningShot} /> : <PlanDraft copy={planning.mock} badge={illustration} />}
            </div>

            <p className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2 text-center text-sm leading-relaxed text-ink-muted">
              <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
              {planning.note}
            </p>
          </article>
        </Container>
      </div>

      <Container className="py-24 sm:py-32">
        <FeatureRow
          id="feature-today"
          eyebrow={today.eyebrow}
          title={today.title}
          body={today.body}
          points={today.points}
          reverse
        >
          {todayShot ? <ProductShot image={todayShot} /> : <TodayView copy={today.mock} badge={illustration} />}
        </FeatureRow>

        <article id="feature-views" aria-labelledby="feature-views-title" className="mt-24 sm:mt-32">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <p className="text-sm font-semibold tracking-wide text-brand-600">{views.eyebrow}</p>
              <h3
                id="feature-views-title"
                className="mt-3 text-[1.75rem] leading-[1.2] font-bold tracking-tight text-ink text-balance sm:text-[2rem]"
              >
                {views.title}
              </h3>
            </div>
            <div className="max-w-xl self-end">
              <p className="text-lg leading-relaxed text-ink-muted text-pretty">{views.body}</p>
              {showProjectViews ? (
                <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">{views.projectBody}</p>
              ) : null}
            </div>
          </div>
          <div className="mt-10">
            <ViewsShowcase copy={views} badge={illustration} views={enabledViews} />
          </div>
        </article>
      </Container>
    </section>
  );
}
