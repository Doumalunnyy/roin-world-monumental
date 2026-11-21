"use client";

import {
  useId,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import geometry from "@/content/map.json";
import words from "@/content/technical-ui.json";
import portfolio from "@/content/projects.json";
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
  const style = {
    "--ae-pan-x": position ? (630 - position.x) * .026 + "%" : "0%",
    "--ae-pan-y": position ? (140 - position.y) * .033 + "%" : "0%",
  } as CSSProperties;
  return (
    <div className="ae-viewport" role="group" aria-label={label}>
      <div className="ae-plane map-canvas" style={style}>
        <svg className="ae-drawing" viewBox={geometry.viewBox.join(" ")} aria-hidden="true">
          <image href={publicUrl("/images/atlas-relief.webp")} width={chartWidth} height={chartHeight} />
          {geometry.oceanLabels.map(ocean => (
            <text key={ocean.title.en} x={ocean.x} y={ocean.y} textAnchor="middle"
              className="ae-ocean" direction={lang === "ar" ? "rtl" : "ltr"}>{ocean.title[lang]}</text>
          ))}
          {countries.map(country => {
            const point = pointFor(country.region);
            return point && <path key={country.region} d={point.outline}
              className="ae-territory" data-active={country.region === active.region}/>;
          })}
        </svg>
        {countries.map(country => {
          const point = pointFor(country.region);
          if (!point) return null;
          return <button key={country.region} type="button" className="ae-pin"
            data-region={country.region} aria-controls={panelId} aria-label={country.country}
            aria-pressed={active.region === country.region} onClick={() => select(country.region)}
            style={{ left: point.x / chartWidth * 100 + "%", top: point.y / chartHeight * 100 + "%" }}>
            <i aria-hidden="true"/><span aria-hidden="true" dir="auto">{country.country}</span>
          </button>;
        })}
      </div>
    </div>
  );
}

const coolingTowers = portfolio.items.find(project => project.slug === "rooppur")?.gallery
  ?.find(frame => frame.image === "/images/project-bd.webp");

function archiveFrame(project: Feature, lang: Lang) {
  if (project.slug === "rooppur" && coolingTowers) {
    return { image: coolingTowers.image, caption: coolingTowers.caption[lang] };
  }
  return { image: project.image, caption: project.caption };
}

const countryCodes: Record<Region, string> = { bangladesh: "BGD", hungary: "HUN", egypt: "EGY" };

export function GeographyMap({ items, more, label, lang = "ru" }: {
  items: Feature[];
  more: string;
  label: string;
  lang?: Lang;
}) {
  const [choice, select] = useState(items[0]?.region);
  const panelId = useId();
  const countries = items.filter((project, i) => items.findIndex(p => p.region === project.region) === i);
  const active = countries.find(p => p.region === choice) ?? countries[0];
  if (!active) return null;
  const visible = items.filter(project => project.region === active.region);
  const caption = archiveFrame(active, lang).caption;
  const catalogue = localeUrl(lang, "projects") + "?country=" + encodeURIComponent(active.region) + "#catalogue";

  function moveSelection(event: KeyboardEvent<HTMLElement>) {
    const key = event.key;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
    const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
    const from = buttons.indexOf(event.target as HTMLButtonElement);
    if (from < 0) return;
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const step = key === "ArrowRight" ? 1 : -1;
    const adjacent = (from + (rtl ? -step : step) + buttons.length) % buttons.length;
    const to = key === "Home" ? 0 : key === "End" ? buttons.length - 1 : adjacent;
    event.preventDefault();
    select(countries[to].region);
    buttons[to].focus();
  }

  return (
    <div className="atlas-engineering geo-widget">
      <div className="ae-board">
        <Chart countries={countries} active={active} select={select} label={label} panelId={panelId} lang={lang}/>
        <div className="ae-archive" aria-hidden="true">
          {countries.map(country => <div key={country.region} className="ae-frame" data-active={country === active}>
            <Photo src={archiveFrame(country, lang).image} alt="" sizes="(max-width: 680px) 100vw, 56vw"/>
          </div>)}
        </div>
        <div className="ae-record" id={panelId} aria-live="polite" aria-atomic="true">
          <div className="ae-entry" key={active.region}>
            {caption && <p className="ae-caption">{caption}</p>}
            <h3>{active.country}</h3>
            <p className="ae-summary">{active.role || active.summary}</p>
            <div className="ae-links">
              <div className="ae-projects geo-selection">
                {visible.map(project => <a key={project.slug} href={project.url} title={more}>
                  {project.title}<Icon name="diagonal" size={16}/>
                </a>)}
              </div>
              <a className="ae-more" href={catalogue}>
                {words.countryProjects[lang]}<Icon name="arrow" size={15}/>
              </a>
            </div>
          </div>
        </div>
        <a className="ae-credit" href="https://www.naturalearthdata.com/downloads/50m-raster-data/50m-gray-earth/">
          Natural Earth · Equal Earth <Icon name="diagonal" size={12}/>
        </a>
      </div>
      <nav className="ae-register geo-country-list" aria-label={label} onKeyDown={moveSelection}>
        {countries.map(country => <button type="button" key={country.region} aria-controls={panelId}
          aria-pressed={country === active} onClick={() => select(country.region)}>
          <span className="ae-code" aria-hidden="true">{countryCodes[country.region as Region]}</span>
          <span className="ae-index-name">{country.country}</span>
          <Icon name="arrow" size={17}/>
        </button>)}
      </nav>
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
