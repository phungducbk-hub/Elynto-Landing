import { Mail } from "lucide-react";
import { PrivacyPreferences } from "@/components/privacy/PrivacyPreferences";
import { siteConfig } from "@/config/site";
import { getPrivacyCopy } from "@/content/privacy";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import type { PagesDictionary } from "@/content/pages/types";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { pageGroups, pagePath, type PageKey } from "@/lib/pages";
import { LanguageSwitch } from "./LanguageSwitch";

type Props = {
  lang: Locale;
  dict: Dictionary;
  pages: PagesDictionary;
  vision: string;
  signupUrl: string;
  loginUrl: string;
  /** The subpage being viewed, marked as current in the link list. */
  current?: PageKey;
};

const linkClass = "text-ink-muted transition-colors hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink";

export function SiteFooter({ lang, dict, pages, vision, signupUrl, loginUrl, current }: Props) {
  const { nav, footer } = dict;
  const year = new Date().getFullYear();
  const href = (key: PageKey) => `/${lang}/${pagePath(key)}`;
  const track = (key: PageKey) => ({ "data-track": "nav_click", "data-track-target": key, "data-track-location": "footer" });

  return (
    <footer id="site-footer" className="border-t border-line bg-canvas">
      <Container className="pt-14 pb-10 sm:pt-16">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] xl:gap-14">
          <div className="max-w-sm">
            <a href={`/${lang}`} className="-m-1 inline-block rounded-md p-1 text-brand" aria-label={nav.home}>
              <Logo className="h-8 w-auto" title={null} />
            </a>
            <p className="mt-5 text-[0.9375rem] font-medium text-ink" lang="en">
              {vision}
            </p>
            <p className="mt-1 text-sm text-ink-subtle">{footer.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              <ButtonLink
                href={signupUrl}
                size="sm"
                dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "footer" }}
              >
                {nav.startTrial}
              </ButtonLink>
              <a
                href={loginUrl}
                data-track="cta_click"
                data-track-cta="login"
                data-track-location="footer"
                className="inline-flex min-h-11 items-center text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {nav.login}
              </a>
            </div>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted hover:text-brand">
              <Mail aria-hidden="true" className="size-4" />{siteConfig.contactEmail}
            </a>
          </div>
          <nav aria-label={footer.navLabel} className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-x-7">
            {pageGroups.map((group) => (
              <div key={group.id} className="min-w-0">
                <h2 className="text-[0.8125rem] font-semibold tracking-wide text-ink uppercase">{footer.groups[group.id]}</h2>
                <ul className="mt-3 space-y-0.5">
                  {group.pages.map((key) => (
                    <li key={key}>
                      <a
                        href={href(key)}
                        aria-current={key === current ? "page" : undefined}
                        {...track(key)}
                        className={`inline-flex min-h-11 items-center py-1.5 text-sm leading-5 sm:min-h-10 lg:min-h-9 lg:text-[0.8125rem] lg:leading-[1.125rem] ${linkClass}`}
                      >
                        {pages[key].navLabel}
                        {pages[key].badge ? (
                          <span className="ml-2 inline-block rounded-md bg-brand-50 px-1.5 py-px align-[0.08em] text-[0.6875rem] leading-4 font-semibold tracking-wide text-brand-600 ring-1 ring-brand-100 ring-inset">
                            {pages[key].badge}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-ink-subtle">
            © {year} {footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ul aria-label={footer.legalLabel} className="flex gap-5 text-sm">
              {(["terms", "privacy"] as const).map((key) => (
                <li key={key}>
                  <a href={href(key)} aria-current={key === current ? "page" : undefined} {...track(key)} className={`inline-flex min-h-11 items-center ${linkClass}`}>
                    {pages[key].navLabel}
                  </a>
                </li>
              ))}
            </ul>
            <PrivacyPreferences copy={getPrivacyCopy(lang)} stats={dict.subpage.stats} cookies={dict.subpage.cookies} policyHref={href("cookies")} />
            <LanguageSwitch current={lang} label={footer.languageLabel} location="footer" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
