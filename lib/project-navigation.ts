// Parser-blocking head hook. Cross-document snapshots precede React hydration.
export const projectNavigationScript = String.raw`
(() => {
  const root = document.documentElement;
  const path = location.pathname.replace(/\/+$/, "");
  const route = path.match(/^(.*\/projects)(?:\/([^/]+))?$/);
  if (!route) return;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const catalogue = route[1], slug = route[2];
  const clean = url => url.pathname.replace(/\/+$/, "");
  const navigationType = performance.getEntriesByType("navigation")[0]?.type;
  const history = navigationType === "back_forward" || navigationType === "reload";
  const source = document.referrer ? new URL(document.referrer) : null;
  const fromCatalogue = source && source.origin === location.origin && clean(source) === catalogue;
  const key = "roin-project-shot-v1";
  let handoff;
  try {
    handoff = JSON.parse(sessionStorage.getItem(key) || "null");
    sessionStorage.removeItem(key);
    const probe = key + ":available";
    sessionStorage.setItem(probe, "1");
    sessionStorage.removeItem(probe);
    if (slug && !fromCatalogue && !motion.matches && !history && !location.hash &&
        !sessionStorage.getItem("roin-outline:" + slug)) {
      root.dataset.projectIntro = "armed";
      // Reveal the server-rendered photo if enhancement scripts or the image stall.
      setTimeout(() => { if (root.dataset.projectIntro === "armed") delete root.dataset.projectIntro; }, 4500);
    }
  } catch { return; }

  const fresh = handoff && handoff.href === location.href && Date.now() - handoff.time < 30000;
  function focusTitle() {
    if (location.hash || document.activeElement !== document.body) return;
    document.querySelector(".chapter--case h1")?.focus({preventScroll: true});
  }
  if (slug && (fromCatalogue || fresh) && !history && !location.hash) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", focusTitle, {once:true});
    else focusTitle();
  }
  if (motion.matches || !("onpagereveal" in window) || !("onpageswap" in window)) return;
  const rules = document.createElement("style");
  rules.textContent = "@view-transition { navigation: auto; }";
  document.head.append(rules);
  if (fresh && slug && !history) {
    const target = document.createElement("link");
    target.rel = "expect"; target.href = "#project-hero-frame"; target.setAttribute("blocking", "render");
    document.head.append(target);
  }

  addEventListener("pageswap", event => {
    const vt = event.viewTransition;
    if (!vt) return;
    const entry = event.activation;
    if (slug || motion.matches || !entry?.entry?.url || entry.navigationType === "traverse") { vt.skipTransition(); return; }
    const to = new URL(entry.entry.url);
    const card = [...document.querySelectorAll("a[data-project-cover]")].find(a => a.href === to.href);
    const frame = card?.querySelector(".project-image");
    const photo = frame?.querySelector("img");
    const rect = frame?.getBoundingClientRect();
    if (!card || !photo?.complete || !photo.naturalWidth || !rect || rect.bottom <= 0 || rect.top >= innerHeight || to.hash) {
      vt.skipTransition(); return;
    }
    try {
      sessionStorage.setItem(key, JSON.stringify({ href: to.href, image: card.dataset.projectCover, preview: photo.currentSrc, time: Date.now() }));
    } catch { vt.skipTransition(); return; }
    frame.style.viewTransitionName = "project-cover";
    vt.finished.finally(() => frame.style.removeProperty("view-transition-name"));
  });

  addEventListener("pagereveal", event => {
    const vt = event.viewTransition;
    if (!vt) return;
    const frame = document.querySelector("[data-case-cover]");
    if (!slug || !fresh || !frame || frame.dataset.caseCover !== handoff.image || history || window.navigation?.activation?.navigationType === "traverse" || motion.matches || location.hash) {
      vt.skipTransition(); return;
    }
    const image = frame.querySelector("img");
    if (!image) { vt.skipTransition(); return; }
    delete root.dataset.projectIntro;
    root.dataset.projectMorph = "in";
    // Keep the already decoded catalogue resource behind a still-loading larger
    // candidate. Both are different resolutions of the same credited photograph.
    if ((!image.complete || !image.naturalWidth) && handoff.preview) {
      const preview = new URL(handoff.preview, location.href);
      if (preview.origin === location.origin && /^https?:$/.test(preview.protocol)) {
        root.style.setProperty("--project-preview", "url(" + JSON.stringify(preview.href) + ")");
        root.dataset.projectPreview = "waiting";
        const release = () => {
          delete root.dataset.projectPreview;
          root.style.removeProperty("--project-preview");
        };
        addEventListener("pagehide", release, {once:true});
        image.decode().then(() => {
          if (!root.dataset.projectPreview) return;
          root.dataset.projectPreview = "resolved";
          setTimeout(release, 250);
        }, () => { /* The original catalogue frame remains available. */ });
      }
    }
    const skip = () => vt.skipTransition();
    motion.addEventListener("change", skip, {once:true});
    vt.finished.finally(() => {
      motion.removeEventListener("change", skip);
      delete root.dataset.projectMorph;
      focusTitle();
    });
  });
})();
`;

// Match the route relationship even when the visitor follows its link from the header.
export function catalogueOpensCase(from: URL, to: URL) {
  const catalogue = from.pathname.replace(/\/+$/, "");
  const destination = to.pathname.replace(/\/+$/, "");
  return from.origin === to.origin && catalogue.endsWith("/projects") &&
    destination.startsWith(catalogue + "/") && !destination.slice(catalogue.length + 1).includes("/");
}
