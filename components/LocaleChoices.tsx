"use client";

import { useSyncExternalStore } from "react";
import { localeUrl } from "@/lib/urls";

const filters: Record<string, string[]> = {
  projects: ["country", "area"], news: ["category"], careers: ["department", "location"],
};
const changes = ["popstate", "hashchange", "roin:project-filters", "roin:directory-filter"];
function subscribe(notify: () => void) {
  changes.forEach(event => window.addEventListener(event, notify));
  return () => changes.forEach(event => window.removeEventListener(event, notify));
}
const browserUrl = () => location.search + location.hash;
const serverUrl = () => "";

export function LocaleChoices({ languages, lang, path, compact = false }: {
  languages: { code: string; name: string }[]; lang: string; path: string; compact?: boolean;
}) {
  const location = useSyncExternalStore(subscribe, browserUrl, serverUrl);
  const current = new URL(location, "https://local.invalid");
  const selected = new URLSearchParams();
  for (const key of filters[path] || []) {
    const value = current.searchParams.get(key);
    if (value && /^[a-z0-9-]+$/i.test(value)) selected.set(key, value);
  }
  const query = selected.size ? "?" + selected : "";
  const hash = current.hash && typeof document !== "undefined" && document.getElementById(current.hash.slice(1)) ? current.hash : "";
  return languages.map(l => <a key={l.code} href={localeUrl(l.code, path) + query + hash} lang={l.code}
    hrefLang={l.code} aria-current={l.code === lang ? "true" : undefined}>{compact ? l.code.toUpperCase() : l.name}</a>);
}
