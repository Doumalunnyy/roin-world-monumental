import AxeBuilder from "@axe-core/playwright";
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

test("hero and project carousels navigate independently and wrap", async ({
  page,
}) => {
  await open(page, "/ru");
  const hero = page.locator(".hero");
  const featured = page.locator(".featured");
  const archive = "https://roinworld.ae/media/";
  await expect(hero.locator(".frame-caption")).toHaveAttribute("href", archive);
  await hero.getByRole("button", { name: "Предыдущий" }).click();
  await expect(hero.locator(".frame-caption")).toHaveAttribute("href", "/ru/projects/paks-ii");
  await hero.getByRole("button", { name: "Следующий" }).click();
  await expect(hero.locator(".frame-caption")).toHaveAttribute("href", archive);
  await featured.getByRole("button", { name: "Следующий" }).click();
  await expect(featured.getByRole("heading")).toContainText("Эль-Дабаа");
  await expect(hero.locator(".frame-caption")).toHaveAttribute(
    "href",
    archive,
  );
  await featured.getByRole("link", { name: "Подробнее" }).click();
  await expect(page).toHaveURL(/\/ru\/projects\/el-dabaa\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Эль-Дабаа",
  );
});

test("project filters combine, communicate an empty result and reset", async ({
  page,
}) => {
  await open(page, "/ru/projects");
  const country = page.getByRole("combobox", { name: /Страна/ });
  const service = page.getByRole("combobox", { name: /Направление/ });
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(3);
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
  await expect(cards).toHaveCount(3);
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
  const menu = page.getByRole("button", { name: "Меню", exact: true });
  await menu.click();
  const panel = page.getByRole("dialog", { name: "Меню" });
  await expect(panel).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(menu).toBeFocused();
  await menu.click();
  await panel.getByRole("link", { name: "Проекты", exact: true }).click();
  await expect(page).toHaveURL(/\/ru\/projects\/?$/);
  await page.locator(".project-card").filter({ hasText: "Руппур" }).click();
  await expect(page).toHaveURL(/\/ru\/projects\/rooppur\/?$/);
  const language = page.locator("details.languages");
  await language.locator("summary").click();
  await language.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/projects\/rooppur\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Rooppur/i,
  );
  await language.locator("summary").click();
  await language.getByRole("link", { name: "العربية", exact: true }).click();
  await expect(page).toHaveURL(/\/ar\/projects\/rooppur\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("main")).toHaveCSS("direction", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /[\u0600-\u06ff]/,
  );
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
  const validate = form.getByRole("button", { name: /Проверить заполнение/ });
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
  await expect(form.getByRole("status")).toContainText("Поля заполнены.");
  await expect(form.getByRole("link", { name: "Открыть письмо в почтовой программе" })).toHaveAttribute("href", /^mailto:[^?]+\?subject=.+&body=.+/);
  expect(submissions).toEqual([]);
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(
    "home fits a " + width + "px viewport in every active locale",
    async ({ page }) => {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 960 });
      for (const lang of ["ru", "en", "ar"]) {
        await open(page, "/" + lang);
        const bounds = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: document.documentElement.scrollWidth,
        }));
        expect(
          bounds.content,
          lang + " at " + width + "px",
        ).toBeLessThanOrEqual(bounds.viewport + 1);
      }
    },
  );
}

test("long document and article titles fit compact phones", async ({ page }) => {
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const lang of ["ru", "en", "ar"]) {
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
