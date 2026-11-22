import { OfficialArchives } from "./OfficialArchives";
import { services, projects, company, news, href, txt, type Lang, type Project, type Service } from "@/lib/content";
import { caption, feature, disciplines } from "@/lib/features";
import words from "@/content/technical-ui.json";
import { Photo, MediaButton } from "./Media";
import { GeographyMap, ProjectFilters } from "./Atlas";
import { Action } from "./Shared";
import { Icon } from "./Icons";
import { ProjectGallery } from "./ProjectGallery";
import "./project-pages.css";
import "./project-editorial.css";

function projectImage(project: Project) {
  return project.coverImage || project.image;
}

function portfolio(lang: Lang) {
  return projects.map(p => feature(lang, { ...p, image: projectImage(p) }));
}

function ProjectLinks({ lang, list }: { lang: Lang; list: Project[] }) {
  return <div className="related-records">
    {list.map(p => <a key={p.slug} href={href(lang, "projects/" + p.slug)}>
      <div className="related-thumbnail">
        <Photo src={projectImage(p)} alt="" sizes="(max-width:600px) 22vw, 130px"/>
      </div>
      <div>
        <small>{p.country[lang]}</small>
        <strong>{p.title[lang]}</strong>
        {caption(lang, projectImage(p)) && <small>{caption(lang, projectImage(p))}</small>}
      </div>
      <Icon name="diagonal" size={21}/>
    </a>)}
  </div>;
}

function CountryRegister({ lang }: { lang: Lang }) {
  const countries = projects.filter((p, i) => projects.findIndex(other => other.region === p.region) === i);
  return <section className="shell ed-section territorial-index">
    <header className="ed-section-heading">
      <h2>{words.regionRegister[lang]}</h2>
      <Action to={href(lang, "projects")}>{txt(lang, "allProjects")}</Action>
    </header>
    <div className="region-register">
      {countries.map(country => <article key={country.region}>
        <figure>
          <div className="register-image">
            <Photo src={projectImage(country)} alt="" sizes="(max-width:760px) 32vw, 20vw"/>
          </div>
          <figcaption>{caption(lang, projectImage(country))}</figcaption>
        </figure>
        <div className="region-name">
          <h3>{country.country[lang]}</h3>
          <span>{country.sector[lang]}</span>
        </div>
        <div className="region-cases">
          {projects.filter(p => p.region === country.region).map(p => <div key={p.slug}>
            <a href={href(lang, "projects/" + p.slug)}>{p.title[lang]}<Icon name="diagonal" size={19}/></a>
            <p>{p.role[lang]}</p>
          </div>)}
        </div>
      </article>)}
    </div>
  </section>;
}

function ServiceOverview({ lang }: { lang: Lang }) {
  return <section className="shell ed-section engineering-index" aria-label={txt(lang, "services")}>
    {services.map((s, i) => <article key={s.slug} id={"discipline-" + s.slug} className={i === 0 ? "discipline-lead" : "discipline-row"}>
      <figure>
        <div className="discipline-visual">
          <Photo src={s.image} alt="" sizes={i === 0 ? "(max-width:760px) 92vw, 58vw" : "(max-width:760px) 92vw, 35vw"}/>
        </div>
        <figcaption>{caption(lang, s.image)}</figcaption>
      </figure>
      <div className="discipline-entry">
        <h2><a href={href(lang, "services/" + s.slug)}>{s.title[lang]}<Icon name="diagonal" size={23}/></a></h2>
        <p>{s.body[lang]}</p>
        <details className="discipline-scope">
          <summary>{txt(lang, "scope")}<Icon name="plus" size={17}/></summary>
          <ul>{s.scope[lang].split("\n").filter(Boolean).map(task => <li key={task}>{task}</li>)}</ul>
        </details>
      </div>
    </article>)}
  </section>;
}

