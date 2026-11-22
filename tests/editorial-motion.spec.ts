import { expect, test } from "@playwright/test";

test("section titles reveal once on scroll, retain their words and respect a changed motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("ru/", { waitUntil: "domcontentloaded" });
  const title = page.locator(".home-expertise h2");
  const words = await title.textContent();
  await expect(title).toHaveAttribute("data-editorial", "waiting");
  await title.scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute("data-editorial", "enter");
  await expect(title).toHaveCSS("animation-name", "editorial-title-in");
  await expect(title).toHaveCSS("opacity", "1");
  expect(await title.textContent()).toBe(words);
  await expect(title.locator("br")).toHaveCount(0);
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute("data-editorial", "enter");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("main h2[data-editorial]")).toHaveCount(0);
  await expect(title).toHaveCSS("opacity", "1");
});

test("geography continues from a keyboard selection under the pointer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("ru/geography/", { waitUntil: "domcontentloaded" });
  const atlas = page.locator(".atlas-engineering");
  const country = atlas.locator(".ae-register button").last();
  await country.hover();
  await expect(country.locator("img")).toBeAttached();
  await country.focus();
  await country.press("Enter");
  const pin = atlas.locator(".ae-pin[aria-pressed=true]");
  await expect(pin).toHaveAttribute("data-region", "russia");
  await expect(pin).toHaveAttribute("data-region", "bangladesh", { timeout: 15_000 });
  await expect(country).toBeFocused();
  await expect(atlas.locator(".ae-frame[data-active=true]")).toHaveAttribute("data-region", "bangladesh");
  await expect(atlas.locator(".ae-register button")).toHaveCount(5);
  await expect(atlas.locator(".ae-pin")).toHaveCount(5);
});
