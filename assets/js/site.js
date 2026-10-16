/* =========================================================
   KM Role Play — shared site script
   Nav/footer injection, scroll reveal, pose demo, page highlight.
   No dependencies. Loads on every page.
========================================================= */

(function () {
  "use strict";

  /* Mark the document as JS-enabled BEFORE any other logic runs.
     CSS hides .reveal only under html.js — if this script ever
     fails to load or throws, content stays fully visible. */
  document.documentElement.classList.add("js");

  /* ------------------------------------------------------------------
     NAVIGATION (injected into every page)

     Pages list drives both the topbar and the footer. Add a page here
     and it appears everywhere — no per-page HTML edits.
  ------------------------------------------------------------------ */

  var PAGES = [
    { href: "index.html", label: "Features", features: true },
    { href: "pricing.html", label: "Pricing" },
    { href: "requirements.html", label: "Requirements" },
    { href: "changelog.html", label: "Changelog" }
  ];

  var CURRENT = (function () {
    var path = window.location.pathname.split("/").pop() || "index.html";
    return path.toLowerCase();
  })();

  function navLinks() {
    return PAGES.map(function (p) {
      var isCurrent = CURRENT === p.href;
      var href = p.href === "index.html" ? "index.html#features" : p.href;
      return (
        '<a href="' + href + '"' + (isCurrent ? ' class="current"' : "") + ">" + p.label + "</a>"
      );
    }).join("");
  }

  function injectHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    host.innerHTML =
      '<header class="nav">' +
      '  <div class="nav-inner">' +
      '    <a href="index.html" class="logo">' +
      '      <img src="assets/images/apple-touch-icon.png" class="logo-img" alt="KM Role Play" />' +
      '      <span class="logo-text">KM Role Play</span>' +
      "    </a>" +
      '    <nav class="nav-links">' + navLinks() + "</nav>" +
      '    <a href="download-windows.html" class="nav-button">Download</a>' +
      "  </div>" +
      "</header>";
  }

  function injectFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.innerHTML =
      "<footer>" +
      '  <div class="container footer-inner">' +
      '    <div class="footer-logo">KM Role Play © 2026</div>' +
      '    <div class="footer-links">' +
      PAGES.map(function (p) {
        return '<a href="' + (p.href === "index.html" ? "index.html" : p.href) + '">' + p.label + "</a>";
      }).join("") +
      '      <span style="opacity:.35">·</span>' +
      '      <a href="#">Discord</a>' +
      '      <a href="#">GitHub</a>' +
      "    </div>" +
      '    <div class="footer-legal">' +
      '      <a href="eula.html">EULA</a> · ' +
      '      <a href="privacy.html">Privacy</a> · ' +
      '      <a href="terms.html">Terms</a> · ' +
      '      <a href="refund.html">Refund</a> · ' +
      '      <a href="support.html">Support</a>' +
      "    </div>" +
      "  </div>" +
      "</footer>";
  }

  /* ------------------------------------------------------------------
     SCROLL REVEAL (shared)
  ------------------------------------------------------------------ */

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) return;

    var total = els.length;
    var shown = 0;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
            shown++;
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });

    /* If everything is already revealed (short pages), bail cleanly. */
    if (shown === total) {
      observer.disconnect();
    }
  }

  /* ------------------------------------------------------------------
     POSE DEMO (index.html only)
  ------------------------------------------------------------------ */

  function initPoseDemo() {
    var items = document.querySelectorAll(".pose-item");
    var value = document.querySelector(".pose-tag-value");
    var character = document.querySelector(".pose-character");
    if (!items.length || !value) return;

    var names = [
      "Relaxed · Sitting",
      "Cute · Adorable",
      "Reasoning · In thought",
      "Watching · Closely",
      "Little surprise",
      "Pointing",
      "Close · Whispering"
    ];

    var images = [
      "assets/images/1_relaxed_sitting.png",
      "assets/images/2_cute.png",
      "assets/images/3_reasoning.png",
      "assets/images/4_watching_closely.png",
      "assets/images/5_little_surprise.png",
      "assets/images/6_point.png",
      "assets/images/7_close_whisper.png"
    ];

    items.forEach(function (item, index) {
      item.addEventListener("click", function () {
        items.forEach(function (i) {
          i.classList.remove("active");
        });
        item.classList.add("active");
        value.textContent = names[index];
        if (character && images[index]) {
          character.style.backgroundImage = "url('" + images[index] + "')";
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     BOOT
  ------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", function () {
    injectHeader();
    injectFooter();
    initReveal();
    initPoseDemo();
  });
})();