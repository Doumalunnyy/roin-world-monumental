"use client";

import { useId, useState, useSyncExternalStore, type ReactNode } from "react";

type Entry = {
  id: string;
  category: string;
  location?: string;
  card: ReactNode;
};
type Props = {
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

export function CorporateDirectory({ entries, labels, layout }: Props) {
  const listId = useId();
  const interactive = useSyncExternalStore(
    subscribe,
    browserReady,
    serverReady,
  );
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const categories = Array.from(
    new Set(entries.map((entry) => entry.category).filter(Boolean)),
  );
  const locations = Array.from(
    new Set(
      entries.flatMap((entry) => (entry.location ? [entry.location] : [])),
    ),
  );
  const visible = entries.filter(
    (entry) =>
      (!category || entry.category === category) &&
      (!location || entry.location === location),
  );

  return (
    <div className="cp-index" data-directory={layout}>
      <div className="cp-filter-toolbar">
        <span className="cp-match-count" role="status" aria-live="polite">
          {labels.results} <bdi>{visible.length}</bdi>
        </span>
        {categories.length > 0 && (
          <label>
            {labels.category}
            <select
              disabled={!interactive}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-controls={listId}
            >
              <option value="">{labels.all}</option>
              {categories.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        )}
        {locations.length > 0 && labels.location && (
          <label>
            {labels.location}
            <select
              disabled={!interactive}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              aria-controls={listId}
            >
              <option value="">{labels.all}</option>
              {locations.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        )}
        {(category || location) && (
          <button
            type="button"
            onClick={() => {
              setCategory("");
              setLocation("");
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
  name,
  show,
  hide,
}: {
  url?: string;
  name: string;
  show: string;
  hide: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  if (!url?.startsWith("https://www.google.com/maps/embed?pb=")) return null;
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
            src={url}
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
