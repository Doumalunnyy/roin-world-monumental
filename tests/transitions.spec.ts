import sharp from "sharp";
import projectCatalogue from "../content/projects.json";
import {
  expect,
  test,
  type Locator,
  type Page,
  type Request,
} from "@playwright/test";

const desktopAndMobile = [
  [1920, 1080],
  [1440, 900],
  [1024, 768],
  [390, 844],
  [360, 800],
] as const;
const traceKey = "test-atomic-navigation";

async function open(page: Page, baseURL: string | undefined, route: string) {
  const base = new URL(baseURL || "http://localhost:3000");
  base.pathname = base.pathname.replace(/\/?$/, "/");
  const response = await page.goto(new URL(route, base).href, {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status()).toBe(200);
  await expect(page.locator("main h1")).toBeVisible();
}

async function ready(page: Page) {
  await expect(page.locator("html[data-transition-ready]")).toHaveCount(1);
  await expect(page.locator(".page-transition")).toBeHidden();
}

async function menuLink(page: Page, name: string): Promise<Locator> {
  const toggle = page.getByRole("button", { name: "Открыть меню", exact: true });
  if (await toggle.isVisible()) await toggle.click();
  const nav = page.locator(".corporate-nav");
  if (name === "Проекты") await nav.locator(".nav-branch").filter({has: page.getByRole("link", {name:"О компании",exact:true})}).locator("summary").click();
  return nav.getByRole("link", { name, exact: true });
}

// The browser changes documents at full coverage. A DOM observer keeps a record
// across that boundary, including a short opening animation on a cached page.
async function observePhases(page: Page) {
  await page.addInitScript((key: string) => {
    const observe = new MutationObserver((records) => {
      const changes = records.filter(
        (record) => record.target === document.documentElement,
      );
      if (!changes.length) return;
      const phases: string[] = JSON.parse(sessionStorage.getItem(key) || "[]");
      const path = location.pathname.replace(/\/$/, "");
      const values = [
        ...changes.map((record) => record.oldValue),
        document.documentElement.dataset.transition,
      ];
      for (const phase of values) {
        if (phase !== "leave" && phase !== "arrive") continue;
        const entry = path + " " + phase;
        if (phases.at(-1) !== entry) phases.push(entry);
      }
      sessionStorage.setItem(key, JSON.stringify(phases));
    });
    observe.observe(document, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-transition"],
      attributeOldValue: true,
    });
  }, traceKey);
}

function phases(page: Page): Promise<string[]> {
  return page.evaluate(
    (key) => JSON.parse(sessionStorage.getItem(key) || "[]"),
    traceKey,
  );
}

async function arrived(page: Page, target: RegExp) {
  await expect(page).toHaveURL(target);
  await expect(page.locator(".page-transition")).toBeHidden();
  await expect(page.locator("main:focus, main h1:focus")).toHaveCount(1);
  expect(await page.evaluate(() => scrollY)).toBeLessThan(5);
}

