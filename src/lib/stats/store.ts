import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { StatsEvent } from "./types";

/**
 * Where events are kept, one list per calendar day:
 * - Upstash Redis over its REST API, when its credentials are found (see findRedisCredentials);
 * - a folder of JSON-lines files when running on your own machine or server;
 * - nowhere on Vercel without Redis (serverless disks don't persist), and the dashboard says so.
 */
export type StatsStore = {
  kind: "redis" | "file" | "none";
  /** Which environment variable the Redis credentials came from. */
  source?: string;
  append(event: StatsEvent): Promise<void>;
  read(days: string[]): Promise<StatsEvent[]>;
};

/** Events older than this are dropped automatically (Redis only). */
const RETENTION_DAYS = Number(process.env.STATS_RETENTION_DAYS) || 400;
const KEY_PREFIX = "elynto:stats:";

function parseLines(lines: string[]) {
  const events: StatsEvent[] = [];
  for (const line of lines) {
    if (!line) continue;
    try {
      events.push(JSON.parse(line) as StatsEvent);
    } catch {
      // Skip a damaged line rather than failing the whole report.
    }
  }
  return events;
}

type Env = Record<string, string | undefined>;

/**
 * Upstash REST credentials under any name they commonly arrive with: KV_REST_API_URL/TOKEN
 * (Vercel's Upstash integration), UPSTASH_REDIS_REST_URL/TOKEN (Upstash console), the same with a
 * custom prefix chosen when connecting the store, or, failing those, an Upstash rediss:// URL
 * (KV_URL / REDIS_URL), whose password is the REST token and whose host serves the REST API.
 */
export function findRedisCredentials(env: Env = process.env): { url: string; token: string; source: string } | null {
  const pairs: [string, string][] = [
    ["KV_REST_API_URL", "KV_REST_API_TOKEN"],
    ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
  ];
  for (const name of Object.keys(env).sort()) {
    const match = name.match(/^(.*?)(REST_API_URL|REDIS_REST_URL)$/);
    if (match) pairs.push([name, `${match[1]}${match[2] === "REST_API_URL" ? "REST_API_TOKEN" : "REDIS_REST_TOKEN"}`]);
  }
  for (const [urlName, tokenName] of pairs) {
    const url = env[urlName]?.trim();
    const token = env[tokenName]?.trim();
    if (url && token) return { url, token, source: urlName };
  }

  for (const name of Object.keys(env).sort()) {
    if (!/(^|_)(KV_URL|REDIS_URL)$/.test(name)) continue;
    try {
      const parsed = new URL(env[name] ?? "");
      if (parsed.hostname.endsWith(".upstash.io") && parsed.password) {
        return { url: `https://${parsed.hostname}`, token: decodeURIComponent(parsed.password), source: name };
      }
    } catch {
      // Not a URL; keep looking.
    }
  }
  return null;
}

/** Names (never values) of variables that look storage-related, to explain a missing connection. */
export function storageVariableNames(env: Env = process.env) {
  return Object.keys(env)
    .filter((name) => /REDIS|UPSTASH|(^|_)KV_/.test(name))
    .sort();
}

function redisStore(url: string, token: string, source: string): StatsStore {
  const pipeline = async (commands: (string | number)[][]) => {
    const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      // Upstash takes every argument as a string.
      body: JSON.stringify(commands.map((command) => command.map(String))),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Redis request failed: ${response.status}`);
    const results = (await response.json()) as { result?: unknown; error?: string }[];
    const failed = results.find((r) => r.error);
    if (failed) throw new Error(`Redis error: ${failed.error}`);
    return results.map((r) => r.result);
  };

  return {
    kind: "redis",
    source,
    async append(event) {
      const key = KEY_PREFIX + event.day;
      await pipeline([
        ["RPUSH", key, JSON.stringify(event)],
        ["EXPIRE", key, RETENTION_DAYS * 86_400],
      ]);
    },
    async read(days) {
      const events: StatsEvent[] = [];
      // Keep each pipeline modest; a year is ~4 round trips.
      for (let i = 0; i < days.length; i += 100) {
        const chunk = days.slice(i, i + 100);
        const results = await pipeline(chunk.map((day) => ["LRANGE", KEY_PREFIX + day, 0, -1]));
        for (const list of results) events.push(...parseLines((list as string[] | null) ?? []));
      }
      return events;
    },
  };
}

function fileStore(dir: string): StatsStore {
  return {
    kind: "file",
    async append(event) {
      await mkdir(dir, { recursive: true });
      await appendFile(join(dir, `${event.day}.jsonl`), `${JSON.stringify(event)}\n`, "utf8");
    },
    async read(days) {
      const files = await Promise.all(
        days.map((day) => readFile(join(dir, `${day}.jsonl`), "utf8").catch(() => "")),
      );
      return files.flatMap((text) => parseLines(text.split("\n")));
    },
  };
}

const noStore: StatsStore = {
  kind: "none",
  async append() {},
  async read() {
    return [];
  },
};

export function getStatsStore(): StatsStore {
  const redis = findRedisCredentials();
  if (redis) return redisStore(redis.url, redis.token, redis.source);
  if (process.env.VERCEL) return noStore;
  return fileStore(process.env.STATS_DATA_DIR || join(process.cwd(), ".data", "stats"));
}
