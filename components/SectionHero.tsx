import { Icon } from "./Icons";
import { Photo } from "./Media";
import { caption } from "@/lib/features";
import covers from "@/content/section-covers.json";
import copy from "@/content/company-ui.json";
import { certificates, company, description, href, news, projects, services, txt, type Key, type Lang } from "@/lib/content";
import "./chapters.css";

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

function CoverArt({ image, lang, large = false }: { image: string; lang: Lang; large?: boolean }) {
  const credit = caption(lang, image);
  return <figure className="chapter-art">
    <div className="chapter-image"><Photo src={image} alt={credit} sizes={large ? "100vw" : "(max-width:760px) 100vw, 51vw"} priority /></div>
    {credit && <figcaption>{credit}</figcaption>}
  </figure>;
}

const templates: Record<string,string> = {
  about:"spread", history:"chronicle", team:"scene", leadership:"profile",
  services:"disciplines", projects:"catalog", geography:"atlas", partners:"register",
  certificates:"documents", careers:"workforce", news:"press", contacts:"contact", privacy:"profile",
};

export function SectionHero({ lang, path, title }: { lang: Lang; path: string; title: string }) {
  const [section, slug] = path.split("/");
  const variant = slug ? ({projects:"case",services:"discipline",team:"profile",news:"story",careers:"job"}[section] || "profile") : templates[section] || "profile";
  const project = section === "projects" && slug ? projects.find((p) => p.slug === slug) : undefined;
  const article = section === "news" && slug ? news.find((n) => n.slug === slug) : undefined;
  const showCover = ["spread","scene","disciplines","discipline","case","workforce","story"].includes(variant);
  const image = (showCover || (section === "team" && slug)) ? sectionCover(path) : undefined;
  const summary = slug && ["news", "careers"].includes(section) ? undefined : description(lang, path);
  const email = section === "contacts" && company.offices.find((o) => o.email)?.email;
  const date = article && (/^\d{4}$/.test(article.date) ? new Intl.NumberFormat(lang,{useGrouping:false}).format(+article.date) :
    new Intl.DateTimeFormat(lang,{dateStyle:"long",timeZone:"UTC"}).format(new Date(article.date)));
  const leadArticle = variant === "press" ? news[0] : undefined;
  return (
    <header className={"chapter chapter--"+variant} data-section={section}>
      <div className="shell chapter-shell">
        <nav className="chapter-crumbs" aria-label={txt(lang,"breadcrumb")}>
          <a href={href(lang)}>{txt(lang,"home")}</a><Icon name="right" size={12} />
          {slug && <><a href={href(lang,section)}>{txt(lang,section as Key)}</a><Icon name="right" size={12}/></>}
          <span aria-current="page">{title}</span>
        </nav>
        <div className="chapter-stage">
          <div className="chapter-type">
            {project && <p className="chapter-place"><Icon name="pin" size={17}/>{project.country[lang]}<span> / </span>{project.sector[lang]}</p>}
            {article && <p className="chapter-place"><time dateTime={article.date}>{date}</time>{article.category?.[lang] && <> / {article.category[lang]}</>}</p>}
            <h1 tabIndex={-1}>{title}</h1>
            {summary && <p className="chapter-deck">{summary}</p>}
            {variant === "workforce" && <a className="chapter-jump" href="#vacancies">{txt(lang,"vacancies")} <Icon name="right" size={17}/></a>}
          </div>
          {image && <CoverArt image={image} lang={lang} large={variant==="scene"||variant==="case"} />}
          {variant === "chronicle" && <nav className="chapter-years" aria-label={txt(lang,"history")}>
            {company.history.map((entry,i)=><a href={"#event-"+(i+1)} key={entry.source}>{entry.title[lang].split(" · ")[0]}</a>)}
          </nav>}
          {variant === "documents" && <nav className="chapter-register" aria-label={copy.docRegister[lang]}>
            {certificates.map((doc)=><a key={doc.slug} href={"#"+doc.slug}><Icon name="file" size={16}/><bdi>{doc.title}</bdi></a>)}
          </nav>}
          {variant === "contact" && email && <a className="chapter-mail" href={"mailto:"+email}><span>{copy.generalMail[lang]}</span><bdi>{email}</bdi><Icon name="diagonal"/></a>}
          {variant === "catalog" && <a className="chapter-index-action" href={href(lang,"geography")}><Icon name="globe"/>{txt(lang,"geography")}<Icon name="arrow"/></a>}
          {leadArticle && <a className="chapter-issue" href={href(lang,"news/"+leadArticle.slug)}>
            <span className="chapter-issue-photo"><Photo src={leadArticle.image} alt="" sizes="(max-width:760px) 90vw,35vw" priority/></span>
            <span className="chapter-issue-label">{leadArticle.category?.[lang] || txt(lang,"media")}</span>
            <strong>{leadArticle.title[lang]}</strong><Icon name="diagonal" size={18}/>
          </a>}
        </div>
      </div>
    </header>
  );
}
