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

test("the compact geography control resumes rotation while it still holds keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("ru/geography/", { waitUntil: "domcontentloaded" });
  const atlas = page.locator(".atlas-engineering");
  const control = atlas.locator(".ae-pause");
  await control.scrollIntoViewIfNeeded();
  await control.focus();
  await control.press("Enter");
  await expect(control).toHaveAccessibleName("Продолжить показ стран");
  const pin = atlas.locator(".ae-pin[aria-pressed=true]");
  const country = await pin.getAttribute("data-region");
  await control.press("Enter");
  await expect(control).toBeFocused();
  await expect(pin).not.toHaveAttribute("data-region", country!, { timeout: 15000 });
  await expect(atlas.locator(".ae-frame[data-active=true]")).toHaveAttribute("data-region", (await pin.getAttribute("data-region"))!);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(control).toHaveCount(0);
});
