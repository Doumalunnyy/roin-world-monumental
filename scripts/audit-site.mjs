// Run against a static release served at its repository base path.
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const [address, output, mode = "full"] = process.argv.slice(2);
if (!address || !output) throw new Error("Usage: node scripts/audit-site.mjs <base-url> <evidence-directory> [baseline]");
const base = new URL(address.endsWith("/") ? address : address + "/");
const locales = require("../content/locales.json").active;
const widths = [[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080]];
const baseline = mode === "baseline";
const sitemapResponse = await fetch(new URL("sitemap.xml", base));
if (!sitemapResponse.ok) throw new Error("Cannot load the sitemap");
const sitemap = await sitemapResponse.text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => {
  const url = new URL(match[1]);
  if (!url.pathname.startsWith(base.pathname)) throw new Error("Unexpected sitemap base " + url.href);
  return url.pathname.slice(base.pathname.length);
});
if (!routes.length || routes.length !== new Set(routes).size) throw new Error("Empty sitemap or duplicate routes");
const jobs = routes.filter(route => !baseline || route.startsWith("ru/") || locales.includes(route.split("/").filter(Boolean).join("/")));
await mkdir(join(output, "screens"), { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE });
const problems = [];
const results = [];
const axe = require.resolve("axe-core/axe.min.js");

function measure() {
  const doc = document.documentElement;
  const overflow = Math.max(doc.scrollWidth, document.body.scrollWidth) - doc.clientWidth;
  const outside = overflow > 1 ? Array.from(document.querySelectorAll("main *,footer *")).filter(el => {
    const r = el.getBoundingClientRect();
    return r.width && (r.right > doc.clientWidth + 1 || r.left < -1);
  }).slice(0,12).map(el => [el.tagName, el.className?.baseVal ?? el.className, el.textContent.slice(0,45)]) : [];
  return { width: innerWidth, height: innerHeight, overflow, outside };
}

async function inspect(page, route) {
  const lang = route.split("/")[0];
  const row = { route, layouts: [], images: [], controls: [], issues: [] };
  const err = e => row.issues.push("JavaScript: " + e.message);
  page.on("pageerror", err);
  try {
    for (const orientation of ["desktop", "mobile"]) {
      const initial = orientation === "desktop" ? [1440,900] : [390,844];
      await page.setViewportSize({width:initial[0], height:initial[1]});
      const response = await page.goto(new URL(route, base).href, { waitUntil:"domcontentloaded" });
      if (response?.status() !== 200) throw new Error("HTTP " + response?.status());
      await page.locator("main h1").first().waitFor();
      // Map thumbnails are mounted during hydration. Include their real requests
      // in the decode check rather than sampling a partially mounted photo list.
      if (route.endsWith("/geography/")) await page.locator(".ae-thumbnail img").first().waitFor({ state:"attached" });
      if (await page.locator("main h1").count() !== 1) row.issues.push("Expected one main heading");
      await page.evaluate(async () => {
        document.querySelectorAll("img[loading=lazy]").forEach(image => { image.loading="eager"; });
        await Promise.all(Array.from(document.images, image => image.decode().catch(() => {})));
        await document.fonts.ready;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
      const reading = await page.evaluate(() => ({
        lang: document.documentElement.lang, dir: document.documentElement.dir,
        title: document.title, description: document.querySelector('meta[name="description"]')?.content,
        alternatives: Array.from(document.querySelectorAll("link[hreflang]"), el => [el.hreflang,el.href]),
        switcher: Array.from(document.querySelectorAll(".locale-list a[hreflang]"), el => [el.hreflang,el.pathname]),
        images: Array.from(document.images, img => ({ file: new URL(img.currentSrc || img.src).pathname,
          intrinsic:img.naturalWidth, display:Math.round(img.getBoundingClientRect().width), alt:img.getAttribute("alt") })),
        controls:Array.from(document.querySelectorAll("main button,main select,main input:not([type=hidden]), main summary, main form, main textarea"), el =>
          [el.tagName, el.getAttribute("name") || el.getAttribute("aria-label") || el.innerText?.trim().slice(0,90) || ""]),
      }));
      if (reading.lang !== lang || reading.dir !== (lang==="ar" ? "rtl":"ltr")) row.issues.push("Document direction or language");
      if (reading.images.some(im => !im.intrinsic || im.alt === null)) row.issues.push("Missing image or alt attribute");
      if (!reading.description || !reading.title) row.issues.push("Missing metadata");
      for (const code of locales) {
        const target = new URL(route.replace(/^[^/]+/,code), base).pathname;
        if (!reading.switcher.some(([l,u]) => l===code && u.replace(/\/$/,"")===target.replace(/\/$/,""))) row.issues.push("Language switch " + code);
        if (!reading.alternatives.some(([l,u]) => l===code && new URL(u).pathname===target)) row.issues.push("Alternate " + code);
      }
      if (orientation === "desktop") { row.controls=reading.controls; row.title=reading.title; row.description=reading.description; }
      row.images.push({ width:initial[0], items:reading.images });
      const key = route.replace(/\/$/,"").replaceAll("/","__");
      const name = key + "-" + initial[0];
      const shot = { fullPage:true, animations:"disabled", caret:"hide" };
      await page.screenshot({ ...shot, path:join(output,"screens",name+".jpg"), type:"jpeg", quality:81 });
      if (route === lang+"/") await page.screenshot({ ...shot, path:join(output,"screens",name+".png") });
      row.layouts.push(await page.evaluate(measure));
      if (!baseline) {
        const remaining = orientation==="desktop" ? [widths[3],widths[5]] : [widths[0],widths[2]];
        for (const [width,height] of remaining) {
          await page.setViewportSize({ width,height });
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          row.layouts.push(await page.evaluate(measure));
        }
        if (orientation==="desktop") {
          await page.addScriptTag({path:axe});
          row.a11y = await page.evaluate(async () => (await window.axe.run(document, {
            runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]},
          })).violations.map(v => ({ id:v.id, impact:v.impact, nodes:v.nodes.map(n=>({ target:n.target, summary:n.failureSummary })) })));
        }
      }
    }
    if (row.layouts.some(l=>l.overflow>1)) row.issues.push("Horizontal overflow");
    if (row.a11y?.length) row.issues.push("Automated accessibility findings");
  } catch(e) { row.issues.push(e.message); }
  finally { page.off("pageerror", err); }
  if (row.issues.length) problems.push([route,[...new Set(row.issues)]]);
  results.push(row);
  await writeFile(join(output, "progress-" + lang + "-" + route.replaceAll("/","_") + ".json"), JSON.stringify(row));
  if (results.length % 15===0) console.log("Checked",results.length,"/",jobs.length, "routes,",problems.length,"with findings");
}

let cursor = 0;
try {
  await Promise.all(Array.from({ length:3 }, async () => {
    const page = await browser.newPage({ reducedMotion:"reduce", deviceScaleFactor:1 });
    page.setDefaultTimeout(20000);
    while (cursor<jobs.length) await inspect(page,jobs[cursor++]);
    await page.close();
  }));
} finally { await browser.close(); }
results.sort((a,b)=>a.route.localeCompare(b.route));
await writeFile(join(output,"matrix.json"),JSON.stringify({routes:results.length, measurements:results.reduce((n,r)=>n+r.layouts.length,0), problems, results},null,2));
console.log("Finished",results.length,"routes.",JSON.stringify(problems));
if (problems.length) process.exitCode = 1;
