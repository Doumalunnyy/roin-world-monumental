"use client";

import {
  useEffect,
  useEffectEvent,
  useId,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import geometry from "@/content/map.json";
import copy from "@/content/atlas-ui.json";


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
        <div className="ae-cartography" aria-hidden="true">
          {/* The relief and vector share a projection and dissolve together. Map controls remain crisp. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- Single preprojected local relief; country geometry must align pixel-for-pixel. */}
          <img className="ae-drawing ae-relief" src={publicUrl("/images/atlas-relief.webp")}
            width={chartWidth} height={chartHeight} loading="lazy" fetchPriority="low" decoding="async" alt="" />
          <svg className="ae-drawing" viewBox={geometry.viewBox.join(" ")}>
            {countries.map(country => <path key={country.region} d={pointFor(country.region).outline}
              className="ae-territory" data-active={country === active}/>)}
          </svg>
        </div>
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

function archiveFrame(project: Feature) {
  return project.featuredImage || project.image;
}

type PhotoLoad = { attempt: number; status: "loading" | "ready" | "failed" };
type Scene = {
  active: string;
  pending: { region: string; manual: boolean } | null;
  photos: Partial<Record<string, PhotoLoad>>;
};
type PhotoEvent =
  | { type: "warm"; region: string }
  | { type: "select"; region: string; manual: boolean }
  | { type: "settled"; region: string; attempt: number; ready: boolean; mayRotate: boolean }
  | { type: "cancelAuto" };

function initialScene(active: string): Scene {
  return { active, pending: null, photos: { [active]: { attempt: 0, status: "loading" } } };
}

function updateScene(state: Scene, event: PhotoEvent): Scene {
  if (event.type === "cancelAuto") {
    return state.pending && !state.pending.manual ? { ...state, pending: null } : state;
  }
  const { region } = event;
  const photo = state.photos[region];
  if (event.type === "settled") {
    if (!photo || photo.attempt !== event.attempt || photo.status !== "loading") return state;
    const changed: Scene = {
      ...state,
      photos: { ...state.photos, [region]: { attempt: photo.attempt, status: event.ready ? "ready" : "failed" } },
    };
    if (state.pending?.region !== region) return changed;
    // An explicitly requested country remains accessible when its image is unavailable.
    const commit = state.pending.manual || (event.ready && event.mayRotate);
    return { ...changed, active: commit ? region : state.active, pending: null };
  }
  if (event.type === "warm" && photo) return state;
  if (event.type === "select" && photo?.status === "ready") {
    return { ...state, active: region, pending: null };
  }
  const load: PhotoLoad = photo?.status === "loading"
    ? photo
    : { attempt: (photo?.attempt ?? -1) + 1, status: "loading" };
  return {
    ...state,
    photos: load === photo ? state.photos : { ...state.photos, [region]: load },
    pending: event.type === "select" ? { region, manual: event.manual } : state.pending,
  };
}

function ArchivePhoto({ src, region, load, active, onSettled }: {
  src: string;
  region: string;
  load: PhotoLoad;
  active: boolean;
  onSettled: (region: string, attempt: number, ready: boolean) => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const notify = useEffectEvent(onSettled);
  useEffect(() => {
    const image = frame.current?.querySelector("img");
    if (!image) {
      notify(region, load.attempt, false);
      return;
    }
    let attached = true;
    function failed() {
      if (attached) notify(region, load.attempt, false);
    }
    async function loaded() {
      if (!image || !image.complete) return;
      if (!image.naturalWidth) { failed(); return; }
      const candidate = image.currentSrc;
      try {
        await image.decode();
        if (attached && image.currentSrc === candidate) notify(region, load.attempt, true);
      } catch {
        // Resizing can supersede a candidate during decode. Its replacement has its own load event.
        if (image.currentSrc === candidate) failed();
      }
    }
    image.addEventListener("load", loaded);
    image.addEventListener("error", failed);
    if (image.complete) void loaded();
    return () => {
      attached = false;
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", failed);
    };
  }, [src, region, load.attempt]);
  return <div className="ae-frame" ref={frame} data-region={region} data-active={active}>
    {load.status === "failed"
      ? <span className="media-missing"><Icon name="layers" size={40}/></span>
      : <Photo src={src} alt="" sizes="(max-width: 680px) 100vw, 66vw"/>}
  </div>;
}

type GeographyProps = { items: Feature[]; more: string; label: string; lang?: AtlasLang; home?: boolean };

export function GeographyMap(props: GeographyProps) {
  const countries = countryOrder.flatMap(region => {
    const country = props.items.find(project => project.region === region);
    return country ? [country] : [];
  });
  if (!countries.length) return null;
  const mediaKey = JSON.stringify(countries.map(country => [country.region, archiveFrame(country)]));
  return <GeographyScene {...props} key={mediaKey} countries={countries}/>;
}

function GeographyScene({ items, countries, more, label, lang = "ru", home = false }:
  GeographyProps & { countries: Feature[] }) {
  const first = countries.find(country => country.region === "egypt") ?? countries[0];
  const [scene, dispatch] = useReducer(updateScene, first.region, initialScene);
  const [seen, setSeen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onscreen, setOnscreen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const canMove = useSyncExternalStore(listenToMotion, motionAllowed, serverStill);
  const activeIndex = countries.findIndex(project => project.region === scene.active);
  const active = countries[activeIndex];
  const next = Array.from({ length: countries.length - 1 }, (_, n) => countries[(activeIndex + n + 1) % countries.length])
    .find(country => scene.photos[country.region]?.status !== "failed");
  const nextRegion = next?.region;
  const activeSettled = scene.photos[scene.active]?.status !== "loading";
  const running = Boolean(next && canMove && onscreen && !paused && !hovered && !focused);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => { setSeen(true); setOnscreen(true); });
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.intersectionRatio >= .16;
      setOnscreen(visible);
      if (visible) setSeen(true);
    }, { threshold: [0, .16] });
    observer.observe(element);
    return () => observer.disconnect();
  }, [countries.length]);

  useEffect(() => {
    if (!running || !nextRegion || !activeSettled) return;
    const warm = window.setTimeout(() => dispatch({ type: "warm", region: nextRegion }), rotationDelay / 2);
    const advance = window.setTimeout(() => {
      if (motionAllowed()) dispatch({ type: "select", region: nextRegion, manual: false });
    }, rotationDelay);
    return () => {
      window.clearTimeout(warm);
      window.clearTimeout(advance);
      dispatch({ type: "cancelAuto" });
    };
  }, [running, nextRegion, activeSettled]);

  function settled(region: string, attempt: number, ready: boolean) {
    dispatch({ type: "settled", region, attempt, ready, mayRotate: running && motionAllowed() });
  }
  const CountryHeading = home ? "h3" : "h2";

  function select(region: string) {
    setPaused(true);
    setSeen(true);
    dispatch({ type: "select", region, manual: true });
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
          {countries.map(country => {
            const load = scene.photos[country.region];
            return load && <ArchivePhoto key={country.region + load.attempt} src={archiveFrame(country)}
              region={country.region} load={load} active={country === active} onSettled={settled}/>;
          })}
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
          aria-pressed={country === active} onClick={() => select(country.region)}
          onFocus={() => dispatch({ type: "warm", region: country.region })}
          onPointerEnter={event => { if (event.pointerType === "mouse") dispatch({ type: "warm", region: country.region }); }}>
          <span className="ae-thumbnail" aria-hidden="true">
            {seen && <Photo src={archiveFrame(country)} alt="" sizes="(max-width: 680px) 30vw, 24vw"/>}
          </span>
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
