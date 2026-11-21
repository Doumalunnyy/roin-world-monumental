import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, locales, origin, languageInfo } from "@/lib/content";
import "../site.css";
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
    <html lang={lang} dir={languageInfo[lang].dir}>
      <body>{children}</body>
    </html>
  );
}
