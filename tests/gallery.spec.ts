import { expect, test, type Locator } from "@playwright/test";

const project = (base: string | undefined, lang: string) =>
  (base || "http://localhost:3000").replace(/\/$/, "") + "/" + lang + "/projects/rooppur/";

async function ready(strip: Locator) {
  await strip.scrollIntoViewIfNeeded();
  await expect(strip.locator('[data-slot="-1"] img')).toBeVisible();
  await strip.evaluate(async panel => {
    await Promise.all(Array.from(panel.querySelectorAll("img"), image => image.decode()));
  });
}

test("the photo archive loads on demand, advances only in view and pauses in the lightbox", async ({ page, baseURL }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(project(baseURL, "en"));
  const gallery = page.locator(".cinematic-gallery");
  const strip = gallery.locator(".cg-strip");
  const opener = gallery.locator(".cg-open");
  const count = gallery.locator(".cg-overview .cg-count");
  const first = await opener.getAttribute("href");
  await expect(strip.locator("img")).toHaveCount(1);
  await page.clock.fastForward(8500);
  await expect(opener).toHaveAttribute("href", first!);

  await ready(strip);
  await page.mouse.move(1, 1);
  await page.clock.fastForward(7200);
  await expect(count).toHaveText(/^02 \/ /);
  await gallery.getByRole("button", { name: "Pause slideshow" }).click();
  await page.mouse.move(1, 1);
  await page.clock.fastForward(8200);
  await expect(count).toHaveText(/^02 \/ /);
  await opener.click();
  const viewer = gallery.locator("dialog");
  await expect(viewer).toBeVisible();
  const caption = await viewer.locator(".viewer-bottom p").innerText();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.locator(".viewer-bottom p")).not.toHaveText(caption);
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(opener).toBeFocused();
  await gallery.getByRole("button", { name: "Resume slideshow" }).click();
  await opener.click();
  await page.clock.fastForward(8500);
  await expect(count).toHaveText(/^03 \/ /);
  await page.keyboard.press("Escape");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(strip).not.toBeInViewport();
  await page.clock.fastForward(9000);
  await expect(count).toHaveText(/^03 \/ /);
});

test.describe("touch photo archive", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  test("Arabic swipe and arrow keys follow the reading direction with reduced motion", async ({ page, baseURL }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(project(baseURL, "ar"));
    const gallery = page.locator(".cinematic-gallery");
    const strip = gallery.locator(".cg-strip");
    await ready(strip);
    await expect(gallery.locator(".cg-cycle")).toBeHidden();
    const box = await strip.boundingBox();
    const x = Math.round(box!.x + box!.width * .25);
    const y = Math.round(box!.y + box!.height * .5);
    const touch = await page.context().newCDPSession(page);
    await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (const distance of [15, 45, 85, 125]) {
      await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x + distance, y }] });
    }
    await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    const count = gallery.locator(".cg-overview .cg-count");
    await expect(count).toHaveText(/^02 \/ /);
    await expect(gallery.locator("dialog")).toBeHidden();
    await gallery.locator(".cg-open").focus();
    await page.keyboard.press("ArrowRight");
    await expect(count).toHaveText(/^01 \/ /);
    await page.keyboard.press("Enter");
    await expect(gallery.locator("dialog")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(gallery.locator("dialog .cg-count")).toHaveText(/^02 \/ /);
  });
});
