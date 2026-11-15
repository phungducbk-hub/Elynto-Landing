import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DelegatedView } from "@/components/visuals/DelegatedView";
import { PlanDraft } from "@/components/visuals/PlanDraft";
import { ProjectOverview } from "@/components/visuals/ProjectOverview";
import { TeamCollaboration } from "@/components/visuals/TeamCollaboration";
import { CollaborationWorkspace } from "@/components/visuals/CollaborationWorkspace";
import { getExperienceCopy } from "@/content/experience";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { reveal } from "@/lib/reveal";
import { FeatureRow } from "./FeatureRow";

export function HowItWorks({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { howItWorks, command, delegate, planning, collaboration, views, app } = dict;
  const { chapters, chapterNav } = getExperienceCopy(lang);
  const [intent, together, progress] = chapters;
  return <section id="how-it-works" aria-labelledby="how-title">
    <Container className="pt-16 sm:pt-24">
      <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} />
      <nav aria-label={chapterNav} className="mt-8 flex flex-wrap gap-x-8 gap-y-2">{chapters.map((chapter,index) => <a href={`#${chapter.id}`} key={chapter.id} className="flex min-h-11 items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand"><span className="font-mono text-xs text-brand">0{index+1}</span>{chapter.title}<ArrowUpRight aria-hidden="true" className="size-3.5 text-brand" /></a>)}</nav>
    </Container>
    <section id={intent.id} aria-labelledby="feature-command-title"><Container className="py-16 sm:py-24">
      <FeatureRow id="feature-command" eyebrow={`01 / ${command.eyebrow}`} title={command.title} body={command.body} points={command.points}><TeamCollaboration lang={lang} /></FeatureRow>
      <article id="feature-planning" aria-labelledby="feature-planning-title" className="mt-16 sm:mt-24">
        <div {...reveal()} className="mb-8 grid items-end gap-5 lg:grid-cols-2 lg:gap-16"><div><p className="eyebrow">{planning.eyebrow}</p><h3 id="feature-planning-title" className="feature-title mt-3">{planning.title}</h3></div><p className="text-base leading-relaxed text-ink-muted sm:text-lg">{planning.body}</p></div>
        <div {...reveal("visual")}><PlanDraft lang={lang} copy={planning.mock} /></div>
      </article>
    </Container></section>
    <section id={together.id} aria-labelledby="feature-collaboration-title" className="bg-white"><Container className="py-16 sm:py-24">
      <FeatureRow id="feature-collaboration" eyebrow={`02 / ${collaboration.eyebrow}`} title={collaboration.title} body={collaboration.body} points={collaboration.points} wideVisual><CollaborationWorkspace lang={lang} copy={collaboration.mock} /></FeatureRow>
    </Container></section>
    <section id={progress.id} aria-labelledby="feature-delegate-title" className="bg-brand-50/60"><Container className="py-16 sm:py-24">
      <FeatureRow id="feature-delegate" eyebrow={`03 / ${delegate.eyebrow}`} title={delegate.title} body={delegate.body} points={delegate.points} reverse wideVisual><DelegatedView lang={lang} view={delegate.view} app={app} /></FeatureRow>
      <article id="feature-views" aria-labelledby="feature-views-title" className="mt-16 sm:mt-24">
        <div {...reveal()} className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-16"><div className="max-w-2xl"><p className="eyebrow">{views.eyebrow}</p><h3 id="feature-views-title" className="feature-title mt-3">{views.title}</h3><p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{views.body}</p></div><a href={`/${lang}/features/project-views`} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-brand hover:underline">{lang === "vi" ? "Tìm hiểu thêm" : "Explore the feature"}<ArrowUpRight aria-hidden="true" className="size-4" /></a></div>
        <div {...reveal("visual")}><ProjectOverview lang={lang} copy={planning.mock} /></div>
      </article>
    </Container></section>
  </section>;
}
