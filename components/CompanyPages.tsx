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
import { CorporateDirectory } from "./CorporateDirectory";
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
  return (
    <>
      <section className="cp-introduction cp-split">
        <div>
          <h2>{copy.companyProfile[lang]}</h2>
          <p className="cp-lede">{copy.companyProfileText[lang]}</p>
          <Action to={href(lang, "projects")}>{txt(lang, "projects")}</Action>
        </div>
        <div className="cp-copy">
          <h3>{copy.mission[lang]}</h3>
          <p>{copy.missionText[lang]}</p>
          <Source lang={lang} url="https://roinworld.ae/o-kompanii/" />
        </div>
      </section>
      <section className="cp-principles">
        <h2>{copy.principles[lang]}</h2>
        <div className="cp-principle-body">
          <article>
            <h3>{copy.quality[lang]}</h3>
            <p>{copy.qualityText[lang]}</p>
          </article>
          <article>
            <h3>{copy.partnership[lang]}</h3>
            <p>{copy.partnershipText[lang]}</p>
          </article>
        </div>
      </section>
      <div className="cp-block cp-split">
        <section>
          <h2>{copy.historyLead[lang]}</h2>
          <ol className="cp-milestones">
            {company.history.map((event) => (
              <li key={event.source}>
                <span>{event.title[lang]}</span>
              </li>
            ))}
          </ol>
          <Action to={href(lang, "history")}>{txt(lang, "history")}</Action>
        </section>
        <section>
          <h2>{txt(lang, "services")}</h2>
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
        </section>
      </div>
      <Sites lang={lang} />
      <Culture lang={lang} />
      <section className="cp-block">
        <h2>{copy.capabilityDocs[lang]}</h2>
        <div className="cp-standards">
          {certificates.map((doc) => (
            <a
              href={href(lang, "certificates") + "#" + doc.slug}
              key={doc.slug}
            >
              {doc.title}
            </a>
          ))}
        </div>
        <RelatedSections lang={lang} entries={["leadership", "partners"]} />
      </section>
      <div className="cp-invitation">
        <Action to={href(lang, "contacts")} light>
          {copy.discuss[lang]}
        </Action>
      </div>
    </>
  );
}

function History({ lang }: LanguageProps) {
  return (
    <ol className="archive-timeline">
      {company.history.map((event, i) => {
        const [year, ...label] = event.title[lang].split(" · ");
        const related = news.find((article) => article.source === event.source);
        return <li key={event.source} id={"event-" + (i + 1)}>
          <div className="archive-date">{year}</div>
          <div className="archive-entry">
            <h2>{label.join(" · ") || year}</h2><p>{event.body[lang]}</p>
            {related && <Action to={href(lang,"news/"+related.slug)}>{copy.reports[lang]}</Action>}
            <Source lang={lang} url={event.source} />
          </div>
          {related && <Figure lang={lang} src={related.image}
            alt={caption(lang,related.image) || related.title[lang]}
            caption={caption(lang,related.image) || copy.archive[lang]} />}
        </li>;
      })}
    </ol>
  );
}

