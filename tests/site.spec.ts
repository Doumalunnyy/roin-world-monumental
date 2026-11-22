import AxeBuilder from "@axe-core/playwright";
import { active as activeLanguages } from "../content/locales.json";
import { items as projectRecords } from "../content/projects.json";
import { test as base, expect, type Page } from "@playwright/test";

const test = base.extend<{ browserErrors: void }>({
  browserErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await use();
      expect(errors, "Browser errors during the user journey").toEqual([]);
    },
    { auto: true },
  ],
});

async function open(page: Page, path: string) {
  const response = await page.goto(path);
  expect(response?.status(), path).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}

test("archive hero and project selection are independent under reduced motion", async ({page}) => {
  await open(page, "/ru");
  const hero = page.locator('[data-sequence="hero"]');
  const featured = page.locator('[data-sequence="projects"]');
  await expect(hero.locator('a[href*="/about"]')).toHaveCount(0);
  await expect(hero.getByRole("link", {name:/фильм/i})).toBeVisible();
  await expect(hero).toHaveAttribute("data-active", "0");
  await expect(hero.locator(".hero-exposure").getByRole("link", {name:/фильм/i})).toBeVisible();
  await expect(hero.locator(".cinema-arrows")).toHaveCount(0);
  await expect(hero.getByRole("button", { name: "Кадр 1", pressed: true })).toBeVisible();
  await expect(featured.getByRole("button")).toHaveCount(2);
  await expect(hero).toHaveAttribute("data-running", "false");
  await featured.locator('[data-step="next"]').click();
  await expect(featured).toHaveAttribute("data-active", "1");
  await expect(hero).toHaveAttribute("data-active", "0");
  await featured.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(featured).toHaveAttribute("data-active", "0");
  await expect(featured.locator(".sequence-layer.current img")).toHaveAttribute("src", /project-bd\.webp$/);
  await page.keyboard.press("ArrowRight");
  await expect(featured).toHaveAttribute("data-active", "1");
  await featured.getByRole("link", {name:/Подробнее/}).click();
  await expect(page).toHaveURL(/\/ru\/projects\/el-dabaa\/?$/);
});
test("visible photo sequences and partner logos keep moving during interaction", async ({page}) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await open(page, "/ru");
  const hero = page.locator('[data-sequence="hero"]');
  const projects = page.locator('[data-sequence="projects"]');
  const heading = hero.locator("h1");
  const position = await heading.boundingBox();
  await expect(hero).toHaveAttribute("data-active", "1", {timeout:16000});
  expect(await heading.boundingBox()).toEqual(position);
  const picker = hero.locator(".hero-frame-picker button").first();
  await picker.focus();
  await picker.hover();
  await expect(hero).toHaveAttribute("data-running", "true");
  await projects.scrollIntoViewIfNeeded();
  await page.mouse.move(0,0);
  await expect(projects).toHaveAttribute("data-active","1",{timeout:16000});
  await expect(hero).toHaveAttribute("data-active","1");
  const strip = page.locator(".partner-strip");
  await strip.scrollIntoViewIfNeeded();
  await expect(strip).toHaveAttribute("data-running","true");
  await expect(strip.getByRole("button")).toHaveCount(0);
  const viewport = strip.locator(".evidence-window");
  await viewport.focus();
  await viewport.hover();
  await expect(strip).toHaveAttribute("data-running","true");
  const positionX = () => strip.locator(".partner-track").evaluate(el => el.getBoundingClientRect().x);
  const start = await positionX();
  await expect.poll(async () => Math.abs(await positionX() - start)).toBeGreaterThan(3);
  await expect(strip.locator("ul").first().getByRole("img")).toHaveCount(6);
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(strip.locator(".partner-track")).toHaveCSS("animation-name","none");
});

