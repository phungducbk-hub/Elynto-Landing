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
  className?: string;
};

export function LanguageSwitch({ current, label, location, className }: Props) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex rounded-lg bg-sunken p-0.5 ring-1 ring-line ring-inset", className)}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <a
            key={locale}
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
              "inline-flex h-8 min-w-10 items-center justify-center rounded-md px-2 text-xs font-semibold tracking-wide transition-colors",
              active ? "bg-surface text-ink shadow-sm ring-1 ring-line" : "text-ink-subtle hover:text-ink",
            )}
          >
            <span aria-hidden="true">{locale.toUpperCase()}</span>
            <span className="sr-only">{localeNames[locale]}</span>
          </a>
        );
      })}
    </div>
  );
}
