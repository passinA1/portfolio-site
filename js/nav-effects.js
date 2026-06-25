(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const layoutPillLinks = () => {
    document.querySelectorAll(".pill-link").forEach((pill) => {
      const surface = pill.querySelector(".pill-link__surface");
      if (!surface) return;

      const rect = pill.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (!width || !height) return;

      const radius = ((width * width) / 4 + height * height) / (2 * height);
      const diameter = Math.ceil(radius * 2) + 2;
      const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) + 1;
      const originY = diameter - delta;

      pill.style.setProperty("--pill-height", `${Math.ceil(height)}px`);
      pill.style.setProperty("--pill-surface-size", `${diameter}px`);
      pill.style.setProperty("--pill-surface-bottom", `${-delta}px`);
      pill.style.setProperty("--pill-surface-origin-y", `${originY}px`);
    });
  };

  const armNavBrandRotation = () => {
    if (prefersReducedMotion.matches) return;

    document.querySelectorAll(".nav-brand img").forEach((image) => {
      const link = image.closest(".nav-brand");
      if (!link) return;

      const spin = () => {
        image.style.transition = "none";
        image.style.transform = "rotate(0deg)";
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            image.style.transition = "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)";
            image.style.transform = "rotate(360deg)";
          });
        });
      };

      link.addEventListener("mouseenter", spin);
      link.addEventListener("focus", spin);
    });
  };

  const init = () => {
    layoutPillLinks();
    armNavBrandRotation();

    window.addEventListener("resize", layoutPillLinks);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layoutPillLinks).catch(() => {});
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
