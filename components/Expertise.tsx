import { services, href, type Lang } from "@/lib/content";
import { Photo } from "./Media";
import { Icon } from "./Icons";
import labels from "@/content/showcase-ui.json";

export function ExpertiseGrid({ lang }: { lang: Lang }) {
  return (
    <div className="discipline-ribbon">
      {services.map((service) => (
        <a key={service.slug} className="discipline-panel" href={href(lang, "services/" + service.slug)}>
          <div className="discipline-photo">
            <Photo src={service.image} alt="" sizes="(max-width:640px) 100vw,(max-width:1150px) 48vw,22vw"/>
          </div>
          <div className="discipline-story">
            <h3>{service.title[lang]}</h3>
            <p>{service.summary[lang]}</p>
            {service.illustrative && <small>{labels[lang].illustration}</small>}
            <Icon name="arrow" size={17}/>
          </div>
        </a>
      ))}
    </div>
  );
}
