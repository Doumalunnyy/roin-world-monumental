import type { MetadataRoute } from "next";
import { origin } from "@/lib/content";
import { publicUrl } from "@/lib/urls";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: publicUrl("/"), disallow: [publicUrl("/admin"), publicUrl("/api/")] },
    sitemap: origin + publicUrl("/sitemap.xml"),
  };
}
