"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Icon } from "./Icons";
import { MediaButton } from "./Media";
import { usePhotoSequence } from "./usePhotoSequence";
import { localeUrl, publicUrl } from "@/lib/urls";
import type { Lang } from "@/lib/content";
import home from "@/content/home.json";
import messages from "@/content/showcase-ui.json";
import ui from "@/content/ui.json";
import "./showcases.css";

export type Feature = {
  slug: string;
  region: string;
  country: string;
  title: string;
  image: string;
  featuredImage?: string;
  featuredCaption?: string;
  summary: string;
  role?: string;
  sector: string;
  caption: string;
  url: string;
  areas: string[];
};
type Frame = { image: string; mobile?: string; alt: string };
type ArchiveFrame = { image: string; mobile?: string; alt: Record<Lang, string> };
type Sequence = Omit<ReturnType<typeof usePhotoSequence<HTMLElement>>, "attach">;

function ArchiveImage({ frame, current, first, eager, ready, failed }: {
  frame: Frame; current: boolean; first: boolean; eager: boolean; ready: () => void; failed: () => void;
}) {
  const [element, attach] = useState<HTMLImageElement | null>(null);
  const markReady = useEffectEvent(ready);
  const markFailed = useEffectEvent(failed);

  useEffect(() => {
    if (!element) return;
    let attached = true;
    function report() {
      if (!attached || !element?.complete) return;
      if (element.naturalWidth > 0) markReady();
      else markFailed();
    }
    function loaded() {
      if (element) void element.decode().then(report, report);
    }
    element.addEventListener("load", loaded);
    element.addEventListener("error", report);
    // A cached first image may have finished before React hydrated the server-rendered picture.
    if (element.complete) loaded();
    return () => {
      attached = false;
      element.removeEventListener("load", loaded);
      element.removeEventListener("error", report);
    };
  }, [element]);

  // eslint-disable-next-line @next/next/no-img-element -- The enclosing picture selects locally optimized, individually cropped archive WebPs.
  return <img ref={attach} src={publicUrl(frame.image)} alt={current ? frame.alt : ""} width={1600} height={900}
    loading={eager || !first ? "eager" : "lazy"}
    fetchPriority={first && eager ? "high" : "auto"} decoding="async" />;
}

function Frames({ frames, sequence, eager = false }: { frames: Frame[]; sequence: Sequence; eager?: boolean }) {
  return (
    <div className="sequence-pictures">
      {frames.map((frame, index) => {
        if (!sequence.mounted.has(index) || sequence.state.failed.includes(index)) return null;
        const current = index === sequence.state.active;
        const previous = index === sequence.state.previous;
        return (
          <picture key={frame.image + index} className={"sequence-layer " + (current ? "current" : previous ? "previous" : "buffer")}
            data-transition={current && sequence.state.moves > 0}>
            {frame.mobile && <source media="(max-width: 640px)" srcSet={publicUrl(frame.mobile)} />}
            {/* Local archive WebPs are art-directed and sized independently for phones. */}
            <ArchiveImage frame={frame} current={current} first={index === 0} eager={eager}
              ready={() => sequence.ready(index)} failed={() => sequence.failed(index)} />
          </picture>
        );
      })}
    </div>
  );
}

const keyboardHelp = {
  ru: "Пробел — пауза или продолжение. Стрелки — смена кадра.",
  en: "Press Space to pause or resume. Use the arrow keys to change image.",
  ar: "اضغط على مفتاح المسافة للإيقاف المؤقت أو الاستئناف. استخدم السهمين لتغيير الصورة.",
  es: "Pulsa espacio para pausar o continuar. Usa las flechas para cambiar de imagen.",
  hu: "Szünet vagy folytatás a szóközzel. A képek között a nyílbillentyűkkel válthat."
};

const arrowHelp = {
  ru: "Стрелки меняют кадр.",
  en: "Use the arrow keys to change image.",
  ar: "استخدم السهمين لتغيير الصورة.",
  es: "Usa las flechas para cambiar de imagen.",
  hu: "A képek között a nyílbillentyűkkel válthat."
};

function SequenceNavigation({ lang, count, sequence }: { lang: Lang; count: number; sequence: Sequence }) {
  if (count < 2) return null;
  return (
    <div className="cinema-navigation">
      <div className="cinema-indicators" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => <span key={index} data-current={sequence.state.active === index} />)}
      </div>
      <div className="cinema-arrows">
        <button type="button" data-step="previous" aria-label={ui.prev[lang]} onClick={() => sequence.step(-1)}><Icon name="left" size={17}/></button>
        <button type="button" data-step="next" aria-label={ui.next[lang]} onClick={() => sequence.step(1)}><Icon name="right" size={17}/></button>
      </div>
    </div>
  );
}

type HeroProps = {
  lang: Lang; title: string; intro: string; tag: string; film: string; filmTitle: string;
  close: string; external: string; scroll: string;
};

