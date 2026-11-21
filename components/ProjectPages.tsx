import {
  services,
  projects,
  company,
  href,
  txt,
  type Lang,
  type Key,
} from "@/lib/content";
import { features, feature, disciplines, caption } from "@/lib/features";
import { Photo, MediaButton } from "./Media";
import { GeographyMap, ProjectFilters, Featured } from "./Showcases";
import { Action, Tag } from "./Shared";
import { ExpertiseGrid } from "./Expertise";
import { Icon } from "./Icons";
export function ProjectPages({ lang, path }: { lang: Lang; path: string }) {
  const t = (k: Key) => txt(lang, k);
  const [section, slug] = path.split("/");
  if (path === "services")
    return (
      <section className="section-space shell">
        <ExpertiseGrid lang={lang} />
      </section>
    );
  if (path === "geography")
    return (
      <section className="geo-page section-space">
        <div className="shell">
          <GeographyMap
            items={features(lang)}
            label={t("geoText")}
            more={t("more")}
          />
        </div>
      </section>
    );
  if (path === "projects")
    return (
      <section className="shell section-space">
        <ProjectFilters
          items={features(lang)}
          areas={disciplines(lang)}
          labels={{
            country: t("country"),
            area: t("area"),
            allAreas: t("allAreas"),
            allCountries: t("allCountries"),
            noResults: t("noResults"),
            found: t("found"),
            reset: t("reset"),
          }}
        />
      </section>
    );
  if (section === "services") {
    const s = services.find((i) => i.slug === slug);
    if (!s) return null;
    return (
      <>
        <section className="shell section-space editorial-split">
          <div className="editorial-picture">
            <Photo src={s.image} alt={s.title[lang] + " · " + t("photoDemo")} />
            <span className="credit">{t("photoDemo")}</span>
          </div>
          <div>
            <Tag>{t("scope")}</Tag>
            <h2>{s.title[lang]}</h2>
            <p className="prose">{s.body[lang]}</p>
            <ul className="lined-list">
              {s.scope[lang].split("\n").map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Action to={href(lang, "contacts")}>{t("topic")}</Action>
          </div>
        </section>
        <section className="pale-band section-space">
          <div className="shell">
            <h2>{t("otherExpertise")}</h2>
            <div className="crosslinks">
              {services
                .filter((i) => s.slug !== i.slug)
                .map((i) => (
                  <Action to={href(lang, "services/" + i.slug)} key={i.slug}>
                    {i.title[lang]}
                  </Action>
                ))}
            </div>
          </div>
        </section>
      </>
    );
  }
  const p = projects.find((i) => i.slug === slug);
  if (!p) return null;
  return (
    <>
      <section className="shell section-space">
        <figure className="project-hero-img">
          <Photo
            src={p.image}
            alt={caption(lang, p.image)}
            sizes="100vw"
            priority
          />
          <figcaption className="credit">{caption(lang, p.image)}</figcaption>
        </figure>
        <div className="case-facts">
          <div>
            <small>{t("country")}</small>
            <strong>{p.country[lang]}</strong>
          </div>
          <div>
            <small>{t("industry")}</small>
            <strong>{p.sector[lang]}</strong>
          </div>
          <div>
            <small>{t("area")}</small>
            {services
              .filter((s) => p.services.includes(s.slug))
              .map((s) => (
                <a key={s.slug} href={href(lang, "services/" + s.slug)}>
                  {s.title[lang]} <Icon name="diagonal" size={16} />
                </a>
              ))}
          </div>
        </div>
        <div className="case-editorial">
          <Tag>{t("role")}</Tag>
          <div>
            <p>{p.role[lang]}</p>
            <Action to={p.source}>{t("source")} · ROIN WORLD</Action>
          </div>
        </div>
        {p.stages.length > 0 && (
          <section className="case-extra">
            <h2>{t("stages")}</h2>
            {p.stages.map((s) => (
              <article key={s.title[lang]}>
                <h3>{s.title[lang]}</h3>
                <p>{s.body[lang]}</p>
              </article>
            ))}
          </section>
        )}
        {p.gallery.length > 0 && (
          <section className="case-extra">
            <h2>{t("gallery")}</h2>
            <div className="case-gallery">
              {p.gallery.map((g) => (
                <figure key={g.image}>
                  <div>
                    <Photo src={g.image} alt={g.caption[lang]} />
                  </div>
                  <figcaption>{g.caption[lang]}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {p.videos.length > 0 && (
          <section className="case-extra">
            <h2>{t("video")}</h2>
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
          </section>
        )}
        {p.stories.length > 0 && (
          <section className="case-extra">
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
      </section>
      <section className="home-projects section-space">
        <div className="shell">
          <h2>{t("related")}</h2>
          <Featured
            items={projects
              .filter((i) => i.slug !== p.slug)
              .map((i) => feature(lang, i))}
            labels={{ prev: t("prev"), next: t("next"), more: t("more") }}
          />
        </div>
      </section>
    </>
  );
}
