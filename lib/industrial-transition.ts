import { projectNavigationScript } from "./project-navigation";

export const handoffKey = "roin-menu-transition-v1";
export const reducedQuery = "(prefers-reduced-motion: reduce)";

// The target is a separate HTML document on both Node and GitHub Pages. Install
// its first paint state in <head>, before React or any visible content arrives.
export const arrivalScript = projectNavigationScript + `
(() => {
  const root = document.documentElement;
  try {
    const key = ${JSON.stringify(handoffKey)};
    const travel = JSON.parse(sessionStorage.getItem(key) || "null");
    sessionStorage.removeItem(key);
    const navigation = performance.getEntriesByType("navigation")[0];
    const fresh = travel && travel.href === location.href && Date.now() - travel.time < 120000 &&
      document.referrer && new URL(document.referrer).origin === location.origin;
    if (!fresh || (navigation && navigation.type !== "navigate") ||
        matchMedia(${JSON.stringify(reducedQuery)}).matches) return;

    root.dataset.transition = "arrive";
    let timer;
    function focusContent() {
      if (location.hash || document.activeElement !== document.body) return;
      const heading = document.querySelector("main h1");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
    function finish() {
      clearTimeout(timer);
      document.removeEventListener("animationend", ended, true);
      window.removeEventListener("pagehide", finish);
      if (root.dataset.transition !== "arrive") return;
      delete root.dataset.transition;
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", focusContent, {once: true});
      else focusContent();
    }
    function ended(event) {
      if (event.animationName === "atom-open" && event.target.matches(".page-transition")) finish();
    }
    document.addEventListener("animationend", ended, true);
    window.addEventListener("pagehide", finish, { once: true });
    // Also remove the entry state if styles or animation events fail to arrive.
    timer = setTimeout(finish, 1400);
  } catch { /* Blocked storage leaves ordinary document navigation intact. */ }
})();`;
