import { notFound } from "next/navigation";
import { publicUrl } from "@/lib/urls";
import copy from "@/content/company-ui.json";
import {
  certificates,
  company,
  home,
  href,
  news,
  projects,
  services,
  txt,
  vacancies,
  type Key,
  type Lang,
  type Person,
} from "@/lib/content";
import { contactEnabled } from "@/lib/contact";
import { caption } from "@/lib/features";
import { ContactForm } from "./ContactForm";
import { Icon } from "./Icons";
import { MediaButton, Photo } from "./Media";
import { Action } from "./Shared";
import { CorporateDirectory, OfficeMap } from "./CorporateDirectory";
import "./company-pages.css";
import "./corporate-editorial.css";

type Article = (typeof news)[number];
type Props = { lang: Lang; path: string };
type LanguageProps = { lang: Lang };

function Source({ lang, url }: LanguageProps & { url: string }) {
  return (
    <a className="cp-source" href={publicUrl(url)}>
      {txt(lang, "source")} <Icon name="diagonal" size={15} />
    </a>
  );
}

function ArticleDate({ date, lang }: LanguageProps & { date: string }) {
  const label = /^\d{4}$/.test(date)
    ? new Intl.NumberFormat(lang, { useGrouping: false }).format(Number(date))
    : new Intl.DateTimeFormat(lang, {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(date + "T00:00:00Z"));
  return (
    <time dateTime={date} className="cp-date">
      {label}
    </time>
  );
}

function Figure({
  lang,
  src,
  alt,
  caption,
}: LanguageProps & { src: string; alt: string; caption: string }) {
  return (
    <figure className="cp-figure">
      <div className="cp-frame">
        <Photo src={src} alt={alt} sizes="(max-width: 760px) 100vw, 58vw" />
      </div>
      <figcaption>
        <span>{caption}</span>
        <a href={publicUrl("/images/credits.html?lang=" + lang)}>
          {copy.imageCredit[lang]}
        </a>
      </figcaption>
    </figure>
  );
}

function RelatedSections({
  lang,
  entries,
}: LanguageProps & { entries: Key[] }) {
  return (
    <nav className="cp-directory" aria-label={copy.aboutNavigation[lang]}>
      {entries.map((key) => (
        <a href={href(lang, key)} key={key}>
          <span>{txt(lang, key)}</span>
          <Icon name="arrow" size={21} />
        </a>
      ))}
    </nav>
  );
}

function Sites({ lang }: LanguageProps) {
  return (
    <section className="cp-block">
      <h2>{copy.internationalWork[lang]}</h2>
      <div className="cp-sites">
        {projects.map((project) => (
          <a key={project.slug} href={href(lang, "projects/" + project.slug)}>
            <span className="cp-site-image">
              <Photo
                src={project.image}
                alt=""
                sizes="(max-width: 670px) 92vw, 31vw"
              />
            </span>
            <span className="cp-meta">{project.country[lang]}</span>
            <strong>{project.title[lang]}</strong>
            <Icon name="diagonal" size={18} />
          </a>
        ))}
      </div>
    </section>
  );
}

function Culture({ lang }: LanguageProps) {
  const report = news.find((item) => item.slug === "rooppur-fire-drill");
  return (
    <section className="cp-team cp-block">
      <Figure
        lang={lang}
        src={home.teamImage}
        alt={caption(lang, home.teamImage) || copy.teamPhoto[lang]}
        caption={caption(lang, home.teamImage) || copy.archive[lang]}
      />
      <div className="cp-copy">
        <h2>{copy.culture[lang]}</h2>
        <p>{copy.cultureText[lang]}</p>
        {report && (
          <Action to={href(lang, "news/" + report.slug)}>
            {copy.reports[lang]}
          </Action>
        )}
      </div>
    </section>
  );
}

function About({ lang }: LanguageProps) {
  const discipline = services.find((service) => service.slug === "engineering");
  return (
    <>
      <section className="company-profile">
        <div>
          <h2>{copy.companyProfile[lang]}</h2>
          <p className="cp-lede">{copy.companyProfileText[lang]}</p>
          <div className="archive-links">
            <Action to={href(lang, "projects")}>{txt(lang, "projects")}</Action>
            <Source lang={lang} url="https://roinworld.ae/o-kompanii/" />
          </div>
        </div>
        {discipline && (
          <Figure
            lang={lang}
            src={discipline.image}
            alt={caption(lang, discipline.image)}
            caption={caption(lang, discipline.image)}
          />
        )}
      </section>
      <section className="company-capabilities cp-block">
        <h2>{txt(lang, "services")}</h2>
        <div className="company-capability-links">
          {services.map((service) => (
            <a key={service.slug} href={href(lang, "services/" + service.slug)}>
              {service.title[lang]} <Icon name="arrow" size={20} />
            </a>
          ))}
        </div>
      </section>
      <Sites lang={lang} />
      <section className="company-archive-index cp-block">
        <div>
          <h2>{copy.historyLead[lang]}</h2>
          <Action to={href(lang, "history")}>{txt(lang, "history")}</Action>
        </div>
        <ol>
          {company.history.map((event, i) => {
            const [year, ...title] = event.title[lang].split(" · ");
            return (
              <li key={event.source}>
                <a href={href(lang, "history") + "#event-" + (i + 1)}>
                  <bdi>{year}</bdi>
                  <span>{title.join(" · ") || event.title[lang]}</span>
                  <Icon name="arrow" size={16} />
                </a>
              </li>
            );
          })}
        </ol>
      </section>
      <section className="cp-principles company-work-method">
        <div>
          <h2>{copy.principles[lang]}</h2>
          <Source lang={lang} url="https://roinworld.ae/o-kompanii/" />
        </div>
        <div className="cp-principle-body">
          {(["mission", "quality", "partnership"] as const).map((key) => (
            <article key={key}>
              <h3>{copy[key][lang]}</h3>
              <p>
                {
                  copy[
                    (key + "Text") as
                      | "missionText"
                      | "qualityText"
                      | "partnershipText"
                  ][lang]
                }
              </p>
            </article>
          ))}
        </div>
      </section>
      <Culture lang={lang} />
      <RelatedSections lang={lang} entries={["team", "leadership"]} />
      <section className="cp-block company-standards">
        <div>
          <h2>{copy.capabilityDocs[lang]}</h2>
          <Action to={href(lang, "certificates")}>
            {txt(lang, "certificates")}
          </Action>
        </div>
        <div>
          {certificates.map((doc) => (
            <a
              key={doc.slug}
              href={href(lang, "certificates") + "#" + doc.slug}
            >
              <bdi>{doc.title}</bdi>
              <span>{doc.summary[lang]}</span>
              <Icon name="diagonal" size={16} />
            </a>
          ))}
        </div>
      </section>
      <div className="cp-invitation company-end">
        <Action to={href(lang, "contacts")} light>
          {copy.discuss[lang]}
        </Action>
        <Action to={href(lang, "partners")}>{txt(lang, "partners")}</Action>
      </div>
    </>
  );
}

function History({ lang }: LanguageProps) {
  return (
    <ol className="archive-timeline">
      {company.history.map((event, i) => {
        const [year, ...title] = event.title[lang].split(" · ");
        const related = news.find((article) => article.source === event.source);
        return (
          <li
            key={event.source}
            id={"event-" + (i + 1)}
            data-photo={related ? "true" : undefined}
          >
            <div className="archive-date">
              <bdi>{year}</bdi>
            </div>
            <div className="archive-entry">
              <h2>{title.join(" · ") || year}</h2>
              <p>{event.body[lang]}</p>
              <div className="archive-links">
                {related && (
                  <Action to={href(lang, "news/" + related.slug)}>
                    {copy.reports[lang]}
                  </Action>
                )}
                <Source lang={lang} url={event.source} />
              </div>
            </div>
            {related && (
              <Figure
                lang={lang}
                src={related.image}
                alt={caption(lang, related.image) || related.title[lang]}
                caption={caption(lang, related.image) || copy.archive[lang]}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function PersonRow({
  person,
  lang,
  primary = false,
}: LanguageProps & { person: Person; primary?: boolean }) {
  const Heading = primary ? "h2" : "h3";
  return (
    <article className="cp-person">
      {person.photo && (
        <div className="cp-portrait">
          <Photo src={person.photo} alt={person.name[lang]} sizes="18rem" />
        </div>
      )}
      <div>
        <p className="cp-meta">{person.role[lang]}</p>
        <Heading>{person.name[lang]}</Heading>
        <p>{person.bio[lang]}</p>
        <Action to={href(lang, "team/" + person.slug)}>
          {txt(lang, "biography")}
        </Action>
      </div>
    </article>
  );
}

function Leadership({ lang }: LanguageProps) {
  const leaders = company.people.filter(
    (person) => person.group === "leadership",
  );
  return (
    <>
      <section
        className="leadership-register"
        aria-label={txt(lang, "leadership")}
      >
        <div className="leadership-profiles">
          {leaders.map((person) => (
            <PersonRow lang={lang} person={person} primary key={person.slug} />
          ))}
        </div>
        <Figure
          lang={lang}
          src="/images/archive-briefing.webp"
          alt={caption(lang, "/images/archive-briefing.webp")}
          caption={caption(lang, "/images/archive-briefing.webp")}
        />
      </section>
      <section className="company-capabilities cp-block">
        <div>
          <h2>{copy.principles[lang]}</h2>
          <p>{copy.partnershipText[lang]}</p>
        </div>
        <div className="company-capability-links">
          <Action to={href(lang, "about")}>{txt(lang, "about")}</Action>
          <Action to={href(lang, "team")}>{txt(lang, "team")}</Action>
        </div>
      </section>
    </>
  );
}

function Team({ lang }: LanguageProps) {
  const reports = news.filter((article) => article.project);
  const interviews = company.people.flatMap((person) => {
    const article = news.find((item) => item.slug === person.interviewSlug);
    return article ? [{ person, article }] : [];
  });
  return (
    <>
      <Culture lang={lang} />
      {reports.length > 0 && (
        <section className="cp-block team-field-reports">
          <h2>{copy.reports[lang]}</h2>
          <NewsIndex lang={lang} articles={reports} />
        </section>
      )}
      {(["leadership", "team"] as const).map((group) => {
        const people = company.people.filter(
          (person) => person.group === group,
        );
        return (
          people.length > 0 && (
            <section className="cp-people-section" key={group}>
              <h2>
                {group === "leadership"
                  ? txt(lang, "leadership")
                  : txt(lang, "teamTag")}
              </h2>
              {people.map((person) => (
                <PersonRow key={person.slug} lang={lang} person={person} />
              ))}
            </section>
          )
        );
      })}
      <Sites lang={lang} />
      {interviews.length > 0 && (
        <section className="cp-interviews">
          <h2>{txt(lang, "interviews")}</h2>
          <div className="crosslinks">
            {interviews.map(({ person, article }) => (
              <Action key={person.slug} to={href(lang, "news/" + article.slug)}>
                {article.title[lang]} · {person.name[lang]}
              </Action>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Biography({ lang, person }: LanguageProps & { person: Person }) {
  const firstEvent = company.history[0];
  return (
    <>
      <article className="biography-profile">
        <section>
          <h2>{txt(lang, "biography")}</h2>
          <p className="cp-lede">{person.bio[lang]}</p>
          {person.experience?.[lang] && (
            <div className="cp-profile-detail">
              <h3>{copy.experience[lang]}</h3>
              <p>{person.experience[lang]}</p>
            </div>
          )}
          {person.achievements?.[lang] && (
            <div className="cp-profile-detail">
              <h3>{copy.achievements[lang]}</h3>
              <p>{person.achievements[lang]}</p>
            </div>
          )}
          {person.interviewSlug && (
            <Action to={href(lang, "news/" + person.interviewSlug)}>
              {txt(lang, "interviews")}
            </Action>
          )}
          <Source lang={lang} url={person.source} />
        </section>
        <aside>
          {person.photo && (
            <div className="cp-portrait">
              <Photo
                src={person.photo}
                alt={person.name[lang]}
                sizes="(max-width:760px) 90vw, 28vw"
              />
            </div>
          )}
          <p className="cp-meta">{txt(lang, "leadership")}</p>
          <strong>{person.role[lang]}</strong>
          {firstEvent && (
            <div>
              <p className="cp-meta">{copy.historyLead[lang]}</p>
              <span className="bio-year">
                <bdi>{firstEvent.title[lang].split(" · ")[0]}</bdi>
              </span>
              <p>{firstEvent.title[lang].split(" · ").slice(1).join(" · ")}</p>
              <Action to={href(lang, "history")}>{txt(lang, "history")}</Action>
            </div>
          )}
        </aside>
      </article>
      <RelatedSections lang={lang} entries={["leadership", "team"]} />
    </>
  );
}

function Partners({ lang }: LanguageProps) {
  return (
    <>
      {company.partnerDirectory.length > 0 && (
        <section
          className="cp-logo-directory"
          aria-label={copy.partnerList[lang]}
        >
          <div className="partners-preface">
            <h2>{copy.partnership[lang]}</h2>
            <p>{copy.partnershipText[lang]}</p>
          </div>
          {(["customer", "supplier", "partner"] as const).map((group) => {
            const members = company.partnerDirectory.filter(
              (item) => item.group === group,
            );
            if (!members.length) return null;
            return (
              <div className="cp-logo-row" id={"partners-" + group} key={group}>
                <h2>{copy[group][lang]}</h2>
                <ul>
                  {members.map((member) => (
                    <li key={member.name}>
                      <span className="cp-catalogue-logo">
                        <Photo
                          src={member.stripLogo || member.logo}
                          alt=""
                          sizes="(max-width:760px) 32vw, 13rem"
                        />
                      </span>
                      <span dir="auto">{member.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <Source lang={lang} url="https://roinworld.ae/partneri/" />
        </section>
      )}
      <section className="cp-partners">
        <h2>{copy.directoryOfPartners[lang]}</h2>
        <div className="cp-register">
          {company.partners.map((partner) => {
            const project = projects.find(
              (item) => item.slug === partner.project,
            );
            return (
              <article key={partner.name}>
                <div>
                  {partner.logo && (
                    <span className="cp-partner-logo">
                      <Photo src={partner.logo} alt="" sizes="10rem" />
                    </span>
                  )}
                  <h3 dir="auto">{partner.name}</h3>
                </div>
                <div>
                  <p>{partner.detail[lang]}</p>
                  {project && (
                    <Action to={href(lang, "projects/" + project.slug)}>
                      {project.title[lang]} · {project.country[lang]}
                    </Action>
                  )}
                  <Source lang={lang} url={partner.source} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <div className="cp-invitation">
        <Action to={href(lang, "contacts")} light>
          {copy.discuss[lang]}
        </Action>
      </div>
    </>
  );
}

function Certificates({ lang }: LanguageProps) {
  return (
    <section className="cp-library">
      <h2>{copy.docRegister[lang]}</h2>
      <div className="cp-docs-grid">
        {certificates.map((doc) => (
          <article id={doc.slug} key={doc.slug} className="document-folio">
            <a
              className="cp-scan"
              href={publicUrl(doc.file)}
              aria-label={doc.title + " · " + txt(lang, "openDoc")}
              target="_blank"
              rel="noreferrer"
            >
              {doc.preview ? (
                <Photo
                  src={doc.preview}
                  alt=""
                  sizes="(max-width: 700px) 75vw, 21vw"
                />
              ) : (
                <Icon name="file" size={45} />
              )}
            </a>
            <div className="document-title">
              <h3>
                <bdi>{doc.title}</bdi>
              </h3>
              <p>{doc.summary[lang]}</p>
            </div>
            <dl>
              {doc.issuer && (
                <>
                  <dt>{copy.issuer[lang]}</dt>
                  <dd dir="auto">{doc.issuer}</dd>
                </>
              )}
              {doc.holder && (
                <>
                  <dt>{copy.holder[lang]}</dt>
                  <dd dir="auto">{doc.holder}</dd>
                </>
              )}
              {doc.issued && (
                <>
                  <dt>{copy.issued[lang]}</dt>
                  <dd>
                    <ArticleDate lang={lang} date={doc.issued} />
                  </dd>
                </>
              )}
              {doc.expires && (
                <>
                  <dt>{copy.expires[lang]}</dt>
                  <dd>
                    <ArticleDate lang={lang} date={doc.expires} />
                  </dd>
                </>
              )}
            </dl>
            <div className="cp-scan-actions">
              <a href={publicUrl(doc.file)} target="_blank" rel="noreferrer">
                {txt(lang, "openDoc")} <Icon name="diagonal" size={15} />
              </a>
              <a href={publicUrl(doc.file)} download>
                {copy.download[lang]} <Icon name="file" size={15} />
              </a>
            </div>
            {doc.source && <Source lang={lang} url={doc.source} />}
          </article>
        ))}
      </div>
      {!certificates.length && <p>{copy.documentsEmpty[lang]}</p>}
      <div className="cp-invitation">
        <Action to={href(lang, "contacts")} light>
          {copy.documentAction[lang]}
        </Action>
      </div>
    </section>
  );
}

function recruitmentLink(lang: Lang, title?: string) {
  const office = company.offices.find((entry) => entry.email);
  return office
    ? "mailto:" +
        office.email +
        "?subject=" +
        encodeURIComponent(title ?? copy.careerSubject[lang])
    : href(lang, "contacts");
}

function Careers({ lang, slug }: LanguageProps & { slug?: string }) {
  if (slug) {
    const vacancy = vacancies.find((item) => item.slug === slug);
    if (!vacancy) notFound();
    return (
      <>
        <article className="cp-job-detail cp-split">
          <section className="cp-copy">
            <h2>{copy.positionDescription[lang]}</h2>
            <p className="cp-lede">{vacancy.body[lang]}</p>
            {vacancy.responsibilities?.[lang] && (
              <div>
                <h2>{copy.responsibilities[lang]}</h2>
                <p>{vacancy.responsibilities[lang]}</p>
              </div>
            )}
            {vacancy.requirements?.[lang] && (
              <div>
                <h2>{copy.requirements[lang]}</h2>
                <p>{vacancy.requirements[lang]}</p>
              </div>
            )}
            {vacancy.source && <Source lang={lang} url={vacancy.source} />}
            <div>
              <Action to={href(lang, "careers") + "#vacancies"}>
                {txt(lang, "vacancies")}
              </Action>
            </div>
          </section>
          <section className="cp-application cp-copy">
            <h2>{copy.application[lang]}</h2>
            <p>{copy.applicationText[lang]}</p>
            <div className="vacancy-facts">
              <span>{copy.location[lang]}</span>
              <strong>{vacancy.location[lang]}</strong>
              {vacancy.department?.[lang] && (
                <>
                  <span>{copy.department[lang]}</span>
                  <strong>{vacancy.department[lang]}</strong>
                </>
              )}
            </div>
            <Action to={recruitmentLink(lang, vacancy.title[lang])}>
              {copy.apply[lang]}
            </Action>
          </section>
        </article>
        <Culture lang={lang} />
      </>
    );
  }
  return (
    <>
      <section className="vacancy-board" id="vacancies">
        <h2>{txt(lang, "vacancies")}</h2>
        {vacancies.length ? (
          <CorporateDirectory
            layout="jobs"
            labels={{
              category: copy.department[lang],
              location: copy.location[lang],
              all: copy.all[lang],
              empty: copy.noMatches[lang],
              clear: copy.clear[lang],
              results: copy.results[lang],
            }}
            entries={vacancies.map((vacancy) => ({
              id: vacancy.slug,
              category: vacancy.department?.[lang] || "",
              location: vacancy.location[lang],
              card: (
                <article>
                  <div>
                    <p className="cp-meta">
                      {vacancy.department?.[lang] || vacancy.location[lang]}
                    </p>
                    <h3>
                      <a href={href(lang, "careers/" + vacancy.slug)}>
                        {vacancy.title[lang]}
                      </a>
                    </h3>
                  </div>
                  <span className="vacancy-location">
                    {vacancy.location[lang]}
                  </span>
                  <Action to={href(lang, "careers/" + vacancy.slug)}>
                    {copy.readPosition[lang]}
                  </Action>
                </article>
              ),
            }))}
          />
        ) : (
          <p>{txt(lang, "vacancyEmpty")}</p>
        )}
      </section>
      <div className="cp-block recruitment-culture">
        <Figure
          lang={lang}
          src={home.teamImage}
          alt={caption(lang, home.teamImage)}
          caption={caption(lang, home.teamImage)}
        />
        <div className="cp-copy">
          <h2>{copy.workInCompany[lang]}</h2>
          <p>{copy.cultureText[lang]}</p>
          <Action to={href(lang, "team")}>{txt(lang, "team")}</Action>
        </div>
        <div>
          <h3>{txt(lang, "services")}</h3>
          <div className="cp-service-list">
            {services.map((service) => (
              <Action
                key={service.slug}
                to={href(lang, "services/" + service.slug)}
              >
                {service.title[lang]}
              </Action>
            ))}
          </div>
        </div>
      </div>
      <div className="cp-application cp-block cp-copy">
        <h2>{copy.application[lang]}</h2>
        <p>{copy.applicationText[lang]}</p>
        <Action to={recruitmentLink(lang)}>{copy.apply[lang]}</Action>
      </div>
    </>
  );
}

function NewsCard({ lang, article }: LanguageProps & { article: Article }) {
  const to = href(lang, "news/" + article.slug);
  return (
    <article>
      <a href={to} className="cp-news-thumb" aria-label={article.title[lang]}>
        <Photo
          src={article.image}
          alt=""
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 33vw, 25vw"
        />
      </a>
      <div>
        <div className="cp-news-meta">
          <ArticleDate date={article.date} lang={lang} />
          {article.category?.[lang] && <span>{article.category[lang]}</span>}
        </div>
        <h3>
          <a href={to}>{article.title[lang]}</a>
        </h3>
        <p>{article.body[lang]}</p>
      </div>
      <a href={to} className="cp-news-open" aria-label={article.title[lang]}>
        <Icon name="arrow" size={23} />
      </a>
    </article>
  );
}

function NewsIndex({
  lang,
  articles,
}: LanguageProps & { articles: Article[] }) {
  return (
    <div className="cp-news-list">
      {articles.map((article) => (
        <NewsCard lang={lang} article={article} key={article.slug} />
      ))}
    </div>
  );
}

function News({ lang, slug }: LanguageProps & { slug?: string }) {
  if (!slug)
    return (
      <section>
        <h2>{copy.viewAll[lang]}</h2>
        <CorporateDirectory
          layout="news"
          labels={{
            category: copy.category[lang],
            all: copy.all[lang],
            empty: copy.noMatches[lang],
            clear: copy.clear[lang],
            results: copy.results[lang],
          }}
          entries={news.map((article) => ({
            id: article.slug,
            category: article.category?.[lang] || copy.lastCategory[lang],
            card: <NewsCard lang={lang} article={article} />,
          }))}
        />
      </section>
    );
  const article = news.find((item) => item.slug === slug);
  if (!article) notFound();
  const project = projects.find((item) => item.slug === article.project);
  return (
    <>
      <article className="cp-story publication-story">
        <div className="cp-body">
          <div className="cp-news-meta">
            <ArticleDate lang={lang} date={article.date} />
            {article.category?.[lang]}
          </div>
          <p className="cp-lede">{article.body[lang]}</p>
          <Source lang={lang} url={article.source} />
        </div>
        <aside className="cp-story-links">
          {article.video && (
            <figure className="publication-media">
              <div className="publication-player">
                <Photo
                  src={article.image}
                  alt={caption(lang, article.image) || article.title[lang]}
                  sizes="(max-width:760px) 90vw, 56vw"
                />
                <MediaButton
                  url={article.video}
                  title={article.title[lang]}
                  playLabel={txt(lang, "watch")}
                  closeLabel={txt(lang, "close")}
                  externalLabel={txt(lang, "externalVideo")}
                  poster={article.image}
                />
              </div>
              <figcaption>
                {caption(lang, article.image) || article.title[lang]}
              </figcaption>
            </figure>
          )}
          {project && (
            <Action to={href(lang, "projects/" + project.slug)}>
              {project.title[lang]} · {project.country[lang]}
            </Action>
          )}
        </aside>
      </article>
      {news.length > 1 && (
        <section className="cp-related-news">
          <h2>{copy.archiveMore[lang]}</h2>
          <NewsIndex
            lang={lang}
            articles={news.filter((item) => item.slug !== slug).slice(0, 2)}
          />
        </section>
      )}
    </>
  );
}

function Contacts({ lang }: LanguageProps) {
  return (
    <>
      <nav className="cp-contact-choices" aria-label={copy.contactTopics[lang]}>
        <a href="#offices">
          {copy.officeDirectory[lang]} <Icon name="right" size={18} />
        </a>
        <a href="#enquiry">
          {copy.write[lang]} <Icon name="right" size={18} />
        </a>
        <a href={href(lang, "careers")}>
          {txt(lang, "careers")} <Icon name="right" size={18} />
        </a>
      </nav>
      <div className="cp-contacts">
        <section id="offices">
          <h2>{txt(lang, "offices")}</h2>
          <div className="cp-offices">
            {company.offices.map((office, index) => (
              <details
                key={office.label.en}
                className="office-entry"
                name="office-list"
                open={index === 0}
              >
                <summary>
                  <span>{office.label[lang]}</span>
                  <Icon name="plus" size={21} />
                </summary>
                <address>
                  <p>{office.address[lang]}</p>
                  <div>
                    {office.phone && (
                      <a href={"tel:" + office.phone.replace(/[^\d+]/g, "")}>
                        <bdi>{office.phone}</bdi>
                      </a>
                    )}
                    {office.email && (
                      <a href={"mailto:" + office.email}>
                        <bdi>{office.email}</bdi>
                      </a>
                    )}
                  </div>
                </address>
                <OfficeMap
                  url={office.mapEmbed}
                  name={copy.mapArea[lang] + " · " + office.label[lang]}
                  show={copy.loadMap[lang]}
                  hide={copy.hideMap[lang]}
                />
              </details>
            ))}
          </div>
        </section>
        <aside id="enquiry">
          <ContactForm lang={lang} enabled={contactEnabled()} />
        </aside>
      </div>
    </>
  );
}

function Privacy({ lang }: LanguageProps) {
  return (
    <div className="policy-layout">
      <nav aria-label={copy.onThisPage[lang]}>
        <h2>{copy.onThisPage[lang]}</h2>
        <a href="#requests">{copy.requests[lang]}</a>
        <a href="#policy-status">{copy.policyStatus[lang]}</a>
      </nav>
      <div className="cp-policy">
        <section id="requests">
          <h2>{copy.requests[lang]}</h2>
          <p>{txt(lang, "privacyText")}</p>
          <p>{copy.mapPrivacy[lang]}</p>
        </section>
        <section id="policy-status">
          <h2>{copy.policyStatus[lang]}</h2>
          <p>{txt(lang, "privacyPending")}</p>
        </section>
        <Action to={href(lang, "contacts")}>{txt(lang, "contactUs")}</Action>
      </div>
    </div>
  );
}

export function CompanyPages({ lang, path }: Props) {
  const [section, slug] = path.split("/");
  let page;
  switch (section) {
    case "about":
      page = <About lang={lang} />;
      break;
    case "history":
      page = <History lang={lang} />;
      break;
    case "leadership":
      page = <Leadership lang={lang} />;
      break;
    case "team": {
      if (!slug) {
        page = <Team lang={lang} />;
        break;
      }
      const person = company.people.find((item) => item.slug === slug);
      if (!person) notFound();
      page = <Biography lang={lang} person={person} />;
      break;
    }
    case "partners":
      page = <Partners lang={lang} />;
      break;
    case "certificates":
      page = <Certificates lang={lang} />;
      break;
    case "careers":
      page = <Careers lang={lang} slug={slug} />;
      break;
    case "news":
      page = <News lang={lang} slug={slug} />;
      break;
    case "contacts":
      page = <Contacts lang={lang} />;
      break;
    case "privacy":
      page = <Privacy lang={lang} />;
      break;
    default:
      notFound();
  }
  return (
    <div
      className="company-pages"
      data-chapter-body={section}
      data-detail={slug ? "true" : undefined}
    >
      <div className="shell">{page}</div>
    </div>
  );
}
