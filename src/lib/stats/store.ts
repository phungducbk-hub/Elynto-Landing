import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { StatsEvent } from "./types";

/**
 * Where events are kept, one list per calendar day:
 * - Upstash Redis over its REST API when KV_REST_API_URL / KV_REST_API_TOKEN (the names Vercel's
 *   Upstash integration sets) or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are present;
 * - a folder of JSON-lines files when running on your own machine or server;
 * - nowhere on Vercel without Redis (serverless disks don't persist), and the dashboard says so.
 */
export type StatsStore = {
  kind: "redis" | "file" | "none";
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

function redisStore(url: string, token: string): StatsStore {
  const pipeline = async (commands: (string | number)[][]) => {
    const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
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
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) return redisStore(url, token);
  if (process.env.VERCEL) return noStore;
  return fileStore(process.env.STATS_DATA_DIR || join(process.cwd(), ".data", "stats"));
}
