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
import copy from "@/content/atlas-ui.json";
import portfolio from "@/content/projects.json";

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

type AtlasLang = keyof typeof copy.heading;
const projectNotes: Partial<Record<string, Record<AtlasLang, string>>> = copy.projectNotes;
const countryOrder: Region[] = ["bangladesh", "egypt", "hungary"];
const rotationDelay = 7000;

function motionAllowed() {
  return !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function listenToMotion(change: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", change);
  document.addEventListener("visibilitychange", change);
  return () => {
    media.removeEventListener("change", change);
    document.removeEventListener("visibilitychange", change);
  };
}

const serverStill = () => false;

function Chart({ countries, active, select, label, panelId }: {
  countries: Feature[];
  active: Feature;
  select: (region: string) => void;
  label: string;
  panelId: string;
}) {
  const position = pointFor(active.region);
  const style = {
    "--ae-pan-x": (630 - position.x) * .014 + "%",
    "--ae-pan-y": (140 - position.y) * .019 + "%",
  } as CSSProperties;
  return (
    <div className="ae-viewport" role="group" aria-label={label}>
      <div className="ae-plane map-canvas" style={style}>
        {/* The local relief and vector overlay share the same Equal Earth viewport. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- Single preprojected local relief; country geometry must align pixel-for-pixel. */}
        <img className="ae-drawing ae-relief" src={publicUrl("/images/atlas-relief.webp")}
          width={chartWidth} height={chartHeight} loading="lazy" fetchPriority="low" decoding="async" alt="" />
        <svg className="ae-drawing" viewBox={geometry.viewBox.join(" ")} aria-hidden="true">
          {countries.map(country => <path key={country.region} d={pointFor(country.region).outline}
            className="ae-territory" data-active={country === active}/>)}
        </svg>
        {countries.map(country => {
          const point = pointFor(country.region);
          return <button key={country.region} type="button" className="ae-pin"
            data-region={country.region} aria-controls={panelId} aria-label={country.country}
            aria-pressed={active === country} onClick={() => select(country.region)}
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

function archiveFrame(project: Feature) {
  return project.slug === "rooppur" && coolingTowers ? coolingTowers.image : project.image;
}

export function GeographyMap({ items, more, label, lang = "ru", home = false }: {
  items: Feature[];
  more: string;
  label: string;
  lang?: AtlasLang;
  home?: boolean;
}) {
  const [choice, setChoice] = useState("egypt");
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onscreen, setOnscreen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const canMove = useSyncExternalStore(listenToMotion, motionAllowed, serverStill);
  const countries = countryOrder.flatMap(region => {
    const country = items.find(project => project.region === region);
    return country ? [country] : [];
  });
  const current = countries.findIndex(project => project.region === choice);
  const activeIndex = current < 0 ? 0 : current;
  const active = countries[activeIndex];
  const nextRegion = countries[(activeIndex + 1) % countries.length]?.region;
  const running = countries.length > 1 && canMove && onscreen && !paused && !hovered && !focused;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setOnscreen(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => setOnscreen(entry.intersectionRatio >= .16),
      { threshold: [0, .16] });
    observer.observe(element);
    return () => observer.disconnect();
  }, [countries.length]);

  useEffect(() => {
    if (!running || !nextRegion) return;
    const timer = window.setTimeout(() => {
      if (motionAllowed()) setChoice(nextRegion);
    }, rotationDelay);
    return () => window.clearTimeout(timer);
  }, [running, nextRegion]);

  if (!active) return null;
  const CountryHeading = home ? "h3" : "h2";

  function select(region: string) {
    setPaused(true);
    setChoice(region);
  }

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
    <div className="atlas-engineering geo-widget" ref={root} data-home={home}
      onPointerEnter={event => setHovered(event.pointerType === "mouse")}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onPointerDownCapture={event => {
        if (event.pointerType === "touch" && !(event.target as Element).closest(".ae-pause")) setPaused(true);
      }}>
      {canMove && countries.length > 1 && <button type="button" className="ae-pause"
        onClick={() => setPaused(!paused)}>{paused ? copy.resume[lang] : copy.pause[lang]}</button>}
      <div className="ae-board">
        <Chart countries={countries} active={active} select={select} label={label} panelId={panelId}/>
        <div className="ae-archive" aria-hidden="true">
          {countries.map(country => <div key={country.region} className="ae-frame" data-active={country === active}>
            <Photo src={archiveFrame(country)} alt="" sizes="(max-width: 680px) 100vw, 54vw"/>
          </div>)}
        </div>
        {home && <div className="ae-heading">
          <div>
            <a className="ae-presence" href={localeUrl(lang, "geography")}>{copy.presence[lang]}</a>
            <h2>{copy.heading[lang]}</h2>
          </div>
          <p>{copy.intro[lang]}</p>
        </div>}
        <div className="ae-record" id={panelId} aria-live={running ? "off" : "polite"} aria-atomic="true">
          {countries.map(country => {
            const selected = country === active;
            const catalogue = localeUrl(lang, "projects") + "?country=" + encodeURIComponent(country.region) + "#catalogue";
            const associated = items.filter(project => project.region === country.region);
            return <div className="ae-entry" key={country.region} data-current={selected}
              aria-hidden={!selected} inert={!selected}>
              <CountryHeading className="ae-country">{country.country}</CountryHeading>
              <p className="ae-summary">{projectNotes[country.slug]?.[lang] || country.summary}</p>
              <div className="ae-links">
                <a className="ae-more" href={catalogue}>{copy.countryProjects[lang]}<Icon name="arrow" size={18}/></a>
                <div className={"ae-projects" + (selected ? " geo-selection" : "")}>
                  {associated.map(project => <a key={project.slug} href={project.url} title={more}>
                    {project.title}<Icon name="diagonal" size={14}/>
                  </a>)}
                </div>
              </div>
              {country.region === "hungary" && country.caption && <p className="ae-caption">{country.caption}</p>}
            </div>;
          })}
        </div>
      </div>
      <nav className="ae-register geo-country-list" aria-label={label} onKeyDown={moveSelection}>
        {countries.map(country => <button type="button" key={country.region} aria-controls={panelId}
          aria-pressed={country === active} onClick={() => select(country.region)}>
          <span className="ae-thumbnail" aria-hidden="true"><Photo src={archiveFrame(country)} alt="" sizes="(max-width: 680px) 30vw, 24vw"/></span>
          <span className="ae-index-name">{country.country}</span>
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
