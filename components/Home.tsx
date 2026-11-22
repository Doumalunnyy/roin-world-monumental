import {
  home,
  services,
  projects,
  company,
  txt,
  href,
  type Lang,
} from "@/lib/content";
import { features } from "@/lib/features";
import { publicUrl } from "@/lib/urls";
import { Action } from "./Shared";
import { ExpertiseGrid } from "./Expertise";
import { Featured, GeographyMap, Hero } from "./Showcases";
import { Photo } from "./Media";
import landing from "@/content/landing-ui.json";
import { DocumentRegister } from "./DocumentRegister";
import { CorporatePartnersMarquee } from "./CorporatePartnersMarquee";
import "./corporate-evidence.css";
import "./home-editorial.css";
import captions from "@/content/captions.json";
import { Icon } from "./Icons";
import { ContactForm } from "./ContactForm";
import { contactEnabled } from "@/lib/contact";
export function Home({ lang }: { lang: Lang }) {
  const t = (key: Parameters<typeof txt>[1]) => txt(lang, key);
  const items = features(lang);
  const office = company.offices.find((o) => o.email);
  return (
    <>
      <Hero lang={lang} title={home.title[lang]} intro={home.intro[lang]}
        film={home.film} filmTitle={t("filmTitle")} close={t("close")} external={t("externalVideo")} />
      <section id="geography" className="home-geo">
        <GeographyMap home lang={lang} items={items} label={t("geoText")} more={t("more")} />
      </section>
      <section className="home-projects">
        <Featured lang={lang} items={items} labels={{ more: t("more") }} />
      </section>
      <section className="experience section-space">
        <div className="shell">
          <h2>{landing.facts[lang]}</h2>
          <div className="facts">
            <a href={href(lang, "services")}>
              <strong dir="ltr">
                {services.length}
              </strong>
              <span>{t("factsServices")}</span>
            </a>
            <a href={href(lang, "geography")}>
              <strong dir="ltr">
                {new Set(projects.map((p) => p.region)).size}
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
      <section className="home-expertise section-space">
        <div className="shell">
          <div className="discipline-heading">
            <h2>{landing.expertise[lang]}</h2>
            <Action to={href(lang, "services")}>{t("allServices")}</Action>
          </div>
          <ExpertiseGrid lang={lang} />
        </div>
      </section>
      <section className="partners-band section-space">
        <div className="shell">
          <div className="section-heading"><h2>{t("partners")}</h2><Action to={href(lang,"partners")}>{t("partnersLink")}</Action></div>
        </div>
        <CorporatePartnersMarquee lang={lang} logos={company.partnerDirectory} />
      </section>
      <section className="career-band hiring-story">
        <div className="hiring-photo"><Photo src={home.careerImage} alt={captions[home.careerImage as keyof typeof captions]?.[lang] || ""} sizes="100vw" /></div>
        <div className="hiring-copy">
          <h2>{home.career[lang]}</h2>
          <p>{t("careerText")}</p>
          <Action to={href(lang, "careers")}>
            {t("careerLink")}
          </Action>
        </div>
      </section>
      <section className="team-band people-story">
        <figure className="people-figure"><div className="team-view">
          <Photo
            src={home.teamImage}
            alt=""
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div><figcaption>{captions[home.teamImage as keyof typeof captions]?.[lang]}</figcaption></figure>
        <div className="team-copy">
          <h2>{home.team[lang]}</h2>
          <p>{t("teamText")}</p>
          <div className="panel-actions">
            <Action to={href(lang, "team")}>{t("teamLink")}</Action>
            <Action to={href(lang, "leadership")}>{t("leadership")}</Action>
          </div>
        </div>
      </section>
      <section className="certificate-band section-space">
        <div className="shell">
          <div className="section-heading"><h2>{t("certificates")}</h2><Action to={href(lang,"certificates")}>{t("documentLibrary")}</Action></div>
          <DocumentRegister lang={lang} />
        </div>
      </section>
      <section className="contact-section section-space">
        <div className="shell contact-layout">
          <div>
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
