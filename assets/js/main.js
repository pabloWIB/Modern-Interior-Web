/**
 * main.js — single entry point for the site.
 *
 * Loaded with `defer`, so the DOM is parsed before this runs. Written as a
 * classic script rather than an ES module so the site also works when
 * index.html is opened straight from disk over file://.
 */
(function () {
  "use strict";

  /**
   * Mobile menu: a toggle button driving a full-screen panel.
   * Opens, closes, locks the page behind it, closes on Escape and on any
   * link inside the panel, and hands focus back to the button on close.
   */
  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const panel = document.querySelector(".menu-panel");

    if (!toggle || !panel) {
      return;
    }

    const isOpen = function () {
      return toggle.getAttribute("aria-expanded") === "true";
    };

    // While the panel covers the viewport, Tab must stay inside it. The
    // toggle doubles as the close button, so it belongs in the loop.
    const trapGroup = function () {
      return [toggle].concat(Array.prototype.slice.call(panel.querySelectorAll("a[href]")));
    };

    const setState = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      panel.setAttribute("data-open", String(open));
      document.body.setAttribute("data-menu-open", String(open));

      if (open) {
        const firstLink = panel.querySelector("a");
        if (firstLink) {
          // The panel is visibility:hidden until the attribute change is
          // painted, and focus() is a no-op on a hidden element — so wait a
          // frame before moving focus into it.
          window.requestAnimationFrame(function () {
            firstLink.focus();
          });
        }
      } else {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", function () {
      setState(!isOpen());
    });

    // Delegated: one listener covers every link in the panel.
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setState(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) {
        return;
      }

      if (event.key === "Escape") {
        setState(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const group = trapGroup();
      const first = group[0];
      const last = group[group.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !group.includes(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // The panel is desktop-hidden by CSS; reset the body lock if the viewport
    // grows past the breakpoint while the menu is open.
    const desktop = window.matchMedia("(min-width: 768px)");
    desktop.addEventListener("change", function (event) {
      if (event.matches && isOpen()) {
        toggle.setAttribute("aria-expanded", "false");
        panel.setAttribute("data-open", "false");
        document.body.setAttribute("data-menu-open", "false");
      }
    });
  }

  initMenu();
})();
