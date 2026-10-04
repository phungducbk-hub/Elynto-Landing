import { toStatsEvent } from "@/lib/stats/collect";
import { getStatsStore } from "@/lib/stats/store";
import { isBot } from "@/lib/stats/user-agent";

const MAX_BODY = 4_096;

/** Receives page views and button clicks from the site's own pages (see lib/stats/client.ts). */
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return new Response(null, { status: 403 });

  const userAgent = request.headers.get("user-agent") ?? "";
  if (isBot(userAgent)) return new Response(null, { status: 204 });

  const text = await request.text();
  if (text.length > MAX_BODY) return new Response(null, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }

  const event = toStatsEvent(body, { userAgent, country: request.headers.get("x-vercel-ip-country"), host });
  if (!event) return new Response(null, { status: 400 });

  try {
    await getStatsStore().append(event);
  } catch (error) {
    console.error("[stats] could not store event", error);
    return new Response(null, { status: 503 });
  }
  return new Response(null, { status: 204 });
}
