"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import geometry from "@/content/map.json";
import words from "@/content/technical-ui.json";
import type { Lang } from "@/lib/content";
import { localeUrl, publicUrl } from "@/lib/urls";
import type { Feature } from "./Showcases";
import { Photo } from "./Media";
import { Icon } from "./Icons";
import "./project-pages.css";
import "./atlas.css";

type Area = { slug: string; name: string };
type Region = keyof typeof geometry.points;
const [,, chartWidth, chartHeight] = geometry.viewBox;
const pointFor = (region: string) => geometry.points[region as Region];

function Chart({ countries, active, select, label, panelId, lang }: {
  countries: Feature[];
  active: Feature;
  select: (region: string) => void;
  label: string;
  panelId: string;
  lang: Lang;
}) {
  const position = pointFor(active.region);
  // Keep the graphic and geographic controls in a single projected plane.
  const focus = {
    "--atlas-focus-x": position ? (630 - position.x) * .029 + "%" : "0%",
    "--atlas-focus-y": position ? (137 - position.y) * .031 + "%" : "0%",
  } as CSSProperties;
  return (
    <div className="ae-viewport" role="group" aria-label={label}>
      <div className="ae-plane map-canvas" style={focus}>
        <svg aria-hidden="true" viewBox={geometry.viewBox.join(" ")} className="ae-drawing">
          <image href={publicUrl("/images/world-map.svg")} width={chartWidth} height={chartHeight} />
          {geometry.oceanLabels.map(ocean => <text key={ocean.title.en} x={ocean.x} y={ocean.y}
            textAnchor="middle" className="ae-ocean-name" direction={lang === "ar" ? "rtl" : "ltr"}>
            {ocean.title[lang]}
          </text>)}
          {countries.map(country => {
            const point = pointFor(country.region);
            return point ? <path key={country.region} d={point.outline} className="ae-territory"
              data-active={country.region === active.region} /> : null;
          })}
        </svg>
        {countries.map(country => {
          const point = pointFor(country.region);
          if (!point) return null;
          return (
            <button type="button" key={country.region} className="ae-pin"
              data-region={country.region} aria-label={country.country}
              aria-controls={panelId} aria-pressed={country.region === active.region}
              onClick={() => select(country.region)}
              style={{ left: point.x / chartWidth * 100 + "%", top: point.y / chartHeight * 100 + "%" }}>
              <i aria-hidden="true" /><span dir="auto" aria-hidden="true">{country.country}</span>
            </button>
          );
        })}
      </div>
      <a className="ae-credit" href="https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/">
        Natural Earth <span aria-hidden="true">·</span> Equal Earth <Icon name="diagonal" size={12}/>
      </a>
    </div>
  );
}

export function GeographyMap({ items, more, label, lang = "ru" }: {
  items: Feature[];
  more: string;
  label: string;
  lang?: Lang;
}) {
  const [choice, select] = useState(items[0]?.region);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const countries = items.filter((project, i) => items.findIndex(p => p.region === project.region) === i);
  const active = countries.find(p => p.region === choice) ?? countries[0];
  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.add("ae-in-view");
      observer.disconnect();
    }, { threshold: .12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  if (!active) return null;
  const visible = items.filter(project => project.region === active.region);
  const catalogue = localeUrl(lang, "projects") + "?country=" + encodeURIComponent(active.region) + "#catalogue";

  function moveSelection(event: KeyboardEvent<HTMLElement>) {
    const k = event.key;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(k)) return;
    const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
    const from = buttons.indexOf(event.target as HTMLButtonElement);
    if (from < 0) return;
    const direction = getComputedStyle(event.currentTarget).direction === "rtl" ? -1 : 1;
    const offset = k === "ArrowRight" ? direction : -direction;
    const to = k === "Home" ? 0 : k === "End" ? buttons.length - 1 : (from + offset + buttons.length) % buttons.length;
    event.preventDefault();
    select(countries[to].region);
    buttons[to].focus();
  }

  return (
    <div className="atlas-engineering geo-widget" ref={root}>
      <div className="ae-toolbar">
        <span className="ae-toolbar-title"><Icon name="globe" size={19}/>{words.regionRegister[lang]}</span>
        <div className="ae-selector geo-country-list" role="group" aria-label={label} onKeyDown={moveSelection}>
          {countries.map(p => (
            <button key={p.region} type="button" aria-controls={panelId}
              aria-pressed={active.region === p.region} onClick={() => select(p.region)}>
              {p.country}
            </button>
          ))}
        </div>
      </div>
      <div className="ae-board">
        <Chart countries={countries} active={active} label={label} select={select} panelId={panelId} lang={lang}/>
        <div className="ae-record" id={panelId} aria-live="polite" aria-atomic="true">
          <div key={active.region} className="ae-record-content">
            <figure className="ae-figure">
              <div className="ae-photograph">
                <Photo src={active.image} alt={active.caption || active.title}
                  sizes="(max-width: 620px) 92vw, (max-width: 860px) 36vw, 350px" />
              </div>
              {active.caption && <figcaption>{active.caption}</figcaption>}
            </figure>
            <div className="ae-entry">
              <h3>{active.country}</h3>
              <p>{active.summary}</p>
              <div className="ae-projects geo-selection">
                {visible.map(project => <a href={project.url} key={project.slug} title={more}>
                  {project.title}<Icon name="diagonal" size={16}/>
                </a>)}
              </div>
              <a className="ae-more" href={catalogue}>{words.countryProjects[lang]} <Icon name="arrow" size={15}/></a>
            </div>
          </div>
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
