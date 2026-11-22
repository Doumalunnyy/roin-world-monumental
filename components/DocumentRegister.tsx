import Image from "next/image";
import { certificates, href, txt, type Lang } from "@/lib/content";
import { publicUrl } from "@/lib/urls";
import copy from "@/content/company-ui.json";
import { Action } from "./Shared";
import { EvidenceStrip } from "./EvidenceStrip";
import { Icon } from "./Icons";

export function DocumentRegister({ lang }: { lang: Lang }) {
  if (!certificates.length) return null;
  function list(clone: boolean) {
    return certificates.map(doc => <li className="certificate-slip" key={doc.slug}>
      <a className="certificate-open" href={publicUrl(doc.file)} target="_blank" rel="noreferrer"
        title={txt(lang, "openDoc")} tabIndex={clone ? -1 : undefined}>
        <span className="certificate-print">
          {doc.preview ? <Image src={publicUrl(doc.preview)} alt="" width={88} height={124} unoptimized /> : <Icon name="file" />}
        </span>
        <span className="certificate-text">
          {doc.issuer && <small dir="ltr">{doc.issuer}</small>}
          <strong dir="ltr">{doc.title}</strong>
          <span>{doc.summary[lang]}</span>
        </span>
      </a>
      <a className="certificate-download" href={publicUrl(doc.file)} download
        tabIndex={clone ? -1 : undefined} aria-label={`${copy.download[lang]} · ${doc.title}`} title={copy.download[lang]}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor"
          strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 2.8v9.9m-3.7-3.6 3.7 3.7 3.7-3.7M3 13.5v3.4h14v-3.4"/>
        </svg>
      </a>
    </li>);
  }
  return <EvidenceStrip kind="certificate" lang={lang} title={txt(lang, "certificates")}
    action={<Action to={href(lang, "certificates")}>{txt(lang, "documentLibrary")}</Action>}
    items={list(false)} copies={list(true)} />;
}
