import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { siteConfig } from "../src/config/site";

const SIGNUP_URL = siteConfig.signupUrl;
const HERO_VISION = "The interface between you and work";

const copy = {
  vi: {
    eyebrow: "Elynto - Quản lý công việc bằng AI",
    cta: "Dùng thử miễn phí",
    demoCta: "Xem Elynto hoạt động",
    pause: "Tạm dừng",
    play: "Phát tiếp",
    faq: "Tôi có thể dùng Elynto một mình không?",
    faqAnswer: "Bạn có thể dùng Elynto để quản lý việc cá nhân",
    secondTab: "Lịch",
    secondTabContent: "Tháng 10",
    title: "Elynto - Quản lý công việc bằng AI",
    voicesTitle: "Những lúc công việc bắt đầu rối",
    voicesNote: "không phải lời của một khách hàng cụ thể",
  },
  en: {
    eyebrow: "Elynto - AI-powered work management",
    cta: "Start free trial",
    demoCta: "See it in action",
    pause: "Pause",
    play: "Resume",
    faq: "Can I use Elynto on my own?",
    faqAnswer: "You can use Elynto to manage your own tasks",
    secondTab: "Calendar",
    secondTabContent: "October",
    title: "Elynto - AI-powered work management",
    voicesTitle: "The moments when work starts to slip",
    voicesNote: "not quotes from specific customers",
  },
} as const;

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

/** Brings every scroll-reveal element in and waits for entrances to settle, so checks see the whole page. */
async function revealAll(page: Page) {
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-revealed", "")));
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running" || a.effect?.getComputedTiming().iterations === Infinity),
  );
}

