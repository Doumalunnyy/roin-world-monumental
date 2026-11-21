import { services, href, txt, type Lang } from "@/lib/content";
import { Photo } from "./Media";
import { Icon } from "./Icons";
export function ExpertiseGrid({ lang }: { lang: Lang }) {
  return (
    <div className="expertise-grid">
      {services.map((s) => (
        <a
          className="expertise-card"
          href={href(lang, "services/" + s.slug)}
          key={s.slug}
        >
          <Photo
            src={s.image}
            alt=""
            sizes="(max-width:580px) 100vw,(max-width:1000px) 50vw,25vw"
          />
          <div className="expertise-shade" />
          <span className="service-number" dir="ltr">
            / {s.index}
          </span>
          <div className="card-copy">
            <h3>{s.title[lang]}</h3>
            <p>{s.summary[lang]}</p>
            <span className="card-link">
              {txt(lang, "more")}
              <Icon name="arrow" size={17} />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
