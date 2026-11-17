/**
 * UTM forwarding to the Elynto app (Elynto P7-ATTR §3.5; CEO decision 2026-11-17: consent-aware).
 *
 * When a visitor lands here from an ad or a post with `utm_*` parameters, links into the Elynto app carry those
 * values at click time, so the app can record which campaign brought in each new Workspace. A parameter the link
 * already has is never replaced, and only links whose host is exactly one of the app's hosts are touched.
 *
 * Consent (the site's own model, `src/lib/stats/client.ts`): campaign labels are optional statistics.
 * - With "Allow statistics" (`elynto-stats-consent` = `v1:yes`, no opt-out, no GPC / Do Not Track): the FIRST
 *   touch is kept for 30 days in `localStorage` (`ely_attr`): the five `utm_*` values, the landing PATH here
 *   (`landing`, no query) and the referring site's HOST (`ref`). Later campaigns never replace it.
 * - Without that consent: nothing is stored, and any stored touch is removed. Links carry only the `utm_*` values
 *   of the page the visitor arrived on in this tab (they are already in the address the visitor followed).
 * - Consent given or withdrawn during the visit (the `elynto:statistics-choice` event) applies at once.
 *
 * Never kept or forwarded: click ids (`fbclid`, `gclid`), any other parameter, anything personal. Each value is
 * cut to 100 characters, as the app does.
 *
 * EARLY CLICKS: the whole forwarder is ONE self-contained function, `utmForwardBoot`, inlined into the page's
 * `<head>` (`utmForwardBootScript`), so it runs while the HTML is parsed — a visitor who taps "Start free trial"
 * before the page's JavaScript has loaded still carries the campaign. The unit tests run this same function
 * (directly and through the inline script string), so there is no second, untested copy of the logic.
 * It must therefore reference nothing outside itself: no imports, no module constants (they are passed in).
 */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
/** The `localStorage` key — the same name as the app's own first-touch cookie. */
export const FIRST_TOUCH_KEY = "ely_attr";
export const FIRST_TOUCH_MAX_AGE_MS = 30 * 24 * 3600 * 1000;
/** The app's production hosts: beta.elynto.io today, app.elynto.io later (CEO answer, 2026-11-17). */
export const APP_HOSTS: readonly string[] = ["beta.elynto.io", "app.elynto.io"];
export const MAX_VALUE_LENGTH = 100;

export type UtmForwardConfig = {
  appHosts: readonly string[];
  storageKey: string;
  maxAgeMs: number;
  maxLength: number;
  utmKeys: readonly string[];
  /** The site's statistics-consent keys and event (`src/lib/stats/client.ts`). */
  consentKey: string;
  consentYes: string;
  consentNo: string;
  optOutKey: string;
  choiceEvent: string;
};

/** Stand-ins for the browser globals, for the unit tests only (the page passes none). */
export type UtmForwardEnv = {
  window: unknown;
  document: unknown;
  navigator: unknown;
  now: () => number;
};

/**
 * THE FORWARDER. Self-contained on purpose (see the file comment): it is serialised with `toString()` into the
 * page's `<head>`. Plain syntax only (no optional chaining), since the string is not transpiled for browsers.
 */
