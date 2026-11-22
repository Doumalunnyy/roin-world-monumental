import { expect, test, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import news from "../content/news.json";
import records from "../content/records.json";
import company from "../content/company.json";
import projects from "../content/projects.json";

const languages = ["ru", "en", "ar", "es", "hu"] as const;
function open(page: Page, base: string | undefined, path: string) {
  return page.goto(new URL(path, (base || "http://localhost:3000").replace(/\/?$/, "/")).href);
}
const digest = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

for (const lang of languages) {
  test(`news, recruitment and project directories serve matching records in ${lang}`, async ({ page, baseURL }) => {
    await open(page, baseURL, lang + "/news/");
    const directory = page.locator(".cp-index");
    const category = directory.getByRole("combobox").first();
    for (const value of new Set(news.items.map(n => n.category.en))) {
      await category.selectOption(value);
      const matching = news.items.filter(n => n.category.en === value);
      await expect(directory.locator("h3 a")).toHaveText(matching.map(n => n.title[lang]));
    }
    const selected = await category.inputValue();
    await directory.locator("h3 a").first().click();
    await expect(page.locator("main h1")).toBeVisible();
    await page.goBack();
    await expect(category).toHaveValue(selected);
    await page.reload();
    await expect(category).toHaveValue(selected);
    await directory.locator(".cp-filter-toolbar button").click();
    await expect(directory.locator("h3 a")).toHaveCount(news.items.length);

    await open(page, baseURL, lang + "/careers/");
    const jobs = page.locator('[data-directory="jobs"]');
    const department = jobs.getByRole("combobox").first();
    for (const value of new Set(records.vacancies.map(v => v.department.en))) {
      await department.selectOption(value);
      await expect(jobs.locator("h3 a")).toHaveText(records.vacancies.filter(v => v.department.en === value).map(v => v.title[lang]));
    }
    await jobs.getByRole("button").click();
    await expect(jobs.locator("h3 a")).toHaveCount(records.vacancies.length);
    for (const vacancy of records.vacancies) {
      await open(page, baseURL, lang + "/careers/" + vacancy.slug + "/");
      const mail = new URL((await page.locator(".cp-application a").first().getAttribute("href"))!);
      expect(mail.protocol).toBe("mailto:");
      expect(mail.pathname).toBe("info@roinworld.com");
      expect(mail.searchParams.get("subject")).toBe(vacancy.title[lang]);
    }

    await open(page, baseURL, lang + "/geography/");
    const atlas = page.locator(".atlas-engineering");
    for (const project of projects.items) {
      await atlas.locator(".ae-register button").filter({ hasText: project.country[lang] }).click();
      const entry = atlas.locator(".ae-entry[data-current=true]");
      await expect(entry.locator(".ae-more")).toHaveAttribute("href", new RegExp("country=" + project.region + "#catalogue$"));
      await expect(entry.locator(`a[href*="/projects/${project.slug}"]`)).toBeVisible();
    }
    await atlas.locator(".ae-entry[data-current=true] .ae-more").click();
    await expect(page.locator("a[data-project-cover]")).toHaveCount(1);
  });

  test(`document previews and downloads open the same original scans in ${lang}`, async ({ page, baseURL }) => {
    await open(page, baseURL, lang + "/certificates/");
    for (const doc of records.certificates) {
      const folio = page.locator("#" + doc.slug);
      await expect(folio.locator("time")).toHaveText([
        new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: "UTC" }).format(new Date(doc.issued)),
        new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: "UTC" }).format(new Date(doc.expires)),
      ]);
      const popup = page.waitForEvent("popup");
      await folio.locator("a.cp-scan").click();
      const opened = await popup;
      await expect(opened.locator("img")).toBeVisible();
      expect(new URL(opened.url()).pathname.endsWith(doc.file)).toBe(true);
      await opened.close();
      const pending = page.waitForEvent("download");
      await folio.locator("a[download]").click();
      const downloaded = await pending;
      expect(downloaded.suggestedFilename()).toBe(doc.file.split("/").pop());
      const path = await downloaded.path();
      const original = await readFile(resolve("public", "." + doc.file));
      expect(digest(await readFile(path!))).toBe(digest(original));
    }
  });

  test(`office maps and mail drafts follow the current language in ${lang}`, async ({ page, baseURL }) => {
    const submissions: string[] = [];
    await page.route("**/api/contact", route => {
      submissions.push(route.request().method());
      return route.fulfill({ status: 503, body: "" });
    });
    await page.route("https://www.google.com/maps/embed**", route => route.fulfill({ contentType: "text/html", body: "<title>Map fixture</title>" }));
    await open(page, baseURL, lang + "/contacts/");
    const offices = page.locator(".office-entry");
    await expect(offices).toHaveCount(company.offices.length);
    await expect(page.locator(".office-map iframe")).toHaveCount(0);
    for (const [i, office] of company.offices.entries()) {
      const entry = offices.nth(i);
      if (!await entry.evaluate(e => (e as HTMLDetailsElement).open)) await entry.locator("summary").click();
      await expect(entry.locator("address a[href^=mailto]")).toHaveAttribute("href", "mailto:" + office.email);
      if (!office.mapEmbed) continue;
      const toggle = entry.locator(".office-map button");
      await toggle.click();
      const frame = entry.locator("iframe");
      await expect(frame).toBeVisible();
      expect(new URL((await frame.getAttribute("src"))!).searchParams.get("hl")).toBe(lang);
      await toggle.click();
      await expect(frame).toHaveCount(0);
    }
    const form = page.locator("form.contact-form");
    await form.locator("button[type=submit]").click();
    await expect(form.locator("[name=name]")).toBeFocused();
    await form.locator("[name=name]").fill("QA Test");
    await form.locator("[name=email]").fill("qa@example.invalid");
    await form.locator("[name=message]").fill("Offline local draft fixture");
    await form.locator("[name=consent]").check();
    await form.locator("button[type=submit]").click();
    const draft = form.locator("a.contact-draft");
    await expect(draft).toBeFocused();
    const mail = new URL((await draft.getAttribute("href"))!);
    expect(mail.protocol).toBe("mailto:");
    expect(mail.searchParams.get("body")).toContain("Offline local draft fixture");
    expect(submissions).toEqual([]);
  });
}

test("failed hydration leaves contact data on the page in both form locations", async ({ page, baseURL }) => {
  await page.route("**/_next/static/**/*.js*", route => route.abort());
  for (const path of ["ru/contacts/", "ru/"]) {
    await open(page, baseURL, path);
    const form = page.locator("form.contact-form");
    await expect(form.locator("button[type=submit]")).toBeDisabled();
    await expect(form.locator(".contact-form__notice a[href^=mailto]").first()).toBeVisible();
  }
});