function ServiceDetail({ lang, service }: { lang: Lang; service: Service }) {
  const related = projects.filter(p => p.services.includes(service.slug));
  const report = service.slug === "engineering" ? news.find(item => item.slug === "rooppur-training-building") : undefined;
  const supportingImage = service.slug === "engineering" ? report?.image || "/images/archive-roof.webp" : undefined;
  return <>
    <section className="shell ed-section expertise-record">
      <div className="expertise-scope">
        <h2>{txt(lang, "scope")}</h2>
        <p>{service.body[lang]}</p>
        <ul>{service.scope[lang].split("\n").filter(Boolean).map(task => <li key={task}>{task}</li>)}</ul>
      </div>
      <div className="expertise-method">
        {supportingImage && <figure>
          <div className={report?.video ? "publication-player" : "expertise-method-image"}>
            <Photo src={supportingImage} alt="" sizes="(max-width:760px) 92vw, 47vw"/>
            {report?.video && <MediaButton url={report.video} title={report.title[lang]}
              playLabel={txt(lang, "watch")} closeLabel={txt(lang, "close")}
              externalLabel={txt(lang, "externalVideo")} poster={supportingImage}/>}
          </div>
          <figcaption>{report ? <a href={href(lang, "news/" + report.slug)}>{report.title[lang]}</a> : caption(lang, supportingImage)}</figcaption>
        </figure>}
        <div>
          <h2>{words.serviceApproach[lang]}</h2>
          <p>{service.approach[lang]}</p>
          <Action to={href(lang, "contacts")}>{words.cooperation[lang]}</Action>
        </div>
      </div>
    </section>
    <section className="ed-light-band">
      <div className="shell ed-section related-layout">
        {related.length > 0 && <div>
          <h2>{txt(lang, "related")}</h2>
          <ProjectLinks lang={lang} list={related}/>
        </div>}
        <div>
          <h2>{txt(lang, "otherExpertise")}</h2>
          <div className="ed-link-list">
            {services.filter(s => s.slug !== service.slug).map(s => <Action key={s.slug} to={href(lang, "services/" + s.slug)}>{s.title[lang]}</Action>)}
          </div>
        </div>
      </div>
    </section>
  </>;
}

