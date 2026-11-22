import { href, locales, txt } from "@/lib/content";
export default function Missing() {
  return (
    <main className="shell not-found">
      <style>{locales.map(lang => `html:not([lang="${lang}"]) [data-error-locale="${lang}"]{display:none}`).join("\n")}</style>
      {locales.map(lang => <div key={lang} data-error-locale={lang}>
        <h1>404 — {txt(lang, "notFound")}</h1>
        <p>{txt(lang, "notFoundText")}</p>
        <a href={href(lang)}>{txt(lang, "backHome")} →</a>
      </div>)}
    </main>
  );
}
