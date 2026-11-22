import fs from "node:fs";
import path from "node:path";
const read = (name) =>
  JSON.parse(fs.readFileSync("content/" + name + ".json", "utf8"));
const locales = read("locales");
const errors = [];
const requiredLocales = ["ru", "en", "ar", "es", "hu"];
for (const lang of requiredLocales) {
  if (!locales.active.includes(lang)) errors.push("Missing active locale: " + lang);
}
for (const lang of locales.active) {
  const locale = locales.locales[lang];
  if (!locale?.name || !["ltr", "rtl"].includes(locale.dir) || locale.review === "planned")
    errors.push("Incomplete locale settings: " + lang);
}
function check(value, at) {
  if (!value || typeof value !== "object") return;
  if (locales.active.some((lang) => typeof value[lang] === "string"))
    for (const l of locales.active)
      if (typeof value[l] !== "string" || !value[l].trim())
        errors.push(at + " missing " + l);
  for (const [key, v] of Object.entries(value)) {
    if (
      typeof v === "string" &&
      v.startsWith("/images/") &&
      !fs.existsSync(path.join("public", v))
    )
      errors.push(at + "." + key + " missing " + v);
    check(v, at + "." + key);
  }
}
for (const file of fs
  .readdirSync("content")
  .filter((n) => n.endsWith(".json"))) {
  const obj = read(file.slice(0, -5));
  check(obj, file);
}
for (const name of ["showcase-ui", "contact-ui"]) {
  const dictionary = read(name);
  for (const lang of locales.active) {
    for (const key of Object.keys(dictionary.ru)) {
      if (!dictionary[lang]?.[key]?.trim()) errors.push(name + "." + lang + " missing " + key);
    }
  }
}
for (const list of [
  read("services").items,
  read("projects").items,
  read("news").items,
  read("company").people,
  read("records").vacancies,
]) {
  const slugs = new Set();
  for (const item of list) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || slugs.has(item.slug))
      errors.push("Invalid or duplicate slug: " + item.slug);
    slugs.add(item.slug);
  }
}
for (const p of read("projects").items) {
  for (const s of p.services)
    if (!read("services").items.some((x) => x.slug === s))
      errors.push(p.slug + " unknown service " + s);
  for (const s of p.stories)
    if (!read("company").people.some((x) => x.slug === s.person))
      errors.push(p.slug + " unknown person " + s.person);
}
for (const person of read("company").people) {
  if (
    person.interviewSlug &&
    !read("news").items.some((article) => article.slug === person.interviewSlug)
  )
    errors.push("Unknown interview: " + person.interviewSlug);
}
const frames = read("home").heroFrames;
if (frames && (!Array.isArray(frames) || frames.length < 4 || frames.length > 6))
  errors.push("The homepage requires 4–6 archive frames");
for (const frame of frames || []) {
  const hasSource = frame.source ? /^https:\/\//.test(frame.source) : Boolean(frame.sourceNote?.trim());
  if (!frame.image || !frame.mobile || !frame.alt || !hasSource)
    errors.push("A homepage frame is missing its image, mobile crop, description or source");
}
const coverProject = read("home").heroProject;
if (coverProject && !read("projects").items.some((p) => p.slug === coverProject))
  errors.push("Unknown homepage cover project");
if (errors.length) throw Error(errors.join("\n"));
console.log(
  "Content, published locales, media and internal references validated.",
);