function CaseStudy({ lang, project: p }: { lang: Lang; project: Project }) {
  const t = (key: Parameters<typeof txt>[1]) => txt(lang, key);
  const related = projects.filter(other => other.slug !== p.slug && (other.region === p.region ||
    other.services.some(area => p.services.includes(area)) || other.sector[lang] === p.sector[lang]));
  const frames = p.gallery.map(frame => ({ image: frame.image, caption: frame.caption[lang] }));
  frames.splice(Math.min(1, frames.length), 0, { image: p.image, caption: caption(lang, p.image) });
  const gallery = frames.filter((frame, i, all) => all.findIndex(other => other.image === frame.image) === i);
  const reports = news.filter(item => item.project === p.slug && !p.videos.some(video => video.url === item.video));
  const people = p.stories.flatMap(story => company.people.filter(person => person.slug === story.person));

  return <>
    <nav className="shell case-contents" aria-label={t("navigation")}>
      <a href="#case-record">{words.projectRecord[lang]}</a>
      <a href="#case-scope">{t("role")}</a>
      <a href="#case-media">{words.siteMedia[lang]}</a>
      <a href="#case-cooperation">{words.cooperation[lang]}</a>
    </nav>
    <section id="case-record" className="shell ed-section case-register">
      <dl className="record-facts">
        <div><dt>{t("country")}</dt><dd>{p.country[lang]}</dd></div>
        <div><dt>{t("industry")}</dt><dd>{p.sector[lang]}</dd></div>
        {p.services.length > 0 && <div>
          <dt>{t("area")}</dt>
          <dd>{services.filter(s => p.services.includes(s.slug)).map(s =>
            <a key={s.slug} href={href(lang, "services/" + s.slug)}>{s.title[lang]} <Icon name="diagonal" size={15}/></a>)}</dd>
        </div>}
      </dl>
      <div className="record-prose">
        {p.context?.[lang] && <section>
          <h2>{words.projectRecord[lang]}</h2><p>{p.context[lang]}</p>
          {p.contextSource && <Action to={p.contextSource}>{t("source")} · {URL.canParse(p.contextSource) ? new URL(p.contextSource).hostname.replace(/^www\./, "") : p.contextSource}</Action>}
        </section>}
        <section id="case-scope">
          <h2>{t("role")}</h2><p>{p.role[lang]}</p>
          <Action to={p.source}>{t("source")} · ROIN WORLD</Action>
        </section>
      </div>
    </section>
    {p.stages.length > 0 && <section className="shell ed-section case-stages">
      <h2>{t("stages")}</h2>
      {p.stages.map(stage => <article key={stage.title[lang]}>
        <h3>{stage.title[lang]}</h3><p>{stage.body[lang]}</p>
      </article>)}
    </section>}
    <section id="case-media" className="technical-band">
      <div className="shell ed-section field-report">
        <h2>{words.siteMedia[lang]}</h2>
        <ProjectGallery lang={lang} frames={gallery} title={t("gallery")} openLabel={words.openImage[lang]}
          prev={t("prev")} next={t("next")} close={t("close")} rtl={lang === "ar"}/>
        {(p.videos.length > 0 || reports.length > 0) && <div className="case-media-links">
          {p.videos.length > 0 && <div className="case-videos">
            <h3>{t("video")}</h3>
            {p.videos.map(video => video.external
              ? <a className="text-link" key={video.url} href={video.url} target="_blank" rel="noreferrer">{video.title[lang]} <Icon name="diagonal" size={17}/></a>
              : <MediaButton key={video.url} url={video.url} title={video.title[lang]} playLabel={video.title[lang]}
                  closeLabel={t("close")} externalLabel={t("externalVideo")} poster={video.poster}/>)}
          </div>}
          {reports.length > 0 && <div className="case-reports">
            <h3>{t("news")}</h3>
            {reports.map(item => <Action key={item.slug} to={href(lang, "news/" + item.slug)}>{item.title[lang]}</Action>)}
          </div>}
        </div>}
      </div>
    </section>
    {people.length > 0 && <section className="shell ed-section ed-people">
      <h2>{t("interviews")}</h2>
      {people.map(person => <Action key={person.slug} to={href(lang, "team/" + person.slug)}>{person.name[lang]}</Action>)}
    </section>}
    <section id="case-cooperation" className="shell ed-section related-layout">
      {related.length > 0 && <div>
        <header className="ed-section-heading"><h2>{t("related")}</h2>
          <Action to={href(lang, "projects")}>{t("allProjects")}</Action></header>
        <ProjectLinks lang={lang} list={related}/>
      </div>}
      <div className="case-contact">
        <h2>{words.cooperation[lang]}</h2>
        <Action to={href(lang, "contacts")}>{t("contactUs")}</Action>
        {!related.length && <Action to={href(lang, "projects")}>{t("allProjects")}</Action>}
      </div>
    </section>
  </>;
}

export function ProjectPages({ lang, path }: { lang: Lang; path: string }) {
  const t = (key: Parameters<typeof txt>[1]) => txt(lang, key);
  const [section, slug] = path.split("/");
  if (path === "geography") return <>
    <section className="technical-band atlas-room">
      <div className="shell">
        <GeographyMap items={portfolio(lang)} lang={lang} label={t("geoText")} more={t("more")}/>
      </div>
    </section>
    <CountryRegister lang={lang}/>
  </>;
  if (path === "services") return <ServiceOverview lang={lang}/>;
  if (path === "projects") return <section id="catalogue" className="shell portfolio-catalog" aria-label={words.catalogue[lang]}>
    <ProjectFilters items={portfolio(lang)} areas={disciplines(lang)} labels={{
      country: t("country"), area: t("area"), allCountries: t("allCountries"), allAreas: t("allAreas"),
      noResults: t("noResults"), found: t("found"), reset: t("reset"),
    }}/>
    <div className="portfolio-footer"><Action to={href(lang, "geography")}>{words.exploreGeography[lang]}</Action><OfficialArchives lang={lang} section="projects"/></div>
  </section>;
  if (section === "services") {
    const service = services.find(s => s.slug === slug);
    return service ? <ServiceDetail lang={lang} service={service}/> : null;
  }
  const project = projects.find(p => p.slug === slug);
  return project ? <CaseStudy lang={lang} project={project}/> : null;
}
