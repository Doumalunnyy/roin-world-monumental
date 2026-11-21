"use client";

import { useEffect, useRef } from "react";
import { basePath, publicUrl } from "@/lib/urls";
import { handoffKey, reducedQuery } from "@/lib/industrial-transition";

const textures = {
  towers: ["towers.webp", 1600, 423],
  cranes: ["cranes.webp", 1600, 600],
  middle: ["fog-mid.webp", 800, 333],
  front: ["fog-front.webp", 1024, 394],
  steam: ["steam.webp", 288, 432],
} as const;

const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

function SceneImage({ asset, className }: { asset: keyof typeof textures; className: string }) {
  const [file, width, height] = textures[asset];
  return (
    <picture className={className}>
      <source media="(max-width: 700px) and (prefers-reduced-motion: no-preference)" srcSet={publicUrl("/transition/compact/" + file)} />
      <source media="(prefers-reduced-motion: no-preference)" srcSet={publicUrl("/transition/" + file)} />
      {/* The baked alpha texture is shared by all copies and both deployment modes. */}
      <img src={transparentPixel} width={width} height={height} alt="" decoding="async" loading="lazy" fetchPriority="low" />
    </picture>
  );
}

export function IndustrialCloudTransition({ languages }: { languages: readonly string[] }) {
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const scene = overlay.current;
    if (!scene) return;
    const veil = scene.querySelector<HTMLElement>('[data-layer="veil"]');
    if (!veil || !("getAnimations" in veil) || !CSS.supports("mask-image", "linear-gradient(black, transparent)")) return;
    const reduced = matchMedia(reducedQuery);
    const compact = matchMedia("(max-width: 700px)");
    const navigation = (window as Window & { navigation?: EventTarget }).navigation;
    const isPage = (url: URL) => url.origin === location.origin && url.protocol === location.protocol &&
      languages.some((lang) => url.pathname === basePath + "/" + lang || url.pathname.startsWith(basePath + "/" + lang + "/"));
    let disposed = false;
    let warmed = false;
    let assetGeneration = 0;
    let mediaFrame = 0;
    let ready = false;
    let destination: string | null = null;
    let sent = false;
    let safetyTimer = 0;
    let recoveryTimer = 0;
    let idleTimer = 0;
    let removal: HTMLLinkElement | undefined;
    const images = Array.from(scene.querySelectorAll("img"));

    function warm() {
      if (disposed || warmed || reduced.matches) return;
      warmed = true;
      const currentGeneration = assetGeneration;
      try {
        // A working document-to-document handoff is required for this effect.
        const probe = handoffKey + ":available";
        sessionStorage.setItem(probe, "1");
        sessionStorage.removeItem(probe);
        images.forEach((img) => { img.loading = "eager"; });
        Promise.all(images.map((img) => img.decode())).then(() => {
          if (disposed || reduced.matches || currentGeneration !== assetGeneration || images.some((img) => img.naturalWidth <= 1)) return;
          ready = true;
          root.dataset.cloudReady = "";
        }).catch(() => { /* The real anchors remain usable if an asset fails. */ });
      } catch { /* Storage or image decoding can be unavailable. */ }
    }

    function scheduleWarm() {
      if (typeof window.requestIdleCallback === "function") {
        idleTimer = window.requestIdleCallback(warm, { timeout: 750 });
      } else {
        idleTimer = window.setTimeout(warm, 140);
      }
    }

    function release() {
      window.clearTimeout(safetyTimer);
      window.clearTimeout(recoveryTimer);
      removal?.remove();
      removal = undefined;
      destination = null;
      sent = false;
      delete root.dataset.atmosphere;
    }

    function go(animateArrival: boolean) {
      if (!destination || sent) return;
      sent = true;
      window.clearTimeout(safetyTimer);
      if (animateArrival) {
        try { sessionStorage.setItem(handoffKey, JSON.stringify({ href: destination, time: Date.now() })); }
        catch { delete root.dataset.atmosphere; }
      }
      // A stopped request or navigation cancelled by another browser handler
      // must never leave the old document covered.
      recoveryTimer = window.setTimeout(() => {
        try { sessionStorage.removeItem(handoffKey); } catch { /* Storage can change during navigation. */ }
        release();
      }, 2200);
      try {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- Both hosts use a new document with a pre-paint arrival state.
        window.location.assign(destination);
      } catch { release(); }
    }

    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      if (!isPage(url) || url.pathname === location.pathname) return;
      if (destination) { event.preventDefault(); return; }
      if (!ready || reduced.matches) return;

      event.preventDefault();
      destination = url.href;
      document.querySelectorAll<HTMLDialogElement>("dialog[open]").forEach((dialog) => dialog.close());
      removal = document.createElement("link");
      removal.rel = "prefetch";
      removal.href = url.href;
      document.head.append(removal);
      root.dataset.atmosphere = "leave";

      const animation = veil?.getAnimations().find((a) => "animationName" in a && a.animationName === "industrial-seal");
      if (!animation) { delete root.dataset.atmosphere; go(false); return; }
      const target = destination;
      // Resolve on the final painted pose, including the compact mobile timeline.
      const finish = () => { if (destination === target) go(!reduced.matches); };
      animation.finished.then(finish, () => { /* Escape or pagehide cancelled this departure. */ });
      const length = Number(animation.effect?.getComputedTiming().endTime) || 800;
      safetyTimer = window.setTimeout(finish, Math.min(length + 100, 1050));
    }

    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape" && destination && !sent) release();
    }
    function traverse(event: Event) {
      // Observe browser Back/Forward without intercepting it or replacing history.
      const entry = event as Event & { navigationType?: string; destination?: { url?: string; sameDocument?: boolean } };
      if (!ready || reduced.matches || entry.navigationType !== "traverse" || !entry.destination?.url || entry.destination.sameDocument) return;
      const url = new URL(entry.destination.url);
      if (isPage(url)) {
        try { sessionStorage.setItem(handoffKey, JSON.stringify({ href: url.href, time: Date.now() })); }
        catch { /* Native history still works. */ }
      }
    }
    function restore(event: PageTransitionEvent) {
      if (!event.persisted) return;
      try { sessionStorage.removeItem(handoffKey); } catch { /* Storage is optional. */ }
      release();
      if (ready && !reduced.matches) {
        root.dataset.atmosphere = "arrive";
        recoveryTimer = window.setTimeout(release, 1020);
      }
    }
    function reselectImages() {
      // Media queries can select a new source on rotation or a motion setting change.
      assetGeneration++;
      ready = false;
      warmed = false;
      delete root.dataset.cloudReady;
      delete root.dataset.atmosphere;
      window.cancelAnimationFrame(mediaFrame);
      if (destination) go(false);
      if (!reduced.matches) mediaFrame = window.requestAnimationFrame(warm);
    }

    if (document.readyState === "complete") scheduleWarm();
    else window.addEventListener("load", scheduleWarm, { once: true });
    document.addEventListener("pointerover", warm, { once: true, passive: true });
    document.addEventListener("focusin", warm, { once: true });
    document.addEventListener("click", click);
    document.addEventListener("keydown", keydown);
    navigation?.addEventListener("navigate", traverse);
    window.addEventListener("pagehide", release);
    window.addEventListener("pageshow", restore);
    reduced.addEventListener("change", reselectImages);
    compact.addEventListener("change", reselectImages);
    return () => {
      disposed = true;
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", keydown);
      window.removeEventListener("load", scheduleWarm);
      navigation?.removeEventListener("navigate", traverse);
      window.removeEventListener("pagehide", release);
      window.removeEventListener("pageshow", restore);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleTimer);
      else window.clearTimeout(idleTimer);
      reduced.removeEventListener("change", reselectImages);
      compact.removeEventListener("change", reselectImages);
      window.cancelAnimationFrame(mediaFrame);
      delete root.dataset.cloudReady;
      release();
    };
  }, [languages]);

  return (
    <div ref={overlay} className="atmosphere industrial-clouds" data-industrial-clouds="" aria-hidden="true">
      <div data-layer="background">
        <i className="weather-sky weather-west" /><i className="weather-sky weather-east" />
        <i className="distant-air" />
      </div>
      <div data-layer="towers">
        <div className="industrial-plane cooling-yard">
          <SceneImage className="yard-towers" asset="towers" />
          <SceneImage className="vapour plume-west" asset="steam" />
          <SceneImage className="vapour plume-east" asset="steam" />
          <SceneImage className="vapour plume-far" asset="steam" />
        </div>
      </div>
      <div data-layer="cranes"><div className="industrial-plane"><SceneImage asset="cranes" className="yard-cranes" /></div></div>
      <div data-layer="middle"><SceneImage asset="middle" className="bank mid-west" /><SceneImage asset="middle" className="bank mid-east" /></div>
      <div data-layer="foreground"><SceneImage asset="front" className="bank near-west" /><SceneImage asset="front" className="bank near-east" /></div>
      <div data-layer="veil" />
    </div>
  );
}
