import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test("the landing elevation develops into the first photograph at " + width, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(new URL("ru/", (baseURL || "http://localhost:3000").replace(/\/?$/, "/")).href,
      { waitUntil: "domcontentloaded" });
    const draft = page.locator(".hero-draft");
    await expect(draft).toHaveAttribute("data-phase", "drawing");
    const registration = await page.locator(".hero-exposure").evaluate(hero => {
      const photo = hero.querySelector("picture.current img") as HTMLImageElement;
      const ink = hero.querySelector(".hero-draft-crop svg")!.getBoundingClientRect();
      const frame = photo.getBoundingClientRect();
      const [px, py] = getComputedStyle(photo).objectPosition.split(" ").map(n => parseFloat(n) / 100);
      const zoom = Math.max(frame.width / photo.naturalWidth, frame.height / photo.naturalHeight);
      const crop = 1672 - photo.naturalWidth;
      const left = frame.left + (frame.width - photo.naturalWidth * zoom) * px - crop * zoom;
      const top = frame.top + (frame.height - photo.naturalHeight * zoom) * py;
      return Math.max(Math.abs(ink.left - left), Math.abs(ink.top - top), Math.abs(ink.width - 1672 * zoom));
    });
    expect(registration).toBeLessThan(1);
    await expect(draft).toBeHidden();
    await expect(page.locator(".hero")).toHaveAttribute("data-active", "0");
    const frames = page.locator(".hero-frame-picker").getByRole("button");
    await frames.nth(1).click();
    await expect(page.locator(".hero")).toHaveAttribute("data-active", "1");
    await frames.first().click();
    await expect(page.locator(".hero")).toHaveAttribute("data-active", "0");
    await expect(draft).toHaveCount(0);
  });
}

test("reduced motion opens straight onto the home photograph", async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(new URL("en/", (baseURL || "http://localhost:3000").replace(/\/?$/, "/")).href);
  await expect(page.locator(".hero-draft")).toBeHidden();
  await expect(page.locator(".hero picture.current img")).toBeVisible();
});

test("a slow mobile drawing still plays when its artwork arrives", async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/illustrations/hero-elevation.svg*", async route => { await gate; await route.continue(); });
  await page.goto(new URL("ru/", (baseURL || "http://localhost:3000").replace(/\/?$/, "/")).href, { waitUntil: "domcontentloaded" });
  const drawing = page.locator(".hero-draft");
  await expect(drawing).toHaveAttribute("data-phase", "waiting");
  // Exceed both the former cancellation deadline and the normal first-slide hold.
  await page.waitForTimeout(8500);
  await expect(page.locator(".hero")).toHaveAttribute("data-active", "0");
  release();
  await expect(drawing).toHaveAttribute("data-phase", "drawing");
  await expect(drawing).toHaveAttribute("data-phase", "complete");
});
