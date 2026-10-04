import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";

type Props = {
  lang: Locale;
  dict: Dictionary;
  vision: string;
  signupUrl: string;
  loginUrl: string;
};

export function SiteFooter({ lang, dict, vision, signupUrl, loginUrl }: Props) {
  const { nav, footer } = dict;
  const year = new Date().getFullYear();

  const links = [
    { href: "#benefits", label: nav.benefits, track: { "data-track": "nav_click", "data-track-target": "benefits", "data-track-location": "footer" } },
    { href: "#how-it-works", label: nav.howItWorks, track: { "data-track": "nav_click", "data-track-target": "how-it-works", "data-track-location": "footer" } },
    { href: "#faq", label: nav.faq, track: { "data-track": "nav_click", "data-track-target": "faq", "data-track-location": "footer" } },
    { href: loginUrl, label: nav.login, track: { "data-track": "cta_click", "data-track-cta": "login", "data-track-location": "footer" } },
    { href: signupUrl, label: nav.startTrial, track: { "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "footer" } },
  ];

  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="py-12 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo className="h-8 w-auto text-brand" />
            <p className="mt-4 text-[0.9375rem] font-medium text-ink" lang="en">
              {vision}
            </p>
            <p className="mt-1 text-sm text-ink-subtle">{footer.tagline}</p>
          </div>

          <nav aria-label={footer.navLabel}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-6">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...link.track}
                    className="inline-flex min-h-10 items-center text-[0.9375rem] text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-subtle">
            © {year} {footer.rights}
          </p>
          <LanguageSwitch current={lang} label={footer.languageLabel} location="footer" />
        </div>
      </Container>
    </footer>
  );
}
