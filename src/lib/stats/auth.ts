import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const STATS_COOKIE = "elynto_stats";
export const STATS_SESSION_SECONDS = 30 * 24 * 60 * 60;

function password() {
  return process.env.STATS_PASSWORD ?? "";
}

/** The dashboard stays switched off until STATS_PASSWORD is set. */
export function statsEnabled() {
  return password().length > 0;
}

function sameText(a: string, b: string) {
  // Hash first so the comparison takes the same time whatever the lengths.
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

/** Session cookie value: derived from the password, so changing the password signs everyone out. */
export function statsSessionToken() {
  return createHmac("sha256", password()).update("elynto-stats-session-v1").digest("hex");
}

export function checkStatsPassword(input: string) {
  return statsEnabled() && sameText(input, password());
}

export async function isStatsSignedIn() {
  // Read the cookie first: that marks the page as per-request, so it is never prerendered at build
  // time (when STATS_PASSWORD may not be set yet) with a baked-in answer.
  const value = (await cookies()).get(STATS_COOKIE)?.value ?? "";
  return statsEnabled() && sameText(value, statsSessionToken());
}
