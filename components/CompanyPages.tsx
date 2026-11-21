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
  txt,
  vacancies,
  type Key,
  type Lang,
  type Person,
} from "@/lib/content";
import { contactEnabled } from "@/lib/contact";
import { ContactForm } from "./ContactForm";
import { Icon } from "./Icons";
import { MediaButton, Photo } from "./Media";
import { Action } from "./Shared";
import "./company-pages.css";

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
        <a href={publicUrl("/images/credits.html?lang=" + lang)}>{copy.imageCredit[lang]}</a>
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

function About({ lang }: LanguageProps) {
  return (
    <>
      <div className="cp-spread">
        <div className="cp-copy">
          <h2>{home.about[lang]}</h2>
          <p>{home.aboutText[lang]}</p>
          <Action to={href(lang, "services")}>
            {txt(lang, "servicesHeading")}
          </Action>
        </div>
        <Figure
          lang={lang}
          src={home.hero}
          alt={home.heroAlt[lang]}
          caption={home.heroAlt[lang]}
        />
      </div>
      <section className="cp-principles">
        <div>
          <h2>{copy.principles[lang]}</h2>
          <Source lang={lang} url="https://roinworld.ae/" />
        </div>
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
      <RelatedSections
        lang={lang}
        entries={["history", "leadership", "partners", "certificates"]}
      />
    </>
  );
}

