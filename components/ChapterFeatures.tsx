import { caption } from "@/lib/features";
import { company, href, news, services, txt, type Lang } from "@/lib/content";
import copy from "@/content/company-ui.json";
import { Icon } from "./Icons";
import { MediaButton, Photo } from "./Media";

export function HistoryIndex({ lang }: { lang: Lang }) {
  return <nav className="chapter-years" aria-label={txt(lang, "history")}>
    {company.history.map((event, index) => {
      const [period, ...heading] = event.title[lang].split(" · ");
      return <a key={event.source} href={"#event-" + (index + 1)}>
        <bdi>{period}</bdi><span>{heading.join(" · ")}</span><Icon name="down" size={16}/>
      </a>;
    })}
  </nav>;
}

export function PracticeIndex({ lang }: { lang: Lang }) {
  return <nav className="chapter-services" aria-label={txt(lang, "services")}>
    {services.map(service => <a href={href(lang, "services/" + service.slug)} key={service.slug}>
      <span>{service.title[lang]}</span><Icon name="arrow" size={19}/>
    </a>)}
  </nav>;
}

export function PartnerIndex({ lang }: { lang: Lang }) {
  return <nav className="chapter-partner-types" aria-label={copy.partnerList[lang]}>
    {(["customer", "supplier", "partner"] as const).map(group => {
      const organisation = company.partnerDirectory.find(entry => entry.group === group);
      if (!organisation) return null;
      return <a href={"#partners-" + group} key={group}>
        <span className="chapter-partner-mark">
          <Photo src={organisation.logo} alt={organisation.name} sizes="124px"/>
        </span>
        <span>{copy[group][lang]}</span><Icon name="down" size={16}/>
      </a>;
    })}
  </nav>;
}

export function EditorialPlayer({ article, lang }: { article: (typeof news)[number]; lang: Lang }) {
  const credit = caption(lang, article.image) || article.title[lang];
  return <figure className="editorial-player">
    <div className="editorial-screen">
      <Photo src={article.image} alt={credit} sizes="(max-width:760px) 95vw, 56vw" priority/>
      {article.video && <MediaButton url={article.video} title={article.title[lang]} poster={article.image}
        playLabel={txt(lang, "watch")} closeLabel={txt(lang, "close")} externalLabel={txt(lang, "externalVideo")}/>}
    </div>
    <figcaption>{credit}</figcaption>
  </figure>;
}
