"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Icon } from "./Icons";
import { MediaButton } from "./Media";
import { usePhotoSequence } from "./usePhotoSequence";
import { publicUrl } from "@/lib/urls";
import type { Lang } from "@/lib/content";
import home from "@/content/home.json";
import messages from "@/content/showcase-ui.json";
import "./showcases.css";

export type Feature = {
  slug: string;
  region: string;
  country: string;
  title: string;
  image: string;
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
type Labels = typeof messages.ru;

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

function Counter({ active, count, label }: { active: number; count: number; label: string }) {
  return <span className="sequence-count" dir="ltr" aria-label={label + " " + (active + 1) + " / " + count}>
    <b>{String(active + 1).padStart(2, "0")}</b><span aria-hidden="true"> / </span>{String(count).padStart(2, "0")}
  </span>;
}
function Toggle({ sequence, labels }: { sequence: Sequence; labels: Labels }) {
  if (sequence.reduced) return null;
  const name = sequence.paused ? labels.resume : labels.pause;
  return <button className="sequence-toggle" type="button" title={name} aria-label={name} aria-pressed={sequence.paused} onClick={sequence.toggle}>
    {sequence.paused ? <Icon name="play" size={14} /> : <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" fill="none" stroke="currentColor" strokeWidth="2"/></svg>}
  </button>;
}

type HeroProps = {
  lang: Lang; title: string; intro: string; tag: string; film: string; filmTitle: string;
  close: string; external: string; scroll: string;
};
export function Hero({lang,title,intro,tag,film,filmTitle,close,external,scroll}: HeroProps) {
  const labels = messages[lang];
  const gallery: { heroFrames?: ArchiveFrame[]; hero: string } = home;
  const frames = gallery.heroFrames?.length
    ? gallery.heroFrames.map(frame => ({ image: frame.image, mobile: frame.mobile, alt: frame.alt[lang] }))
    : [{ image: home.hero, mobile: home.heroMobile, alt: home.heroAlt[lang] }];
  const { attach, ...sequence } = usePhotoSequence<HTMLElement>(frames.length);
  return (
    <section ref={attach} className="hero cinema-hero" aria-labelledby="hero-title" data-sequence="hero"
      data-active={sequence.state.active} data-running={sequence.running}
      onFocusCapture={sequence.interaction.onFocusCapture} onBlurCapture={sequence.interaction.onBlurCapture}>
      <div className="hero-exposure">
        <Frames frames={frames} sequence={sequence} eager />
        <div className="shell hero-inscription">
          <div className="hero-company-line">{tag}</div>
          <h1 id="hero-title" tabIndex={-1}>
            {title.split("\n").map(line => <span key={line}>{line}</span>)}
          </h1>
        </div>
      </div>
      <div className="hero-colophon">
        <div className="shell hero-colophon-inner">
          <p className="hero-intro">{intro}</p>
          <div className="hero-film">
            <MediaButton url={film} title={filmTitle} playLabel={labels.film} closeLabel={close} externalLabel={external} />
          </div>
          <div className="hero-reel" onPointerEnter={sequence.interaction.onPointerEnter} onPointerLeave={sequence.interaction.onPointerLeave}>
            <a className="archive-source" href={publicUrl("/images/credits.html") + "?lang=" + lang}>{labels.archive}</a>
            <div className="reel-controls">
              <Counter active={sequence.state.active} count={frames.length} label={labels.index}/>
              {frames.length > 1 && <Toggle sequence={sequence} labels={labels}/>}
            </div>
          </div>
          <a className="hero-location-link" href="#geography" aria-label={scroll} title={scroll}><Icon name="down" size={18}/></a>
        </div>
      </div>
    </section>
  );
}

export function Featured({ items, labels, lang }: { items: Feature[]; labels: { more: string }; lang: Lang }) {
  const copy = messages[lang];
  const { attach, ...sequence } = usePhotoSequence<HTMLElement>(items.length);
  const project = items[sequence.state.active];
  if (!project) return null;
  const frames = items.map(item => ({image:item.image,alt:item.caption}));
  return (
    <section className="featured cinema-projects" ref={attach}
      data-sequence="projects" data-active={sequence.state.active} data-running={sequence.running}
      aria-label={home.projects[lang]} {...sequence.interaction}>
      <div className="project-exposure" data-project={project.slug}>
        <Frames frames={frames} sequence={sequence}/>
        <div className="shell project-inscription">
          <div className="project-titles">
            {items.map((p, index) => <h3 key={p.slug} aria-hidden={index !== sequence.state.active}
              className={index === sequence.state.active ? "current" : ""}>{p.title}</h3>)}
          </div>
        </div>
      </div>
      <div className="shell project-legend">
        <div className="project-contexts">
          {items.map((p, index) => <div key={p.slug}
            className={"project-context" + (index === sequence.state.active ? " current" : "")}
            aria-hidden={index !== sequence.state.active}>
            <div className="project-location"><Icon name="pin" size={18}/>{p.country}</div>
            <span>{p.sector}</span>
            <span className="scene-credit">{p.caption}</span>
          </div>)}
        </div>
        <div className="project-accounts">
          {items.map((p, index) => {
            const active = index === sequence.state.active;
            return <div key={p.slug} className={"project-account" + (active ? " current" : "")} aria-hidden={!active} inert={!active}>
              <p>{p.role || p.summary}</p>
              <a className="text-link" href={p.url}>{labels.more}<Icon name="arrow"/></a>
            </div>;
          })}
        </div>
        <div className="project-chapters">
          <div className="reel-controls">
            <Counter active={sequence.state.active} count={items.length} label={copy.index}/>
            {items.length > 1 && <Toggle sequence={sequence} labels={copy}/>}
          </div>
          <div className="sequence-tabs" role="group" aria-label={copy.select}>
            {items.map((p,i) => <button type="button" key={p.slug} aria-pressed={i === sequence.state.active}
              onClick={() => sequence.select(i)}>{p.country}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export { GeographyMap, ProjectFilters } from "./Atlas";
