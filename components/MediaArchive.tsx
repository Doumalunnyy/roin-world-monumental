import { home, news, projects, href, txt, type Lang } from "@/lib/content";
import { caption } from "@/lib/features";
import { Photo, MediaButton } from "./Media";
import { OfficialArchives } from "./OfficialArchives";
import { Icon } from "./Icons";
import "./media-archive.css";

const videoLibraries: Record<Lang, string> = {
  ru: "Видеотеки операторов АЭС",
  en: "Nuclear plant operators’ video libraries",
  ar: "مكتبات الفيديو لدى مشغّلي المحطات النووية",
  es: "Videotecas de los operadores nucleares",
  hu: "Az erőművek üzemeltetőinek videótárai",
};

type Film = { url: string; title: string; poster?: string; summary?: string; date?: string; category?: string };

function filmProgramme(lang: Lang) {
  const entries = new Map<string, Film>();
  const libraries = new Map<string, string>();
  if (home.film) entries.set(home.film, { url: home.film, title: txt(lang, "filmTitle") });
  for (const report of news) {
    if (report.video) entries.set(report.video, { url: report.video, title: report.title[lang],
      poster: report.image, summary: report.summary?.[lang], date: report.date, category: report.category?.[lang] });
  }
  for (const project of projects) {
    for (const video of project.videos) {
      if (video.external) libraries.set(video.url, video.title[lang]);
      else if (!entries.has(video.url)) entries.set(video.url, {
        url: video.url, title: video.title[lang], poster: video.poster, category: project.title[lang],
      });
    }
  }
  return { films: Array.from(entries.values()), libraries };
}

function Poster({ film, lang, lead }: { film: Film; lang: Lang; lead: boolean }) {
  const year = film.date?.slice(0, 4);
  return <article className={lead ? "programme-film programme-lead" : "programme-film"}>
    <div className="programme-screen" data-poster={Boolean(film.poster)}>
      <MediaButton url={film.url} title={film.title} playLabel={txt(lang, "watch")}
        closeLabel={txt(lang, "close")} externalLabel={txt(lang, "externalVideo")} poster={film.poster}>
        {film.poster && <Photo src={film.poster} alt="" sizes={lead ? "(max-width:760px) 90vw, 54vw" : "(max-width:760px) 90vw, 42vw"} />}
        <span className="programme-play"><Icon name="play" size={20} /></span>
      </MediaButton>
    </div>
    <div className="programme-caption">
      {(year || film.category) && <div className="programme-meta">
        {year && <time dateTime={year}>{new Intl.NumberFormat(lang, {useGrouping:false}).format(Number(year))}</time>}
        {film.category && <span>{film.category}</span>}
      </div>}
      <h3>{film.title}</h3>
      {film.summary && <p>{film.summary}</p>}
    </div>
  </article>;
}

export function MediaArchive({ lang }: { lang: Lang }) {
  const { films, libraries } = filmProgramme(lang);
  return <div className="media-archive">
    <section className="media-photo-section" aria-labelledby="photo-archive-title">
      <h2 id="photo-archive-title">{txt(lang, "gallery")}</h2>
      <div className="media-archive-photos">
        {projects.map(project => {
          const first = project.gallery[0];
          const image = first?.image || project.coverImage || project.image;
          const credit = first?.caption[lang] || caption(lang, image);
          return <a key={project.slug} href={href(lang,"projects/" + project.slug) + "#case-media"}>
            <figure>
              <div className="media-archive-frame">
                <Photo src={image} alt="" sizes="(max-width:540px) 94vw, (max-width:900px) 45vw, 40vw" />
              </div>
              <figcaption>
                <h3>{project.title[lang]} <Icon name="arrow" size={17}/></h3>
                {credit && <small>{credit}</small>}
              </figcaption>
            </figure>
          </a>;
        })}
      </div>
    </section>
    <section className="media-archive-video" aria-labelledby="video-programme-title">
      <h2 id="video-programme-title">{txt(lang, "video")}</h2>
      <div className="film-programme">
        {films.map((film, index) => <Poster key={film.url} film={film} lang={lang} lead={index === 0} />)}
      </div>
      {libraries.size > 0 && <section className="programme-libraries">
        <h3>{videoLibraries[lang]}</h3>
        <ul>{Array.from(libraries, ([url, title]) => <li key={url}>
          <a href={url} target="_blank" rel="noreferrer">
            <span>{title}</span><bdi>{new URL(url).hostname.replace(/^www\./, "")}</bdi><Icon name="diagonal" size={17}/>
          </a>
        </li>)}</ul>
      </section>}
    </section>
    <OfficialArchives lang={lang} section="media"/>
  </div>;
}
