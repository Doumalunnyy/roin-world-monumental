import { EditorialPlayer, HistoryIndex, PartnerIndex, PracticeIndex } from "./ChapterFeatures";
import { Icon } from "./Icons";
import { Photo } from "./Media";
import { Action } from "./Shared";
import { caption } from "@/lib/features";
import covers from "@/content/section-covers.json";
import copy from "@/content/company-ui.json";
import portfolio from "@/content/technical-ui.json";
import { certificates, company, description, href, news, projects, services, txt, vacancies, type Key, type Lang } from "@/lib/content";
import "./chapters.css";
import "./project-motion.css";
import "./chapter-refinements.css";

// These archived views identify the Bangladesh branch's site, not the people in a vacancy.
const hiringPlates: Record<string, string | undefined> = {
  "building-foreman": "/images/archive-rooppur-workshop.webp",
  "head-of-section": "/images/hero.webp",
  "head-engineer-ptd": "/images/archive-rooppur-workshop.webp",
  "instrumentation-engineer": "/images/rooppur-towers-panorama.webp",
  "interpreter-assistant": "/images/hero-dusk.webp",
  "primary-documentation-accountant": "/images/hero.webp",
  "cleaning-services-manager": "/images/rooppur-towers-panorama.webp",
};

export function sectionCover(path: string) {
  const [section, slug] = path.split("/");
  const fallback = covers[section as keyof typeof covers];
  if (!slug) return fallback;
  if (section === "careers") return hiringPlates[slug];
  if (section === "projects") {
    const project = projects.find((p) => p.slug === slug);
    return project?.coverImage || project?.image || fallback;
  }
  if (section === "services") return services.find((s) => s.slug === slug)?.image || fallback;
  if (section === "news") return news.find((n) => n.slug === slug)?.image || fallback;
  if (section === "team") return company.people.find((p) => p.slug === slug)?.photo || "/images/archive-rooppur-workshop.webp";
  return fallback;
}

function Plate({ image, lang, full, projectSlug }: { image: string; lang: Lang; full: boolean; projectSlug?: string }) {
  const credit = caption(lang, image);
  return <figure className="chapter-plate">
    <div className="chapter-frame" id={projectSlug ? "project-hero-frame" : undefined} data-case-cover={projectSlug ? image : undefined}>
      <Photo src={image} alt={credit} sizes={full ? "100vw" : "(max-width:760px) 100vw, 62vw"} priority />
    </div>
    {credit && <figcaption>{credit}</figcaption>}
  </figure>;
}

const indexLayout: Record<string, string> = {
  projects: "portfolio", services: "practice", about: "company", history: "chronicle",
  team: "crew", leadership: "leadership", geography: "atlas", partners: "partners",
  media: "media", certificates: "documents", careers: "careers", news: "press", contacts: "contact", privacy: "notice",
};
const detailLayout: Record<string, string> = {
  projects: "case", services: "discipline", news: "story", team: "person", careers: "job",
};
function dateLabel(lang: Lang, value: string) {
  return /^\d{4}$/.test(value) ? new Intl.NumberFormat(lang, {useGrouping:false}).format(+value)
    : new Intl.DateTimeFormat(lang, {dateStyle:"long",timeZone:"UTC"}).format(new Date(value));
}

