import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const site = new URL(process.env.PAGES_URL || "https://doumalunnyy.github.io/roin-world-monumental/");
const basePath = site.pathname.replace(/\/+$/, "");
if (!["http:", "https:"].includes(site.protocol) || site.search || site.hash) {
  throw new Error("PAGES_URL must be the site's complete public URL.");
}
const env = {
  ...process.env,
  DEPLOY_TARGET: "github-pages",
  NEXT_PUBLIC_BASE_PATH: basePath,
  SITE_URL: site.origin,
  CONTACT_ENABLED: "false",
  NEXT_TELEMETRY_DISABLED: "1",
};

function run(...args) {
  const child = spawnSync(process.execPath, args, { env, stdio: "inherit" });
  if (child.error) throw child.error;
  if (child.status !== 0) process.exit(child.status ?? 1);
}

run("scripts/cms-config.mjs");
run("scripts/check-content.mjs");
run(require.resolve("next/dist/bin/next"), "build", "--webpack");

for (const route of ["ru", "en", "ar", "ru/contacts", "ru/projects", "ar/projects"]) {
  if (!existsSync("out/" + route + "/index.html")) {
    throw new Error("Missing exported page: " + route);
  }
}
writeFileSync("out/index.html", `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ROIN WORLD</title><meta http-equiv="refresh" content="0;url=./ru/">
<link rel="canonical" href="./ru/"></head><body><a href="./ru/">ROIN WORLD</a></body></html>
`);
writeFileSync("out/.nojekyll", "");
console.log("Static site ready in out/ for " + site.href);
