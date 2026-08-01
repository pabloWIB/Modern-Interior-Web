# Modern Interior

Four-page site for a fictional residential and commercial interior design studio, built as a front-end demo. No framework, no build step, no dependencies.

[![Live demo](https://img.shields.io/badge/demo-moderninterior.wib.digital-2ea44f)](https://moderninterior.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

An interior design studio sells the rooms it has already finished, so the site is built around the photography with as little interface as possible between the visitor and the images.

Twelve project photographs carry four pages: a home page, a collection grid, an about page introducing the designer Eliza Webber, and a contact page. The studio is fictional — the contact page says so plainly and points to the developer rather than pretending to be an inbox.

The design system lives in CSS custom properties: a near-black background kept from the original design, an off-white for text, and a single amber accent sampled from the hero photograph so the accent colour comes from the work itself. Spacing follows a 4–96px scale and typography uses two families — Lora, self-hosted as a variable font for headings, and the system sans stack for body copy.

Layout is mobile-first with `min-width` breakpoints at 480, 768, 1024 and 1440px. Every page shares the same three stylesheets, so after the first page load the CSS, JavaScript and font all come from cache.

## Features

- Twelve interior photographs served as WebP, each with intrinsic `width`/`height` to prevent layout shift, and lazy loading below the fold.
- Mobile menu with a focus trap: it opens, closes on Escape or on any link, locks the page behind it, and returns focus to the toggle.
- Design tokens in `:root` — colour, spacing, type scale, radii, shadow and transition.
- Self-hosted Lora variable font in WOFF2 with `font-display: swap`. No third-party requests of any kind.
- Full `<head>` on every page: unique title and description, canonical URL, Open Graph tags and a real preview image.
- Visible focus rings, a skip link, semantic landmarks, one `<h1>` per page, and `prefers-reduced-motion` support.
- `404.html`, `robots.txt` and `sitemap.xml`.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | Four pages plus `404.html`, hand-written, no templating |
| Styling | CSS3 | Custom properties, grid, flexbox, `clamp()` type scale |
| Scripting | JavaScript (ES5-compatible IIFE) | 90 lines in `assets/js/main.js` — mobile menu only |
| Typography | Lora Variable | Self-hosted WOFF2, 81 KB, weights 400–700 |
| Images | WebP | 14 files, 373 KB total |
| Dependencies | None | No npm packages, no CDN, no build step |

## Project structure

```
.
├── index.html                  # Home — hero, designer card
├── collection.html             # Twelve finished rooms
├── about.html                  # Studio history, facts panel
├── contact.html                # Honest contact page + Person JSON-LD
├── 404.html                    # Uses root-absolute paths (served from any depth)
├── assets/
│   ├── css/
│   │   ├── base.css            # Tokens, @font-face, reset, base elements
│   │   ├── layout.css          # Containers, header, nav, page grids, footer
│   │   └── components.css      # Buttons, cards, mobile menu, utilities
│   ├── js/
│   │   └── main.js             # Single entry point, classic script with defer
│   ├── img/
│   │   ├── content/            # 13 WebP photographs + og-cover.jpg
│   │   └── icons/              # favicon.svg, apple-touch-icon.png
│   └── fonts/
│       └── lora-variable.woff2
├── docs/
│   ├── auditoria.md            # State of the project before the rewrite
│   └── cambios.md              # Change log, grouped by phase
├── .gitignore
├── robots.txt
├── sitemap.xml
└── README.md
```

## Running it locally

The site is static, so a local server is enough:

```bash
python -m http.server 4173
```

Then open <http://127.0.0.1:4173>.

Opening `index.html` straight from disk also works — CSS, JavaScript, images and the mobile menu all run over `file://`. The one exception is the web font: Chrome blocks `@font-face` requests from `file://` origins under its CORS policy, so headings fall back to Georgia. Use a local server to see the intended typography.

## Performance

| Page | First load, uncompressed |
|---|---|
| Shared across pages (CSS + JS + font + favicon) | 103 KB |
| Home | 161 KB |
| Collection (all twelve photographs) | 564 KB |
| About / Contact | 109 KB |

Photographs were 22.4 MB of PNG before this rewrite; they are 373 KB of WebP now.

## Deployment

Static hosting, no build command and no output directory — upload the repository root as-is. Deployed on Vercel at [moderninterior.wib.digital](https://moderninterior.wib.digital).

The canonical URLs in `sitemap.xml`, `robots.txt` and the `<link rel="canonical">` tags all point at that domain. Change them if you deploy elsewhere.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