export function utmForwardBoot(config: UtmForwardConfig, env?: UtmForwardEnv): void {
  /* eslint-disable @typescript-eslint/no-explicit-any -- the browser globals are used untyped inside the inline script. */
  const w: any = env ? env.window : window;
  const d: any = env ? env.document : document;
  const nav: any = env ? env.navigator : navigator;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const now = function (): number {
    return env ? env.now() : Date.now();
  };
  if (!w || !d || w.__elyntoUtmForward) return;
  w.__elyntoUtmForward = true;

  const forwarded: string[] = config.utmKeys.concat(["landing", "ref"]);

  const read = function (key: string): string | null {
    try {
      return w.localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const write = function (key: string, value: string): void {
    try {
      w.localStorage.setItem(key, value);
    } catch {
      // Blocked storage: forwarded from this page only.
    }
  };
  const remove = function (key: string): void {
    try {
      w.localStorage.removeItem(key);
    } catch {
      // Nothing stored, or storage blocked.
    }
  };

  /** Statistics allowed: explicit consent, no opt-out, and no Global Privacy Control / Do Not Track signal. */
  const allowed = function (): boolean {
    if (nav && (nav.globalPrivacyControl === true || nav.doNotTrack === "1")) return false;
    if (read(config.optOutKey) === "1" || read(config.consentKey) === config.consentNo) return false;
    return read(config.consentKey) === config.consentYes;
  };

  /** Control characters out, surrounding space trimmed, at most `maxLength` characters (never splitting a pair). */
  const clean = function (value: unknown): string | null {
    if (typeof value !== "string") return null;
    const text = Array.from(value.replace(/[\u0000-\u001f\u007f]/g, "").trim())
      .slice(0, config.maxLength)
      .join("");
    return text.length > 0 ? text : null;
  };
  const hasUtm = function (touch: Record<string, unknown>): boolean {
    for (let i = 0; i < config.utmKeys.length; i += 1) {
      if (typeof touch[config.utmKeys[i]] === "string") return true;
    }
    return false;
  };

  // This page's own campaign, read once while the page is parsed (the address the visitor arrived on).
  let utmOnly: Record<string, string> | null = null;
  let firstTouch: Record<string, string | number> | null = null;
  try {
    const query = new URLSearchParams(w.location.search);
    const utm: Record<string, string> = {};
    for (let i = 0; i < config.utmKeys.length; i += 1) {
      const text = clean(query.get(config.utmKeys[i]));
      if (text !== null) utm[config.utmKeys[i]] = text;
    }
    if (hasUtm(utm)) {
      utmOnly = utm;
      const touch: Record<string, string | number> = { ts: now() };
      for (const key in utm) touch[key] = utm[key];
      const landing = clean(String(w.location.pathname || "").split(/[?#]/)[0]);
      if (landing !== null && landing.charAt(0) === "/") touch.landing = landing;
      try {
        const referrer = new URL(d.referrer);
        if ((referrer.protocol === "https:" || referrer.protocol === "http:") && referrer.hostname !== w.location.hostname) {
          const host = clean(referrer.hostname.toLowerCase());
          if (host !== null) touch.ref = host;
        }
      } catch {
        // No referrer, or not a URL: nothing to keep.
      }
      firstTouch = touch;
    }
  } catch {
    // No usable address: nothing to forward from this page.
  }

  /** The stored first touch while valid: ≤ 30 days old, not in the future, a `utm_*` value; known keys only. */
  const stored = function (): Record<string, string | number> | null {
    const raw = read(config.storageKey);
    if (typeof raw !== "string" || raw.length === 0 || raw.length > 2000) return null;
    let value: unknown;
    try {
      value = JSON.parse(raw);
    } catch {
      return null;
    }
    if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
    const record = value as Record<string, unknown>;
    const ts = record.ts;
    const at = now();
    if (typeof ts !== "number" || !isFinite(ts) || ts > at || at - ts > config.maxAgeMs) return null;
    const out: Record<string, string | number> = { ts: ts };
    for (let i = 0; i < forwarded.length; i += 1) {
      const text = clean(record[forwarded[i]]);
      if (text !== null) out[forwarded[i]] = text;
    }
    return hasUtm(out) ? out : null;
  };

  /** What a link carries now. With consent: the stored first touch (storing this page's one if none yet). */
  const current = function (): Record<string, string | number> | null {
    if (!allowed()) {
      remove(config.storageKey);
      return utmOnly;
    }
    const kept = stored();
    if (kept !== null) return kept;
    if (firstTouch !== null) {
      write(config.storageKey, JSON.stringify(firstTouch));
      return firstTouch;
    }
    remove(config.storageKey);
    return null;
  };

  /** The link with the values appended, or null: not http(s), not exactly an app host, or nothing to add. */
  const decorate = function (href: string, touch: Record<string, string | number>): string | null {
    let url: URL;
    try {
      url = new URL(href);
    } catch {
      return null;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (config.appHosts.indexOf(url.hostname.toLowerCase()) === -1) return null;
    let changed = false;
    for (let i = 0; i < forwarded.length; i += 1) {
      const value = touch[forwarded[i]];
      if (typeof value !== "string" || url.searchParams.has(forwarded[i])) continue;
      url.searchParams.set(forwarded[i], value);
      changed = true;
    }
    return changed ? url.toString() : null;
  };

  const onClick = function (event: { target?: unknown }): void {
    const target = event.target as { closest?: (selector: string) => { href: string } | null } | null;
    const anchor = target && typeof target.closest === "function" ? target.closest("a[href]") : null;
    if (!anchor) return;
    const touch = current();
    if (touch === null) return;
    const next = decorate(anchor.href, touch);
    if (next !== null) anchor.href = next;
  };

  current(); // Store now (with consent) or clear (without).
  // Capture phase: runs before the browser follows the link. `auxclick` covers a middle-click "open in new tab".
  d.addEventListener("click", onClick, true);
  d.addEventListener("auxclick", onClick, true);
  if (typeof w.addEventListener === "function") {
    // A choice made here, or in another tab (the storage event), applies at once.
    const reapply = function (): void {
      current();
    };
    w.addEventListener(config.choiceEvent, reapply);
    w.addEventListener("storage", reapply);
  }
}

/** The inline `<head>` script: the forwarder above, called with this site's settings. */
export function utmForwardBootScript(config: UtmForwardConfig): string {
  // `<` escaped so nothing in the settings can close the script element.
  const settings = JSON.stringify(config).replace(/</g, "\\u003c");
  return `(function(){try{(${utmForwardBoot.toString()})(${settings})}catch(e){}})()`;
}
