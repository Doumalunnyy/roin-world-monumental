"use client";

import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";
import type { Lang } from "@/lib/content";

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
  const track = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [visible, setVisible] = useState(false);

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

  function revealKeyboardLink(event: FocusEvent<HTMLDivElement>) {
    const link = event.target;
    if (!(link instanceof HTMLAnchorElement) || !link.matches(":focus-visible")) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.left >= bounds.left && item.right <= bounds.right) return;
    // A visible duplicate is pointer-accessible; Tab targets the single semantic list.
    // Bring its original into view without stopping the running animation.
    const animation = track.current?.getAnimations()[0];
    if (animation) animation.currentTime = 0;
    link.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" });
  }

  const titleId = `home-${kind}-heading`;
  return <div className={`shell evidence-strip ${kind}-strip`} data-running={animated && visible} data-animated={animated}>
    <div className="section-heading evidence-heading">
      <h2 id={titleId}>{title}</h2>
      {action}
    </div>
    <div className="evidence-window" ref={viewport} role="group" aria-labelledby={titleId}
      dir={lang === "ar" ? "rtl" : "ltr"} tabIndex={0} onFocusCapture={revealKeyboardLink}>
      <div className="evidence-lane">
        <div className={`evidence-track ${kind}-track`} ref={track}>
          <ul>{items}</ul>
          <ul aria-hidden="true" className="evidence-copy">{copies}</ul>
        </div>
      </div>
    </div>
  </div>;
}
