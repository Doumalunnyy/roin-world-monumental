"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { publicUrl } from "@/lib/urls";
import type { Lang } from "@/lib/content";
import words from "@/content/company-ui.json";

const motionLabels = {
  ru: ["Приостановить ленту", "Продолжить движение"],
  en: ["Pause logo strip", "Resume logo strip"],
  ar: ["إيقاف حركة الشعارات", "استئناف حركة الشعارات"],
  es: ["Pausar la cinta", "Reanudar la cinta"],
  hu: ["Mozgás szüneteltetése", "Mozgás folytatása"],
};

export function CorporatePartnersMarquee({ logos, lang }: { logos: { name: string; logo: string; stripLogo?: string; group: string }[]; lang: Lang }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    let inView = false;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  if (!logos.length) return null;
  const labels=motionLabels[lang];
  return (
    <div className="partner-strip" ref={root} data-running={visible && !paused}>
      <div className="partner-window" dir="ltr" role="group" aria-label={{ru:"Логотипы организаций",en:"Organisation logos",ar:"شعارات المؤسسات"}[lang]} tabIndex={0}>
        <div className="partner-track">
          {[false,true].map((clone) => (
            <ul key={String(clone)} aria-hidden={clone || undefined}>
              {logos.map((item) => <li key={item.name}>
                <Image src={publicUrl(item.stripLogo || item.logo)} alt={clone ? "" : item.name} width={200} height={100} unoptimized />
                {(["customer","supplier","partner"] as const).filter((role) => role === item.group).map((role) =>
                  <span key={role} lang={lang} dir="auto">{words[role][lang]}</span>
                )}
              </li>)}
            </ul>
          ))}
        </div>
      </div>
      <button type="button" className="strip-control" aria-label={labels[paused ? 1 : 0]} aria-pressed={paused} onClick={() => setPaused(!paused)}>
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
