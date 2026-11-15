import { NextResponse, type NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";

/**
 * Sends visitors without a language prefix to /vi or /en:
 * 1. the language they picked before (cookie), else
 * 2. Vietnamese for Vietnam, English for every other country, else
 * 3. browser language when geolocation is unavailable, with English as the fallback.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  // The stats dashboard has no language prefix.
  if (isLocale(firstSegment) || firstSegment === "stats") return NextResponse.next();

  const locale = resolveLocale({
    saved: request.cookies.get(LOCALE_COOKIE)?.value,
    country: request.headers.get("x-vercel-ip-country"),
    acceptLanguage: request.headers.get("accept-language"),
  });

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, X-Vercel-IP-Country, Accept-Language");
  return response;
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension (icons, robots.txt, sitemap.xml, /brand/*).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
