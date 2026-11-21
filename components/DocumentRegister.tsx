import { certificates, txt, type Lang } from "@/lib/content";
import { publicUrl } from "@/lib/urls";
import copy from "@/content/company-ui.json";
import { Photo } from "./Media";

export function DocumentRegister({lang}: {lang:Lang}) {
  const date = (value:string) => new Intl.DateTimeFormat(lang, { dateStyle:"medium", timeZone:"UTC" }).format(new Date(value));
  return <div className="document-register">
    {certificates.map((doc) => <article className="document-entry" key={doc.slug}>
      <a className="doc-scan" href={publicUrl(doc.file)} target="_blank" rel="noreferrer" aria-label={doc.title+" · "+txt(lang,"openDoc")}>
        {doc.preview && <Photo src={doc.preview} alt="" sizes="80px" />}
      </a>
      <div><h3><bdi>{doc.title}</bdi></h3><p>{doc.summary[lang]}</p></div>
      <div className="doc-metadata">
        <span dir="auto">{doc.holder}</span>
        {doc.issuer && <span>{copy.issuer[lang]} · <bdi>{doc.issuer}</bdi></span>}
        {doc.issued && doc.expires && <span><time dateTime={doc.issued}>{date(doc.issued)}</time> – <time dateTime={doc.expires}>{date(doc.expires)}</time></span>}
      </div>
      <div className="doc-actions"><a href={publicUrl(doc.file)} target="_blank" rel="noreferrer">{txt(lang,"openDoc")}</a><a href={publicUrl(doc.file)} download>{copy.download[lang]}</a></div>
    </article>)}
  </div>;
}
