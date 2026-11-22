"use client";

import { useEffect } from "react";
import { reducedMotionQuery } from "@/lib/motion";

// Page titles animate in CSS from the initial paint. Only section headings below
// the fold need an observer. Dynamic cards, form headings and map records have
// their own interaction states.
export function EditorialMotion() {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = matchMedia(reducedMotionQuery);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.editorial = "enter";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05 });

    const apply = () => {
      observer.disconnect();
      const headings = root.querySelectorAll<HTMLElement>("h2");
      for (const title of headings) {
        if (preference.matches) { delete title.dataset.editorial; continue; }
        if (title.dataset.editorial === "enter" || title.closest("form, article, li, dialog, .ae-entry, .project-card, [aria-hidden=true]")) continue;
        if (title.getBoundingClientRect().top < window.innerHeight) {
          delete title.dataset.editorial;
          continue;
        }
        title.dataset.editorial = "waiting";
        observer.observe(title);
      }
    };
    apply();
    preference.addEventListener("change", apply);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", apply);
      root.querySelectorAll<HTMLElement>("[data-editorial]").forEach(title => delete title.dataset.editorial);
    };
  }, []);
  return null;
}
