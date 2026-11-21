import { expect, test } from "@playwright/test";

const sizes = [[1920, 1080], [1440, 900], [1024, 768], [390, 844], [360, 800]] as const;

for (const [width, height] of sizes) {
  test(`atmospheric navigation and history at ${width} × ${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto("/ru");
    await expect(page.locator(".hero + section")).toHaveAttribute("id", "geography");
    const cta = page.locator(".hero-actions a.action");
    await expect(cta).toBeVisible();
    const bounds = await cta.boundingBox();
    expect(bounds && bounds.y + bounds.height).toBeLessThanOrEqual(height);
    await cta.click();
    await expect(page.locator("html")).toHaveAttribute("data-atmosphere", "leave");
    await cta.evaluate((el: HTMLAnchorElement) => el.click());
    await expect(page).toHaveURL(/\/ru\/about\/?$/);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".atmosphere")).toBeHidden();
    expect(await page.evaluate(() => scrollY)).toBeLessThan(5);
    if (width <= 1024) {
      await page.getByRole("button", { name: "Меню", exact: true }).click();
      await page.getByRole("dialog", { name: "Меню" }).getByRole("link", { name: "Контакты", exact: true }).click();
    } else {
      await page.locator(".topnav").getByRole("link", { name: "Контакты", exact: true }).click();
    }
    await expect(page).toHaveURL(/\/ru\/contacts\/?$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/ru\/about\/?$/);
    await expect(page.locator(".atmosphere")).toBeHidden();
    await page.goForward();
    await expect(page).toHaveURL(/\/ru\/contacts\/?$/);
    await expect(page.locator(".atmosphere")).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    expect(errors).toEqual([]);
  });
}

test("Escape cancels before departure and reduced motion follows an ordinary link", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const link = page.locator(".hero-actions a.action");
  await link.click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".atmosphere")).toBeHidden();
  await expect(page).toHaveURL(/\/en\/?$/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await link.click();
  await expect(page).toHaveURL(/\/en\/about\/?$/);
  await expect(page.locator("html")).not.toHaveAttribute("data-atmosphere", /.+/);
});
