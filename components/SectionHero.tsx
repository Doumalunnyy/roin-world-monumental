import { Icon } from "./Icons";
import { Photo } from "./Media";
import { caption } from "@/lib/features";
import covers from "@/content/section-covers.json";
import { company, description, href, news, projects, services, txt, type Key, type Lang } from "@/lib/content";

export function sectionCover(path: string) {
  const [section, slug] = path.split("/");
  const cover = covers[section as keyof typeof covers];
  if (!slug) return cover;
  if (section === "projects") return projects.find((p) => p.slug === slug)?.image || cover;
  if (section === "services") return services.find((s) => s.slug === slug)?.image || cover;
  if (section === "news") return news.find((n) => n.slug === slug)?.image || cover;
  if (section === "team") return company.people.find((p) => p.slug === slug)?.photo;
  return cover;
}

export function SectionHero({ lang, path, title }: { lang: Lang; path: string; title: string }) {
  const [section, slug] = path.split("/");
  const image = sectionCover(path);
  const project = section === "projects" && slug ? projects.find((p) => p.slug === slug) : undefined;
  const article = section === "news" && slug ? news.find((n) => n.slug === slug) : undefined;
  const intro = (slug && (section === "news" || section === "careers")) ? undefined : description(lang, path);
  const compact = ["contacts", "privacy", "certificates"].includes(section);
  const variant = project ? "case" : compact ? "compact" : ["leadership", "team", "careers"].includes(section) ? "people" : "panorama";
  return (
    <header className={"section-hero section-hero--" + variant} data-section={section}>
      {image && <div className="section-cover"><Photo src={image} alt="" sizes="100vw" priority /></div>}
      <div className="section-hero-shade" />
      <div className="shell section-hero-wrap">
        <nav className="crumbs" aria-label={txt(lang, "breadcrumb")}>
          <a href={href(lang)}>{txt(lang, "home")}</a><Icon name="right" size={11} />
          {slug && <><a href={href(lang, section)}>{txt(lang, section as Key)}</a><Icon name="right" size={11} /></>}
          <span aria-current="page">{title}</span>
        </nav>
        <div className="section-hero-title">
          {section === "about" && <p className="cover-byline" dir="ltr">ROIN WORLD</p>}
          {project && <p className="cover-byline"><Icon name="pin" size={16} />{project.country[lang]}<span> / </span>{project.sector[lang]}</p>}
          {article && <time className="cover-byline" dateTime={article.date}>{/^\d{4}$/.test(article.date) ? new Intl.NumberFormat(lang, { useGrouping: false }).format(Number(article.date)) : new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: "UTC" }).format(new Date(article.date))}</time>}
          <h1 tabIndex={-1}>{title}</h1>
          {intro && <p className="cover-intro">{intro}</p>}
        </div>
        {project && image && <span className="section-photo-credit">{caption(lang, image)}</span>}
      </div>
    </header>
  );
}
