import {
  services,
  projects,
  company,
  href,
  txt,
  type Lang,
  type Project,
  type Service,
} from "@/lib/content";
import { caption, features, disciplines } from "@/lib/features";
import words from "@/content/technical-ui.json";
import { Photo, MediaButton } from "./Media";
import { GeographyMap, ProjectFilters } from "./Atlas";
import { Action, Tag } from "./Shared";
import { Icon } from "./Icons";
import { ProjectGallery } from "./ProjectGallery";
import "./project-pages.css";

function ProjectLinks({ lang, list }: { lang: Lang; list: Project[] }) {
  if (!list.length) return null;
  return (
    <div className="related-records">
      {list.map((p) => (
        <a key={p.slug} href={href(lang, "projects/" + p.slug)}>
          <div className="related-thumbnail">
            <Photo src={p.image} alt="" sizes="(max-width:700px) 22vw,120px" />
          </div>
          <div>
            <small>{p.country[lang]}</small>
            <strong>{p.title[lang]}</strong>
            {caption(lang, p.image) && <small>{caption(lang, p.image)}</small>}
          </div>
          <Icon name="arrow" />
        </a>
      ))}
    </div>
  );
}

function CountryRegister({ lang }: { lang: Lang }) {
  const countries = projects.filter(
    (p, i) => projects.findIndex((x) => x.region === p.region) === i,
  );
  return (
    <section className="shell section-space register-section">
      <h2>{words.regionRegister[lang]}</h2>
      <div className="region-register">
        {countries.map((region) => {
          const sites = projects.filter((p) => p.region === region.region);
          return (
            <article key={region.region}>
              <div className="register-image">
                <Photo
                  src={region.image}
                  alt={caption(lang, region.image)}
                  sizes="(max-width:700px) 100vw,33vw"
                />
                {caption(lang, region.image) && (
                  <span className="site-caption">
                    {caption(lang, region.image)}
                  </span>
                )}
              </div>
              <h3>{region.country[lang]}</h3>
              <p>
                {Array.from(new Set(sites.map((p) => p.sector[lang]))).join(
                  " · ",
                )}
              </p>
              {sites.map((p) => (
                <a key={p.slug} href={href(lang, "projects/" + p.slug)}>
                  {p.title[lang]} <Icon name="arrow" size={18} />
                </a>
              ))}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ServiceOverview({ lang }: { lang: Lang }) {
  return (
    <section className="shell section-space discipline-overview">
      {services.map((s) => (
        <article key={s.slug}>
          <div className="discipline-visual">
            <Photo
              src={s.image}
              alt={caption(lang, s.image)}
              sizes="(max-width:700px) 100vw,48vw"
            />
          </div>
          <div className="discipline-entry">
            <h2>
              <a href={href(lang, "services/" + s.slug)}>{s.title[lang]}</a>
            </h2>
            <p>{s.body[lang]}</p>
            <ul>
              {s.scope[lang]
                .split("\n")
                .filter(Boolean)
                .map((task) => (
                  <li key={task}>{task}</li>
                ))}
            </ul>
            <Action to={href(lang, "services/" + s.slug)}>
              {txt(lang, "details")}
            </Action>
          </div>
        </article>
      ))}
    </section>
  );
}

function ServiceDetail({ lang, service }: { lang: Lang; service: Service }) {
  const related = projects.filter((p) => p.services.includes(service.slug));
  return (
    <>
      <section className="shell section-space discipline-detail">
        <div>
          <Tag>{txt(lang, "scope")}</Tag>
          <h2>{service.title[lang]}</h2>
          <p>{service.body[lang]}</p>
        </div>
        <ol>
          {service.scope[lang]
            .split("\n")
            .filter(Boolean)
            .map((task) => (
              <li key={task}>{task}</li>
            ))}
        </ol>
      </section>
      <section className="technical-band">
        <div className="shell process-layout">
          <h2>{words.serviceApproach[lang]}</h2>
          <div>
            <p>{service.approach?.[lang] || service.body[lang]}</p>
            <Action to={href(lang, "contacts")}>
              {words.cooperation[lang]}
            </Action>
          </div>
        </div>
      </section>
      <section className="shell section-space discipline-connections">
        {related.length > 0 && (
          <div>
            <h2>{txt(lang, "related")}</h2>
            <ProjectLinks lang={lang} list={related} />
          </div>
        )}
        <div>
          <h2>{txt(lang, "otherExpertise")}</h2>
          <div className="crosslinks">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Action key={s.slug} to={href(lang, "services/" + s.slug)}>
                  {s.title[lang]}
                </Action>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CaseStudy({ lang, project: p }: { lang: Lang; project: Project }) {
  const t = (k: Parameters<typeof txt>[1]) => txt(lang, k);
  const related = projects.filter(
    (other) =>
      other.slug !== p.slug &&
      (other.region === p.region ||
        other.services.some((area) => p.services.includes(area)) ||
        other.sector[lang] === p.sector[lang]),
  );
  const frames = [
    { image: p.image, caption: caption(lang, p.image) },
    ...p.gallery.map((g) => ({ image: g.image, caption: g.caption[lang] })),
  ].filter((f, i, all) => all.findIndex((x) => x.image === f.image) === i);
  return (
    <>
      <section className="shell section-space case-intro">
        <dl className="record-facts">
          <div>
            <dt>{t("country")}</dt>
            <dd>{p.country[lang]}</dd>
          </div>
          <div>
            <dt>{t("industry")}</dt>
            <dd>{p.sector[lang]}</dd>
          </div>
          {p.services.length > 0 && (
            <div>
              <dt>{t("area")}</dt>
              <dd>
                {services
                  .filter((s) => p.services.includes(s.slug))
                  .map((s) => (
                    <a key={s.slug} href={href(lang, "services/" + s.slug)}>
                      {s.title[lang]} <Icon name="diagonal" size={16} />
                    </a>
                  ))}
              </dd>
            </div>
          )}
        </dl>
        <div className="record-prose">
          {p.context?.[lang] && (
            <section>
              <h2>{words.projectRecord[lang]}</h2>
              <p>{p.context[lang]}</p>
              {p.contextSource && (
                <Action to={p.contextSource}>{t("source")}</Action>
              )}
            </section>
          )}
          <section>
            <h2>{t("role")}</h2>
            <p>{p.role[lang]}</p>
            <Action to={p.source}>{t("source")} · ROIN WORLD</Action>
          </section>
        </div>
      </section>
      {p.stages.length > 0 && (
        <section className="shell case-stages">
          <h2>{t("stages")}</h2>
          {p.stages.map((s) => (
            <article key={s.title[lang]}>
              <h3>{s.title[lang]}</h3>
              <p>{s.body[lang]}</p>
            </article>
          ))}
        </section>
      )}
      <section className="technical-band">
        <div className="shell section-space field-report">
          <Tag>{p.title[lang]}</Tag>
          <h2>{words.siteMedia[lang]}</h2>
          <ProjectGallery
            frames={frames}
            title={t("gallery")}
            openLabel={words.openImage[lang]}
            prev={t("prev")}
            next={t("next")}
            close={t("close")}
            rtl={lang === "ar"}
          />
          {p.videos.length > 0 && (
            <div className="case-videos">
              <h3>{t("video")}</h3>
              {p.videos.map((v) => (
                <MediaButton
                  key={v.url}
                  url={v.url}
                  title={v.title[lang]}
                  playLabel={v.title[lang]}
                  closeLabel={t("close")}
                  externalLabel={t("externalVideo")}
                  poster={v.poster}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {p.stories.length > 0 && (
        <section className="shell section-space">
          <h2>{t("interviews")}</h2>
          {p.stories.map((s) => {
            const person = company.people.find((x) => x.slug === s.person);
            return person ? (
              <Action key={s.person} to={href(lang, "team/" + s.person)}>
                {person.name[lang]}
              </Action>
            ) : null;
          })}
        </section>
      )}
      <section className="shell section-space case-bottom">
        <div>
          <h2>{words.cooperation[lang]}</h2>
          <Action to={href(lang, "contacts")}>{t("contactUs")}</Action>
        </div>
        {related.length > 0 && (
          <div>
            <h2>{t("related")}</h2>
            <ProjectLinks lang={lang} list={related} />
          </div>
        )}
      </section>
    </>
  );
}

export function ProjectPages({ lang, path }: { lang: Lang; path: string }) {
  const t = (k: Parameters<typeof txt>[1]) => txt(lang, k);
  const [section, slug] = path.split("/");
  if (path === "geography")
    return (
      <>
        <section className="technical-band">
          <div className="shell section-space">
            <GeographyMap
              items={features(lang)}
              lang={lang}
              label={t("geoText")}
              more={t("more")}
            />
          </div>
        </section>
        <CountryRegister lang={lang} />
      </>
    );
  if (path === "services") return <ServiceOverview lang={lang} />;
  if (path === "projects")
    return (
      <section id="catalogue" className="shell section-space catalogue">
        <div className="catalogue-intro">
          <h2>{words.catalogue[lang]}</h2>
          <Action to={href(lang, "geography")}>
            {words.exploreGeography[lang]}
          </Action>
        </div>
        <ProjectFilters
          items={features(lang)}
          areas={disciplines(lang)}
          labels={{
            country: t("country"),
            area: t("area"),
            allCountries: t("allCountries"),
            allAreas: t("allAreas"),
            noResults: t("noResults"),
            found: t("found"),
            reset: t("reset"),
          }}
        />
      </section>
    );
  if (section === "services") {
    const s = services.find((x) => x.slug === slug);
    return s ? <ServiceDetail lang={lang} service={s} /> : null;
  }
  const p = projects.find((x) => x.slug === slug);
  return p ? <CaseStudy lang={lang} project={p} /> : null;
}
