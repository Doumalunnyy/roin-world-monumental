import Link from "next/link";
import "./site.css";
export default function GlobalMissing() {
  return (
    <html lang="ru">
      <title>404 — ROIN WORLD</title>
      <body>
        <main className="shell not-found">
          <span>ROIN WORLD / 404</span>
          <h1>Страница не найдена</h1>
          <div>
            <Link className="action light" href="/ru">
              На главную
            </Link>
          </div>
          <nav>
            <Link href="/en">English</Link> ·{" "}
            <Link href="/ar" lang="ar">
              العربية
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
