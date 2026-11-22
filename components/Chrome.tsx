"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, Wordmark } from "./Icons";
import { LocaleChoices } from "./LocaleChoices";
import type { Lang, Key } from "@/lib/content";
import type { NavigationItem } from "@/lib/navigation";
import { localeUrl } from "@/lib/urls";
import "./corporate-navigation.css";

type Labels = Pick<Record<Key, string>, "menu" | "openMenu" | "close" | "language" | "navigation" | "skip" | "home">;
type Props = {
  lang: Lang; path: string; main: NavigationItem[];
  languages: {code: string; name: string}[]; labels: Labels;
};

export function SiteHeader({ lang, path, main, languages, labels }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mast = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const locale = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, {passive:true});
    const wide = matchMedia("(min-width: 1181px)");
    const reset = () => { setOpen(false); };
    wide.addEventListener("change", reset);
    window.addEventListener("pageshow", reset);
    const outside = (event: PointerEvent) => {
      for (const details of mast.current?.querySelectorAll("details[open]") || []) {
        if (!(details.closest(".nav-branch") || details).contains(event.target as Node)) details.removeAttribute("open");
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", update);
      wide.removeEventListener("change", reset);
      window.removeEventListener("pageshow", reset);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  useEffect(() => {
    const header = mast.current;
    if (!open || !header) return;
    const excluded: HTMLElement[] = [];
    // The modal uses the same header, links and language switcher as the desktop row.
    // Prevent pointer, keyboard and assistive-technology access to its background.
    for (let node: HTMLElement | null = header; node && node !== document.body; node = node.parentElement) {
      for (const sibling of Array.from(node.parentElement?.children || [])) {
        if (sibling !== node && sibling instanceof HTMLElement && !sibling.inert && !sibling.matches("script, style, link, template, .page-transition")) {
          sibling.inert = true;
          excluded.push(sibling);
        }
      }
    }
    document.documentElement.classList.add("corporate-menu-open");
    if (locale.current) locale.current.open = true;
    toggle.current?.focus({preventScroll:true});
    return () => {
      document.documentElement.classList.remove("corporate-menu-open");
      for (const node of excluded) node.inert = false;
      header.querySelectorAll("details[open]").forEach(details => details.removeAttribute("open"));
    };
  }, [open]);

  function close() {
    setOpen(false);
    toggle.current?.focus({preventScroll:true});
  }

  return <>
    <a className="skip" href="#main">{labels.skip}</a>
    <header ref={mast} className={"mast corporate-mast" + (scrolled ? " solid" : "") + (path ? " inner-mast" : "") + (open ? " menu-is-open" : "")}>
      <div className="shell mast-inner" ref={bar} role={open ? "dialog" : undefined}
        aria-modal={open || undefined} aria-label={open ? labels.menu : undefined}
        onKeyDown={event => {
          if (!(event.target instanceof HTMLElement)) return;
          if (event.key === "Escape") {
            const group = event.target.closest<HTMLElement>(".nav-branch, .languages");
            const details = group?.matches("details") ? group : group?.querySelector("details");
            if (details?.hasAttribute("open")) {
              details.removeAttribute("open");
              details.querySelector("summary")?.focus();
              event.preventDefault();
            } else if (open) { event.preventDefault(); close(); }
            return;
          }
          if (!open || event.key !== "Tab" || !bar.current) return;
          const stops = Array.from(bar.current.querySelectorAll<HTMLElement>("a[href], button, summary")).filter(el => el.tabIndex >= 0 && el.getClientRects().length && !el.closest("details:not([open]) .nav-sublist,details:not([open]) .locale-list"));
          if (event.shiftKey && document.activeElement === stops[0]) {
            event.preventDefault(); stops.at(-1)?.focus();
          } else if (!event.shiftKey && document.activeElement === stops.at(-1)) {
            event.preventDefault(); stops[0]?.focus();
          }
        }}>
        <a className="brand" href={localeUrl(lang)} aria-label={"ROIN WORLD · " + labels.home} tabIndex={open ? -1 : undefined} onClick={() => { if (open) close(); }}><Wordmark /></a>
        <button ref={toggle} type="button" className="menu-toggle corporate-toggle" aria-label={open ? labels.close : labels.openMenu}
          aria-haspopup="dialog" aria-controls="corporate-navigation" aria-expanded={open} onClick={() => open ? close() : setOpen(true)}>
          <span className="menu-glyph" aria-hidden="true" />
        </button>
        <div id="corporate-navigation" className="corporate-panel" onClick={event => {
          if (open && event.target instanceof Element && event.target.closest("a[href]") && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) close();
        }}>
          <nav className="topnav corporate-nav" aria-label={labels.navigation} data-menu-transition>
            <ul className="nav-sections">{main.map(item => {
              const inSection = (item.slug && path.startsWith(item.slug + "/")) || item.children?.some(child => path === child.slug || path.startsWith(child.slug + "/"));
              return <li key={item.slug} className="nav-branch" data-current-section={inSection || undefined} onBlur={event => {
                if (!open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget))
                  event.currentTarget.querySelector("details")?.removeAttribute("open");
              }}>
                <a className="nav-parent" href={localeUrl(lang, item.slug)} aria-current={path === item.slug ? "page" : undefined}>{item.title}</a>
                {item.children && <details className="nav-disclosure" name="corporate-submenu">
                  <summary aria-label={item.title + " · " + labels.menu}><Icon name="chevron" size={12}/></summary>
                  <ul className="nav-sublist">{item.children.map(child => <li key={child.slug}>
                    <a href={localeUrl(lang, child.slug)} aria-current={path === child.slug ? "page" : undefined}>{child.title}</a>
                  </li>)}</ul>
                </details>}
              </li>;
            })}</ul>
          </nav>
          <details ref={locale} className="languages corporate-languages" onBlur={event => {
            if (!open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
          }}>
            <summary aria-label={labels.language + " · " + lang.toUpperCase()}><Icon name="globe" size={16}/>
              <span className="nav-lang-code">{lang.toUpperCase()}</span><span className="nav-lang-label">{labels.language}</span><Icon name="chevron" size={12}/>
            </summary>
            <div className="locale-list"><LocaleChoices languages={languages} lang={lang} path={path}/></div>
          </details>
        </div>
        <noscript><a href="#footer">{labels.menu}</a></noscript>
      </div>
    </header>
  </>;
}
