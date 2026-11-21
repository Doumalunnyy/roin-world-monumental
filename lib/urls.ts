// Next.js inlines this value for server-rendered markup and client navigation.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

export function publicUrl(value: string): string {
  if (!basePath || !value.startsWith("/") || value.startsWith("//")) return value;
  if (value === basePath || value.startsWith(basePath + "/")) return value;
  return basePath + value;
}

export function localeUrl(lang: string, path = ""): string {
  const route = "/" + [lang, path].filter(Boolean).join("/");
  return publicUrl(route + (basePath ? "/" : ""));
}
