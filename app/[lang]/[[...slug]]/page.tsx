import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Home } from "@/components/Home";
import { SiteHeader } from "@/components/Chrome";
import { Footer } from "@/components/Shared";
import { CompanyPages } from "@/components/CompanyPages";
import { ProjectPages } from "@/components/ProjectPages";
import { Icon } from "@/components/Icons";
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
  primary,
  secondary,
  home,
  projects,
  news,
  services,
  type Key,
  type Lang,
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
  const cover =
    (path.startsWith("projects/")
      ? projects.find((p) => p.slug === slug[1])?.image
      : path.startsWith("services/")
        ? services.find((s) => s.slug === slug[1])?.image
        : path.startsWith("news/")
          ? news.find((n) => n.slug === slug[1])?.image
          : undefined) || home.hero;
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
function Crumbs({
  lang,
  slug,
  title,
}: {
  lang: Lang;
  slug: string[];
  title: string;
}) {
  return (
    <nav aria-label={txt(lang, "breadcrumb")} className="crumbs">
      <a href={href(lang)}>{txt(lang, "home")}</a>
      <Icon name="right" size={11} />
      {slug.length > 1 && (
        <>
          <a href={href(lang, slug[0])}>{txt(lang, slug[0] as Key)}</a>
          <Icon name="right" size={11} />
        </>
      )}
      <span aria-current="page">{title}</span>
    </nav>
  );
}
export default async function Page({ params }: Props) {
  const { lang, slug = [] } = await params;
  if (!isLang(lang)) notFound();
  const path = slug.join("/"),
    title = pageTitle(lang, path);
  if (!title) notFound();
  const link = (key: Key) => ({ slug: key, title: txt(lang, key) });
  const main = primary.map(link),
    more = secondary.map(link);
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
  const noIntro = slug.length > 1 && ["news", "careers"].includes(slug[0]);
  return (
    <>
      <SiteHeader
        lang={lang}
        path={path}
        main={main}
        more={more}
        languages={locales.map((l) => ({
          code: l,
          name: languageInfo[l].name,
        }))}
        labels={{
          menu: txt(lang, "menu"),
          close: txt(lang, "close"),
          language: txt(lang, "language"),
          navigation: txt(lang, "navigation"),
          skip: txt(lang, "skip"),
          home: txt(lang, "home"),
          directory: txt(lang, "directory"),
        }}
      />
      <main id="main" className={path ? "interior" : ""}>
        {path ? (
          <>
            <div className="page-top">
              <div className="shell">
                <Crumbs lang={lang} slug={slug} title={title} />
                <h1 className={title.split(/\s+/).some(word=>word.length>15) ? "long-title" : undefined}>{title}</h1>
                {!noIntro && <p>{description(lang, path)}</p>}
              </div>
            </div>
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
