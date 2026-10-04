import { ArrowRight, Check, ChevronRight, Mail } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { DelegatedView } from "@/components/visuals/DelegatedView";
import { PlanDraft } from "@/components/visuals/PlanDraft";
import { ProjectWorkspace } from "@/components/visuals/ProjectWorkspace";
import { SentenceToTask } from "@/components/visuals/SentenceToTask";
import { TodayView } from "@/components/visuals/TodayView";
import { siteConfig } from "@/config/site";
import { getDictionary, type Dictionary } from "@/content";
import { getPages } from "@/content/pages";
import type { PageSection, PagesDictionary } from "@/content/pages/types";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { groupOf, isFeaturePage, pageGroups, pagePath, type FeaturePageKey, type PageKey } from "@/lib/pages";
import { reveal } from "@/lib/reveal";
import { CookieReset } from "./CookieReset";

/** Feature visuals reused from the home page. The wide ones sit below the intro, the others beside it. */
function FeatureVisual({ pageKey, dict }: { pageKey: FeaturePageKey; dict: Dictionary }) {
  const badge = dict.illustration;
  switch (pageKey) {
    case "natural-language-tasks":
      return <SentenceToTask copy={dict.command} badge={badge} />;
    case "ai-planning":
      return <PlanDraft copy={dict.planning.mock} badge={badge} />;
    case "delegated-work":
      return <DelegatedView view={dict.delegate.view} app={dict.app} badge={badge} />;
    case "today":
      return <TodayView copy={dict.today.mock} badge={badge} />;
    case "project-views":
      return <ProjectWorkspace data={dict.views.data} app={dict.app} badge={badge} />;
  }
}

const wideVisuals: FeaturePageKey[] = ["ai-planning", "delegated-work", "project-views"];

function Points({ points, check }: { points: string[]; check?: boolean }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {points.map((point) => (
        <li key={point} className="flex gap-3 text-base leading-relaxed text-ink">
          {check ? (
            <span className="mt-1 inline-grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand ring-1 ring-brand-100 ring-inset">
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
          ) : (
            <span className="mt-[0.6875rem] size-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
          )}
          {point}
        </li>
      ))}
    </ul>
  );
}

