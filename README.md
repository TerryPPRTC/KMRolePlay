# KM Role Play — Website

Marketing site for KM Role Play: a local-first AI role play app for
Windows 10/11. Buy once, runs on your machine, characters that come
alive — plus AI VTuber streaming.

## Pages

- `index.html` — landing page (hero demo video, features, pose gallery, characters, local-first pitch)
- `pricing.html` — one-time purchase, 3-day free trial
- `download-windows.html` — installer download + SmartScreen walkthrough
- `requirements.html` — GPU baseline & VRAM budget breakdown
- `changelog.html` — release notes
- `eula.html` / `privacy.html` / `terms.html` / `refund.html` / `support.html` — legal & support

Nav + footer are injected by `assets/js/site.js` (single source of
truth). Pure static site — no build step, no dependencies.

## Deploy

This repo deploys as GitHub Pages from the `main` branch root.

Local preview:

    python3 -m http.server 8199