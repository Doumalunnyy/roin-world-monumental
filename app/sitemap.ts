import type { MetadataRoute } from "next";
import { locales, origin, paths, href } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return paths().flatMap((p) =>
    locales.map((l) => ({
      url: origin + href(l, p),
      alternates: {
        languages: Object.fromEntries(
          locales.map((a) => [a, origin + href(a, p)]),
        ),
      },
    })),
  );
}
