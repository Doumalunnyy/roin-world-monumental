"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { basePath, publicUrl } from "@/lib/urls";
import { catalogueOpensCase } from "@/lib/project-navigation";
import { fitAtomTraces } from "@/lib/atom-traces";
import { handoffKey, reducedQuery } from "@/lib/industrial-transition";

export function PageTransition({ languages, children }: { languages: readonly string[]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = ref.current;
    if (!scene || !scene.getAnimations) return;
    const root = document.documentElement;
    const reduced = matchMedia(reducedQuery);
    const isPage = (url: URL) => url.origin === location.origin &&
      languages.some((lang) => url.pathname === basePath + "/" + lang || url.pathname.startsWith(basePath + "/" + lang + "/"));
    let disposed = false;
    let ready = false;
    let target: URL | undefined;
    let sent = false;
    let timer = 0;
    let preload: HTMLLinkElement | undefined;

    // A blocked logo or unavailable session handoff should leave native links usable.
    try {
      sessionStorage.setItem(handoffKey + ":probe", "1");
      sessionStorage.removeItem(handoffKey + ":probe");
    } catch { return; }
    const logo = new Image();
    logo.src = publicUrl("/brand/roin-world.svg");
    logo.decode().then(() => {
      if (!disposed) { ready = true; root.dataset.transitionReady = ""; }
    }).catch(() => {});

    function remember(url: URL) {
      try { sessionStorage.setItem(handoffKey, JSON.stringify({ href: url.href, time: Date.now() })); }
      catch { /* Native navigation still succeeds. */ }
    }
    function clear() {
      window.clearTimeout(timer);
      preload?.remove();
      preload = undefined;
      target = undefined;
      sent = false;
      delete root.dataset.transition;
    }
    function go(withArrival: boolean) {
      if (!target || sent) return;
      sent = true;
      window.clearTimeout(timer);
      if (withArrival) remember(target);
      // A 204 or cancelled document request must release the old screen.
      timer = window.setTimeout(clear, 2200);
      try {
        window.location.assign(target.href);
      } catch { clear(); }
    }
    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
      if (!(event.target instanceof Element) || !scene) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      if (!link.closest("nav[data-menu-transition]")) {
        // A new ordinary link supersedes any cancelled or still-pending menu request.
        if (target) clear();
        try { sessionStorage.removeItem(handoffKey); } catch {}
        return;
      }
      const url = new URL(link.href);
      if (catalogueOpensCase(new URL(location.href), url)) return;
      if (!isPage(url) || url.pathname === location.pathname || !ready || reduced.matches) return;
      event.preventDefault();
      if (target) return;
      target = url;
      document.querySelectorAll<HTMLDialogElement>("dialog[open]").forEach((dialog) => dialog.close());
      preload = document.createElement("link");
      preload.rel = "prefetch";
      preload.href = url.href;
      document.head.append(preload);
      root.dataset.transition = "leave";
      fitAtomTraces(scene);
      const closing = scene.getAnimations().find((a) => "animationName" in a && a.animationName === "atom-close");
      if (!closing) { delete root.dataset.transition; go(false); return; }
      const finish = () => { if (target === url) go(!reduced.matches); };
      closing.finished.then(finish, () => {});
      timer = window.setTimeout(finish, Number(closing.effect?.getComputedTiming().endTime || 1140) + 120);
    }
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape" && target && !sent) clear();
    }
    function restore(event: PageTransitionEvent) {
      if (!event.persisted) return;
      try { sessionStorage.removeItem(handoffKey); } catch {}
      clear();
    }
    function motionChange() {
      if (!reduced.matches) return;
      delete root.dataset.transition;
      if (target) go(false);
    }
    function resize() {
      if (target && !sent && scene) fitAtomTraces(scene);
    }
    document.addEventListener("click", click);
    document.addEventListener("keydown", keydown);
    window.addEventListener("pagehide", clear);
    window.addEventListener("pageshow", restore);
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", motionChange);
    return () => {
      disposed = true;
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", keydown);
      window.removeEventListener("pagehide", clear);
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("resize", resize);
      reduced.removeEventListener("change", motionChange);
      delete root.dataset.transitionReady;
      clear();
    };
  }, [languages]);

  return <div className="page-transition" ref={ref} aria-hidden="true">{children}</div>;
}
