window.__ModuleLoader__.load({
  id: "dsh-mobile-friendly",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    //#region dsh-mobile-friendly/client.js
    /**
     * Mobile-friendly display adaptation for the DSH Web GUI.
     *
     * Design rules learned from the first on-device iteration (2026-10-05):
     *  - The page has no viewport meta; without width=device-width mobile
     *    browsers use a ~980px virtual viewport and NO max-width media query
     *    ever matches. Injecting the meta is step one.
     *  - CSS-module hashed classes are matched by stable suffix fragments
     *    (`_panel`, `_nav`, `_content`), never by full hash.
     *  - The settings panel (SettingsRoot) is a flex ROW: nav (188px) +
     *    content. The mobile fix is to flip the PANEL to column so the nav
     *    becomes a horizontal strip on top and content takes the full width
     *    below — not to squeeze the nav narrower.
     *  - No MutationObserver: a subtree-wide observer running :has()
     *    querySelectorAll on every React re-render froze the UI on a phone.
     *    Pure CSS only.
     */

    var STYLE_ID = "dsh-mobile-friendly-style";

    var CSS = [
      "/* dsh-mobile-friendly: mobile adaptation (all rules inside media queries) */",
      "@media (max-width: 640px)",
      "{",
      // ── Settings dialog (SettingsRoot): .overlay > .mask + .panel > .nav + .content
      "  [class*='_panel']:has(> [class*='_nav'])",
      "  {",
      "    flex-direction: column !important;",
      "    width: 100vw !important;",
      "    height: 100dvh !important;",
      "    max-width: 100vw !important;",
      "    max-height: 100dvh !important;",
      "    border-radius: 0 !important;",
      "    box-shadow: none !important;",
      "  }",
      "  [class*='_panel']:has(> [class*='_nav']) > [class*='_nav']",
      "  {",
      "    flex-direction: row !important;",
      "    flex: none !important;",
      "    width: auto !important;",
      "    align-items: center;",
      "    gap: 6px !important;",
      // Push the strip below the session header text that overlaps the top
      // of the full-bleed panel on phones.
      "    margin-top: 52px !important;",
      "    padding: 10px 12px 6px !important;",
      "    border-bottom: 0.5px solid var(--dsw-alias-border-l2, #0000001f);",
      "    overflow-x: auto;",
      "    overflow-y: hidden;",
      "    scrollbar-width: none;",
      "  }",
      "  [class*='_panel']:has(> [class*='_nav']) > [class*='_nav'] > [class*='_navTitle']",
      "  {",
      "    display: none !important;",
      "  }",
      "  [class*='_panel']:has(> [class*='_nav']) > [class*='_nav'] > [class*='_navList']",
      "  {",
      "    flex-direction: row !important;",
      "    gap: 2px !important;",
      "  }",
      "  [class*='_panel']:has(> [class*='_nav']) > [class*='_nav'] [class*='_navCell']",
      "  {",
      "    flex: none !important;",
      "    min-height: 44px !important;",
      "    height: auto !important;",
      "    padding: 10px 12px !important;",
      "  }",
      "  [class*='_panel']:has(> [class*='_nav']) > [class*='_content']",
      "  {",
      "    flex: 1 1 0 !important;",
      "    min-width: 0 !important;",
      "    min-height: 0 !important;",
      "  }",
      // Rows inside settings sections: let long label/value rows wrap instead
      // of clipping on a narrow screen.
      "  [data-slot='settings.general.item']",
      "  {",
      "    flex-wrap: wrap;",
      "  }",
      "}"
    ].join("\n");

    function ensureViewportMeta() {
      // Without width=device-width, mobile browsers lay the page out on a
      // ~980px virtual viewport and NO max-width media query can ever match —
      // so this must precede the CSS for the adaptation to work at all.
      var DESIRED = "width=device-width, initial-scale=1, viewport-fit=cover";
      var meta = document.querySelector("meta[name='viewport']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "viewport";
        (document.head || document.documentElement).appendChild(meta);
      }
      if ((meta.content || "").indexOf("width=device-width") === -1) {
        meta.content = DESIRED;
      }
    }

    function ensureStyle() {
      var existing = document.getElementById(STYLE_ID);
      if (existing) return;
      var el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = CSS;
      (document.head || document.documentElement).appendChild(el);
    }

    function apply(ctx) {
      ctx.effect(function () {
        ensureViewportMeta();
        ensureStyle();
        // Cordis effects use the callback's return value as the disposer:
        // hot-disable/unload removes the style, so nothing we injected
        // outlives the plugin.
        return function dispose() {
          var el = document.getElementById(STYLE_ID);
          if (el) el.remove();
        };
      }, "dsh-mobile-friendly: inject responsive style layer");
    }

    exports.name = "dsh-mobile-friendly";
    exports.apply = apply;
    //#endregion
    return module.exports;
  }
});
