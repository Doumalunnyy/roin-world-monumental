import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, locales, origin, languageInfo } from "@/lib/content";
import "../site.css";
import "../monumental.css";
import "../atomic-transition.css";
import "../motion.css";
import { EditorialMotion } from "@/components/EditorialMotion";
import { PageTransition } from "@/components/PageTransition";
import { AtomicScene } from "@/components/AtomicScene";
import { arrivalScript } from "@/lib/industrial-transition";

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
      <body><PageTransition languages={locales}><AtomicScene /></PageTransition>{children}<EditorialMotion /></body>
    </html>
  );
}