test("project filters combine, communicate an empty result and reset", async ({
  page,
}) => {
  await open(page, "/ru/projects");
  const country = page.getByRole("combobox", { name: /Страна/ });
  const service = page.getByRole("combobox", { name: /Направление/ });
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(projectRecords.length);
  await country.selectOption({ label: "Египет" });
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText("Эль-Дабаа");
  await service.selectOption({ label: "Строительство и инженерные работы" });
  await expect(cards).toHaveCount(1);
  await service.selectOption({ label: "Логистика и транспорт" });
  await expect(cards).toHaveCount(0);
  await expect(
    page.getByText("Для выбранных условий проектов нет."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Сбросить фильтры" }).click();
  await expect(country).toHaveValue("");
  await expect(service).toHaveValue("");
  await expect(cards).toHaveCount(projectRecords.length);
});

test("the certificate strip moves in RTL with focus and exposes the three originals", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await open(page, "/ar");
  const strip = page.locator(".certificate-strip");
  const viewport = strip.locator(".evidence-window");
  await viewport.scrollIntoViewIfNeeded();
  await expect(strip).toHaveAttribute("data-running", "true");
  await expect(strip.getByRole("button")).toHaveCount(0);
  await viewport.focus();
  const x = () => strip.locator(".certificate-track").evaluate(el => el.getBoundingClientRect().x);
  const start = await x();
  await expect.poll(async () => (await x()) - start).toBeGreaterThan(2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(strip.getByRole("button")).toHaveCount(0);
  await expect(strip.getByRole("listitem")).toHaveCount(3);
  for (const entry of await strip.getByRole("listitem").all()) {
    const file = await entry.locator("a[target=_blank]").getAttribute("href");
    expect(file).toBeTruthy();
    await expect(entry.locator("a[download]")).toHaveAttribute("href", file!);
  }
});

test("map pins and country list select the same project", async ({ page }) => {
  await open(page, "/ru/geography");
  const pins = page.locator(".map-canvas");
  const countries = page.locator(".geo-country-list");
  const selection = page.locator(".geo-selection");
  await pins.getByRole("button", { name: "Венгрия" }).click();
  await expect(
    countries.getByRole("button", { name: "Венгрия" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(selection.getByRole("link")).toHaveAttribute(
    "href",
    "/ru/projects/paks-ii",
  );
  await countries.getByRole("button", { name: "Египет" }).click();
  await expect(pins.getByRole("button", { name: "Египет" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(selection.getByRole("link")).toHaveAttribute(
    "href",
    "/ru/projects/el-dabaa",
  );
});

test("mobile menu restores focus and language changes preserve the project", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/ru");
  const menu = page.getByRole("button", { name: "Открыть меню", exact: true });
  await menu.click();
  const panel = page.getByRole("dialog", { name: "Меню" });
  await expect(panel).toBeVisible();
  await expect(page.locator("header .corporate-nav")).toHaveCount(1);
  await expect(panel.locator(".nav-parent")).toHaveText([
    "Главная", "О компании", "Медиа", "Новости", "Партнёры", "Команда", "Контакты", "Присоединиться к команде",
  ]);
  const close = panel.getByRole("button", { name: "Закрыть" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(panel.getByRole("link").last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(menu).toBeFocused();
  await menu.click();
  await panel.locator(".nav-disclosure summary").first().click();
  await panel.getByRole("link", { name: "Проекты", exact: true }).click();
  await expect(page).toHaveURL(/\/ru\/projects\/?$/);
  await page.locator(".project-card").filter({ hasText: "Руппур" }).click();
  await expect(page).toHaveURL(/\/ru\/projects\/rooppur\/?$/);
  await menu.click();
  await panel.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/projects\/rooppur\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Rooppur/i,
  );
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "العربية", exact: true }).click();
  await expect(page).toHaveURL(/\/ar\/projects\/rooppur\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("main")).toHaveCSS("direction", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /[\u0600-\u06ff]/,
  );
});

test("Spanish and Hungarian preserve the project and publish its language alternatives", async ({ page }) => {
  await open(page, "/es/projects/rooppur");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Central nuclear de Rooppur");
  for (const lang of activeLanguages) {
    await expect(page.locator('link[hreflang="' + lang + '"]')).toHaveAttribute(
      "href", new RegExp("/" + lang + "/projects/rooppur/?$"),
    );
  }
  const language = page.locator("details.languages");
  await language.locator("summary").click();
  await language.getByRole("link", { name: "Magyar", exact: true }).click();
  await expect(page).toHaveURL(/\/hu\/projects\/rooppur\/?$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ruppuri Atomerőmű");
});

test("social profiles are reachable from the header and footer with the mobile menu closed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/ru/projects");
  for (const landmark of ["header", "footer"]) {
    const links = page.locator(landmark).locator(".social-links");
    for (const [network, url] of [
      ["Instagram", "https://www.instagram.com/roinworld_sl/"],
      ["Facebook", "https://www.facebook.com/RoinWorldSL/"],
    ]) {
      const link = links.getByRole("link", { name: "ROIN WORLD · " + network });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", url);
      await expect(link).toHaveAttribute("target", "_blank");
    }
  }
});

test("film is requested on activation and released when the player closes", async ({
  page,
}) => {
  const embeds: string[] = [];
  await page.route("https://www.youtube-nocookie.com/**", async (route) => {
    embeds.push(route.request().url());
    await route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><title>Film fixture</title>",
    });
  });
  await open(page, "/ru");
  const trigger = page
    .locator(".hero")
    .getByRole("link", { name: "Смотреть корпоративный фильм" });
  await expect(trigger).toHaveAttribute(
    "href",
    "https://www.youtube.com/watch?v=4KEZoq2ubVE",
  );
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(embeds).toEqual([]);
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Корпоративный фильм/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie\.com\/embed\/4KEZoq2ubVE/,
  );
  await expect.poll(() => embeds.length).toBe(1);
  await dialog.getByRole("button", { name: "Закрыть" }).click();
  await expect(dialog).toBeHidden();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("closed contact intake validates locally without transferring personal data", async ({
  page,
}) => {
  const submissions: string[] = [];
  await page.route("**/api/contact", (route) => {
    submissions.push(route.request().method());
    return route.fulfill({
      status: 503,
      contentType: "application/json",
      body: '{"code":"closed"}',
    });
  });
  await open(page, "/ru/contacts");
  const form = page.getByRole("form", { name: "Написать в ROIN WORLD" });
  await expect(
    form.getByText(/Здесь можно подготовить письмо для офиса/),
  ).toBeVisible();
  const validate = form.getByRole("button", { name: /Подготовить письмо/ });
  await validate.click();
  await expect(form.getByRole("textbox", { name: "Ваше имя" })).toBeFocused();
  await expect(form.getByRole("status")).toBeEmpty();
  await form.getByRole("textbox", { name: "Ваше имя" }).fill("Проверка формы");
  await form
    .getByRole("textbox", { name: "Электронная почта" })
    .fill("qa@example.invalid");
  await form
    .getByRole("textbox", { name: "Сообщение" })
    .fill("Проверка локальной валидации.");
  await form.getByRole("checkbox").check();
  await validate.click();
  await expect(form.getByRole("status")).toContainText("Черновик готов.");
  await expect(form.getByRole("link", { name: "Открыть письмо в почтовой программе" })).toHaveAttribute("href", /^mailto:[^?]+\?subject=.+&body=.+/);
  expect(submissions).toEqual([]);
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(
    "home fits a " + width + "px viewport in every active locale",
    async ({ page }) => {
      const height = width < 600 ? 844 : 960;
      await page.setViewportSize({ width, height });
      for (const lang of activeLanguages) {
        await open(page, "/" + lang);
        const bounds = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: document.documentElement.scrollWidth,
        }));
        expect(
          bounds.content,
          lang + " at " + width + "px",
        ).toBeLessThanOrEqual(bounds.viewport + 1);
        const atlas = await page.locator("#geography").boundingBox();
        expect(atlas?.y).toBe(height);
      }
    },
  );
}

test("long document and article titles fit compact phones", async ({ page }) => {
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const lang of activeLanguages) {
      for (const route of ["privacy", "news/rooppur-fire-drill"]) {
        const path = "/" + lang + "/" + route;
        await open(page, path);
        const content = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(content, path + " at " + width + "px").toBeLessThanOrEqual(width + 1);
      }
    }
  }
});

for (const path of [
  "/ru",
  "/en",
  "/ar",
  "/es",
  "/hu",
  "/ru/projects",
  "/ru/projects/rooppur",
  "/ru/geography",
  "/ru/contacts",
  "/ru/news",
]) {
  test("no automated WCAG A/AA violations on " + path, async ({ page }) => {
    await open(page, path);
    const report = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const violations = report.violations.map((rule) => ({
      id: rule.id,
      impact: rule.impact,
      help: rule.help,
      nodes: rule.nodes.map((node) => ({
        target: node.target,
        reason: node.failureSummary,
      })),
    }));
    expect(violations, path).toEqual([]);
  });
}