export function SectionHero({ lang, path, title }: { lang: Lang; path: string; title: string }) {
  const [section, slug] = path.split("/");
  const layout = (slug ? detailLayout : indexLayout)[section] || "notice";
  const immersive = ["portfolio", "crew", "company", "media"].includes(layout);
  const image = immersive || ["careers","case","discipline","person","job"].includes(layout) ? sectionCover(path) : undefined;
  const project = layout === "case" ? projects.find((p) => p.slug === slug) : undefined;
  const job = layout === "job" ? vacancies.find((v) => v.slug === slug) : undefined;
  const story = layout === "story" ? news.find((n) => n.slug === slug) : undefined;
  const lead = layout === "press" ? news[0] : undefined;
  const office = layout === "contact" ? company.offices.find((o) => o.email) : undefined;
  const summary = job || story ? undefined : description(lang,path);
  return <header className={"chapter chapter--" + layout} data-section={section} data-record={slug}>
    {immersive && image && <Plate image={image} lang={lang} full />}
    <div className="shell chapter-shell">
      <nav className="chapter-crumbs" aria-label={txt(lang,"breadcrumb")}>
        <a href={href(lang)}>{txt(lang,"home")}</a><Icon name="right" size={12}/>
        {slug && <><a href={href(lang,section)}>{txt(lang,section as Key)}</a><Icon name="right" size={12}/></>}
        <span aria-current="page">{title}</span>
      </nav>
      <div className="chapter-stage">
        <div className="chapter-type">
          {project && <p className="chapter-place"><Icon name="pin" size={16}/>{project.country[lang]}<span> / </span>{project.sector[lang]}</p>}
          {job && <p className="chapter-place"><Icon name="pin" size={16}/>{job.location[lang]}{job.department && <> / {job.department[lang]}</>}</p>}
          {story && <p className="chapter-place"><time dateTime={story.date}>{dateLabel(lang,story.date)}</time>{story.category && <> / {story.category[lang]}</>}</p>}
          <h1 tabIndex={-1}><span className="title-ink">{project ? title.split(/(\S+[-‐‑]\S+)/u).map((part, index) =>
            index % 2 ? <span className="case-name-word" key={index}>{part}</span> : part
          ) : title}</span></h1>
          {summary && <p className="chapter-deck">{summary}</p>}
          {layout === "company" && <div className="chapter-actions"><Action to={href(lang,"history")}>{txt(lang,"history")}</Action></div>}
          {job && <div className="chapter-actions"><Action to="#application" light>{copy.application[lang]}</Action></div>}
          {layout === "portfolio" && <div className="chapter-actions"><Action to="#catalogue" light>{portfolio.catalogue[lang]}</Action><Action to={href(lang,"geography")}>{txt(lang,"geography")}</Action></div>}
          {layout === "careers" && <div className="chapter-actions"><Action to="#vacancies" light>{txt(lang,"vacancies")}</Action></div>}
          {layout === "crew" && <div className="chapter-actions"><Action to={href(lang,"leadership")}>{txt(lang,"leadership")}</Action></div>}
        </div>
        {!immersive && image && <Plate image={image} lang={lang} full={false} projectSlug={project?.slug}/>}
        {layout === "chronicle" && <HistoryIndex lang={lang}/>}
        {layout === "practice" && <PracticeIndex lang={lang}/>}
        {story && <EditorialPlayer article={story} lang={lang}/>}
        {layout === "documents" && <nav className="chapter-scans" aria-label={copy.docRegister[lang]}>
          {certificates.map((doc) => <a href={"#"+doc.slug} key={doc.slug}>
            {doc.preview && <span className="scan-paper"><Photo src={doc.preview} alt="" sizes="(max-width:760px) 25vw, 13vw"/></span>}
            <bdi>{doc.title}</bdi>
          </a>)}
        </nav>}
        {layout === "partners" && <PartnerIndex lang={lang}/>}
        {office && <address className="chapter-address">
          <span>{office.label[lang]}</span>
          {office.email && <a href={"mailto:" + office.email}><bdi>{office.email}</bdi><Icon name="diagonal" size={20}/></a>}
          {office.phone && <a href={"tel:" + office.phone.replace(/[^+0-9]/g,"")}><bdi dir="ltr">{office.phone}</bdi><Icon name="diagonal" size={20}/></a>}
        </address>}
        {lead && <a className="chapter-issue" href={href(lang,"news/"+lead.slug)}>
          <span className="chapter-issue-photo"><Photo src={lead.image} alt="" priority sizes="(max-width:760px) 100vw, 52vw"/></span>
          <span className="chapter-issue-legend"><small><time dateTime={lead.date}>{dateLabel(lang,lead.date)}</time> · {lead.category?.[lang] || txt(lang,"media")}</small><strong>{lead.title[lang]}</strong></span><Icon name="arrow"/>
        </a>}
      </div>
    </div>
  </header>;
}
