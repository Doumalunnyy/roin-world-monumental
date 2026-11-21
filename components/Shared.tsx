import { Icon, Wordmark } from "./Icons";
import { publicUrl } from "@/lib/urls";
import {
  txt,
  href,
  primary,
  secondary,
  locales,
  company,
  type Lang,
} from "@/lib/content";
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="tag">
      <i />
      {children}
    </div>
  );
}
export function Action({
  to,
  children,
  light = false,
}: {
  to: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a className={light ? "action light" : "text-link"} href={publicUrl(to)}>
      {children}
      <Icon name="arrow" size={18} />
    </a>
  );
}
export function Footer({ lang, path }: { lang: Lang; path: string }) {
  const office = company.offices.find((o) => o.email);
  return (
    <footer id="footer">
      <div className="shell">
        <div className="foot-grid">
          <div>
            <a href={href(lang)} aria-label="ROIN WORLD">
              <Wordmark />
            </a>
            <p>{txt(lang, "aboutCaption")}</p>
            {office?.email && (
              <a className="foot-mail" href={"mailto:" + office.email}>
                {office.email}
              </a>
            )}
          </div>
          <nav aria-label={txt(lang, "navigation")}>
            {primary.map((k) => (
              <a key={k} href={href(lang, k)}>
                {txt(lang, k)}
              </a>
            ))}
          </nav>
          <nav aria-label={txt(lang, "directory")}>
            {secondary.map((k) => (
              <a key={k} href={href(lang, k)}>
                {txt(lang, k)}
              </a>
            ))}
          </nav>
        </div>
        <div className="foot-base">
          <span>© ROIN WORLD</span>
          <a href={href(lang, "privacy")}>{txt(lang, "privacy")}</a>
          <a href={publicUrl("/images/credits.html?lang=" + lang)}>
            {txt(lang, "photoCredits")}
          </a>
          <div dir="ltr">
            {locales.map((l) => (
              <a
                key={l}
                href={href(l, path)}
                lang={l}
                aria-current={l === lang ? "true" : undefined}
              >
                {l.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
