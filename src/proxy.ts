import { NextResponse, type NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE, negotiateLocale } from "@/lib/i18n";

/**
 * Sends visitors without a language prefix to /vi or /en:
 * 1. the language they picked before (cookie), else
 * 2. their browser language (Accept-Language), else
 * 3. the default locale.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  // The stats dashboard has no language prefix.
  if (isLocale(firstSegment) || firstSegment === "stats") return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : negotiateLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension (icons, robots.txt, sitemap.xml, /brand/*).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
