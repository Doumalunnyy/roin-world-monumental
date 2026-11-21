import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, locales, origin, languageInfo } from "@/lib/content";
import "../site.css";
import "../monumental.css";
import { Atmosphere } from "@/components/Atmosphere";

// Paint the opening cloud layer before content is visible on a document navigation.
const arrivalScript = `
(() => {
  const root = document.documentElement;
  try {
    const key = "roin-atmosphere-v1";
    const travel = JSON.parse(sessionStorage.getItem(key) || "null");
    sessionStorage.removeItem(key);
    const historyEntry = performance.getEntriesByType("navigation")[0]?.type === "back_forward";
    const fresh = travel && travel.href === location.href && Date.now() - travel.time < 12000;
    if ((!historyEntry && !fresh) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.dataset.atmosphere = "arrive";
    if (fresh && !historyEntry && !location.hash) {
      document.addEventListener("DOMContentLoaded", () => {
        const title = document.querySelector("main h1");
        if (title) {
          title.tabIndex = -1;
          title.focus({ preventScroll: true });
        }
      }, { once: true });
    }
    setTimeout(() => {
      if (root.dataset.atmosphere === "arrive") delete root.dataset.atmosphere;
    }, 820);
  } catch { /* Storage may be unavailable on an otherwise usable page. */ }
})();`;
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: "ROIN WORLD", template: "%s — ROIN WORLD" },
};
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} dir={languageInfo[lang].dir} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: arrivalScript }} /></head>
      <body>{children}<Atmosphere languages={locales} /></body>
    </html>
  );
}
