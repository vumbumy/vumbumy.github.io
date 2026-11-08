(() => {
  const emit = (name, values) => {
    if (typeof window.gtag === "function") window.gtag("event", name, values);
  };
  const language = document.documentElement.lang === "en" ? "en" : "ko";
  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest("a") : null;
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (["vumy.kr", "www.vumy.kr"].includes(url.hostname)) {
      emit("service_link_click", {
        link_url: url.origin + url.pathname,
        link_text: (link.textContent || "").trim().slice(0, 100),
        source_path: location.pathname,
        content_language: language,
      });
    } else if (url.origin === location.origin && url.pathname !== location.pathname && /\/(?:en\/)?posts\/[^/]+\/$/.test(url.pathname)) {
      const placement = link.closest("[data-link-placement]")?.dataset.linkPlacement
        || (link.closest(".prose") ? "article_body" : "other");
      const eventName = {
        featured: "featured_article_click", related: "related_article_click",
        recent: "recent_article_click", archive: "archive_article_click",
        previous_next: "adjacent_article_click", article_body: "body_article_click",
      }[placement] || "article_link_click";
      emit(eventName, {
        source_path: location.pathname,
        target_path: url.pathname,
        link_placement: placement,
        content_language: language,
      });
    }
  });

  const prose = document.querySelector(".post .prose");
  if (!prose) return;
  let activeMs = 0;
  let deepest = 0;
  let sent = false;
  let last = performance.now();
  let eligible = document.visibilityState === "visible" && document.hasFocus();
  const depth = () => {
    const box = prose.getBoundingClientRect();
    if (box.height > 0) deepest = Math.max(deepest, Math.min(1, Math.max(0, (innerHeight - box.top) / box.height)));
  };
  const tick = () => {
    const now = performance.now();
    // A suspended timer must never credit minutes spent in the background.
    if (eligible) activeMs += Math.min(2000, Math.max(0, now - last));
    last = now;
    eligible = document.visibilityState === "visible" && document.hasFocus();
    if (eligible) depth();
    if (!sent && eligible && activeMs >= 60000 && deepest >= 0.75) {
      sent = true;
      emit("article_read", {
        source_path: location.pathname,
        active_seconds: Math.floor(activeMs / 1000),
        scroll_percent: Math.floor(deepest * 100),
        reading_rule: "visible_focused_60s_depth_75_v1",
        content_language: language,
      });
    }
  };
  document.addEventListener("visibilitychange", tick);
  window.addEventListener("focus", tick);
  window.addEventListener("blur", tick);
  window.addEventListener("scroll", () => { if (eligible) depth(); }, { passive: true });
  window.addEventListener("pageshow", () => { last = performance.now(); eligible = document.visibilityState === "visible" && document.hasFocus(); });
  setInterval(tick, 1000);
})();