function SectionBody({ section, check }: { section: PageSection; check?: boolean }) {
  return (
    <>
      {section.table ? (
        // Scrolls sideways on phones, so it takes keyboard focus to be scrollable without a mouse.
        <div
          role="region"
          aria-label={section.table.caption}
          tabIndex={0}
          className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface"
        >
          <table className="w-full min-w-[34rem] text-left text-[0.9375rem]">
            <caption className="sr-only">{section.table.caption}</caption>
            <thead className="bg-sunken text-sm text-ink-subtle">
              <tr>
                {section.table.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-2.5 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {section.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} className={cn("px-4 py-3 align-top text-ink-muted", i === 0 && "font-mono text-sm whitespace-nowrap text-ink")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {section.body?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
          {paragraph}
        </p>
      ))}
      {section.points ? <Points points={section.points} check={check} /> : null}
    </>
  );
}

function PageLinkCards({ lang, keys, pages }: { lang: Locale; keys: PageKey[]; pages: PagesDictionary }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {keys.map((key, index) => (
        <li key={key} {...reveal("up", index * 90)}>
          <a
            href={`/${lang}/${pagePath(key)}`}
            data-track="nav_click"
            data-track-target={key}
            data-track-location="subpage_related"
            className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-card"
          >
            <span className="flex items-center justify-between gap-3 text-base font-semibold text-ink">
              {pages[key].navLabel}
              <ArrowRight
                className="size-4 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                aria-hidden="true"
              />
            </span>
            <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{pages[key].description}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SubpageView({ lang, pageKey }: { lang: Locale; pageKey: PageKey }) {
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const page = pages[pageKey];
  const group = groupOf(pageKey);
  const feature = isFeaturePage(pageKey) ? pageKey : null;
  const sideVisual = feature !== null && !wideVisuals.includes(feature);
  const related = pageGroups.find((g) => g.id === group)!.pages.filter((key) => key !== pageKey);
  const { subpage } = dict;

  const intro = (
    <div className="max-w-2xl">
      <p {...reveal()} className="text-sm font-semibold tracking-wide text-brand-600">
        {page.eyebrow}
      </p>
      <h1
        {...reveal("up", 70)}
        className="mt-3 text-[2.125rem] leading-[1.12] font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.08]"
      >
        {page.title}
      </h1>
      <p {...reveal("up", 140)} className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty sm:text-xl sm:leading-relaxed">
        {page.description}
      </p>
      {feature ? (
        <div {...reveal("up", 210)} className="mt-8">
          <ButtonLink
            href={siteConfig.signupUrl}
            size="lg"
            className="w-full sm:w-auto"
            dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "subpage" }}
          >
            {dict.hero.primaryCta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      ) : null}
      {group === "legal" ? (
        <p {...reveal("up", 210)} className="mt-6 text-sm text-ink-subtle">
          {subpage.updated}
        </p>
      ) : null}
    </div>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-float"
      >
        {dict.a11y.skipToContent}
      </a>
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        signupUrl={siteConfig.signupUrl}
        loginUrl={siteConfig.loginUrl}
        homePath={`/${lang}`}
      />
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        <section className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(55%_60%_at_80%_20%,var(--color-brand-50),transparent_70%)]"
          />
          <Container className="pt-8 pb-14 sm:pt-10 sm:pb-20">
            <nav aria-label={subpage.breadcrumbLabel}>
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
                <li>
                  <a href={`/${lang}`} className="transition-colors hover:text-ink">
                    {subpage.home}
                  </a>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li>{dict.footer.groups[group]}</li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="font-medium text-ink-muted">
                  {page.navLabel}
                </li>
              </ol>
            </nav>

            {sideVisual ? (
              <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {intro}
                <div {...reveal("from-right", 120)} className="min-w-0">
                  <FeatureVisual pageKey={feature} dict={dict} />
                </div>
              </div>
            ) : (
              <div className="mt-10">
                {intro}
                {feature ? (
                  <div {...reveal("visual", 120)} className="mt-12 sm:mt-14">
                    <FeatureVisual pageKey={feature} dict={dict} />
                  </div>
                ) : null}
              </div>
            )}
          </Container>
        </section>

        <Container className="py-16 sm:py-20">
          {feature ? (
            <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
              {page.sections.map((section, index) => (
                <section key={section.heading} {...reveal("up", (index % 2) * 90)}>
                  <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
                  <SectionBody section={section} check />
                </section>
              ))}
            </div>
          ) : pageKey === "getting-started" ? (
            <ol className="max-w-3xl space-y-10">
              {page.sections.map((section, index) => (
                <li key={section.heading} {...reveal()} className="flex gap-5">
                  <span className="inline-grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                    <span className="sr-only">{subpage.step} </span>
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
                    <SectionBody section={section} />
                  </div>
                </li>
              ))}
            </ol>
          ) : pageKey === "faq" ? (
            <div {...reveal()} className="max-w-3xl">
              <FaqList items={dict.faq.items} />
            </div>
          ) : pageKey === "contact" ? (
            <div className="max-w-3xl">
              <div {...reveal()} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                {siteConfig.contactEmail ? (
                  <>
                    <p className="text-sm text-ink-subtle">{subpage.contact.emailLabel}</p>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      data-track="cta_click"
                      data-track-cta="contact_email"
                      data-track-location="subpage"
                      className="mt-1 inline-flex items-center gap-2 text-xl font-semibold text-brand underline-offset-4 hover:underline"
                    >
                      <Mail className="size-5" aria-hidden="true" />
                      {siteConfig.contactEmail}
                    </a>
                  </>
                ) : (
                  <p className="flex items-start gap-3 text-base leading-relaxed text-ink-muted">
                    <Mail className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                    {subpage.contact.pending}
                  </p>
                )}
              </div>
              <h2 {...reveal()} className="mt-14 text-xl font-semibold text-ink">
                {subpage.contact.helpTitle}
              </h2>
              <p {...reveal()} className="mt-3 text-base leading-relaxed text-ink-muted">
                {subpage.contact.helpBody}
              </p>
              <div className="mt-6">
                <PageLinkCards lang={lang} keys={["faq", "getting-started", "writing-tasks"]} pages={pages} />
              </div>
            </div>
          ) : (
            <div className="max-w-3xl space-y-12">
              {page.sections.map((section, index) => (
                <section key={section.heading} {...reveal()}>
                  <h2 className="text-xl font-semibold text-ink sm:text-2xl">{section.heading}</h2>
                  <SectionBody section={section} />
                  {pageKey === "cookies" && index === page.sections.length - 1 ? (
                    <CookieReset label={subpage.cookies.clear} done={subpage.cookies.cleared} />
                  ) : null}
                </section>
              ))}
            </div>
          )}
        </Container>

        {related.length ? (
          <section aria-labelledby="related-title" className="border-t border-line bg-surface">
            <Container className="py-14 sm:py-16">
              <h2 id="related-title" {...reveal()} className="text-lg font-semibold text-ink">
                {subpage.related[group]}
              </h2>
              <div className="mt-6">
                <PageLinkCards lang={lang} keys={related} pages={pages} />
              </div>
            </Container>
          </section>
        ) : null}

        {group !== "legal" ? (
          <div className="pt-16 sm:pt-20">
            <FinalCta dict={dict} />
          </div>
        ) : null}
      </main>
      <SiteFooter
        lang={lang}
        dict={dict}
        pages={pages}
        vision={siteConfig.vision}
        signupUrl={siteConfig.signupUrl}
        loginUrl={siteConfig.loginUrl}
        current={pageKey}
      />
    </>
  );
}
