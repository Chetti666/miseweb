# AGENTS.md — Steadfast Shepherd

## Project

- **Stack**: Astro 6 + Tailwind CSS v4 (`@tailwindcss/vite`, NOT PostCSS) + GSAP 3.14 + TypeScript strict
- **Purpose**: Portfolio for Carlo Gtz — motion graphics / video editing studio, Santiago Chile
- **Language**: Spanish content, English code identifiers
- **Output**: Static site to `./dist/`; `site: 'https://www.carlogtz.cl'` set in `astro.config.mjs`
- **Sitemap**: `@astrojs/sitemap` integration is active; `robots.txt` references `sitemap-index.xml`

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run astro check` | TypeScript type check (target 0 errors) |

No test runner, no CI, no pre-commit hooks, no linter/formatter config.

## Architecture

### File Layout
```
src/
  components/   # Astro components (PascalCase)
  layouts/      # MainLayout.astro (active), Layout.astro (legacy/stale)
  pages/        # File-based routing (kebab-case filenames)
  styles/       # global.css — sole stylesheet
```

### Gotchas
- **No `/servicios` page** — nav link `/#servicios` anchors to homepage section
- **No backend** — `contacto.astro` form has `action="#"`
- **Mobile menu** — native `<details>/<summary>`, zero JS
- **No image optimization** — files served from `/public/media/`, no `@astrojs/image` or `astro:assets`
- **`.noise-layer`** (CSS dots) in `MainLayout`; **`.grain-overlay`** (SVG turbulence) only on `index.astro`
- **`Layout.astro`** and **`Welcome.astro`** are legacy/unused
- **Google verification** at `/google9c48faa7d8c2e48d.html`
- **`@ts-check`** on `.mjs` config files for JSDoc type checking

## GSAP Animation System

Single `ScrollAnimations.astro` per page, declarative `data-*` attribute API. Only `ScrollTrigger` registered. All animations guard on `prefers-reduced-motion: reduce`.

| Attribute | Effect |
|-----------|--------|
| `data-header-logo`, `data-header-nav` | Header entrance (master timeline) |
| `data-hero-*` | Hero entrance (master timeline) |
| `data-reveal` | Scroll fade-up: `y:30, opacity:0 → y:0, opacity:1`, start `top 85%`, toggleActions `play none none reverse` |
| `data-stagger` | Container — children stagger at 0.15 |
| `data-stagger-process` + `data-process-step` | Process timeline: directional x offsets, rotateY |
| `data-stat` (with `[data-stat-value data-end-value data-suffix]`) | Counter animation with `gsap.utils.snap` |
| `data-parallax` + `data-parallax-speed` | Parallax scroll with scrub |
| `data-service` | Hover scale on `.glass-premium` child (1.01 / 1.0) |
| `data-footer`, `data-footer-item` | Scroll-triggered footer + staggered children |

## Tailwind CSS v4

In `global.css`: `@import "tailwindcss"` + `@import "tailwind-animations"`. The latter needs `ssr.noExternal` in `astro.config.mjs`.

CSS variables (source of truth: `global.css`):
- Base: `#05080e`, Surface: `#121b2b`
- Accents: teal `#08bbae`, purple `#8f1ca9`, pink `#ff6b9d`
- Ink: `#f3f8ff`, Ink-dim: `rgba(243,248,255,0.5)`
- Fonts: `"Bebas Neue"`, `"Manrope"`, `"JetBrains Mono"`, `"Playfair Display"` — loaded via Google Fonts `@import`
