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
const layers = [
  "background",
  "towers",
  "cranes",
  "middle",
  "foreground",
  "veil",
];
const traceKey = "test-industrial-clouds-navigation";

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
  await expect(page.locator("html[data-cloud-ready]")).toHaveCount(1);
  await expect(page.locator(".atmosphere")).toBeHidden();
}

async function menuLink(page: Page, name: string): Promise<Locator> {
  const desktop = page
    .locator(".topnav")
    .getByRole("link", { name, exact: true });
  if (await desktop.isVisible()) return desktop;
  await page.getByRole("button", { name: "Меню", exact: true }).click();
  return page
    .getByRole("dialog", { name: "Меню" })
    .getByRole("link", { name, exact: true });
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
        document.documentElement.dataset.atmosphere,
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
      attributeFilter: ["data-atmosphere"],
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
  await expect(page.locator(".atmosphere")).toBeHidden();
  await expect(page.locator("main:focus, main h1:focus")).toHaveCount(1);
  expect(await page.evaluate(() => scrollY)).toBeLessThan(5);
}

for (const [width, height] of desktopAndMobile) {
  test(
    "atmospheric navigation and history at " + width + " × " + height,
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
      const scene = page.locator("[data-industrial-clouds]");
      expect(
        await scene
          .locator(":scope > [data-layer]")
          .evaluateAll((items) =>
            items.map((item) => item.getAttribute("data-layer")),
          ),
      ).toEqual(layers);
      await expect(page.locator(".atmosphere")).toHaveAttribute(
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
        "data-atmosphere",
        "leave",
      );
      await page.locator("footer").getByRole("link", {name:"О компании", exact:true})
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
      await page.goBack();
      await expect(page).toHaveURL(/\/ru\/about\/?$/);
      await expect(page.locator(".atmosphere")).toBeHidden();
      await page.goForward();
      await expect(page).toHaveURL(/\/ru\/contacts\/?$/);
      await expect(page.locator(".atmosphere")).toBeHidden();
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
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.goForward();
  await expect(page).toHaveURL(/\/ru\/projects\/rooppur\/?$/);
  await ready(page);
  const languages = page.locator("details.languages");
  await languages.locator("summary").click();
  await languages.getByRole("link", { name: "العربية", exact: true }).click();
  await arrived(page, /\/ar\/projects\/rooppur\/?$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("main h1")).toContainText(/[\u0600-\u06ff]/);
  expect(
    (await phases(page)).some((value) =>
      value.endsWith("/ar/projects/rooppur arrive"),
    ),
  ).toBe(true);
});

test("Escape cancels before departure and a subsequent navigation succeeds", async ({
  page,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await open(page, baseURL, "en/");
  await ready(page);
  const link = page.locator(".topnav").getByRole("link", { name: "Company", exact: true });
  await link.click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-atmosphere",
    "leave",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".atmosphere")).toBeHidden();
  // Allow the cancelled departure timer to expire to catch a late redirect.
  await page.waitForTimeout(1050);
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
  await page.locator(".topnav").getByRole("link", { name: "Company", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about\/?$/);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator(".atmosphere")).toBeHidden();
  expect(await phases(page)).toEqual([]);
});

for (const state of ["pending", "failed"] as const) {
  test(
    "ordinary links work when a required cloud texture is " + state,
    async ({ page, baseURL }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await observePhases(page);
      let finishRequest: () => void = () => {};
      const gate = new Promise<void>((resolve) => {
        finishRequest = resolve;
      });
      await page.route("**/transition/fog-front.webp", async (route) => {
        if (state === "pending") await gate;
        await route.abort("failed");
      });
      const isForeground = (request: Request) =>
        new URL(request.url()).pathname.endsWith("/transition/fog-front.webp");
      const request =
        state === "pending"
          ? page.waitForRequest(isForeground)
          : page.waitForEvent("requestfailed", isForeground);
      try {
        await open(page, baseURL, "en/");
        await request;
        await expect(page.locator("html[data-cloud-ready]")).toHaveCount(0);
        await page.locator(".topnav").getByRole("link", { name: "Company", exact: true }).click();
        await expect(page).toHaveURL(/\/en\/about\/?$/);
        await expect(page.locator("main h1")).toBeVisible();
        await expect(page.locator(".atmosphere")).toBeHidden();
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
  const link = page.locator(".topnav").getByRole("link", { name: "Company", exact: true });
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
  const link = page.locator(".topnav").getByRole("link", { name: "Company", exact: true });
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
    "data-atmosphere",
    "leave",
  );
  await navigation;
  await expect(page.locator(".atmosphere")).toBeHidden();
  await expect(page).toHaveURL(/\/en\/?$/);
  await page.unroute(destination);
  await link.click();
  await arrived(page, /\/en\/about\/?$/);
});