for (const [width, height] of desktopAndMobile) {
  test(
    "atomic navigation and history at " + width + " × " + height,
    async ({ page, baseURL }) => {
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await observePhases(page);
      await open(page, baseURL, "ru/");
      await ready(page);
      await expect(page.locator(".hero + section")).toHaveAttribute(
        "id",
        "geography",
      );
      const scene = page.locator(".page-transition");
      expect(await scene.locator(".atom-traces [data-edge]").evaluateAll((items) =>
        items.map((item) => item.getAttribute("data-edge")),
      )).toEqual(["west", "north", "east", "south"]);
      await expect(scene.locator(".atom-symbol image")).toHaveAttribute("href", /roin-world\.svg$/);
      await expect(scene.locator(".atom-name image")).toHaveAttribute("href", /roin-world\.svg$/);
      await expect(scene.locator(".plant-main path").first()).toBeAttached();
      await expect(page.locator(".page-transition")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      const cta = await menuLink(page, "О компании");
      await expect(cta).toBeInViewport({ ratio: 1 });
      const bounds = await cta.boundingBox();
      expect(bounds && bounds.y + bounds.height).toBeLessThanOrEqual(height);
      const historyLength = await page.evaluate(() => history.length);
      await cta.click();
      await expect(page.locator("html")).toHaveAttribute(
        "data-transition",
        "leave",
      );
      await page.locator("nav[data-menu-transition] a[href$='/about'], nav[data-menu-transition] a[href$='/about/']")
        .evaluate((el: HTMLAnchorElement) => el.click());
      await arrived(page, /\/ru\/about\/?$/);
      expect(await page.evaluate(() => history.length)).toBe(historyLength + 1);
      const recorded = await phases(page);
      expect(
        recorded.filter((value) => value.endsWith("/ru leave")),
      ).toHaveLength(1);
      expect(recorded.some((value) => value.endsWith("/ru/about arrive"))).toBe(
        true,
      );

      await ready(page);
      await (await menuLink(page, "Контакты")).click();
      await arrived(page, /\/ru\/contacts\/?$/);
      const beforeHistory = await phases(page);
      await page.goBack();
      await expect(page).toHaveURL(/\/ru\/about\/?$/);
      await expect(page.locator(".page-transition")).toBeHidden();
      await page.goForward();
      await expect(page).toHaveURL(/\/ru\/contacts\/?$/);
      await expect(page.locator(".page-transition")).toBeHidden();
      expect(await phases(page)).toEqual(beforeHistory);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      expect(errors).toEqual([]);
    },
  );
}

test("keyboard journey from home through contacts and the catalogue to a case, language and Back", async ({
  page,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await observePhases(page);
  await open(page, baseURL, "ru/");
  await ready(page);
  const contact = await menuLink(page, "Контакты");
  await contact.focus();
  await page.keyboard.press("Enter");
  await arrived(page, /\/ru\/contacts\/?$/);
  await ready(page);
  await (await menuLink(page, "Проекты")).click();
  await arrived(page, /\/ru\/projects\/?$/);
  await ready(page);
  await page.locator(".project-card").filter({ hasText: "Руппур" }).click();
  await arrived(page, /\/ru\/projects\/rooppur\/?$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/ru\/projects\/?$/);
  await expect(page.locator(".project-card")).toHaveCount(projectCatalogue.items.length);
  await page.goForward();
  await expect(page).toHaveURL(/\/ru\/projects\/rooppur\/?$/);
  await ready(page);
  const languages = page.locator("details.languages");
  await languages.locator("summary").click();
  await languages.getByRole("link", { name: "العربية", exact: true }).click();
  await expect(page).toHaveURL(/\/ar\/projects\/rooppur\/?$/);
  await expect(page.locator(".page-transition")).toBeHidden();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("main h1")).toContainText(/[\u0600-\u06ff]/);
  expect(
    (await phases(page)).some((value) =>
      value.endsWith("/ar/projects/rooppur arrive"),
    ),
  ).toBe(false);
});

test("content links, the footer and the brand use native navigation without an atom", async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await observePhases(page);
  await open(page, baseURL, "ru/");
  await ready(page);
  await page.locator("main .ae-heading a").click();
  await expect(page).toHaveURL(/\/ru\/geography\/?$/);
  await ready(page);
  await page.locator("footer").getByRole("link", { name: "О компании", exact: true }).click();
  await expect(page).toHaveURL(/\/ru\/about\/?$/);
  await ready(page);
  await page.locator(".mast .brand").click();
  await expect(page).toHaveURL(/\/ru\/?$/);
  expect(await phases(page)).toEqual([]);
});

test("Escape cancels before departure and a subsequent navigation succeeds", async ({
  page,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await open(page, baseURL, "en/");
  await ready(page);
  const link = page.locator(".topnav").getByRole("link", { name: "About us", exact: true });
  await link.click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-transition",
    "leave",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".page-transition")).toBeHidden();
  // Allow the cancelled departure timer to expire to catch a late redirect.
  await page.waitForTimeout(1350);
  await expect(page).toHaveURL(/\/en\/?$/);
  await link.click();
  await arrived(page, /\/en\/about\/?$/);
});

