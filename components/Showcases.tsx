"use client";
import { useState } from "react";
import { Icon } from "./Icons";
import { Photo, MediaButton } from "./Media";
import map from "@/content/map.json";
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
  const item = items[index];
  const step = (n: number) =>
    setIndex((v) => (v + n + items.length) % items.length);
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
        ) : (
          <Photo src={item.image} alt={item.caption} sizes="100vw" />
        )}
      </div>
      <div className="hero-shade" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <div className="hero-label">
            <i />
            {tag}
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
          <a className="scroll-cue" href="#about">
            <span>
              <Icon name="down" size={16} />
            </span>
            {scroll}
          </a>
          {item && (
            <div className="hero-index">
              <a href={item.url} className="frame-caption" aria-live="polite">
                <Icon name="pin" size={15} />
                <span>
                  {index === 0 ? item.title : item.caption}
                  <small>{item.country}</small>
                </span>
              </a>
              <div className="counter" dir="ltr">
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>/</span>
                {String(items.length).padStart(2, "0")}
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
export function GeographyMap({
  items,
  more,
  label,
}: {
  items: Feature[];
  more: string;
  label: string;
}) {
  const [region, select] = useState(items[0]?.region);
  const visible = items.filter((p) => p.region === region);
  const countries = items.filter(
    (p, i, a) => a.findIndex((x) => x.region === p.region) === i,
  );
  return (
    <div className="geo-widget">
      <div className="map-canvas" aria-label={label}>
        {countries.map((p) => {
          const xy = map.points[p.region as keyof typeof map.points];
          return xy ? (
            <button
              key={p.region}
              style={{ left: xy.x / 10 + "%", top: xy.y / 5.75 + "%" }}
              className={"map-pin " + (region === p.region ? "selected" : "")}
              aria-pressed={region === p.region}
              onClick={() => select(p.region)}
              aria-label={p.country}
            >
              <i />
              <span>{p.country}</span>
            </button>
          ) : null;
        })}
      </div>
      <div className="geo-results">
        <div className="geo-country-list">
          {countries.map((p) => (
            <button
              key={p.region}
              aria-pressed={p.region === region}
              onClick={() => select(p.region)}
            >
              {p.country}
            </button>
          ))}
        </div>
        <div className="geo-selection" aria-live="polite">
          {visible.map((p) => (
            <a href={p.url} key={p.slug} title={more}>
              <span>{p.sector} </span>
              <strong>{p.title}</strong>
              <Icon name="arrow" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export function ProjectFilters({
  items,
  areas,
  labels,
}: {
  items: Feature[];
  areas: { slug: string; name: string }[];
  labels: {
    country: string;
    area: string;
    allCountries: string;
    allAreas: string;
    noResults: string;
    reset: string;
    found: string;
  };
}) {
  const [country, setCountry] = useState("");
  const [area, setArea] = useState("");
  const filtered = items.filter(
    (p) =>
      (!country || p.region === country) && (!area || p.areas.includes(area)),
  );
  return (
    <>
      <div className="filter-bar">
        <label>
          {labels.country}
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">{labels.allCountries}</option>
            {items
              .filter(
                (p, i, a) => a.findIndex((x) => x.region === p.region) === i,
              )
              .map((p) => (
                <option key={p.region} value={p.region}>
                  {p.country}
                </option>
              ))}
          </select>
        </label>
        <label>
          {labels.area}
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">{labels.allAreas}</option>
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <span aria-live="polite">
          {labels.found} · {filtered.length}
        </span>
      </div>
      {filtered.length ? (
        <div className="project-grid">
          {filtered.map((p) => (
            <a className="project-card" key={p.slug} href={p.url}>
              <div className="project-image">
                <Photo src={p.image} alt={p.caption} />
                <span className="credit">{p.caption}</span>
              </div>
              <div className="project-meta">
                <span>{p.country}</span>
                <span>{p.sector}</span>
              </div>
              <h2>
                {p.title}
                <Icon name="diagonal" />
              </h2>
              <p>{p.summary}</p>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <p>{labels.noResults}</p>
          <button
            className="action"
            onClick={() => {
              setArea("");
              setCountry("");
            }}
          >
            {labels.reset}
          </button>
        </div>
      )}
    </>
  );
}
