import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, root), "utf8"));
const [locales, ui, companyUi, captions, landingUi, atlasUi, showcaseUi, contactUi] = await Promise.all([
  readJson("content/locales.json"),
  readJson("content/ui.json"),
  readJson("content/company-ui.json"),
  readJson("content/captions.json"),
  readJson("content/landing-ui.json"),
  readJson("content/atlas-ui.json"),
  readJson("content/showcase-ui.json"),
  readJson("content/contact-ui.json"),
]);
const repository = process.env.CMS_REPOSITORY?.trim();
const oauthBase = process.env.CMS_OAUTH_BASE_URL?.trim();
if (Boolean(repository) !== Boolean(oauthBase)) {
  throw new Error(
    "Для редактора задайте CMS_REPOSITORY и CMS_OAUTH_BASE_URL вместе.",
  );
}
if (repository && !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repository)) {
  throw new Error("CMS_REPOSITORY должен иметь вид владелец/репозиторий.");
}
if (oauthBase && new URL(oauthBase).protocol !== "https:") {
  throw new Error("CMS_OAUTH_BASE_URL должен использовать HTTPS.");
}

const settings = {
  languages: locales.active.map((code) => ({
    code,
    label: locales.locales[code].name,
  })),
  interfaceKeys: Object.keys(ui),
  companyInterfaceKeys: Object.keys(companyUi),
  captionPaths: Object.keys(captions),
  landingKeys: Object.keys(landingUi),
  atlasKeys: Object.keys(atlasUi).filter((key) => key !== "projectNotes"),
  atlasProjects: Object.keys(atlasUi.projectNotes),
  showcaseKeys: Object.keys(showcaseUi.ru),
  contactKeys: Object.keys(contactUi.ru),
  backend: repository
    ? {
        name: "github",
        repo: repository,
        branch: process.env.CMS_BRANCH?.trim() || "main",
        base_url: oauthBase,
        auth_endpoint: process.env.CMS_AUTH_ENDPOINT?.trim() || "auth",
      }
    : null,
};
await writeFile(
  new URL("public/admin/settings.json", root),
  JSON.stringify(settings, null, 2) + "\n",
);
