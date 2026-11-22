import Link from "next/link";
import { locales, languageInfo } from "@/lib/content";
import "./site.css";
export default function GlobalMissing() {
  return (
    <html lang="ru">
      <title>404 — ROIN WORLD</title>
      <body>
        <main className="shell not-found">
          <h1>404 — Страница не найдена</h1>
          <div>
            <Link className="action light" href="/ru">
              На главную
            </Link>
          </div>
          <nav aria-label="Другие языки">
            <ul>
              {locales.filter((code) => code !== "ru").map((code) => (
                <li key={code}>
                  <Link href={"/" + code} lang={code} dir={languageInfo[code].dir}>
                    {languageInfo[code].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </body>
    </html>
  );
}
