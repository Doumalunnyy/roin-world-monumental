import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Home } from "@/components/Home";
import { SiteHeader } from "@/components/Chrome";
import { Footer } from "@/components/Shared";
import { CompanyPages } from "@/components/CompanyPages";
import { ProjectPages } from "@/components/ProjectPages";
import { SectionHero, sectionCover } from "@/components/SectionHero";
import { corporateNavigation } from "@/lib/navigation";
import { publicUrl } from "@/lib/urls";
import {
  txt,
  locales,
  languageInfo,
  isLang,
  href,
  origin,
  paths,
  pageTitle,
  description,
} from "@/lib/content";

type Params = { lang: string; slug?: string[] };
type Props = { params: Promise<Params> };
export function generateStaticParams() {
  return paths().map((path) => ({ slug: path ? path.split("/") : [] }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = await params;
  if (!isLang(lang)) return {};
  const path = slug.join("/"),
    title = pageTitle(lang, path);
  if (!title) return { robots: { index: false } };
  const summary = description(lang, path),
    url = origin + href(lang, path);
  const cover = path ? sectionCover(path) || "/brand/social.jpg" : "/brand/social.jpg";
  const fullTitle = path
    ? title + " — ROIN WORLD"
    : "ROIN WORLD — " + txt(lang, "expertTag");
  const previewImage = new URL(publicUrl(cover), origin).href;
  return {
    title: { absolute: fullTitle },
    description: summary,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, origin + href(l, path)])),
        "x-default": origin + href("ru", path),
      },
    },
    openGraph: {
      title: fullTitle,
      description: summary,
      url,
      siteName: "ROIN WORLD",
      locale: lang,
      images: [{ url: previewImage }],
      type: path.startsWith("news/") ? "article" : "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: summary,
      images: [previewImage],
    },
  };
}
export default async function Page({ params }: Props) {
  const { lang, slug = [] } = await params;
  if (!isLang(lang)) notFound();
  const path = slug.join("/"),
    title = pageTitle(lang, path);
  if (!title) notFound();
  const structured = path
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: txt(lang, "home"),
            item: origin + href(lang),
          },
          ...slug.map((_, i) => {
            const p = slug.slice(0, i + 1).join("/");
            return {
              "@type": "ListItem",
              position: i + 2,
              name: pageTitle(lang, p),
              item: origin + href(lang, p),
            };
          }),
        ],
      }
    : {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ROIN WORLD",
        url: origin + href(lang),
        sameAs: ["https://roinworld.ae/", "https://roinworld.com/"],
      };
  return (
    <>
      <SiteHeader
        lang={lang}
        path={path}
        main={corporateNavigation(lang)}
        languages={locales.map((l) => ({
          code: l,
          name: languageInfo[l].name,
        }))}
        labels={{
          menu: txt(lang, "menu"),
          openMenu: txt(lang, "openMenu"),
          close: txt(lang, "close"),
          language: txt(lang, "language"),
          navigation: txt(lang, "navigation"),
          skip: txt(lang, "skip"),
          home: txt(lang, "home"),
        }}
      />
      <main id="main" className={path ? "interior" : ""}>
        {path ? (
          <>
            <SectionHero lang={lang} path={path} title={title} />
            {["services", "projects", "geography"].includes(slug[0]) ? (
              <ProjectPages lang={lang} path={path} />
            ) : (
              <CompanyPages lang={lang} path={path} />
            )}
          </>
        ) : (
          <Home lang={lang} />
        )}
      </main>
      <Footer lang={lang} path={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
