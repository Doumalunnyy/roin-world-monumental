const pages = process.env.DEPLOY_TARGET === "github-pages";

const config = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    unoptimized: pages,
  },
  experimental: { cpus: 3, globalNotFound: true },
};

if (pages) {
  config.output = "export";
  config.trailingSlash = true;
  config.basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
} else {
  config.redirects = async () => [
    { source: "/", destination: "/ru", permanent: false },
    { source: "/admin", destination: "/admin/index.html", permanent: false },
  ];
  config.headers = async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    },
  ];
}

export default config;
