# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**AgroFlow Intelligence** — static marketing website (vanilla HTML/CSS/JS, no build tools).

```bash
python3 -m http.server 8080   # local dev server
```

## Structure

- `index.html` — home page
- `pages/` — features, about, pricing, contact
- `css/main.css` — all design tokens + components; `css/responsive.css` — media queries only
- `js/main.js` — all JS in one `DOMContentLoaded` listener
- `images/` — all `.webp`, organised by section (hero/, sections/, features/, about/, team/, contact/, pricing/)

Inner pages use `../` prefixes for assets (e.g. `../css/main.css`, `../images/…`).

## Key conventions

- CSS tokens: `--green-*`, `--blue-*`, `--amber-*` — never hard-code colours or spacing
- Fonts: Syne (headings) + Inter (body) via Google Fonts
- Scroll animations: add `.fade-up` class; stagger with `delay-1`…`delay-4`
- Counters: `data-count`, `data-suffix`, `data-prefix` on the number element
- Progress bars: `data-width` on `.progress-fill`
- Pricing toggle: `data-monthly` / `data-annual` on price elements, driven by `#pricing-toggle`
- Carousels: `.photo-carousel` > `.carousel-slide` (no `loading="lazy"` on slides) + `.carousel-dot`; auto-advance at 6700ms in `main.js`
- Circular photos: `.img-circle-frame--dark` / `--light` / `--xl`; inline panel variant uses `.panel-inline` + `.panel-circle`
- Contact form: simulated submit, no backend — shows `#form-success` on success
