import { Check, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DelegatedView } from "@/components/visuals/DelegatedView";
import { PlanDraft } from "@/components/visuals/PlanDraft";
import { ProjectWorkspace } from "@/components/visuals/ProjectWorkspace";
import { TodayView } from "@/components/visuals/TodayView";
import { productMedia } from "@/config/media";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { FeatureText } from "./FeatureText";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((point) => (
        <li key={point} className="flex gap-3 text-base leading-relaxed text-ink">
          <Check className="mt-1 size-4 shrink-0 text-navy" strokeWidth={2.5} aria-hidden="true" />
          {point}
        </li>
      ))}
    </ul>
  );
}

export function HowItWorks({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { howItWorks, delegate, planning, project, today, app, illustration } = dict;
  const media = {
    delegate: productMedia.delegate[lang],
    planning: productMedia.planning[lang],
    project: productMedia.project[lang],
    today: productMedia.today[lang],
  };

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-rule">
      <Container className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <SectionHeading id="how-title" title={howItWorks.title} intro={howItWorks.intro} />

        {/* Assign and follow up */}
        <article aria-labelledby="feature-delegate" className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <FeatureText id="feature-delegate" name={delegate.name} title={delegate.title} body={delegate.body}>
              <p className="mt-6 max-w-[34rem] border-l-2 border-marker pl-4 text-[0.9375rem] leading-relaxed text-muted">
                {delegate.tip}
              </p>
            </FeatureText>
          </div>
          <div className="lg:col-span-8">
            {media.delegate ? (
              <ProductShot image={media.delegate} />
            ) : (
              <DelegatedView view={delegate.view} app={app} label={illustration} />
            )}
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
              {media.planning ? (
                <ProductShot image={media.planning} />
              ) : (
                <PlanDraft mock={planning.mock} phases={project.data.phases} datePattern={app.datePattern} label={illustration} />
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
        {/* Follow your projects */}
        <article aria-labelledby="feature-project">
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 id="feature-project" className="type-h3 text-balance">
                {project.title}
              </h3>
            </div>
            <div className="max-w-[38rem] lg:col-span-7">
              <p className="text-lg leading-relaxed text-pretty">
                <strong className="font-semibold text-ink">{project.name}</strong> {project.body}
              </p>
              <Points items={project.points} />
            </div>
          </div>
          <div className="mt-10 sm:mt-12">
            {media.project ? (
              <ProductShot image={media.project} />
            ) : (
              <ProjectWorkspace data={project.data} app={app} label={illustration} />
            )}
          </div>
        </article>

        {/* Today */}
        <article aria-labelledby="feature-today" className="mt-24 grid gap-10 sm:mt-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <FeatureText id="feature-today" name={today.name} title={today.title} body={today.body}>
              <Points items={today.points} />
            </FeatureText>
          </div>
          <div className="lg:col-span-7">
            {media.today ? <ProductShot image={media.today} /> : <TodayView copy={today.mock} app={app} label={illustration} />}
          </div>
        </article>
      </Container>
    </section>
  );
}