function PersonRow({ person, lang }: LanguageProps & { person: Person }) {
  return (
    <article className="cp-person">
      {person.photo && (
        <div className="cp-portrait">
          <Photo src={person.photo} alt={person.name[lang]} sizes="18rem" />
        </div>
      )}
      <div>
        <p className="cp-meta">{person.role[lang]}</p>
        <h3>{person.name[lang]}</h3>
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
      <section className="cp-leadership">
        {leaders.map((person) => (
          <PersonRow lang={lang} person={person} key={person.slug} />
        ))}
      </section>
      <div className="cp-block cp-split">
        <div className="cp-copy">
          <h2>{copy.principles[lang]}</h2>
          <p>{copy.partnershipText[lang]}</p>
          <Action to={href(lang, "about")}>{txt(lang, "about")}</Action>
        </div>
        <div className="cp-copy">
          <h2>{copy.culture[lang]}</h2>
          <p>{copy.cultureText[lang]}</p>
          <Action to={href(lang, "team")}>{txt(lang, "team")}</Action>
        </div>
      </div>
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
      {reports.length > 0 && (
        <section className="cp-block">
          <h2>{copy.reports[lang]}</h2>
          <NewsIndex lang={lang} articles={reports} />
        </section>
      )}
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
  return (
    <div className="cp-bio">
      {person.photo && (
        <div className="cp-portrait">
          <Photo src={person.photo} alt={person.name[lang]} sizes="30rem" />
        </div>
      )}
      <div>
        <h2>{txt(lang, "biography")}</h2>
        <p className="cp-lede">{person.bio[lang]}</p>
        {person.experience?.[lang] && (
          <section className="cp-profile-detail">
            <h3>{copy.experience[lang]}</h3>
            <p>{person.experience[lang]}</p>
          </section>
        )}
        {person.achievements?.[lang] && (
          <section className="cp-profile-detail">
            <h3>{copy.achievements[lang]}</h3>
            <p>{person.achievements[lang]}</p>
          </section>
        )}
        {person.interviewSlug && (
          <p>
            <Action to={href(lang, "news/" + person.interviewSlug)}>
              {txt(lang, "interviews")}
            </Action>
          </p>
        )}
        <Source lang={lang} url={person.source} />
      </div>
      <RelatedSections lang={lang} entries={["leadership", "team"]} />
    </div>
  );
}

function Partners({ lang }: LanguageProps) {
  return (
    <>
      {company.partnerDirectory.length > 0 && (
        <section className="cp-logo-directory" aria-label={copy.partnerList[lang]}>
          {(["customer", "supplier", "partner"] as const).map((group) => {
            const members = company.partnerDirectory.filter((item) => item.group === group);
            if (!members.length) return null;
            return (
              <div className="cp-logo-row" key={group}>
                <h2>{copy[group][lang]}</h2>
                <ul>{members.map((member) => (
                  <li key={member.name}>
                    <span className="cp-catalogue-logo"><Photo src={member.logo} alt="" sizes="13rem" /></span>
                    <span dir="auto">{member.name}</span>
                  </li>
                ))}</ul>
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
          <article id={doc.slug} key={doc.slug}>
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
            <h3>{doc.title}</h3>
            <p>{doc.summary[lang]}</p>
            <dl>
              {doc.issuer && <><dt>{copy.issuer[lang]}</dt><dd dir="auto">{doc.issuer}</dd></>}
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
      <article className="cp-job-detail cp-split">
        <section className="cp-copy">
          <p className="cp-meta">
            {vacancy.location[lang]}
            {vacancy.department?.[lang] && " · " + vacancy.department[lang]}
          </p>
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
        </section>
        <section className="cp-application cp-copy">
          <h2>{copy.application[lang]}</h2>
          <p>{copy.applicationText[lang]}</p>
          <Action to={recruitmentLink(lang, vacancy.title[lang])}>
            {copy.apply[lang]}
          </Action>
        </section>
      </article>
    );
  }
  return (
    <>
      <div className="cp-introduction cp-split">
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
      <section className="cp-block" id="vacancies">
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
            }}
            entries={vacancies.map((vacancy) => ({
              id: vacancy.slug,
              category: vacancy.department?.[lang] || "",
              location: vacancy.location[lang],
              card: (
                <article>
                  <div>
                    <p className="cp-meta">{vacancy.location[lang]}</p>
                    <h3>
                      <a href={href(lang, "careers/" + vacancy.slug)}>
                        {vacancy.title[lang]}
                      </a>
                    </h3>
                  </div>
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
          sizes="(max-width: 600px) 92vw, 24vw"
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
      <article className="cp-article cp-story">
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
            <div className="cp-video-link">
              <MediaButton
                url={article.video}
                title={article.title[lang]}
                playLabel={txt(lang, "watch")}
                closeLabel={txt(lang, "close")}
                externalLabel={txt(lang, "externalVideo")}
                poster={article.image}
              />
            </div>
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
              <details key={office.label.en} className="office-entry" name="office-list" open={index === 0}>
                <summary><span>{office.label[lang]}</span><Icon name="plus" size={21}/></summary>
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
    <section className="cp-reading cp-policy">
      <h2>{copy.requests[lang]}</h2>
      <p>{txt(lang, "privacyText")}</p>
      <h2>{copy.policyStatus[lang]}</h2>
      <p>{txt(lang, "privacyPending")}</p>
      <Action to={href(lang, "contacts")}>{txt(lang, "contactUs")}</Action>
    </section>
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
    <div className="company-pages" data-chapter-body={section} data-detail={slug ? "true" : undefined}>
      <div className="shell">{page}</div>
    </div>
  );
}
