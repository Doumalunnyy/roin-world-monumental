"use client";
import { useState } from "react";
import { Icon } from "./Icons";
import { Photo, MediaButton } from "./Media";
import { publicUrl } from "@/lib/urls";

export type Feature = {
  slug: string;
  region: string;
  country: string;
  title: string;
  image: string;
  summary: string;
  sector: string;
  caption: string;
  url: string;
  areas: string[];
};
type Common = { prev: string; next: string; more: string };
export function Hero({
  title,
  archiveFirst,
  archiveLabel,
  intro,
  tag,
  aboutLabel,
  aboutUrl,
  film,
  filmTitle,
  playLabel,
  close,
  external,
  scroll,
  hero,
  heroMobile,
  alt,
  items,
  labels,
}: {
  title: string;
  archiveFirst: boolean;
  archiveLabel: string;
  intro: string;
  tag: string;
  aboutLabel: string;
  aboutUrl: string;
  film: string;
  filmTitle: string;
  playLabel: string;
  close: string;
  external: string;
  scroll: string;
  hero: string;
  heroMobile: string;
  alt: string;
  items: Feature[];
  labels: Common;
}) {
  const [index, setIndex] = useState(0);
  const count = items.length + Number(archiveFirst);
  const item = items[index - Number(archiveFirst)];
  const step = (n: number) =>
    setIndex((v) => (v + n + count) % count);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-picture" key={index}>
        {index === 0 ? (
          <picture>
            <source media="(max-width: 600px)" srcSet={publicUrl(heroMobile)} />
            <img
              src={publicUrl(hero)}
              alt={alt}
              fetchPriority="high"
              width="1920"
              height="1080"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />
          </picture>
        ) : item ? (
          <Photo src={item.image} alt={item.caption} sizes="100vw" />
        ) : null}
      </div>
      <div className="hero-shade" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <div className="hero-label">
            <span className="hero-brand" dir="ltr">ROIN WORLD</span>
            <span>{tag}</span>
          </div>
          <h1 id="hero-title">
            {title.split("\n").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </h1>
          <p>{intro}</p>
          <div className="hero-actions">
            <a className="action light" href={aboutUrl}>
              {aboutLabel}
              <Icon name="arrow" />
            </a>
            <MediaButton
              url={film}
              title={filmTitle}
              playLabel={playLabel}
              closeLabel={close}
              externalLabel={external}
            />
          </div>
        </div>
        <div className="hero-bottom">
          <a className="scroll-cue" href="#geography">
            <span>
              <Icon name="down" size={16} />
            </span>
            {scroll}
          </a>
          {count > 0 && (
            <div className="hero-index">
              <a href={item?.url || "https://roinworld.ae/media/"} className="frame-caption" aria-live="polite">
                <Icon name={item ? "pin" : "layers"} size={15} />
                <span>
                  {item ? item.title : archiveLabel}
                  {item && <small>{item.country}</small>}
                </span>
              </a>
              <div className="counter" dir="ltr">
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>/</span>
                {String(count).padStart(2, "0")}
              </div>
              <div className="stepper">
                <button aria-label={labels.prev} onClick={() => step(-1)}>
                  <Icon name="left" size={15} />
                </button>
                <button aria-label={labels.next} onClick={() => step(1)}>
                  <Icon name="right" size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export function Featured({
  items,
  labels,
}: {
  items: Feature[];
  labels: Common;
}) {
  const [i, set] = useState(0);
  const p = items[i];
  if (!p) return null;
  return (
    <div className="featured">
      <div className="feature-picture">
        <Photo
          key={p.image}
          src={p.image}
          alt={p.caption}
          sizes="(max-width:768px) 100vw,68vw"
        />
        <span className="credit">{p.caption}</span>
      </div>
      <div className="feature-info" aria-live="polite">
        <div className="project-country">
          <Icon name="pin" size={17} />
          {p.country}
        </div>
        <span className="feature-industry">{p.sector}</span>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <a className="text-link" href={p.url}>
          {labels.more}
          <Icon name="arrow" />
        </a>
        <div className="feature-control">
          <div className="counter" dir="ltr">
            <b>{String(i + 1).padStart(2, "0")}</b> /{" "}
            {String(items.length).padStart(2, "0")}
          </div>
          <div className="stepper">
            <button
              aria-label={labels.prev}
              onClick={() => set((i - 1 + items.length) % items.length)}
            >
              <Icon name="left" size={16} />
            </button>
            <button
              aria-label={labels.next}
              onClick={() => set((i + 1) % items.length)}
            >
              <Icon name="right" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { GeographyMap, ProjectFilters } from "./Atlas";
