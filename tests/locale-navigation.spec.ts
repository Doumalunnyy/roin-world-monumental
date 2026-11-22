import { expect, test } from "@playwright/test";

for (const lang of ["ru", "en", "ar", "es", "hu"]) {
  test("a missing " + lang + " URL returns a localized way home", async ({page, baseURL}) => {
    const url = new URL(lang + "/qa-nonexistent/", (baseURL || "http://localhost:3000").replace(/\/?$/, "/"));
    const response = await page.goto(url.href);
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("main h1:visible")).toHaveCount(1);
    const home = page.locator("[data-missing-language='" + lang + "'] .missing-home");
    await expect(home).toBeVisible();
    await home.click();
    await expect(page.locator("main .hero")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
  });
}

test("switching language carries catalogue filters and the section anchor", async ({page,baseURL}) => {
  const url = new URL("ru/projects/?country=egypt#catalogue", (baseURL || "http://localhost:3000").replace(/\/?$/, "/"));
  await page.goto(url.href);
  const country = page.locator(".catalogue-controls select").first();
  const option = await country.locator("option").nth(1).getAttribute("value");
  await country.selectOption(option!);
  await page.locator("footer [hreflang=ar]").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(country).toHaveValue(option!);
  expect(new URL(page.url()).hash).toBe("#catalogue");
});
