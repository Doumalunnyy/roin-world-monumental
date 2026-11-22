import { expect, test, type Page } from "@playwright/test";

declare global {
  interface Window {
    atlasDecode: {
      waiting: string[];
      release: Record<string, () => void>;
    };
  }
}

async function holdDecode(page: Page, regions: string[]) {
  await page.addInitScript((heldRegions: string[]) => {
    const control: Window["atlasDecode"] = { waiting: [], release: {} };
    window.atlasDecode = control;
    const held = new Map(heldRegions.map(region => [region, new Promise<void>(resolve => {
      control.release[region] = resolve;
    })]));
    const decode = HTMLImageElement.prototype.decode;
    HTMLImageElement.prototype.decode = async function () {
      await decode.call(this);
      const region = this.closest<HTMLElement>(".ae-frame")?.dataset.region;
      if (region && held.has(region)) {
        control.waiting.push(region);
        await held.get(region);
      }
    };
  }, regions);
}

async function expectCountry(page: Page, region: string) {
  await expect(page.locator(".ae-frame[data-active='true']")).toHaveAttribute("data-region", region);
  await expect(page.locator(".ae-pin[aria-pressed='true']")).toHaveAttribute("data-region", region);
  await expect(page.locator(".ae-entry[data-current='true'] .ae-more")).toHaveAttribute("href", new RegExp("country=" + region));
}

const pin = (page: Page, region: string) => page.locator('.ae-pin[data-region="' + region + '"]');

async function openAtlas(page: Page) {
  await page.goto("ru/geography/", { waitUntil: "domcontentloaded" });
  await page.locator(".atlas-engineering").scrollIntoViewIfNeeded();
  await expect(page.locator(".ae-thumbnail img").first()).toBeAttached();
}

test("only the active archive photo is mounted before the home atlas is visible", async ({ page }) => {
  await page.goto("ru/", { waitUntil: "domcontentloaded" });
  await expectCountry(page, "egypt");
  await expect(page.locator(".ae-frame img")).toHaveCount(1);
  await expect(page.locator(".ae-thumbnail img")).toHaveCount(0);
});

test("newest manual choice wins after decoding, including a return to the current country", async ({ page }) => {
  await holdDecode(page, ["hungary", "bangladesh"]);
  await openAtlas(page);
  await pin(page, "hungary").click();
  await expect.poll(() => page.evaluate(() => window.atlasDecode.waiting)).toContain("hungary");
  await expectCountry(page, "egypt");
  await pin(page, "egypt").click();
  await page.evaluate(() => window.atlasDecode.release.hungary());
  await expectCountry(page, "egypt");
  await pin(page, "bangladesh").click();
  await expect.poll(() => page.evaluate(() => window.atlasDecode.waiting)).toContain("bangladesh");
  await pin(page, "hungary").click();
  await expectCountry(page, "hungary");
  await page.evaluate(() => window.atlasDecode.release.bangladesh());
  await expectCountry(page, "hungary");
  await pin(page, "bangladesh").click();
  await expectCountry(page, "bangladesh");
  await expect(page.locator(".ae-pause")).toHaveCount(0);
});

test("a failed manual photo preserves the project link and retries on selection", async ({ page }) => {
  let fail = true;
  await page.route(url => decodeURIComponent(url.href).includes("project-hu.webp"), async route => {
    if (fail) return route.abort("failed");
    return route.continue();
  });
  await openAtlas(page);
  await pin(page, "hungary").click();
  await expectCountry(page, "hungary");
  await expect(page.locator(".ae-frame[data-active='true'] .media-missing")).toBeVisible();
  await expect(page.locator(".geo-selection a")).toHaveAttribute("href", /projects\/paks-ii\/?$/);
  fail = false;
  await pin(page, "hungary").click();
  await expect.poll(() => page.locator(".ae-frame[data-active='true'] img")
    .evaluateAll(elements => elements.some(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
});

test("autorotation waits for the next decoded frame, and a pause cancels a pending switch", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await holdDecode(page, ["hungary", "bangladesh"]);
  await openAtlas(page);
  await page.mouse.move(1, 1);
  await expect.poll(() => page.evaluate(() => window.atlasDecode.waiting), { timeout: 15_000 }).toContain("hungary");
  await page.waitForTimeout(7100);
  await expectCountry(page, "egypt");
  await page.evaluate(() => window.atlasDecode.release.hungary());
  await expectCountry(page, "hungary");
  await expect.poll(() => page.evaluate(() => window.atlasDecode.waiting), { timeout: 15_000 }).toContain("bangladesh");
  await page.waitForTimeout(7100);
  const pause = page.locator(".ae-pause");
  await pause.focus();
  await pause.press("Enter");
  await page.evaluate(() => window.atlasDecode.release.bangladesh());
  await expectCountry(page, "hungary");
});