function History({ lang }: LanguageProps) {
  return (
    <div className="cp-editorial">
      <aside>
        <Figure
          lang={lang}
          src={home.hero}
          alt={home.heroAlt[lang]}
          caption={home.heroAlt[lang]}
        />
      </aside>
      <ol className="cp-timeline">
        {company.history.map((event) => {
          const [year, ...label] = event.title[lang].split(" · ");
          return (
            <li key={event.source}>
              {label.length > 0 && <span className="cp-year">{year}</span>}
              <div>
                <h2>{label.length ? label.join(" · ") : year}</h2>
                <p>{event.body[lang]}</p>
                <Source lang={lang} url={event.source} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
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
  return (
    <div className="cp-leadership">
      {company.people
        .filter((p) => p.group === "leadership")
        .map((person) => (
          <PersonRow lang={lang} person={person} key={person.slug} />
        ))}
      <RelatedSections lang={lang} entries={["team", "history"]} />
    </div>
  );
}

function Team({ lang }: LanguageProps) {
  const story = news.find(
    (article) => article.slug === "rooppur-training-building",
  );
  const managers = company.people.filter(
    (person) => person.group === "leadership",
  );
  const specialists = company.people.filter(
    (person) => person.group === "team",
  );
  return (
    <>
      <div className="cp-team">
        <Figure
          lang={lang}
          src={home.teamImage}
          alt={copy.teamPhoto[lang]}
          caption={txt(lang, "photoDemo")}
        />
        <section className="cp-copy">
          <p className="cp-meta">{copy.siteArchive[lang]}</p>
          <h2>{story ? story.title[lang] : txt(lang, "teamArchive")}</h2>
          {story && (
            <>
              <ArticleDate lang={lang} date={story.date} />
              <p>{story.body[lang]}</p>
              <Action to={href(lang, "news/" + story.slug)}>
                {txt(lang, "watch")}
              </Action>
            </>
          )}
        </section>
      </div>
      {managers.length > 0 && (
        <section className="cp-people-section">
          <h2>{txt(lang, "leadership")}</h2>
          {managers.map((person) => (
            <PersonRow key={person.slug} lang={lang} person={person} />
          ))}
        </section>
      )}
      {specialists.length > 0 && (
        <section className="cp-people-section">
          <h2>{txt(lang, "teamTag")}</h2>
          {specialists.map((person) => (
            <PersonRow key={person.slug} lang={lang} person={person} />
          ))}
        </section>
      )}
      <section className="cp-interviews">
        <h2>{txt(lang, "interviews")}</h2>
        {company.people.some((person) => person.interviewSlug) ? (
          <div className="crosslinks">
            {company.people.map((person) => {
              const interview = news.find(
                (article) => article.slug === person.interviewSlug,
              );
              return interview ? (
                <Action
                  key={person.slug}
                  to={href(lang, "news/" + interview.slug)}
                >
                  {interview.title[lang]} · {person.name[lang]}
                </Action>
              ) : null;
            })}
          </div>
        ) : (
          <p>{txt(lang, "interviewsPending")}</p>
        )}
      </section>
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
      <div className="cp-register">
        {company.partners.map((partner) => (
          <article key={partner.name}>
            <h2>{partner.name}</h2>
            <div>
              <p>{partner.detail[lang]}</p>
              <Source lang={lang} url={partner.source} />
            </div>
          </article>
        ))}
      </div>
      <RelatedSections lang={lang} entries={["projects", "contacts"]} />
    </>
  );
}

function Certificates({ lang }: LanguageProps) {
  return (
    <section className="cp-documents">
      {certificates.length ? (
        certificates.map((doc) => (
          <a href={publicUrl(doc.file)} key={doc.slug} className="cp-document">
            <span className="cp-document-icon">
              <Icon name="file" size={27} />
            </span>
            <div>
              <h2>{doc.title}</h2>
              <p>{doc.summary[lang]}</p>
            </div>
            <span className="cp-document-link">
              {txt(lang, "openDoc")} <Icon name="diagonal" size={16} />
            </span>
          </a>
        ))
      ) : (
        <p>{copy.documentsEmpty[lang]}</p>
      )}
      <Action to={href(lang, "contacts")}>{txt(lang, "contactUs")}</Action>
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
      <article className="cp-reading">
        <p className="cp-meta">{vacancy.location[lang]}</p>
        <p className="cp-lede">{vacancy.body[lang]}</p>
        <Action to={recruitmentLink(lang, vacancy.title[lang])}>
          {txt(lang, "join")}
        </Action>
      </article>
    );
  }
  return (
    <div className="cp-spread cp-careers">
      <Figure
        lang={lang}
        src={home.careerImage}
        alt={copy.careerPhoto[lang]}
        caption={txt(lang, "photoDemo")}
      />
      <section className="cp-copy">
        <h2>{txt(lang, "vacancies")}</h2>
        {vacancies.length ? (
          <div className="cp-vacancies">
            {vacancies.map((vacancy) => (
              <article key={vacancy.slug}>
                <span className="cp-meta">{vacancy.location[lang]}</span>
                <h3>{vacancy.title[lang]}</h3>
                <Action to={href(lang, "careers/" + vacancy.slug)}>
                  {copy.readPosition[lang]}
                </Action>
              </article>
            ))}
          </div>
        ) : (
          <p>{txt(lang, "vacancyEmpty")}</p>
        )}
        <Action to={recruitmentLink(lang)}>{txt(lang, "join")}</Action>
      </section>
    </div>
  );
}

function articleCaption(lang: Lang, article: Article) {
  if (article.image === home.teamImage) return txt(lang, "photoDemo");
  const project = projects.find((item) => item.image === article.image);
  return project ? project.title[lang] : copy.siteImage[lang];
}

function NewsIndex({
  lang,
  articles,
}: LanguageProps & { articles: Article[] }) {
  return (
    <div className="cp-news-list">
      {articles.map((article) => {
        const to = href(lang, "news/" + article.slug);
        return (
          <article key={article.slug}>
            <a
              href={to}
              className="cp-news-thumb"
              aria-label={
                article.image === home.teamImage
                  ? txt(lang, "photoDemo") + " · " + article.title[lang]
                  : article.title[lang]
              }
            >
              <Photo
                src={article.image}
                alt=""
                sizes="(max-width: 600px) 90vw, 23vw"
              />
              {article.image === home.teamImage && (
                <span className="cp-photo-note">{txt(lang, "photoDemo")}</span>
              )}
            </a>
            <div>
              <ArticleDate date={article.date} lang={lang} />
              <h2>
                <a href={to}>{article.title[lang]}</a>
              </h2>
              <p>{article.body[lang]}</p>
            </div>
            <a
              href={to}
              className="cp-news-open"
              aria-label={article.title[lang]}
            >
              <Icon name="arrow" size={25} />
            </a>
          </article>
        );
      })}
    </div>
  );
}

function News({ lang, slug }: LanguageProps & { slug?: string }) {
  if (!slug) return <NewsIndex lang={lang} articles={news} />;
  const article = news.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <>
      <article className="cp-article">
        <div className="cp-body">
          <ArticleDate lang={lang} date={article.date} />
          <p className="cp-lede">{article.body[lang]}</p>
          <Source lang={lang} url={article.source} />
        </div>
        <div className="cp-article-visual">
          <Figure
            lang={lang}
            src={article.image}
            alt={articleCaption(lang, article)}
            caption={articleCaption(lang, article)}
          />
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
        </div>
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
    <div className="cp-contacts">
      <section>
        <h2>{txt(lang, "offices")}</h2>
        <div className="cp-offices">
          {company.offices.map((office) => (
            <article key={office.label.en}>
              <h3>{office.label[lang]}</h3>
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
            </article>
          ))}
        </div>
      </section>
      <aside>
        <ContactForm lang={lang} enabled={contactEnabled()} />
      </aside>
    </div>
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
    <div className="company-pages">
      <div className="shell">{page}</div>
    </div>
  );
}
