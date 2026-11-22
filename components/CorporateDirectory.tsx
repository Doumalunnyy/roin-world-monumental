"use client";

import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type Entry = {
  id: string;
  category: string;
  categoryKey: string;
  location?: string;
  locationKey?: string;
  card: ReactNode;
};
type Props = {
  lang: string;
  entries: Entry[];
  labels: {
    category: string;
    location?: string;
    all: string;
    empty: string;
    clear: string;
    results: string;
  };
  layout: "news" | "jobs";
};

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;
const filterEvent = "roin:directory-filter";
function watchQuery(update: () => void) {
  window.addEventListener("popstate", update);
  window.addEventListener(filterEvent, update);
  return () => {
    window.removeEventListener("popstate", update);
    window.removeEventListener(filterEvent, update);
  };
}
const readQuery = () => window.location.search;
const emptyQuery = () => "";

export function CorporateDirectory({ entries, labels, layout, lang }: Props) {
  const listId = useId();
  const firstFilter = useRef<HTMLSelectElement>(null);
  const interactive = useSyncExternalStore(
    subscribe,
    browserReady,
    serverReady,
  );
  const query = new URLSearchParams(useSyncExternalStore(watchQuery, readQuery, emptyQuery));
  const categoryParam = layout === "jobs" ? "department" : "category";
  const categories = new Map(entries.filter(e => e.categoryKey).map(e => [e.categoryKey, e.category]));
  const locations = new Map(entries.filter(e => e.locationKey).map(e => [e.locationKey!, e.location!]));
  const selectedCategory = query.get(categoryParam) || "";
  const selectedLocation = query.get("location") || "";
  const category = categories.has(selectedCategory) ? selectedCategory : "";
  const location = locations.size > 1 && locations.has(selectedLocation) ? selectedLocation : "";
  function update(categoryKey: string, locationKey: string) {
    const url = new URL(window.location.href);
    if (categoryKey) url.searchParams.set(categoryParam, categoryKey);
    else url.searchParams.delete(categoryParam);
    if (locationKey) url.searchParams.set("location", locationKey);
    else url.searchParams.delete("location");
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(filterEvent));
  }
  const visible = entries.filter(
    (entry) =>
      (!category || entry.categoryKey === category) &&
      (!location || entry.locationKey === location),
  );

  return (
    <div className="cp-index" data-directory={layout}>
      <div className="cp-filter-toolbar">
        <span className="cp-match-count" role="status" aria-live="polite">
          {labels.results}{" "}
          <bdi>{new Intl.NumberFormat(lang).format(visible.length)}</bdi>
        </span>
        {categories.size > 1 && (
          <label>
            {labels.category}
            <select
              ref={firstFilter}
              disabled={!interactive}
              value={category}
              onChange={(event) => update(event.target.value, location)}
              aria-controls={listId}
            >
              <option value="">{labels.all}</option>
              {Array.from(categories, ([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
        )}
        {locations.size > 1 && labels.location && (
          <label>
            {labels.location}
            <select
              disabled={!interactive}
              value={location}
              onChange={(event) => update(category, event.target.value)}
              aria-controls={listId}
            >
              <option value="">{labels.all}</option>
              {Array.from(locations, ([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
        )}
        {(category || location) && (
          <button
            type="button"
            onClick={() => {
              update("", "");
              firstFilter.current?.focus();
            }}
          >
            {labels.clear}
          </button>
        )}
      </div>
      <div
        id={listId}
        className={layout === "news" ? "cp-news-list" : "cp-vacancies"}
      >
        {visible.length ? (
          visible.map(({ id, card }) => <div key={id}>{card}</div>)
        ) : (
          <p>{labels.empty}</p>
        )}
      </div>
    </div>
  );
}

export function OfficeMap({
  url,
  lang,
  name,
  show,
  hide,
}: {
  url?: string;
  lang: string;
  name: string;
  show: string;
  hide: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  if (!url?.startsWith("https://www.google.com/maps/embed?pb=")) return null;
  // Keep the place and camera of the official embed; localize its UI hints.
  const localized = url.replace(/!1s[a-z]{2}(?=!2s[a-z]{2}(?:!|$))/g, "!1s" + lang);
  return (
    <div className="office-map">
      <button
        type="button"
        aria-label={(open ? hide : show) + " · " + name}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {open ? hide : show}
      </button>
      <div id={id} hidden={!open}>
        {open && (
          <iframe
            src={localized + "&hl=" + encodeURIComponent(lang)}
            title={name}
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
