"use client";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/lib/i18n";

function rememberLocale(locale: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The URL still carries the language.
  }
}

type Props = {
  current: Locale;
  label: string;
  location: string;
  /** "inverse" for use on the navy footer. */
  tone?: "default" | "inverse";
  className?: string;
};

export function LanguageSwitch({ current, label, location, tone = "default", className }: Props) {
  const inverse = tone === "inverse";
  return (
    <div role="group" aria-label={label} className={cn("flex items-center", className)}>
      {locales.map((locale, index) => {
        const active = locale === current;
        return (
          <span key={locale} className="flex items-center">
            {index > 0 ? (
              <span aria-hidden="true" className={cn("h-4 w-px", inverse ? "bg-white/30" : "bg-rule-strong")} />
            ) : null}
            <a
              href={`/${locale}`}
              lang={locale}
              hrefLang={locale}
              aria-current={active ? "true" : undefined}
              title={localeNames[locale]}
              onClick={(event) => {
                rememberLocale(locale);
                if (active) {
                  event.preventDefault();
                  return;
                }
                track("language_switch", { from: current, to: locale, location });
                // Plain link navigation (full page load) so <html lang> and metadata switch too.
                // Keep the visitor on the same section.
                event.currentTarget.href = `/${locale}${window.location.hash}`;
              }}
              className={cn(
                "inline-flex h-10 min-w-10 items-center justify-center px-2 text-sm font-semibold transition-colors",
                inverse
                  ? active
                    ? "text-white underline decoration-2 underline-offset-[6px]"
                    : "text-white/70 hover:text-white"
                  : active
                    ? "text-navy underline decoration-2 underline-offset-[6px]"
                    : "text-muted hover:text-navy",
              )}
            >
              <span aria-hidden="true">{locale.toUpperCase()}</span>
              <span className="sr-only">{localeNames[locale]}</span>
            </a>
          </span>
        );
      })}
    </div>
  );
}
