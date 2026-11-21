"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import map from "@/content/map.json";
import words from "@/content/technical-ui.json";
import type { Lang } from "@/lib/content";
import { localeUrl } from "@/lib/urls";
import type { Feature } from "./Showcases";
import { Photo } from "./Media";
import { Icon } from "./Icons";
import "./project-pages.css";

type Area = { slug: string; name: string };

export function GeographyMap({
  items,
  more,
  label,
  lang = "ru",
}: {
  items: Feature[];
  more: string;
  label: string;
  lang?: Lang;
}) {
  const [region, select] = useState(items[0]?.region);
  const countries = items.filter(
    (p, i) => items.findIndex((x) => x.region === p.region) === i,
  );
  const visible = items.filter((p) => p.region === region);
  const active = visible[0];
  const atlas = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = atlas.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("atlas-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  if (!active) return null;
  const point = map.points[active.region as keyof typeof map.points];
  function chooseOnHover(event: React.PointerEvent, region: string) {
    if (event.pointerType === "mouse") select(region);
  }
  return (
    <div className="geo-widget atlas" ref={atlas}>
      <div className="atlas-map-frame" role="group" aria-label={label}>
        <div className="map-canvas atlas-canvas">
          {countries.map((p, i) => {
            const xy = map.points[p.region as keyof typeof map.points];
            if (!xy) return null;
            return (
              <button
                type="button"
                key={p.region}
                className={"map-pin " + (region === p.region ? "selected" : "")}
                style={
                  {
                    left: (xy.x / map.viewBox[2]) * 100 + "%",
                    top: (xy.y / map.viewBox[3]) * 100 + "%",
                    "--pin-order": i,
                  } as CSSProperties
                }
                aria-label={p.country}
                aria-pressed={region === p.region}
                onPointerEnter={(e) => chooseOnHover(e, p.region)}
                onFocus={() => select(p.region)}
                onClick={() => select(p.region)}
              >
                <i />
                <span dir="auto">{p.country}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="atlas-panel">
        <div
          className="geo-country-list atlas-tabs"
          role="group"
          aria-label={label}
        >
          {countries.map((p) => (
            <button
              type="button"
              key={p.region}
              aria-pressed={region === p.region}
              onPointerEnter={(e) => chooseOnHover(e, p.region)}
              onFocus={() => select(p.region)}
              onClick={() => select(p.region)}
            >
              {p.country}
            </button>
          ))}
        </div>
        <div className="atlas-detail" key={region} aria-live="polite">
          <div className="atlas-title">
            <h3>{active.country}</h3>
            {point && (
              <small dir="ltr">
                {point.latitude.toFixed(1)}° N · {point.longitude.toFixed(1)}° E
              </small>
            )}
          </div>
          <p>{active.summary}</p>
          <div className="geo-selection">
            {visible.map((p) => (
              <a href={p.url} key={p.slug} title={more}>
                <span>{p.sector}</span>
                <strong>{p.title}</strong>
                <Icon name="diagonal" size={17} />
              </a>
            ))}
          </div>
          <a
            className="atlas-catalogue"
            href={
              localeUrl(lang, "projects") +
              "?country=" +
              encodeURIComponent(active.region) +
              "#catalogue"
            }
          >
            {words.countryProjects[lang]} <Icon name="arrow" size={17} />
          </a>
        </div>
      </div>
    </div>
  );
}

const filterEvent = "roin:project-filters";
function listenToQuery(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(filterEvent, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(filterEvent, onChange);
  };
}

export function ProjectFilters({
  items,
  areas,
  labels,
}: {
  items: Feature[];
  areas: Area[];
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
  const query = useSyncExternalStore(
    listenToQuery,
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(query);
  const country = items.some((p) => p.region === params.get("country"))
    ? params.get("country") || ""
    : "";
  const area = areas.some((a) => a.slug === params.get("area"))
    ? params.get("area") || ""
    : "";
  const filtered = items.filter(
    (p) =>
      (!country || p.region === country) && (!area || p.areas.includes(area)),
  );
  function update(selectedCountry: string, selectedArea: string) {
    const url = new URL(window.location.href);
    if (selectedCountry) url.searchParams.set("country", selectedCountry);
    else url.searchParams.delete("country");
    if (selectedArea) url.searchParams.set("area", selectedArea);
    else url.searchParams.delete("area");
    window.history.replaceState(window.history.state, "", url.href);
    window.dispatchEvent(new Event(filterEvent));
  }
  return (
    <>
      <div className="filter-bar catalogue-controls">
        <label>
          {labels.country}
          <select
            value={country}
            onChange={(e) => update(e.target.value, area)}
          >
            <option value="">{labels.allCountries}</option>
            {items
              .filter(
                (p, i) => items.findIndex((x) => x.region === p.region) === i,
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
          <select
            value={area}
            onChange={(e) => update(country, e.target.value)}
          >
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
        {(country || area) && (
          <button
            className="clear-selection"
            type="button"
            onClick={() => update("", "")}
          >
            {labels.reset}
          </button>
        )}
      </div>
      {filtered.length > 0 ? (
        <div className="catalogue-list">
          {filtered.map((p) => (
            <a
              className="project-card portfolio-entry"
              key={p.slug}
              href={p.url}
            >
              <div className="project-image">
                <Photo
                  src={p.image}
                  alt={p.caption}
                  sizes="(max-width:700px) 100vw,55vw"
                />
                {p.caption && <span className="site-caption">{p.caption}</span>}
              </div>
              <div className="portfolio-text">
                <span className="portfolio-country">
                  <Icon name="pin" size={17} />
                  {p.country}
                </span>
                <h2>{p.title}</h2>
                <p>{p.summary}</p>
                <span className="portfolio-sector">
                  {p.sector}
                  <Icon name="diagonal" size={22} />
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="empty-results" role="status">
          {labels.noResults}
        </p>
      )}
    </>
  );
}