export function Hero({ lang, title, intro, tag, film, filmTitle, close, external }: HeroProps) {
  const gallery: { heroFrames?: ArchiveFrame[]; hero: string } = home;
  const frames = gallery.heroFrames?.length
    ? gallery.heroFrames.map(frame => ({ image: frame.image, mobile: frame.mobile, alt: frame.alt[lang] }))
    : [{ image: home.hero, mobile: home.heroMobile, alt: home.heroAlt[lang] }];
  const { attach, ...sequence } = usePhotoSequence<HTMLElement>(frames.length);
  return (
    <section ref={attach} className="hero cinema-hero" aria-labelledby="hero-title" data-sequence="hero"
      tabIndex={frames.length > 1 ? 0 : undefined} aria-describedby={frames.length > 1 ? "hero-shortcuts" : undefined}
      aria-keyshortcuts="Space ArrowLeft ArrowRight" onKeyDown={sequence.onKeyDown}
      data-active={sequence.state.active} data-running={sequence.running} data-paused={sequence.paused}
      onFocusCapture={sequence.interaction.onFocusCapture} onBlurCapture={sequence.interaction.onBlurCapture}>
      {frames[0].mobile && <link rel="preload" as="image" fetchPriority="high"
        media="(max-width: 640px)" href={publicUrl(frames[0].mobile)} />}
      <link rel="preload" as="image" fetchPriority="high"
        media={frames[0].mobile ? "(width > 640px)" : undefined} href={publicUrl(frames[0].image)} />
      <div className="hero-exposure">
        <Frames frames={frames} sequence={sequence} eager />
        <div className="shell hero-film-layout">
          <div className="hero-inscription">
            <div className="cinema-kicker hero-company-line">{tag}</div>
            <h1 id="hero-title" tabIndex={-1}>{title.split("\n").map(line => <span key={line}>{line}</span>)}</h1>
            <p className="hero-intro">{intro}</p>
            <div className="hero-film">
              <MediaButton url={film} title={filmTitle} playLabel={messages[lang].film} closeLabel={close} externalLabel={external} />
            </div>
          </div>
          <div className="hero-reel" onPointerEnter={sequence.interaction.onPointerEnter} onPointerLeave={sequence.interaction.onPointerLeave}>
            <SequenceNavigation lang={lang} count={frames.length} sequence={sequence}/>
          </div>
        </div>
      </div>
      <span className="cinema-key-help" id="hero-shortcuts">{sequence.reduced ? arrowHelp[lang] : keyboardHelp[lang]}</span>
    </section>
  );
}

function featuredFrame(project: Feature): Frame {
  if (project.featuredImage && project.featuredCaption) {
    return { image: project.featuredImage, alt: project.featuredCaption };
  }
  return { image: project.image, alt: project.caption };
}

export function Featured({ items, labels, lang }: { items: Feature[]; labels: { more: string }; lang: Lang }) {
  const { attach, ...sequence } = usePhotoSequence<HTMLElement>(items.length);
  const project = items[sequence.state.active];
  if (!project) return null;
  const frames = items.map(featuredFrame);
  return (
    <section className="cinema-projects" ref={attach} aria-labelledby="featured-title" data-sequence="projects"
      tabIndex={items.length > 1 ? 0 : undefined} aria-describedby={items.length > 1 ? "project-shortcuts" : undefined}
      aria-keyshortcuts="Space ArrowLeft ArrowRight" onKeyDown={sequence.onKeyDown}
      data-active={sequence.state.active} data-running={sequence.running} data-paused={sequence.paused} {...sequence.interaction}>
      <div className="project-spread">
        <div className="project-photograph" data-project={project.slug}>
          <Frames frames={frames} sequence={sequence}/>
        </div>
        <div className="shell project-edition">
          <div className="project-preface">
            <div className="cinema-kicker">{ui.projectHeading[lang]}</div>
            <h2 id="featured-title">{home.projects[lang]}</h2>
            <a className="cinema-project-link all-projects" href={localeUrl(lang,"projects")}>{ui.allProjects[lang]}<Icon name="arrow" size={17}/></a>
          </div>
          <a className="project-image-credit" href={publicUrl("/images/credits.html") + "?lang=" + lang}>{frames[sequence.state.active].alt}</a>
          <div className="project-story-column">
            <div className="project-stories">
              {items.map((p, index) => {
                const active = index === sequence.state.active;
                return <article key={p.slug} className={"project-account" + (active ? " current" : "")} aria-hidden={!active} inert={!active}>
                  <div className="project-dateline"><span>{p.country}</span><span>{p.sector}</span></div>
                  <h3>{p.title}</h3>
                  <p>{p.role || p.summary}</p>
                  <a className="cinema-project-link" href={p.url}>{labels.more}<Icon name="arrow" size={17}/></a>
                </article>;
              })}
            </div>
            <SequenceNavigation lang={lang} count={items.length} sequence={sequence}/>
          </div>
        </div>
      </div>
      <span className="cinema-key-help" id="project-shortcuts">{sequence.reduced ? arrowHelp[lang] : keyboardHelp[lang]}</span>
    </section>
  );
}

export { GeographyMap, ProjectFilters } from "./Atlas";
