import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL ?? "https://beta.elynto.io";
const VISION = "The interface between you and your work";

const copy = {
  vi: {
    eyebrow: "Elynto — Quản lý công việc bằng AI",
    cta: "Dùng thử miễn phí",
    demoCta: "Xem Elynto hoạt động",
    illustration: "Minh họa",
    pause: "Tạm dừng minh họa",
    play: "Phát minh họa",
    faq: "Tôi có thể dùng Elynto một mình không?",
    faqAnswer: "Bạn có thể dùng Elynto để quản lý việc cá nhân",
    secondTab: "Lịch",
    secondTabContent: "Tháng 10",
    title: "Elynto — Quản lý công việc bằng AI",
    voicesTitle: "Những lúc công việc bắt đầu rối",
    voicesNote: "không phải lời của một khách hàng cụ thể",
    voicesPause: "Tạm dừng chuyển động",
    voicesPlay: "Tiếp tục chuyển động",
  },
  en: {
    eyebrow: "Elynto — AI-powered work management",
    cta: "Start free trial",
    demoCta: "See it in action",
    illustration: "Illustrative demo",
    pause: "Pause demo",
    play: "Play demo",
    faq: "Can I use Elynto on my own?",
    faqAnswer: "You can use Elynto to manage your own tasks",
    secondTab: "Calendar",
    secondTabContent: "October",
    title: "Elynto — AI-powered work management",
    voicesTitle: "The moments when work starts to slip",
    voicesNote: "not quotes from specific customers",
    voicesPause: "Pause motion",
    voicesPlay: "Resume motion",
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
  test("root redirects using Accept-Language", async ({ request }) => {
    const en = await request.get("/", { headers: { "accept-language": "en-US,en;q=0.9" }, maxRedirects: 0 });
    expect(en.status()).toBe(307);
    expect(en.headers().location).toMatch(/\/en$/);

    const vi = await request.get("/", { headers: { "accept-language": "vi-VN,vi;q=0.9,en;q=0.5" }, maxRedirects: 0 });
    expect(vi.headers().location).toMatch(/\/vi$/);
  });

  test("a remembered choice wins over the browser language", async ({ request }) => {
    const res = await request.get("/", {
      headers: { "accept-language": "en-US", cookie: "elynto-lang=vi" },
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
      await expect(h1).toContainText(VISION);

      const heroCta = page.locator('main a[data-track-location="hero"][data-track-cta="signup"]');
      await expect(heroCta).toBeVisible();
      await expect(heroCta).toHaveAttribute("href", SIGNUP_URL);
      await expect(heroCta).toContainText(t.cta);

      // Every trial CTA points at the real sign-up entry point.
      for (const href of await page.locator('a[data-track-cta="signup"]').evaluateAll((els) => els.map((el) => el.getAttribute("href")))) {
        expect(href).toBe(SIGNUP_URL);
      }

      await expect(page.locator("#demo")).toContainText(t.illustration);

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
      await page.getByRole("link", { name: t.demoCta }).click();
      await expect(page.locator("#demo")).toBeInViewport();

      const pause = page.getByRole("button", { name: t.pause });
      await pause.click();
      await expect(page.getByRole("button", { name: t.play })).toBeVisible();
    });

    test("FAQ expands", async ({ page }) => {
      await page.goto(`/${lang}`);
      await page.getByText(t.faq).click();
      await expect(page.getByText(t.faqAnswer)).toBeVisible();
    });

    test("view tabs switch with mouse and keyboard", async ({ page }) => {
      await page.goto(`/${lang}`);
      const second = page.getByRole("tab", { name: t.secondTab });
      await second.click();
      await expect(second).toHaveAttribute("aria-selected", "true");
      await expect(page.getByRole("tabpanel")).toContainText(t.secondTabContent);

      await second.press("ArrowRight");
      const third = page.getByRole("tab").nth(2);
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

    test("situations wall is labelled honestly and its motion can be paused", async ({ page }) => {
      await page.goto(`/${lang}`);
      const section = page.locator("#voices");
      await expect(section.getByRole("heading", { level: 2 })).toHaveText(t.voicesTitle);
      await expect(section).toContainText(t.voicesNote);
      // Nine situations for assistive tech; the copy that closes the loop is hidden from it.
      await expect(section.getByRole("listitem")).toHaveCount(9);

      await section.getByRole("button", { name: t.voicesPause }).click();
      await expect(section.getByRole("button", { name: t.voicesPlay })).toBeVisible();
      const playState = await section
        .locator('[role="region"] ul:not([aria-hidden])')
        .first()
        .evaluate((list) => getComputedStyle(list.parentElement!).animationPlayState);
      expect(playState).toBe("paused");
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

test("switching language keeps the choice", async ({ page, isMobile }) => {
  await page.goto("/vi");
  if (isMobile) {
    await page.getByRole("button", { name: "Mở menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: "English" }).click();
  } else {
    await page.locator("header").getByRole("link", { name: "English" }).click();
  }
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

test("content slides in as it scrolls into view", async ({ page }) => {
  await page.goto("/vi");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "live");
  const heading = page.locator("#faq-title");
  await expect(heading).toHaveCSS("opacity", "0");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-revealed", "");
  await expect(heading).toHaveCSS("opacity", "1");
});

test("respects reduced motion: demo starts paused, nothing waits to slide in", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/vi");
  await expect(page.getByRole("button", { name: "Phát minh họa" })).toBeVisible();
  await expect(page.locator("#demo")).toContainText("Đã tạo công việc");

  await expect(page.locator("html")).not.toHaveAttribute("data-motion");
  await expect(page.locator("#faq-title")).toHaveCSS("opacity", "1");
  // The situations wall stands still, so it needs no pause control.
  await expect(page.locator("#voices").getByRole("button", { name: "Tạm dừng chuyển động" })).toBeHidden();
  await context.close();
});
