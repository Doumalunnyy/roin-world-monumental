import { services, href, type Lang } from "@/lib/content";
import { Photo } from "./Media";
import { Icon } from "./Icons";
import labels from "@/content/showcase-ui.json";

export function ExpertiseGrid({ lang }: { lang: Lang }) {
  const [lead, ...disciplines] = services;
  if (!lead) return null;
  return (
    <div className="discipline-spread">
      <a className="discipline-major" href={href(lang, "services/" + lead.slug)}>
        <div className="discipline-image"><Photo src={lead.image} alt="" sizes="(max-width:780px) 100vw, 54vw" /></div>
        <div className="discipline-caption">
          <div><h3>{lead.title[lang]}</h3><p>{lead.summary[lang]}</p></div>
          <Icon name="arrow" size={24} />
        </div>
        {lead.illustrative && <small>{labels[lang].illustration}</small>}
      </a>
      <div className="discipline-index">
        {disciplines.map((service) => (
          <a key={service.slug} href={href(lang, "services/" + service.slug)}>
            <div className="discipline-thumbnail"><Photo src={service.image} alt="" sizes="(max-width:780px) 24vw, 9vw" /></div>
            <div className="discipline-description"><h3>{service.title[lang]}</h3><p>{service.summary[lang]}</p>
              {service.illustrative && <small>{labels[lang].illustration}</small>}
            </div>
            <Icon name="arrow" size={19} />
          </a>
        ))}
      </div>
    </div>
  );
}
