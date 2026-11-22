import { txt, type Key, type Lang, type Local } from "./content";

export type NavigationItem = { slug: string; title: string; children?: NavigationItem[] };

// Source labels for the union of the two official menus. Page titles and stable
// public URLs can differ from a menu label, particularly for the document register.
const labels: Record<string, Local> = {
  about: {ru:"О компании", en:"About us", ar:"عن الشركة", es:"Sobre la empresa", hu:"Rólunk"},
  certificates: {ru:"Документация", en:"Documentation", ar:"الوثائق", es:"Documentación", hu:"Dokumentáció"},
  team: {ru:"Команда", en:"Team", ar:"فريقنا", es:"Nuestro equipo", hu:"Csapatunk"},
  contacts: {ru:"Контакты", en:"Contact us", ar:"اتصل بنا", es:"Contactar", hu:"Kapcsolat"},
  careers: {ru:"Присоединиться к команде", en:"Join us", ar:"انضم إلينا", es:"Únete al equipo", hu:"Csatlakozz hozzánk"},
};

export function corporateNavigation(lang: Lang): NavigationItem[] {
  function item(key: Key, children?: NavigationItem[]): NavigationItem {
    return { slug: key === "home" ? "" : key, title: labels[key]?.[lang] || txt(lang, key), ...(children && {children}) };
  }
  return [
    item("home"),
    item("about", [item("projects"), item("certificates"), item("services"), item("geography"), item("history")]),
    item("media"),
    item("news"),
    item("partners"),
    item("team", [item("leadership")]),
    item("contacts"),
    item("careers"),
  ];
}
