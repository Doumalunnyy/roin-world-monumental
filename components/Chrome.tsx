"use client";
import { useEffect, useRef, useState } from "react";
import { Icon, Wordmark } from "./Icons";
import type { Lang, Key } from "@/lib/content";
import { localeUrl } from "@/lib/urls";
type LinkItem = { slug: string; title: string };
type LocaleItem = { code: string; name: string };
type Labels = Pick<
  Record<Key, string>,
  "menu" | "close" | "language" | "navigation" | "skip" | "home" | "directory"
>;
export function SiteHeader({
  lang,
  path,
  main,
  more,
  languages,
  labels,
}: {
  lang: Lang;
  path: string;
  main: LinkItem[];
  more: LinkItem[];
  languages: LocaleItem[];
  labels: Labels;
}) {
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const locale = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (locale.current && !locale.current.contains(e.target as Node))
        locale.current.open = false;
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const url = (slug: string) => localeUrl(lang, slug);
  const links = (items: LinkItem[]) =>
    items.map((i) => (
      <a
        key={i.slug}
        href={url(i.slug)}
        aria-current={path.split("/")[0] === i.slug ? "page" : undefined}
      >
        {i.title}
      </a>
    ));
  return (
    <>
      <a className="skip" href="#main">
        {labels.skip}
      </a>
      <header
        className={
          "mast " + (scrolled ? "solid" : "") + " " + (path ? "inner-mast" : "")
        }
      >
        <div className="shell mast-inner">
          <a
            className="brand"
            href={url("")}
            aria-label={"ROIN WORLD · " + labels.home}
          >
            <Wordmark />
          </a>
          <nav className="topnav" aria-label={labels.navigation}>
            {links(main)}
          </nav>
          <div className="head-actions">
            <details
              className="languages"
              ref={locale}
              onKeyDown={(e) => {
                if (e.key === "Escape" && locale.current) {
                  locale.current.open = false;
                  locale.current.querySelector("summary")?.focus();
                }
              }}
            >
              <summary
                aria-label={labels.language + " · " + lang.toUpperCase()}
              >
                <Icon name="globe" size={16} />
                {lang.toUpperCase()}
                <Icon name="chevron" size={12} />
              </summary>
              <div className="locale-list">
                {languages.map((l) => (
                  <a
                    key={l.code}
                    href={localeUrl(l.code, path)}
                    lang={l.code}
                    hrefLang={l.code}
                    aria-current={l.code === lang ? "true" : undefined}
                  >
                    {l.name}
                  </a>
                ))}
              </div>
            </details>
            <button
              type="button"
              className="menu-toggle"
              aria-label={labels.menu}
              aria-haspopup="dialog"
              onClick={() => menu.current?.showModal()}
            >
              <Icon name="menu" size={24} />
            </button>
            <noscript>
              <a href="#footer">{labels.menu}</a>
            </noscript>
          </div>
        </div>
      </header>
      <dialog
        ref={menu}
        className="menu-panel"
        aria-label={labels.menu}
        onClick={(e) => {
          if (e.target === menu.current) menu.current.close();
        }}
      >
        <div className="menu-content">
          <div className="menu-head">
            <Wordmark />
            <button
              className="circle"
              aria-label={labels.close}
              onClick={() => menu.current?.close()}
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="menu-primary">{links(main)}</div>
          <div className="menu-secondary">{links(more)}</div>
          <div className="menu-locales">
            {languages.map((l) => (
              <a
                lang={l.code}
                key={l.code}
                href={localeUrl(l.code, path)}
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
