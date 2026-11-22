import { locales } from "@/lib/content";
import { basePath } from "@/lib/urls";
import { MissingPage } from "@/components/MissingPage";
import "./site.css";

// Pages serves one 404 document for every missing URL. Select its language
// before first paint from the path, including repository-prefixed deployments.
const setErrorLocale = `(() => {
  const path = location.pathname.slice(${basePath.length}).split("/").filter(Boolean);
  const lang = ${JSON.stringify(locales)}.includes(path[0]) ? path[0] : "ru";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
})();`;

export default function GlobalMissing() {
  return <html lang="ru" dir="ltr" suppressHydrationWarning>
    <head>
      <title>404 — ROIN WORLD</title>
      <meta name="robots" content="noindex,follow"/>
      <script dangerouslySetInnerHTML={{ __html:setErrorLocale }} />
    </head>
    <body><MissingPage /></body>
  </html>;
}
