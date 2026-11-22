import type { Lang } from "@/lib/content";
import { Icon } from "./Icons";

const titles = {
  projects: {ru:"Архив проектов", en:"Project archive", ar:"أرشيف المشاريع", es:"Archivo de proyectos", hu:"Projektarchívum"},
  media: {ru:"Медиаархив", en:"Media archive", ar:"أرشيف الوسائط", es:"Archivo multimedia", hu:"Médiaarchívum"},
};

export function OfficialArchives({ lang, section }: {lang: Lang; section: keyof typeof titles}) {
  return <div className="official-archives">{["roinworld.com", "roinworld.ae"].map(domain =>
    <a key={domain} href={"https://" + domain + "/" + section + "/"}>
      {titles[section][lang]} · <bdi>{domain}</bdi> <Icon name="diagonal" size={15}/>
    </a>
  )}</div>;
}
