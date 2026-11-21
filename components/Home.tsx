import {
  home,
  services,
  projects,
  certificates,
  company,
  txt,
  href,
  type Lang,
} from "@/lib/content";
import { features } from "@/lib/features";
import { publicUrl } from "@/lib/urls";
import { Action, Tag } from "./Shared";
import { ExpertiseGrid } from "./Expertise";
import { Featured, GeographyMap, Hero } from "./Showcases";
import { Photo } from "./Media";
import { Icon } from "./Icons";
import { ContactForm } from "./ContactForm";
import { contactEnabled } from "@/lib/contact";
export function Home({ lang }: { lang: Lang }) {
  const t = (key: Parameters<typeof txt>[1]) => txt(lang, key);
  const items = features(lang);
  const coverProject = items.find((p) => p.slug === home.heroProject);
  const heroItems = coverProject
    ? [coverProject, ...items.filter((p) => p !== coverProject)]
    : items;
  const labels = { prev: t("prev"), next: t("next"), more: t("more") };
  const office = company.offices.find((o) => o.email);
  return (
    <>
      <Hero
        title={home.title[lang]}
        intro={home.intro[lang]}
        tag={t("expertTag")}
        aboutLabel={t("about")}
        aboutUrl={href(lang, "about")}
        film={home.film}
        filmTitle={t("filmTitle")}
        playLabel={t("film")}
        close={t("close")}
        external={t("externalVideo")}
        scroll={t("scroll")}
        hero={home.hero}
        heroMobile={home.heroMobile}
        alt={home.heroAlt[lang]}
        archiveFirst={!coverProject}
        archiveLabel={t("corporateArchive")}
        items={heroItems}
        labels={labels}
      />
      <section id="geography" className="home-geo section-space">
        <div className="shell">
          <div className="section-heading">
            <h2>{home.geo[lang]}</h2>
            <Action to={href(lang, "geography")}>{t("geography")}</Action>
          </div>
          <GeographyMap lang={lang} items={items} label={t("geoText")} more={t("more")} />
        </div>
      </section>
      <section className="home-expertise section-space">
        <div className="shell">
          <Tag>{t("servicesHeading")}</Tag>
          <div className="section-heading">
            <h2>{home.expertise[lang]}</h2>
            <Action to={href(lang, "services")}>{t("allServices")}</Action>
          </div>
          <ExpertiseGrid lang={lang} />
        </div>
      </section>
      <section className="home-projects section-space">
        <div className="shell">
          <Tag>{t("projectHeading")}</Tag>
          <div className="section-heading">
            <h2>{home.projects[lang]}</h2>
            <Action to={href(lang, "projects")}>{t("allProjects")}</Action>
          </div>
          <Featured items={items} labels={labels} />
        </div>
      </section>
      <section className="experience section-space">
        <div className="shell">
          <h2>{t("experienceTitle")}</h2>
          <div className="facts">
            <a href={href(lang, "services")}>
              <strong dir="ltr">
                {String(services.length).padStart(2, "0")}
              </strong>
              <span>{t("factsServices")}</span>
            </a>
            <a href={href(lang, "geography")}>
              <strong dir="ltr">
                {String(new Set(projects.map((p) => p.region)).size).padStart(
                  2,
                  "0",
                )}
              </strong>
              <span>{t("factsRegions")}</span>
            </a>
            <a href={publicUrl(home.teamCountSource)} target="_blank" rel="noreferrer">
              <strong dir="ltr">
                {home.teamCount.replace(/\+$/, "")}
                {home.teamCount.endsWith("+") && <span>+</span>}
              </strong>
              <span>{t("factsTeam")}</span>
            </a>
          </div>
        </div>
      </section>
      <section className="team-band">
        <div className="team-view">
          <Photo
            src={home.teamImage}
            alt=""
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div>
        <div className="team-copy">
          <Tag>{t("teamTag")}</Tag>
          <h2>{home.team[lang]}</h2>
          <p>{t("teamText")}</p>
          <div className="panel-actions">
            <Action to={href(lang, "team")}>{t("teamLink")}</Action>
            <Action to={href(lang, "leadership")}>{t("leadership")}</Action>
          </div>
        </div>
      </section>
      <section className="credentials section-space">
        <div className="shell credentials-layout">
          <div>
            <h2>{t("partners")}</h2>
            <ul>{company.partners.slice(0, 3).map((p) => <li key={p.name}>{p.name}</li>)}</ul>
            <Action to={href(lang, "partners")}>{t("partnersLink")}</Action>
          </div>
          <div>
            <h2>{t("certificates")}</h2>
            <ul>{certificates.slice(0, 3).map((c) => <li key={c.slug}><bdi>{c.title}</bdi><small>{c.summary[lang]}</small></li>)}</ul>
            <Action to={href(lang, "certificates")}>{t("documentLibrary")}</Action>
          </div>
        </div>
      </section>
      <section className="career-band">
        <Photo src={home.careerImage} alt="" sizes="100vw" />
        <div className="career-shade" />
        <div className="shell">
          <Tag>{t("careers")}</Tag>
          <h2>{home.career[lang]}</h2>
          <p>{t("careerText")}</p>
          <Action to={href(lang, "careers")} light>
            {t("careerLink")}
          </Action>
        </div>
      </section>
      <section className="contact-section section-space">
        <div className="shell contact-layout">
          <div>
            <Tag>{t("contacts")}</Tag>
            <h2>{home.contact[lang]}</h2>
            {office?.email && (
              <a className="contact-email" href={"mailto:" + office.email}>
                <Icon name="mail" />
                {office.email}
              </a>
            )}
            <Action to={href(lang, "contacts")}>{t("offices")}</Action>
          </div>
          <ContactForm lang={lang} enabled={contactEnabled()} />
        </div>
      </section>
    </>
  );
}
