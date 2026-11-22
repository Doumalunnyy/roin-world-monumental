"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { reducedQuery } from "@/lib/industrial-transition";

export function ProjectDrawing({ children, slug }: { children: ReactNode; slug: string }) {
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const layer = overlay.current;
    const frame = layer?.parentElement;
    const photo = frame?.querySelector("img");
    const root = document.documentElement;
    if (!layer || !frame || !photo || root.dataset.projectIntro !== "armed") return;
    if (!("IntersectionObserver" in window) || !photo.decode) { delete root.dataset.projectIntro; return; }
    const media = matchMedia(reducedQuery);
    let visible = false;
    let decoded = false;
    let stopped = false;
    let timer = 0;
    const done = () => {
      stopped = true;
      window.clearTimeout(timer);
      delete root.dataset.projectIntro;
    };
    const start = () => {
      if (stopped || !decoded || !visible || document.hidden || root.dataset.transition || root.dataset.projectIntro !== "armed") return;
      if (media.matches) { done(); return; }
      root.dataset.projectIntro = "drawing";
      try { sessionStorage.setItem("roin-outline:" + slug, "seen"); } catch {}
      timer = window.setTimeout(done, 2600);
    };
    const viewport = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    const arrival = new MutationObserver(start);
    viewport.observe(frame);
    arrival.observe(root, { attributes: true, attributeFilter: ["data-transition"] });
    document.addEventListener("visibilitychange", start);
    media.addEventListener("change", done);
    window.addEventListener("pagehide", done);
    const end = (event: AnimationEvent) => { if (event.animationName === "project-photo-develop") done(); };
    layer.addEventListener("animationend", end);
    photo.decode().then(() => { decoded = photo.naturalWidth > 0; if (decoded) start(); else done(); }, done);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      arrival.disconnect();
      viewport.disconnect();
      layer.removeEventListener("animationend", end);
      document.removeEventListener("visibilitychange", start);
      media.removeEventListener("change", done);
      window.removeEventListener("pagehide", done);
    };
  }, [slug]);
  return <div className="project-drawing" ref={overlay} aria-hidden="true">{children}</div>;
}
