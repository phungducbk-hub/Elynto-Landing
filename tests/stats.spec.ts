import { expect, test } from "@playwright/test";
import { aggregate } from "@/lib/stats/aggregate";
import { toStatsEvent } from "@/lib/stats/collect";
import { resolveRange } from "@/lib/stats/range";
import type { StatsEvent } from "@/lib/stats/types";
import { describeUserAgent, isBot } from "@/lib/stats/user-agent";

const PASSWORD = process.env.STATS_PASSWORD ?? "elynto-test";

test.describe("stats: counting rules", () => {
  const base = { device: "desktop", browser: "Chrome", os: "Windows", path: "/vi" } as const;
  const ev = (day: string, visitor: string, visit: string, extra: Partial<StatsEvent> = {}): StatsEvent => ({
    ts: Date.parse(`${day}T03:00:00Z`),
    day,
    type: "pageview",
    visitor,
    visit,
    ...base,
    ...extra,
  });

  const events: StatsEvent[] = [
    // One person, three visits over two days, five pages, one trial click: still one visitor.
    ev("2026-10-01", "visitor-aaaa", "visit-a1", { isNewVisitor: true }),
    ev("2026-10-01", "visitor-aaaa", "visit-a1", { path: "/vi/about" }),
    ev("2026-10-01", "visitor-aaaa", "visit-a2"),
    ev("2026-10-02", "visitor-aaaa", "visit-a3"),
    ev("2026-10-02", "visitor-aaaa", "visit-a3", { path: "/vi/faq" }),
    ev("2026-10-02", "visitor-aaaa", "visit-a3", { type: "cta", cta: "signup", location: "hero" }),
    // A second person on a phone, one page, one log-in click.
    ev("2026-10-02", "visitor-bbbb", "visit-b1", { device: "mobile", browser: "Safari", os: "iOS", isNewVisitor: true }),
    ev("2026-10-02", "visitor-bbbb", "visit-b1", { type: "cta", cta: "login", location: "header", device: "mobile" }),
    // Outside the range.
    ev("2026-09-20", "visitor-cccc", "visit-c1"),
  ];

  test("a visitor is counted once across visits and days", () => {
    const report = aggregate(events, "2026-10-01", "2026-10-02", "day");
    expect(report.totals).toMatchObject({
      visitors: 2,
      visits: 4,
      pageviews: 6,
      newVisitors: 2,
      returningVisitors: 0,
      signupClicks: 1,
      signupVisitors: 1,
      loginClicks: 1,
    });
    expect(report.periods).toEqual([
      { key: "2026-10-01", visitors: 1, visits: 2, pageviews: 3, signupClicks: 0, loginClicks: 0 },
      { key: "2026-10-02", visitors: 2, visits: 2, pageviews: 3, signupClicks: 1, loginClicks: 1 },
    ]);
    // a2 and b1 saw one page each, out of four visits.
    expect(report.totals.bounceRate).toBe(0.5);
  });

  test("groups by month, keeps empty periods and breaks down by device", () => {
    const report = aggregate(events, "2026-09-01", "2026-10-31", "month");
    expect(report.periods.map((p) => [p.key, p.visitors])).toEqual([
      ["2026-09", 1],
      ["2026-10", 2],
    ]);
    expect(report.breakdowns.device).toEqual([
      { value: "desktop", visitors: 2, pageviews: 6 },
      { value: "mobile", visitors: 1, pageviews: 1 },
    ]);
    expect(report.ctaLocations).toEqual([
      { location: "header", signup: 0, login: 1 },
      { location: "hero", signup: 1, login: 0 },
    ]);
  });

  test("user agents map to coarse device, browser and OS", () => {
    const ua = {
      iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
      android: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      ipadDesktopMode: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
      edge: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
      coccoc: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/120.0.0 Chrome/120.0.0.0 Safari/537.36",
    };
    expect(describeUserAgent(ua.iphone)).toEqual({ device: "mobile", browser: "Safari", os: "iOS" });
    expect(describeUserAgent(ua.android)).toEqual({ device: "mobile", browser: "Chrome", os: "Android" });
    expect(describeUserAgent(ua.ipadDesktopMode, true)).toEqual({ device: "tablet", browser: "Safari", os: "iOS" });
    expect(describeUserAgent(ua.ipadDesktopMode, false)).toEqual({ device: "desktop", browser: "Safari", os: "macOS" });
    expect(describeUserAgent(ua.edge)).toEqual({ device: "desktop", browser: "Edge", os: "Windows" });
    expect(describeUserAgent(ua.coccoc).browser).toBe("Cốc Cốc");
    expect(isBot("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")).toBe(true);
    expect(isBot(ua.android)).toBe(false);
  });

  test("incoming events are validated and stripped down", () => {
    const context = { userAgent: "Mozilla/5.0 (Windows NT 10.0) Chrome/129.0 Safari/537.36", country: "VN", host: "elynto.io", now: Date.parse("2026-10-04T18:30:00Z") };
    const event = toStatsEvent(
      { type: "pageview", visitor: "visitor-aaaa", visit: "visit-a1", path: "/vi?utm_source=x", referrer: "https://www.facebook.com/some/post", isNewVisitor: true },
      context,
    );
    // 18:30 UTC is already the next day in Vietnam.
    expect(event).toMatchObject({ day: "2026-10-05", path: "/vi", referrer: "facebook.com", country: "VN", device: "desktop", isNewVisitor: true });
    expect(toStatsEvent({ type: "pageview", visitor: "x", visit: "visit-a1", path: "/vi" }, context)).toBeNull();
    expect(toStatsEvent({ type: "cta", visitor: "visitor-aaaa", visit: "visit-a1", path: "/vi", cta: "other" }, context)).toBeNull();
    expect(toStatsEvent({ type: "pageview", visitor: "visitor-aaaa", visit: "visit-a1", path: "/vi", referrer: "https://elynto.io/en" }, context)?.referrer).toBeUndefined();
  });

  test("date ranges resolve from presets and custom dates", () => {
    const now = Date.parse("2026-10-04T05:00:00Z");
    expect(resolveRange({ range: "7d" }, now)).toMatchObject({ from: "2026-09-28", to: "2026-10-04", granularity: "day", previous: { from: "2026-09-21", to: "2026-09-27" } });
    expect(resolveRange({ range: "12m" }, now)).toMatchObject({ from: "2025-11-01", to: "2026-10-04", granularity: "month" });
    expect(resolveRange({ range: "custom", from: "2026-10-10", to: "2026-09-01", by: "year" }, now)).toMatchObject({ from: "2026-09-01", to: "2026-10-04", granularity: "year" });
  });
});

