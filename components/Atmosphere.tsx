"use client";

import { useEffect } from "react";
import { basePath, publicUrl } from "@/lib/urls";

const travelKey = "roin-atmosphere-v1";



export function Atmosphere({ languages }: { languages: string[] }) {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let depart: number | undefined;
    let watchdog: number | undefined;
    let committed = false;

    function clear() {
      window.clearTimeout(depart);
      window.clearTimeout(watchdog);
      delete root.dataset.atmosphere;
      committed = false;
    }

    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reduced.matches) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.protocol !== location.protocol) return;
      if (!languages.some((l) => url.pathname === basePath + "/" + l || url.pathname.startsWith(basePath + "/" + l + "/"))) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      event.preventDefault();
      if (root.dataset.atmosphere === "leave") return;
      clear();
      for (const dialog of document.querySelectorAll<HTMLDialogElement>("dialog[open]")) dialog.close();
      root.dataset.atmosphere = "leave";
      const hint = document.createElement("link");
      hint.rel = "prefetch";
      hint.as = "document";
      hint.href = url.href;
      document.head.querySelector("link[data-route-prefetch]")?.remove();
      hint.dataset.routePrefetch = "";
      document.head.append(hint);
      depart = window.setTimeout(() => {
        try { sessionStorage.setItem(travelKey, JSON.stringify({ href: url.href, time: Date.now() })); } catch {}
        committed = true;
        try { window.location.assign(url.href); } catch { clear(); }
      }, 520);
      // A cancelled browser navigation must always return control to the original page.
      watchdog = window.setTimeout(clear, 2600);
    }

    function cancel(event: KeyboardEvent) {
      if (event.key === "Escape" && !committed) clear();
    }
    function restore(event: PageTransitionEvent) {
      if (!event.persisted) return;
      clear();
      if (!reduced.matches) {
        root.dataset.atmosphere = "arrive";
        watchdog = window.setTimeout(clear, 820);
      }
      // Browser history owns scroll and focus restoration on a cached document.
    }
    function hide() {
      clear();
    }
    function onMotionChange() {
      if (reduced.matches && root.dataset.atmosphere !== "leave") clear();
    }

    document.addEventListener("click", click);
    document.addEventListener("keydown", cancel);
    window.addEventListener("pageshow", restore);
    window.addEventListener("pagehide", hide);
    reduced.addEventListener("change", onMotionChange);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", cancel);
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("pagehide", hide);
      reduced.removeEventListener("change", onMotionChange);
      clear();
    };
  }, [languages]);

  return <div aria-hidden="true" className="atmosphere" style={{ "--cloud": "url(" + publicUrl("/images/atmosphere.webp") + ")" } as React.CSSProperties}>
    <div className="atmosphere-veil" />
    <div className="fog fog-west" /><div className="fog fog-east" /><div className="fog fog-low" />
  </div>;
}
