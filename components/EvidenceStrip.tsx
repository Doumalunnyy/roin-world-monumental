"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/content";

const controls = {
  ru: ["Приостановить ленту", "Продолжить движение"],
  en: ["Pause strip", "Resume strip"],
  ar: ["إيقاف الشريط مؤقتًا", "استئناف حركة الشريط"],
  es: ["Pausar la cinta", "Reanudar la cinta"],
  hu: ["A sáv megállítása", "A sáv elindítása"],
};

type Props = {
  kind: "partner" | "certificate";
  lang: Lang;
  title: string;
  action: ReactNode;
  items: ReactNode;
  copies: ReactNode;
};

export function EvidenceStrip({ kind, lang, title, action, items, copies }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const original = useRef<HTMLUListElement>(null);
  const [animated, setAnimated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = !("IntersectionObserver" in window);
    const update = () => {
      setAnimated(!motion.matches);
      setVisible(inView && !document.hidden);
    };
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }) : null;
    observer?.observe(element);
    update();
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  const running = animated && visible && !paused && !focused && !hovered;
  useEffect(() => {
    const element = viewport.current;
    const list = original.current;
    if (!running || !element || !list) return;
    const sign = lang === "ar" ? -1 : 1;
    let width = list.getBoundingClientRect().width;
    let offset = Math.abs(element.scrollLeft);
    let previous = 0;
    let frame = 0;
    const resize = new ResizeObserver(() => { width = list.getBoundingClientRect().width; });
    resize.observe(list);
    function advance(now: number) {
      if (previous && width > 0 && element) {
        offset = (offset + Math.min(now - previous, 80) * 0.027) % width;
        element.scrollLeft = sign * offset;
      }
      previous = now;
      frame = requestAnimationFrame(advance);
    }
    frame = requestAnimationFrame(advance);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); };
  }, [running, lang]);

  const label = controls[lang][paused ? 1 : 0];
  const titleId = `home-${kind}-heading`;
  return <div className={`shell evidence-strip ${kind}-strip`} data-running={running} data-animated={animated}>
    <div className="section-heading evidence-heading">
      <h2 id={titleId}>{title}</h2>
      <div className="evidence-controls">
        {action}
        {animated && <button type="button" className="strip-control" aria-label={label} title={label}
          onClick={() => setPaused(!paused)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            {paused ? <path d="M5 2.5 13 8l-8 5.5Z"/> : <path d="M4 2.5h2.5v11H4zm5.5 0H12v11H9.5z"/>}
          </svg>
        </button>}
      </div>
    </div>
    <div className="evidence-window" ref={viewport} role="group" aria-labelledby={titleId} tabIndex={0}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={event => { if (event.pointerType !== "mouse") setPaused(true); }}
      onWheel={event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) setPaused(true); }}
      onFocus={() => setFocused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className={`evidence-track ${kind}-track`}>
        <ul ref={original}>{items}</ul>
        <ul aria-hidden="true" className="evidence-copy">{copies}</ul>
      </div>
    </div>
  </div>;
}
