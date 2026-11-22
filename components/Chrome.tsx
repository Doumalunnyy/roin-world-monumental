"use client";
import { useEffect, useRef, useState } from "react";
import { Icon, Wordmark } from "./Icons";
import type { Lang, Key } from "@/lib/content";
import { localeUrl } from "@/lib/urls";
type LinkItem = { slug: string; title: string };
type LocaleItem = { code: string; name: string };
type Labels = Pick<
  Record<Key, string>,
  "menu" | "openMenu" | "close" | "language" | "navigation" | "skip" | "home"
>;
export function SiteHeader({
  lang,
  path,
  main,
  languages,
  labels,
}: {
  lang: Lang;
  path: string;
  main: LinkItem[];
  languages: LocaleItem[];
  labels: Labels;
}) {
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
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
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeMobileMenu = () => { if (desktop.matches) menu.current?.close(); };
    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
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
  function openMenu() {
    const panel = menu.current;
    if (!panel || panel.open) return;
    trigger.current?.focus({ preventScroll: true });
    panel.showModal();
    setMenuOpen(true);
  }
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
              ref={trigger}
              aria-label={labels.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
              onClick={openMenu}
            >
              <span className="menu-glyph" aria-hidden="true" />
            </button>
            <noscript>
              <a href="#footer">{labels.menu}</a>
            </noscript>
          </div>
        </div>
      </header>
      <dialog
        id="mobile-navigation"
        ref={menu}
        className="menu-panel"
        aria-label={labels.menu}
        onClose={() => setMenuOpen(false)}
        onClick={event => {
          if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
            && event.target instanceof Element && event.target.closest("a[href]")) menu.current?.close();
        }}
        onKeyDown={event => {
          if (event.key !== "Tab") return;
          const stops = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
          const first = stops[0], last = stops[stops.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="menu-content">
          <div className="shell mast-inner menu-head">
            <Wordmark />
            <button type="button" className="menu-toggle menu-dismiss" aria-label={labels.close}
              onClick={() => menu.current?.close()}>
              <span className="menu-glyph" aria-hidden="true" />
            </button>
          </div>
          <nav className="shell menu-primary" aria-label={labels.navigation}>{links(main)}</nav>
          <nav className="shell menu-locales" aria-label={labels.language}>
            <span className="menu-language-title"><Icon name="globe" size={15}/>{labels.language}</span>
            <div>{languages.map(l => <a key={l.code} href={localeUrl(l.code, path)} hrefLang={l.code} lang={l.code}
              aria-label={l.name} aria-current={l.code === lang ? "true" : undefined}>
              <bdi>{l.code.toUpperCase()}</bdi>
            </a>)}</div>
          </nav>
        </div>
      </dialog>
    </>
  );
}
