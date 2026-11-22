import {
  projects,
  services,
  href,
  type Lang,
  type Project,
  type Local,
} from "./content";
import captions from "@/content/captions.json";
export function caption(lang: Lang, image: string) {
  return (
    (captions as Record<string, Local>)[image]?.[lang] || ""
  );
}
export function feature(lang: Lang, p: Project) {
  return {
    slug: p.slug,
    region: p.region,
    country: p.country[lang],
    title: p.title[lang],
    sector: p.sector[lang],
    summary: p.summary[lang],
    role: p.role[lang],
    image: p.image,
    caption: caption(lang, p.image),
    featuredImage: p.featuredImage,
    featuredCaption: p.featuredImage ? caption(lang, p.featuredImage) : undefined,
    url: href(lang, "projects/" + p.slug),
    areas: p.services,
  };
}
export const features = (lang: Lang) => projects.map((p) => feature(lang, p));
export const disciplines = (lang: Lang) =>
  services.map((s) => ({ slug: s.slug, name: s.title[lang] }));
