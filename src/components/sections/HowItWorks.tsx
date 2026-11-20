import { Check, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DelegatedView } from "@/components/visuals/DelegatedView";
import { PlanDraft } from "@/components/visuals/PlanDraft";
import { ProjectWorkspace } from "@/components/visuals/ProjectWorkspace";
import { TeamCollaboration } from "@/components/visuals/TeamCollaboration";
import { CollaborationWorkspace } from "@/components/visuals/CollaborationWorkspace";
import { productMedia } from "@/config/media";
import { getExperienceCopy } from "@/content/experience";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { reveal } from "@/lib/reveal";
import { FeatureRow } from "./FeatureRow";

type Chapter = ReturnType<typeof getExperienceCopy>["chapters"][number];
function ChapterHeading({ chapter, number }: { chapter: Chapter; number: number }) {
  return <div {...reveal()} className="mb-10 max-w-3xl sm:mb-14">
    <span aria-hidden="true" className="font-mono text-sm font-medium tracking-wider text-brand">0{number}</span>
    <h3 id={`${chapter.id}-title`} className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink text-balance sm:text-4xl">{chapter.title}</h3>
    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{chapter.body}</p>
  </div>;
}

export function HowItWorks({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { howItWorks, command, delegate, planning, collaboration, views, app } = dict;
  const { chapters, chapterNav } = getExperienceCopy(lang);
  const [intent, together, progress] = chapters;
  const delegateShot = productMedia.delegate[lang];
  const projectShot = productMedia.project[lang];
  const planningShot = productMedia.planning[lang];

  return (
    <section id="how-it-works" aria-labelledby="how-title">
      <Container className="pt-16 sm:pt-20">
        <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} />
        <nav aria-label={chapterNav} className="mt-8 grid gap-3 sm:grid-cols-3">
          {chapters.map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id} className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-4 text-sm font-medium text-ink transition-colors hover:border-brand-200 hover:bg-brand-50 sm:items-start">
            <span className="font-mono text-xs text-brand">0{index + 1}</span><span>{chapter.title}</span>
          </a>)}
        </nav>
      </Container>

      <section id={intent.id} aria-labelledby={`${intent.id}-title`}>
        <Container className="py-16 sm:py-20">
          <ChapterHeading chapter={intent} number={1} />
          <FeatureRow id="feature-command" headingLevel={4} eyebrow={command.eyebrow} title={command.title} body={command.body} points={command.points} tip={command.tip}>
            <TeamCollaboration lang={lang} />
          </FeatureRow>
          <article id="feature-planning" aria-labelledby="feature-planning-title" className="mt-16 rounded-3xl border border-brand-100 bg-brand-50/50 p-5 sm:mt-20 sm:p-9">
            <div {...reveal()} className="max-w-3xl">
              <p className="text-sm font-semibold text-brand">{planning.eyebrow}</p>
              <h4 id="feature-planning-title" className="mt-3 text-2xl font-semibold leading-tight text-ink text-balance sm:text-3xl">{planning.title}</h4>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{planning.body}</p>
            </div>
            <ol {...reveal()} className="mt-7 grid gap-5 sm:grid-cols-3">
              {planning.steps.map((step, index) => <li key={step.title} className="border-t border-brand-200 pt-4"><p className="text-sm font-semibold text-ink"><span aria-hidden="true" className="mr-2 text-brand">0{index + 1}</span>{step.title}</p><p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p></li>)}
            </ol>
            <div {...reveal("visual")} className="mx-auto mt-8 max-w-5xl">{planningShot ? <ProductShot image={planningShot} /> : <PlanDraft lang={lang} copy={planning.mock} />}</div>
            <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-ink-muted"><Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />{planning.note}</p>
          </article>
        </Container>
      </section>

      <section id={together.id} aria-labelledby={`${together.id}-title`} className="border-y border-line bg-white">
        <Container className="py-16 sm:py-20">
          <ChapterHeading chapter={together} number={2} />
          <FeatureRow id="feature-collaboration" headingLevel={4} eyebrow={collaboration.eyebrow} title={collaboration.title} body={collaboration.body} points={collaboration.points} wideVisual>
            <CollaborationWorkspace lang={lang} copy={collaboration.mock} />
          </FeatureRow>
        </Container>
      </section>

      <section id={progress.id} aria-labelledby={`${progress.id}-title`}>
        <Container className="py-16 sm:py-20">
          <ChapterHeading chapter={progress} number={3} />
          <FeatureRow id="feature-delegate" headingLevel={4} eyebrow={delegate.eyebrow} title={delegate.title} body={delegate.body} points={delegate.points} reverse wideVisual>
            {delegateShot ? <ProductShot image={delegateShot} /> : <DelegatedView lang={lang} view={delegate.view} app={app} />}
          </FeatureRow>
          <article id="feature-views" aria-labelledby="feature-views-title" className="mt-16 border-t border-line pt-12 sm:mt-20">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
              <div {...reveal()}><p className="text-sm font-semibold text-brand">{views.eyebrow}</p><h4 id="feature-views-title" className="mt-3 text-2xl font-semibold leading-tight text-ink text-balance sm:text-3xl">{views.title}</h4><p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{views.body}</p></div>
              <ul {...reveal()} className="space-y-3 self-end">{views.points.map(point => <li key={point} className="flex gap-3 text-base leading-relaxed text-ink"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />{point}</li>)}</ul>
            </div>
            <div {...reveal("visual")} className="mt-9 [mask-image:linear-gradient(to_bottom,black_calc(100%_-_12rem),transparent_100%)]">{projectShot ? <ProductShot image={projectShot} /> : <ProjectWorkspace lang={lang} data={views.data} app={app} />}</div>
          </article>
        </Container>
      </section>
    </section>
  );
}
