import { home, projects, href, txt, type Lang } from "@/lib/content";
import { caption } from "@/lib/features";
import { Photo, MediaButton } from "./Media";
import { OfficialArchives } from "./OfficialArchives";
import { Icon } from "./Icons";
import "./media-archive.css";

export function MediaArchive({ lang }: { lang: Lang }) {
  return <div className="media-archive">
    <section>
      <h2>{txt(lang,"gallery")}</h2>
      <div className="media-archive-photos">
        {projects.map(project => {
          const image = project.gallery[0]?.image || project.image;
          const credit = project.gallery[0]?.caption[lang] || caption(lang, image);
          return <a key={project.slug} href={href(lang,"projects/" + project.slug) + "#case-media"}>
            <figure>
              <div className="media-archive-frame"><Photo src={image} alt={credit || project.title[lang]} sizes="(max-width:700px) 94vw, 32vw" /></div>
              <figcaption><strong>{project.title[lang]} <Icon name="arrow" size={16}/></strong>{credit && <small>{credit}</small>}</figcaption>
            </figure>
          </a>;
        })}
      </div>
    </section>
    <section className="media-archive-video">
      <h2>{txt(lang,"video")}</h2>
      <div>
        <MediaButton url={home.film} title={txt(lang,"filmTitle")} playLabel={txt(lang,"film")} closeLabel={txt(lang,"close")} externalLabel={txt(lang,"externalVideo")}/>
        {projects.flatMap(project => project.videos.map(video => video.external ?
          <a className="archive-video-out" key={video.url} href={video.url}>{video.title[lang]} <Icon name="diagonal" size={16}/></a> :
          <MediaButton key={video.url} url={video.url} title={video.title[lang]} poster={video.poster}
            playLabel={video.title[lang]} closeLabel={txt(lang,"close")} externalLabel={txt(lang,"externalVideo")}/>))}
      </div>
    </section>
    <OfficialArchives lang={lang} section="media"/>
  </div>;
}