test.describe("language routing", () => {
  test("root uses browser language when country is unavailable", async ({ request }) => {
    const en = await request.get("/", { headers: { "accept-language": "en-US,en;q=0.9" }, maxRedirects: 0 });
    expect(en.status()).toBe(307);
    expect(en.headers().location).toMatch(/\/en$/);

    const vi = await request.get("/", { headers: { "accept-language": "vi-VN,vi;q=0.9,en;q=0.5" }, maxRedirects: 0 });
    expect(vi.headers().location).toMatch(/\/vi$/);
  });

  test("country determines the initial language before browser preferences", async ({ request }) => {
    for (const [country, browser, locale] of [["VN", "en-US", "vi"], ["US", "vi-VN", "en"], ["JP", "vi-VN", "en"]]) {
      const response = await request.get("/", {
        headers: { "x-vercel-ip-country": country, "accept-language": browser }, maxRedirects: 0,
      });
      expect(response.status()).toBe(307);
      expect(response.headers().location).toMatch(new RegExp(`/${locale}$`));
      expect(response.headers()["cache-control"]).toBe("private, no-store");
    }
  });

  test("a remembered choice wins over the browser language", async ({ request }) => {
    const res = await request.get("/", {
      headers: { "x-vercel-ip-country": "US", "accept-language": "en-US", cookie: "elynto-lang=vi" },
      maxRedirects: 0,
    });
    expect(res.headers().location).toMatch(/\/vi$/);
  });

  test("unknown pages return a localized 404", async ({ page }) => {
    const res = await page.goto("/en/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});

for (const lang of ["vi", "en"] as const) {
  const t = copy[lang];

  test.describe(`/${lang}`, () => {
    test("communicates what Elynto is and how to start", async ({ page }) => {
      const errors = collectErrors(page);
      await page.goto(`/${lang}`);

      await expect(page).toHaveTitle(t.title);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);

      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toContainText(t.eyebrow);
      await expect(h1).toContainText(HERO_VISION);

      const heroCta = page.locator('main a[data-track-location="hero"][data-track-cta="signup"]');
      await expect(heroCta).toBeVisible();
      await expect(heroCta).toHaveAttribute("href", SIGNUP_URL);
      await expect(heroCta).toContainText(t.cta);

      // Every trial CTA points at the real sign-up entry point.
      for (const href of await page.locator('a[data-track-cta="signup"]').evaluateAll((els) => els.map((el) => el.getAttribute("href")))) {
        expect(href).toBe(SIGNUP_URL);
      }


      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    test("metadata and social image are localized", async ({ page, request }) => {
      await page.goto(`/${lang}`);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", lang === "vi" ? "vi_VN" : "en_US");
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
      const image = await request.get(new URL(ogImage!).pathname);
      expect(image.status()).toBe(200);
      expect(image.headers()["content-type"]).toBe("image/png");
    });

    test("demo controls and 'see it in action' work", async ({ page }) => {
      await page.goto(`/${lang}`);
      await page.locator('a[data-track-location="hero"][data-track-cta="see_demo"]').click();
      await expect(page.locator("#demo")).toBeInViewport();

      const demo = page.locator("#demo");
      await demo.getByRole("tab", { name: lang === "vi" ? "Việc của tôi" : "My Work", exact: true }).click();
      await expect(demo.getByRole("tabpanel")).toContainText(lang === "vi" ? "Người giao" : "Assigned by");
      await demo.getByRole("tab", { name: lang === "vi" ? "Việc của tôi" : "My Work", exact: true }).press("ArrowRight");
      await expect(demo.getByRole("tab", { name: lang === "vi" ? "Việc đã giao" : "Delegated", exact: true })).toBeFocused();
      await expect(demo.getByRole("tabpanel")).toContainText(lang === "vi" ? "Giao cho" : "Assigned to");
      await expect(demo.getByRole("tabpanel")).toContainText(lang === "vi" ? "Chờ duyệt" : "Approval");
    });

    test("sending creates a sample task, shows loading, and replay clears it", async ({ page }) => {
      await page.clock.install();
      await page.goto(`/${lang}`);
      await page.locator('a[data-track-location="hero"][data-track-cta="see_demo"]').click();
      const demo = page.locator("#demo");
      const send = lang === "vi" ? "Gửi" : "Send";
      await demo.getByRole("button", { name: send, exact: true }).click();
      await expect(demo.locator("[data-demo-loading]")).toBeVisible();
      await page.clock.runFor(2_100);
      await expect(demo.locator("[data-work-card]")).toBeVisible();
      await expect(demo.locator("[data-created-work]")).toHaveCount(0);
      await demo.getByRole("button", { name: lang === "vi" ? "Xem trong Việc của tôi" : "View in My Work", exact: true }).click();
      await expect(demo.locator("[data-created-work]")).toHaveCount(1);
      await expect(demo.locator("[data-created-work]")).toContainText(lang === "vi" ? "Làm báo giá" : "Prepare the quotation");
      await demo.getByRole("button", { name: lang === "vi" ? "Xem lại từ đầu" : "Replay from the start", exact: true }).click();
      await expect(demo.locator("[data-created-work]")).toHaveCount(0);
    });

    test("scrolling starts the demo, shows the work card, then the work list", async ({ page }) => {
      await page.clock.install();
      await page.goto(`/${lang}`);
      const demo = page.locator("#demo");
      await demo.getByRole("tabpanel").scrollIntoViewIfNeeded();
      await expect(demo).toHaveAttribute("data-demo-running", "true");
      await page.clock.runFor(6_500);
      await expect(demo.locator("[data-work-card]")).toBeVisible();
      await expect(demo.locator("[data-created-work]")).toHaveCount(0);
      await page.clock.runFor(5_000);
      await expect(demo.locator("[data-created-work]")).toHaveCount(1);
      await expect(demo.getByRole("tabpanel")).toContainText(lang === "vi" ? "Người giao" : "Assigned by");
    });

    test("product preview language follows the page locale", async ({ page }) => {
      await page.goto(`/${lang}`);
      const demo = page.locator("#demo");
      await expect(demo).toContainText(lang === "vi" ? "Hỏi Elynto" : "Ask Elynto");
      if (lang === "vi") {
        await expect(demo).not.toContainText("Upcoming");
        await expect(page.locator("#feature-planning")).not.toContainText("Generate plan");
        await expect(page.locator("#feature-views")).not.toContainText("Project health");
      }
    });

    test("FAQ expands", async ({ page }) => {
      await page.goto(`/${lang}`);
      await page.getByText(t.faq).click();
      await expect(page.getByText(t.faqAnswer)).toBeVisible();
    });

    test("view tabs switch with mouse and keyboard", async ({ page }) => {
      await page.goto(`/${lang}`);
      const project = page.locator("#feature-views");
      const second = project.getByRole("tab", { name: t.secondTab });
      await second.click();
      await expect(second).toHaveAttribute("aria-selected", "true");
      await expect(project.getByRole("tabpanel")).toContainText(t.secondTabContent);

      await second.press("ArrowRight");
      const third = project.getByRole("tab").nth(2);
      await expect(third).toHaveAttribute("aria-selected", "true");
      await expect(third).toBeFocused();
    });

    test("CTA clicks are pushed to the dataLayer", async ({ page }) => {
      await page.goto(`/${lang}`);
      // Keep the page from leaving so the event can be inspected.
      await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));
      await page.locator('main a[data-track-location="hero"][data-track-cta="signup"]').click();
      const events = await page.evaluate(() => window.dataLayer ?? []);
      expect(events).toContainEqual(expect.objectContaining({ event: "cta_click", cta: "signup", location: "hero" }));
    });

    test("product experience never links to private work", async ({ page }) => {
      await page.goto(`/${lang}`);
      await expect(page.locator('a[href*="beta.elynto.io/work/"], a[href*="beta.elynto.io/projects/"]')).toHaveCount(0);
      await expect(page.locator("body")).not.toContainText("Phong Du");
      await expect(page.locator("body")).not.toContainText("ALEX INC");
    });

    test("situations move automatically on entering view without a play button", async ({ page }) => {
      await page.goto(`/${lang}`);
      const section = page.locator("#voices");
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByRole("heading", { level: 2 })).toHaveText(t.voicesTitle);
      await expect(section).toContainText(t.voicesNote);
      await expect(section.getByRole("listitem")).toHaveCount(9);
      await expect(section.getByRole("button")).toHaveCount(0);
      await expect(section.locator("[data-wall-running]")).toHaveAttribute("data-wall-running", "true");
      const visibleTrack = section.locator("[data-testimonial-track]:visible").first();
      await expect(visibleTrack).toHaveCSS("animation-play-state", "running");
      await expect(visibleTrack).toHaveCSS("animation-iteration-count", "infinite");
    });

    test("visible copy and metadata use short hyphens", async ({ page }) => {
      await page.goto(`/${lang}`);
      expect(await page.title()).not.toMatch(/[\u2013\u2014]/);
      const visibleCopy = await page.locator("body").innerText();
      expect(visibleCopy).not.toMatch(/[\u2013\u2014]/);
      expect(visibleCopy).not.toMatch(/\b(beta|demo|sample|illustrative|illustration)\b|dữ liệu mẫu|bản mẫu|minh họa|minh hoạ/i);
    });

    test("has no serious accessibility violations", async ({ page }) => {
      await page.goto(`/${lang}`);
      await revealAll(page);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  });
}

test("footer language selector keeps the choice and is absent from the header", async ({ page }) => {
  await page.goto("/vi");
  await expect(page.locator("header").getByRole("combobox")).toHaveCount(0);
  const selector = page.locator("footer").getByRole("combobox", { name: "Ngôn ngữ" });
  await expect(selector).toHaveValue("vi");
  await selector.selectOption("en");
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("mobile menu opens and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/vi");
  const toggle = page.getByRole("button", { name: "Mở menu" });
  await toggle.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(page.getByRole("button", { name: "Mở menu" })).toBeFocused();
});

test("hero subject cycles between 'you' and 'your team'", async ({ page }) => {
  await page.clock.install();
  await page.goto("/en");
  const line = page.locator("[data-swap-line]");
  await expect(line).toBeVisible();
  await expect(line.locator("[data-current-word]")).toHaveText("you");
  await page.clock.runFor(3_000);
  await expect(line.locator("[data-current-word]")).toHaveText("your team");
});

test("content slides in as it scrolls into view", async ({ page }) => {
  await page.goto("/vi");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "live");
  const heading = page.locator('[data-reveal]:has(> #faq-title)');
  await expect(heading).toHaveCSS("opacity", "0");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-revealed", "");
  await expect(heading).toHaveCSS("opacity", "1");
});

test("requested typing, automatic cards and gentle reveals work with reduced-motion preferences", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.clock.install();
  await page.goto("/vi");
  const demo = page.locator("#demo");
  await demo.getByRole("tabpanel").scrollIntoViewIfNeeded();
  await expect(demo).toHaveAttribute("data-demo-running", "true");
  await page.clock.runFor(900);
  const partial = await demo.locator("[data-demo-typed]").innerText();
  expect(partial).toMatch(/^Giao/);
  expect(partial).not.toContain("hoàn thành trước thứ sáu");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "live");
  const wall = page.locator("#voices");
  await wall.scrollIntoViewIfNeeded();
  await expect(wall.locator("[data-wall-running]")).toHaveAttribute("data-wall-running", "true");
  await expect(wall.getByRole("button")).toHaveCount(0);
  await expect(wall.locator("[data-testimonial-track]:visible").first()).toHaveCSS("animation-iteration-count", "infinite");
  await context.close();
});

test.describe("footer and subpages", () => {
  test("footer links every subpage, in both languages", async ({ page, request }) => {
    await page.goto("/vi");
    const footer = page.locator("footer");
    for (const heading of ["Sản phẩm", "Tài nguyên", "Công ty", "Pháp lý"]) {
      await expect(footer.getByRole("heading", { name: heading })).toBeVisible();
    }
    const hrefs = await footer.locator("nav a").evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
    expect(hrefs).toHaveLength(12);
    for (const href of hrefs) {
      for (const path of [href, href.replace(/^\/vi\//, "/en/")]) {
        const res = await request.get(path);
        expect(res.status(), path).toBe(200);
      }
    }
    expect((await request.get("/vi/features/unknown")).status()).toBe(404);

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/en/features/ai-planning");
  });

  test("a subpage has its own metadata and keeps its path when switching language", async ({ page }) => {
    await page.goto("/vi/privacy");
    await expect(page).toHaveTitle("Quyền riêng tư - Elynto");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/vi\/privacy$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Quyền riêng tư trên website Elynto");
    await expect(page.locator("footer").getByRole("link", { name: "Quyền riêng tư" }).first()).toHaveAttribute("aria-current", "page");

    await page.locator("footer").getByRole("combobox").selectOption("en");
    await expect(page).toHaveURL(/\/en\/privacy$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("the cookies page clears the saved language", async ({ page, context }) => {
    await page.goto("/vi");
    await page.locator("footer").getByRole("combobox").selectOption("en");
    await expect(page).toHaveURL(/\/en$/);
    expect((await context.cookies()).some((c) => c.name === "elynto-lang")).toBe(true);

    await page.goto("/en/cookies");
    await page.getByRole("button", { name: "Clear my saved language" }).click();
    await expect(page.getByText("Done. The website no longer stores your language choice.")).toBeVisible();
    expect((await context.cookies()).some((c) => c.name === "elynto-lang")).toBe(false);
  });

  for (const path of ["/vi/features/project-views", "/en/getting-started", "/vi/cookies"]) {
    test(`${path} has no serious accessibility violations`, async ({ page }) => {
      await page.goto(path);
      await revealAll(page);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }
});