test("direct case URLs and reload start uncovered; anchors and modified clicks keep their native behaviour", async ({
  page,
  context,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await observePhases(page);
  await open(page, baseURL, "en/projects/rooppur/");
  await ready(page);
  await page.reload();
  await ready(page);
  expect(await phases(page)).toEqual([]);
  await open(page, baseURL, "ru/contacts/");
  await ready(page);
  await page.locator('main a[href="#enquiry"]').click();
  await expect(page).toHaveURL(/#enquiry$/);
  const link = page
    .locator("footer")
    .getByRole("link", { name: "Проекты", exact: true });
  const [tab] = await Promise.all([
    context.waitForEvent("page"),
    link.click({ modifiers: ["ControlOrMeta"] }),
  ]);
  await expect(tab).toHaveURL(/\/ru\/projects\/?$/);
  await expect(page).toHaveURL(/\/ru\/contacts\/?#enquiry$/);
  expect(await phases(page)).toEqual([]);
  await tab.close();
});

test("reduced motion uses ordinary links without a closing or opening overlay", async ({
  page,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await observePhases(page);
  await open(page, baseURL, "en/");
  await page.locator(".topnav").getByRole("link", { name: "About us", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about\/?$/);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator(".page-transition")).toBeHidden();
  expect(await phases(page)).toEqual([]);
});

for (const state of ["pending", "failed"] as const) {
  test(
    "ordinary links work when the official SVG is " + state,
    async ({ page, baseURL }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await observePhases(page);
      let finishRequest: () => void = () => {};
      const gate = new Promise<void>((resolve) => {
        finishRequest = resolve;
      });
      await page.route("**/brand/roin-world.svg", async (route) => {
        if (state === "pending") await gate;
        await route.abort("failed");
      });
      const isBrand = (request: Request) =>
        new URL(request.url()).pathname.endsWith("/brand/roin-world.svg");
      const request =
        state === "pending"
          ? page.waitForRequest(isBrand)
          : page.waitForEvent("requestfailed", isBrand);
      try {
        await open(page, baseURL, "en/");
        await request;
        await expect(page.locator("html[data-transition-ready]")).toHaveCount(0);
        await page.locator(".topnav").getByRole("link", { name: "About us", exact: true }).click();
        await expect(page).toHaveURL(/\/en\/about\/?$/);
        await expect(page.locator("main h1")).toBeVisible();
        await expect(page.locator(".page-transition")).toBeHidden();
        expect(await phases(page)).toEqual([]);
      } finally {
        finishRequest();
      }
    },
  );
}

test("a delayed document receives focus after the source page is released", async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await observePhases(page);
  await open(page, baseURL, "en/");
  await ready(page);
  const link = page.locator(".topnav").getByRole("link", { name: "About us", exact: true });
  const target = await link.evaluate((el: HTMLAnchorElement) => el.href);
  let heldNavigation = false;
  await page.route(target, async (route) => {
    if (route.request().isNavigationRequest()) {
      // Keep the real document request pending beyond the source watchdog.
      await new Promise((resolve) => setTimeout(resolve, 3200));
      heldNavigation = true;
    }
    await route.continue();
  });
  await link.evaluate((el: HTMLAnchorElement) => el.click());
  await arrived(page, /\/en\/about\/?$/);
  expect(heldNavigation).toBe(true);
  expect((await phases(page)).some((value) => value.endsWith("/en/about arrive"))).toBe(true);
});

test("a navigation cancelled by a 204 response leaves the current page usable", async ({
  page,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await open(page, baseURL, "en/");
  await ready(page);
  const link = page.locator(".topnav").getByRole("link", { name: "About us", exact: true });
  const destination = await link.evaluate(
    (element: HTMLAnchorElement) => element.href,
  );
  await page.route(destination, (route) => route.fulfill({ status: 204 }));
  const navigation = page.waitForResponse(
    (response) =>
      response.url() === destination &&
      response.request().isNavigationRequest() &&
      response.status() === 204,
  );
  await link.click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-transition",
    "leave",
  );
  await navigation;
  await expect(page.locator(".page-transition")).toBeHidden();
  await expect(page).toHaveURL(/\/en\/?$/);
  await page.unroute(destination);
  await link.click();
  await arrived(page, /\/en\/about\/?$/);
});

for (const width of [1440, 390]) {
  test("the four arriving strokes settle within the original sign at " + width, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await open(page, baseURL, "en/");
    await ready(page);
    const mobileMenu = page.getByRole("button", { name: "Open menu", exact: true });
    if (await mobileMenu.isVisible()) await mobileMenu.click();
    await page.clock.install();
    await page.clock.pauseAt(new Date(Date.now() + 1500));
    // Keep the departure pending while sampling the painted strokes in isolation.
    await page.locator(".topnav").getByRole("link", {name:"About us",exact:true}).evaluate((el: HTMLAnchorElement) => el.click());
    const scene = page.locator(".page-transition");
    const mark = await scene.locator(".atom-symbol").boundingBox();
    expect(mark).toBeTruthy();
    const animations = (time: number) => scene.evaluate((el, t) => {
      for (const animation of el.getAnimations({ subtree: true })) {
        animation.pause();
        animation.currentTime = t;
      }
    }, time);
    const ink = async (time: number) => {
      await animations(time);
      const image = await page.screenshot({ style: ".page-transition{opacity:1!important}.atom-lockup,.plant-elevation{visibility:hidden!important}" });
      const { data, info } = await sharp(image).removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
      let inside = 0;
      let outside = 0;
      for (let y = 0; y < info.height; y++) {
        for (let x = 0; x < info.width; x++) {
          if (data[y * info.width + x] <= 12) continue;
          if (x >= mark!.x - 1 && x <= mark!.x + mark!.width + 1 && y >= mark!.y - 1 && y <= mark!.y + mark!.height + 1) inside++;
          else outside++;
        }
      }
      return { inside, outside };
    };
    expect(await ink(100)).toEqual({ inside: 0, outside: 0 });
    expect((await ink(370)).outside).toBeGreaterThan(100);
    const assembled = await ink(836);
    expect(assembled.inside).toBeGreaterThan(220);
    expect(assembled.outside).toBe(0);
  });
}