test.describe("stats: collection and dashboard", () => {
  test("page views and trial clicks are sent, and show up on the password-protected dashboard", async ({ page, isMobile }) => {
    // Playwright can't read sendBeacon bodies; without it the tracker falls back to fetch, which it can.
    await page.addInitScript(() => Object.defineProperty(navigator, "sendBeacon", { value: undefined }));
    const pageview = page.waitForRequest((r) => r.url().endsWith("/api/collect") && r.postDataJSON()?.type === "pageview");
    await page.goto("/vi");
    expect((await pageview).postDataJSON()).toMatchObject({ path: "/vi", lang: "vi" });

    await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));
    const click = page.waitForRequest((r) => r.url().endsWith("/api/collect") && r.postDataJSON()?.type === "cta");
    await page.locator('main a[data-track-location="hero"][data-track-cta="signup"]').click();
    expect((await click).postDataJSON()).toMatchObject({ cta: "signup", location: "hero" });

    await page.goto("/stats");
    await expect(page).toHaveURL(/\/stats\/login$/);
    await page.getByLabel("Mật khẩu").fill("wrong-password");
    await page.getByRole("button", { name: "Đăng nhập" }).click();
    await expect(page.locator("#password-error")).toHaveText("Mật khẩu chưa đúng.");

    await page.getByLabel("Mật khẩu").fill(PASSWORD);
    await page.getByRole("button", { name: "Đăng nhập" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Thống kê truy cập" })).toBeVisible();
    const visitors = page.locator('[data-kpi="visitors"] [data-kpi-value]');
    expect(Number((await visitors.textContent())?.replace(/\./g, ""))).toBeGreaterThan(0);
    await expect(page.getByRole("cell", { name: "Đầu trang (hero)" })).toBeVisible();
    await expect(page.getByText(isMobile ? "Điện thoại" : "Máy tính", { exact: true }).first()).toBeVisible();

    const csv = await page.request.get("/api/stats/export?range=7d");
    expect(csv.status()).toBe(200);
    expect(await csv.text()).toContain("Người truy cập");
  });

  test("the dashboard and its export are closed without signing in", async ({ request }) => {
    const res = await request.get("/stats", { maxRedirects: 0 });
    expect(res.status()).toBe(307);
    expect((await request.get("/api/stats/export")).status()).toBe(401);
    expect((await request.post("/api/collect", { data: { type: "pageview" } })).status()).toBe(400);
  });

  test("turning statistics off on the Cookies page stops collection", async ({ page }) => {
    const before: string[] = [];
    page.on("request", (r) => r.url().endsWith("/api/collect") && before.push(r.url()));
    await page.goto("/vi/cookies");
    await expect.poll(() => before.length).toBeGreaterThan(0);
    await page.getByRole("button", { name: "Không ghi nhận lượt truy cập của tôi" }).click();
    await expect(page.getByText("Đã tắt. Lượt truy cập từ trình duyệt này không được ghi nhận.")).toBeVisible();

    const sent: string[] = [];
    page.on("request", (r) => r.url().endsWith("/api/collect") && sent.push(r.url()));
    await page.goto("/vi");
    await page.waitForTimeout(1500);
    expect(sent).toEqual([]);
  });
});
