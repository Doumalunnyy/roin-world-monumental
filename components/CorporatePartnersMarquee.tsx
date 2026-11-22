import Image from "next/image";
import { publicUrl } from "@/lib/urls";
import { href, txt, type Lang } from "@/lib/content";
import words from "@/content/company-ui.json";
import { Action } from "./Shared";
import { EvidenceStrip } from "./EvidenceStrip";

type Logo = { name: string; logo: string; stripLogo?: string; group: string };

export function CorporatePartnersMarquee({ logos, lang }: { logos: Logo[]; lang: Lang }) {
  if (!logos.length) return null;
  function list(clone: boolean) {
    return logos.map(item => {
      const role = item.group === "customer" || item.group === "supplier" || item.group === "partner" ? item.group : undefined;
      return <li className="partner-mark" key={item.name}>
        <Image src={publicUrl(item.stripLogo || item.logo)} alt={clone ? "" : item.name}
          width={200} height={100} unoptimized />
        {role && <span>{words[role][lang]}</span>}
      </li>;
    });
  }
  return <EvidenceStrip kind="partner" lang={lang} title={txt(lang, "partners")}
    action={<Action to={href(lang, "partners")}>{txt(lang, "partnersLink")}</Action>}
    items={list(false)} copies={list(true)} />;
}
