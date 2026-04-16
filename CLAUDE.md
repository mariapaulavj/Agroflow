# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AgroFlow Intelligence** — a static marketing website for an AI-powered precision irrigation SaaS. Built with vanilla HTML, CSS, and JavaScript (no build tools, no frameworks, no package manager).

## Development

Since there is no build system, open pages directly in a browser or use any static file server:

```bash
# Quickest local server (Python, no install needed)
python3 -m http.server 8080
# Then open http://localhost:8080
```

There are no lint, test, or build commands — this is a pure static site.

## What has been built

### Pages

| Page | Purpose | Notable sections |
|---|---|---|
| `index.html` | Home / landing | Hero with live dashboard mockup, stats strip, problem/solution split, How It Works (4-step), Crop Protection Intelligence, Benefits grid, IoT Ecosystem layers, EU CAP alignment, CTA |
| `pages/features.html` | Product deep-dive | Five data sources (drone, soil sensors, weather, satellite, historical), AI engine detail, IoT ecosystem architecture, mobile app UX |
| `pages/about.html` | Company story | Mission + vision, Mediterranean use case, why AgroFlow exists, objectives (40%/+30%/25%), industry impact, team (Manuela CEO, Maria Paula CTO, Alessandra CMO, Alfonso COO), ethics & sustainability |
| `pages/pricing.html` | Plans & service portfolio | Service portfolio overview, billing toggle (monthly/annual, 20% annual discount), three plans — **Seed** €29/mo (≤5 fields), **Harvest** €89/mo (≤25 fields, most popular), **Enterprise** custom; FAQ accordion |
| `pages/contact.html` | Lead capture | Contact form (simulated submit → `#form-success`), direct email/phone details, farm-sunrise hero banner |

### Product narrative

AgroFlow is positioned as a **software-only** precision agriculture platform targeting:
- **Primary market:** Spanish and Mediterranean smallholder farmers
- **Regulatory hook:** EU CAP 2023–2027 eco-scheme alignment (water savings + reduced pesticide use qualify farms for subsidy payments)
- **Two core products:** Precision irrigation intelligence + Drone-based pest detection (same platform, integrated alerts)
- **Key claims used across the site:** 40% water saved, +30% crop yield, 25% cost reduction, 60% pesticide reduction, 1,200+ farms

### Interactive UI components

- **Hero dashboard mockup** — static HTML card showing soil moisture, temperature, next irrigation time, and an AI recommendation. Progress bars animate on scroll via `data-width`.
- **Pest detection field map** — coloured grid of `div` cells (green/amber/red) representing healthy, watch, and pest-detected zones.
- **Animated stat counters** — triggered by `data-count` when scrolled into view on both `index.html` and `about.html`.
- **Pricing toggle** — monthly/annual switch on `pricing.html`; prices swap via `data-monthly`/`data-annual` attributes. The annual save badge and label weight are also toggled via JS.
- **FAQ accordion** — on `pricing.html`, uses `.faq-item.open` class and `max-height` CSS transition; no third-party library.
- **Contact form** — `#contact-form` on `contact.html`; on submit shows `#form-success` div after a 1.4s simulated delay. No backend.

### Team

Four IE University BDIT (Dual BBA + Data & Business Analytics) co-founders: Manuela (CEO), Maria Paula (CTO), Alessandra (CMO), Alfonso (COO). Team photos in `images/team/`.

## Architecture

```
agroflow/
├── index.html          # Home page (root)
├── pages/
│   ├── features.html
│   ├── about.html
│   ├── pricing.html
│   └── contact.html
├── css/
│   ├── main.css        # All design tokens, layout, and components
│   └── responsive.css  # Media query overrides only
├── js/
│   └── main.js         # All JS: navbar, animations, counter, pricing toggle, contact form
└── images/             # Organised by section: hero/, sections/, features/, about/, team/, contact/, pricing/
```

### CSS design system

All design tokens live at the top of `css/main.css` as CSS custom properties (`--green-*`, `--blue-*`, `--amber-*`, shadow, radius, transition). Never hard-code colours or spacing — always reference a token.

Fonts: **Syne** (700/800) for headings, **Inter** (400–700) for body. Both loaded from Google Fonts in each HTML `<head>`.

### JavaScript patterns

`js/main.js` runs entirely inside a single `DOMContentLoaded` listener. Key behaviours:
- **Scroll-based navbar** — adds `.scrolled` class after 20px
- **Fade-up animations** — `IntersectionObserver` on `.fade-up` elements; add the class to any element that should animate in on scroll; stagger with `delay-1` … `delay-4` utility classes
- **Counter animation** — triggered by `data-count` / `data-suffix` / `data-prefix` / `data-decimals` attributes
- **Progress bars** — width animated via `data-width` attribute on `.progress-fill`
- **Pricing toggle** — `data-monthly` / `data-annual` attributes on price elements, toggled by `#pricing-toggle` checkbox
- **Contact form** — `#contact-form` simulates submission (no backend); shows `#form-success` on success

### Page navigation

All internal links use relative paths. Links from `pages/*.html` back to root assets must use `../` prefixes (e.g. `../css/main.css`, `../js/main.js`, `../images/…`). The navbar active state is set automatically by `main.js` based on the current filename.

### Images

All images are `.webp`. Each `<img>` that is not in the initial viewport should have `loading="lazy"`.
