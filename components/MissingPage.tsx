import { locales, languageInfo, href, txt } from "@/lib/content";
import { Wordmark, Icon } from "./Icons";
import "./missing-page.css";

export function MissingPage() {
  return <main className="missing-page">
    <div className="missing-top"><div className="missing-sheet">
      <Wordmark />
      <div className="missing-layout">
        <span className="missing-number" aria-hidden="true">404</span>
        {locales.map(lang => <section key={lang} lang={lang} dir={languageInfo[lang].dir} data-missing-language={lang}>
          <h1>{txt(lang, "notFound")}</h1>
          <p>{txt(lang, "notFoundText")}</p>
          <a className="missing-home" href={href(lang)}>{txt(lang, "backHome")} <Icon name="arrow" size={19}/></a>
        </section>)}
      </div>
    </div></div>
      <div className="missing-sheet missing-languages">
        {locales.map(lang => <a key={lang} href={href(lang)} lang={lang} hrefLang={lang} dir={languageInfo[lang].dir}>{languageInfo[lang].name}</a>)}
      </div>
    <style>{locales.map(lang => `html:not([lang="${lang}"]) [data-missing-language="${lang}"]{display:none}`).join("\n")}</style>
  </main>;
}
