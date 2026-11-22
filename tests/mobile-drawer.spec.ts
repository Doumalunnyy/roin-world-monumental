import { expect, test } from "@playwright/test";

test("the mobile drawer reverses a closing transition and scrolls on a short screen", async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto((baseURL || "http://localhost:3000").replace(/\/$/, "") + "/en/");
  const toggle = page.locator(".corporate-toggle");
  const sheet = page.locator("#corporate-navigation");
  await toggle.click();
  await sheet.evaluate(el => Promise.allSettled(el.getAnimations().map(effect => effect.finished)));
  await sheet.locator(".locale-list a").last().scrollIntoViewIfNeeded();
  await expect(sheet.locator(".locale-list a").last()).toBeInViewport();
  const intermediateOpacity = await toggle.evaluate(button => {
    if (!(button instanceof HTMLButtonElement)) throw new Error("Expected a menu toggle button");
    // Let React commit the close, then sample its actual CSS timing during the fade.
    button.click();
    return new Promise<number | null>(resolve => requestAnimationFrame(() => {
      const panel = document.getElementById("corporate-navigation")!;
      const fade = panel.getAnimations().find(effect => (effect as CSSTransition).transitionProperty === "opacity");
      if (!fade) return resolve(null);
      fade.pause();
      const timing = fade.effect!.getTiming();
      fade.currentTime = Number(timing.duration) / 2;
      const opacity = Number(getComputedStyle(panel).opacity);
      fade.play();
      button.click();
      resolve(opacity);
    }));
  });
  expect(intermediateOpacity).toBeGreaterThan(0);
  expect(intermediateOpacity).toBeLessThan(1);
  await expect(sheet).toHaveCSS("opacity", "1");
  await expect(sheet).toHaveJSProperty("inert", false);
  await expect(sheet.locator(".corporate-languages")).toHaveAttribute("open", "");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(sheet).toBeHidden();
  expect(await sheet.evaluate(el => el.getAnimations().length)).toBe(0);
});
