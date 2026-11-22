import site from "@/content/home.json";
import servicesFile from "@/content/services.json";
import projectsFile from "@/content/projects.json";
import companyFile from "@/content/company.json";
import newsFile from "@/content/news.json";
import recordsFile from "@/content/records.json";
import ui from "@/content/ui.json";
import languages from "@/content/locales.json";
import { localeUrl } from "./urls";

export type Lang = keyof typeof ui.home;
export type Local = Record<Lang, string>;
export type Key = keyof typeof ui;
export const locales = languages.active as Lang[];
export const languageInfo = languages.locales;
export const isLang = (s: string): s is Lang => locales.some((l) => l === s);
export const txt = (lang: Lang, key: Key) => ui[key][lang];
export const href = (lang: Lang, path = "") => localeUrl(lang, path);
export const origin = (process.env.SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);
export const home = site;
export const services = servicesFile.items;
export type Service = (typeof services)[number];
export type Person = {
  slug: string;
  group: "leadership" | "team";
  name: Local;
  role: Local;
  bio: Local;
  photo?: string;
  interviewSlug?: string;
  experience?: Local;
  achievements?: Local;
  source: string;
};
export type Project = {
  slug: string;
  region: string;
  country: Local;
  title: Local;
  summary: Local;
  sector: Local;
  services: string[];
  image: string;
  featuredImage?: string;
  role: Local;
  source: string;
  context?: Local;
  contextSource?: string;
  gallery: { image: string; caption: Local }[];
  videos: { url: string; title: Local; poster?: string; external?: boolean }[];
  stages: { title: Local; body: Local }[];
  stories: { person: string }[];
};
export const company = {
  ...companyFile,
  people: companyFile.people as Person[],
  partners: companyFile.partners as {
    name: string; detail: Local; source: string; project?: string; logo?: string;
  }[],
};
export const projects: Project[] = projectsFile.items;
export const news = newsFile.items as {
  slug: string;
  title: Local;
  body: Local;
  date: string;
  image: string;
  video?: string;
  category?: Local;
  project?: string;
  source: string;
}[];
export const certificates = recordsFile.certificates as {
  slug: string;
  title: string;
  file: string;
  summary: Local;
  preview?: string;
  issued?: string;
  expires?: string;
  source?: string;
  holder?: string;
  issuer?: string;
}[];
export const vacancies = recordsFile.vacancies as {
  slug: string;
  title: Local;
  location: Local;
  body: Local;
  department?: Local;
  requirements?: Local;
  responsibilities?: Local;
  source?: string;
}[];
export const primary = [
  "about",
  "services",
  "projects",
  "team",
  "careers",
  "contacts",
] as const;
export const secondary = [
  "history",
  "leadership",
  "geography",
  "partners",
  "certificates",
  "news",
] as const;
export const sections = [...primary, ...secondary, "privacy"] as const;
export function paths(): string[] {
  return [
    "",
    ...sections,
    ...services.map((s) => "services/" + s.slug),
    ...projects.map((p) => "projects/" + p.slug),
    ...news.map((n) => "news/" + n.slug),
    ...company.people.map((p) => "team/" + p.slug),
    ...vacancies.map((v) => "careers/" + v.slug),
  ];
}
export function pageTitle(lang: Lang, path: string): string | undefined {
  if (!path) return txt(lang, "home");
  if (sections.some((s) => s === path)) return txt(lang, path as Key);
  const [section, slug, ...rest] = path.split("/");
  if (!slug || rest.length) return undefined;
  switch (section) {
    case "projects":
      return projects.find((x) => x.slug === slug)?.title[lang];
    case "services":
      return services.find((x) => x.slug === slug)?.title[lang];
    case "news":
      return news.find((x) => x.slug === slug)?.title[lang];
    case "team":
      return company.people.find((x) => x.slug === slug)?.name[lang];
    case "careers":
      return vacancies.find((x) => x.slug === slug)?.title[lang];
  }
}
export const introKey: Partial<Record<Key, Key>> = {
  services: "servicesIntro",
  projects: "projectsIntro",
  history: "historyIntro",
  team: "teamText",
  leadership: "leadIntro",
  partners: "partnersIntro",
  certificates: "certificateIntro",
  news: "mediaIntro",
  geography: "geoText",
  careers: "careerText",
  contacts: "contactIntro",
  privacy: "privacyIntro",
};
export function description(lang: Lang, path: string) {
  const [section, slug] = path.split("/");
  if (slug) {
    if (section === "projects")
      return projects.find((p) => p.slug === slug)?.summary[lang];
    if (section === "services")
      return services.find((s) => s.slug === slug)?.summary[lang];
    if (section === "news")
      return news.find((n) => n.slug === slug)?.body[lang].slice(0, 180);
    if (section === "team")
      return company.people.find((p) => p.slug === slug)?.role[lang];
    if (section === "careers")
      return vacancies.find((v) => v.slug === slug)?.body[lang].slice(0, 180);
  }
  const key = introKey[section as Key];
  return key ? txt(lang, key) : home.intro[lang];
}
