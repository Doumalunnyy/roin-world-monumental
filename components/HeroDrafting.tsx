"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { publicUrl } from "@/lib/urls";
import type { CSSProperties } from "react";
import "./hero-drafting.css";

const elevation = publicUrl("/illustrations/hero-elevation.svg");
const passes = [
  ["survey", 0], ["shells", 160], ["ground", 240],
  ["steelwork", 360], ["engraving", 560], ["cranes", 420],
] as const;

export function HeroDrafting({ onAvailable }: { onAvailable: () => void }) {
  const available = useEffectEvent(onAvailable);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = stage.current;
    const photo = layer?.parentElement?.querySelector<HTMLImageElement>(".sequence-layer.current img");
    if (!layer || !photo) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { layer.dataset.phase = "complete"; available(); };
    if (motion.matches) {
      finish();
      return;
    }

    let live = true;
    let imagesReady = false;
    // A stalled illustration must not hold an otherwise working carousel forever.
    const releaseCarousel = window.setTimeout(() => available(), 20000);
    const artwork = new Image();
    artwork.src = elevation;
    // Older WebViews can position the identical crop without container-query units.
    const fit = () => {
      if (CSS.supports("width", "1cqw")) return;
      const bounds = photo.getBoundingClientRect();
      const ratio = (matchMedia("(max-width:640px)").matches ? 822 : 1672) / 941;
      const width = Math.max(bounds.width, bounds.height * ratio);
      layer.style.setProperty("--draft-fit", width + "px");
      layer.style.setProperty("--draft-height", width / ratio + "px");
    };
    fit();
    window.addEventListener("resize", fit);
    const begin = () => {
      if (!live || !imagesReady || document.hidden || layer.dataset.phase !== "waiting" ||
          document.documentElement.dataset.transition) return;
      const bounds = layer.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) { finish(); return; }
      clearTimeout(releaseCarousel);
      layer.dataset.phase = "drawing";
      available();
    };
    const onEnd = (event: AnimationEvent) => {
      if (event.animationName === "elevation-develop") finish();
    };
    const afterNavigation = new MutationObserver(begin);
    afterNavigation.observe(document.documentElement, { attributes: true, attributeFilter: ["data-transition"] });
    document.addEventListener("visibilitychange", begin);
    window.addEventListener("pagehide", finish);
    motion.addEventListener("change", finish);
    layer.addEventListener("animationend", onEnd);
    // Load events remain usable when a responsive source change aborts decode().
    function imageReady(image: HTMLImageElement) {
      return new Promise<void>((resolve, reject) => {
        if (image.complete) {
          if (image.naturalWidth) resolve(); else reject();
          return;
        }
        image.addEventListener("load", () => resolve(), { once: true, signal: listeners.signal });
        image.addEventListener("error", reject, { once: true, signal: listeners.signal });
      });
    }
    const listeners = new AbortController();
    Promise.all([imageReady(photo), imageReady(artwork)]).then(() => {
      imagesReady = true;
      begin();
    }, () => { if (live) finish(); });
    return () => {
      live = false;
      clearTimeout(releaseCarousel);
      listeners.abort();
      window.removeEventListener("resize", fit);
      afterNavigation.disconnect();
      document.removeEventListener("visibilitychange", begin);
      window.removeEventListener("pagehide", finish);
      motion.removeEventListener("change", finish);
      layer.removeEventListener("animationend", onEnd);
    };
  }, []);

  return <><noscript><style>{".hero-draft { display:none !important; }"}</style></noscript><div className="hero-draft" data-phase="waiting" aria-hidden="true" ref={stage}>
    <div className="hero-draft-paper">
      <div className="hero-draft-crop">
        <svg viewBox="0 0 836 470.5" width="836" height="470.5" fill="none" focusable="false">
          {passes.map(([id, delay]) => <use key={id} className={"draft-pass draft-" + id}
            style={{ "--draft-delay": delay + "ms" } as CSSProperties} href={elevation + "#" + id}/>)}
          <use className="draft-pen" href={elevation + "#pen"}/>
        </svg>
      </div>
    </div>
  </div></>;
}
