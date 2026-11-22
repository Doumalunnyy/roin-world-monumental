"use client";

import { useEffect, useRef } from "react";
import { publicUrl } from "@/lib/urls";
import type { CSSProperties } from "react";
import "./hero-drafting.css";

const elevation = publicUrl("/illustrations/hero-elevation.svg");
const passes = [
  ["survey", 0], ["shells", 160], ["ground", 240],
  ["steelwork", 360], ["engraving", 560], ["cranes", 420],
] as const;

export function HeroDrafting() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = stage.current;
    const photo = layer?.parentElement?.querySelector<HTMLImageElement>(".sequence-layer.current img");
    if (!layer || !photo) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { layer.dataset.phase = "complete"; };
    if (motion.matches || location.hash || !photo.decode || !CSS.supports("width", "1cqw")) {
      finish();
      return;
    }

    let live = true;
    let imagesReady = false;
    const artwork = new Image();
    artwork.src = elevation;
    const deadline = window.setTimeout(finish, 5500);
    const begin = () => {
      if (!live || !imagesReady || document.hidden || layer.dataset.phase !== "waiting" ||
          document.documentElement.dataset.transition) return;
      const bounds = layer.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) { finish(); return; }
      clearTimeout(deadline);
      layer.dataset.phase = "drawing";
    };
    const onEnd = (event: AnimationEvent) => {
      if (event.animationName === "elevation-develop" || event.animationName === "elevation-release") finish();
    };
    const afterNavigation = new MutationObserver(begin);
    afterNavigation.observe(document.documentElement, { attributes: true, attributeFilter: ["data-transition"] });
    document.addEventListener("visibilitychange", begin);
    window.addEventListener("pagehide", finish);
    motion.addEventListener("change", finish);
    layer.addEventListener("animationend", onEnd);
    Promise.all([photo.decode(), artwork.decode()]).then(() => {
      imagesReady = true;
      begin();
    }, () => { if (live) finish(); });
    return () => {
      live = false;
      clearTimeout(deadline);
      afterNavigation.disconnect();
      document.removeEventListener("visibilitychange", begin);
      window.removeEventListener("pagehide", finish);
      motion.removeEventListener("change", finish);
      layer.removeEventListener("animationend", onEnd);
    };
  }, []);

  return <div className="hero-draft" data-phase="waiting" aria-hidden="true" ref={stage}>
    <div className="hero-draft-paper">
      <div className="hero-draft-crop">
        <svg viewBox="0 0 836 470.5" width="836" height="470.5" fill="none" focusable="false">
          {passes.map(([id, delay]) => <use key={id} className={"draft-pass draft-" + id}
            style={{ "--draft-delay": delay + "ms" } as CSSProperties} href={elevation + "#" + id}/>)}
          <use className="draft-pen" href={elevation + "#pen"}/>
        </svg>
      </div>
    </div>
  </div>;
}
