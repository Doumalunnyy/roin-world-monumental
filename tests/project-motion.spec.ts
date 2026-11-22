import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test("catalogue photograph expands into its matching project hero at " + width, async ({ page, baseURL }) => {
    const lang = width === 390 ? "ar" : "en";
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript(() => {
      window.addEventListener("pagereveal", event => {
        event.viewTransition?.ready.then(() => {
          const frames: number[] = [];
          const sample = () => {
            const root = document.documentElement;
            if (!root.dataset.projectMorph) return;
            const box = getComputedStyle(root, "::view-transition-group(project-cover)");
            frames.push(parseFloat(box.width));
            sessionStorage.setItem("test-shared-cover", JSON.stringify(frames));
            requestAnimationFrame(sample);
          };
          sample();
        }).catch(() => {});
      });
      const watch = new MutationObserver(mutations => {
        if (mutations.some(m => m.oldValue || document.documentElement.hasAttribute(m.attributeName!))) {
          sessionStorage.setItem("test-conflicting-effect", "yes");
        }
      });
      watch.observe(document, { subtree:true, attributes:true, attributeOldValue:true, attributeFilter:["data-transition"] });
    });
    await page.goto(new URL(lang + "/projects/", (baseURL || "http://localhost:3000").replace(/\/?$/, "/")).href);
    const card = page.locator('a[data-project-cover][href*="/projects/rooppur"]');
    await card.scrollIntoViewIfNeeded();
    await card.locator("img").evaluate((img: HTMLImageElement) => img.decode());
    const source = await card.getAttribute("data-project-cover");
    const original = await card.locator(".project-image").boundingBox();
    await card.click();
    const frame = page.locator("[data-case-cover]");
    await expect(frame).toHaveAttribute("data-case-cover", source!);
    await expect(page.locator("main h1")).toBeFocused();
    await expect.poll(() => page.evaluate(() => new Set(JSON.parse(sessionStorage.getItem("test-shared-cover") || "[]")).size)).toBeGreaterThan(2);
    await expect(page.locator("html[data-project-morph]")).toHaveCount(0);
    expect((await frame.boundingBox())!.width).toBeGreaterThan(original!.width);
    expect(await page.evaluate(() => sessionStorage.getItem("test-conflicting-effect"))).toBe(null);
    await page.goBack();
    await expect(card).toBeVisible();
    await page.goForward();
    await expect(frame).toBeVisible();
    await expect(page.locator("html[data-project-morph]")).toHaveCount(0);
  });
}

test("reduced motion and blocked storage preserve the native catalogue journey", async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion:"reduce" });
  await page.addInitScript(() => { Object.defineProperty(window, "sessionStorage", { get: () => { throw new Error("Storage disabled"); } }); });
  await page.goto(new URL("en/projects/", (baseURL || "http://localhost:3000").replace(/\/?$/, "/")).href);
  await page.locator('a[data-project-cover][href*="/projects/paks-ii"]').click();
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("[data-case-cover] img")).toBeVisible();
  await expect(page.locator("html[data-project-morph], html[data-transition]")).toHaveCount(0);
});
