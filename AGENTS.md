# AGENTS.md - Steadfast Shepherd

## Project

- **Stack**: Astro 6 + Tailwind CSS v4 (`@tailwindcss/vite` plugin, NOT PostCSS) + GSAP 3 + TypeScript strict
- **Purpose**: Portfolio for a motion graphics / video editing studio
- **Language**: Spanish content, English code identifiers
- **Output**: Static site to `./dist/`; no SSR, no `site` config (`Astro.site` is `undefined` — canonical URL hardcoded in `MainLayout.astro`)

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
  styles/       # global.css — sole stylesheet with Tailwind imports + custom classes
```
`src/assets/` is empty. `src/utils/` does not exist — logic lives in frontmatter or `<script>` blocks.

### Component Archetypes
1. **Pure markup** — No frontmatter, no `<script>` (e.g., `SiteFooter.astro`)
2. **Hybrid** — Frontmatter + markup + inline `<script>` (e.g., `SiteHeader.astro`, pages)
3. **Script-only** — No markup, only `<script>` (e.g., `ScrollAnimations.astro`)

Every page imports `MainLayout` and `<ScrollAnimations />` at the end.

### Active Link Detection
```typescript
const normalizePath = (p: string) =>
  p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;
const isActive = (href: string) =>
  !href.includes('#') && normalizePath(href) === normalizePath(Astro.url.pathname);
```

### Mobile Menu
Uses native `<details>/<summary>` — zero JS.

### Video Player
Custom controls in `index.astro`. Uses `as HTMLVideoElement` (despite strict TS convention, this pattern is used in practice for `getElementById`).

### Import Order
Astro built-ins → external libraries → local components → (future) local utils

## GSAP Animation System

Orchestrated by a single `ScrollAnimations.astro` per page. Uses `data-*` attributes as a declarative API:

- `data-hero-*` — hero entrance (master timeline)
- `data-reveal` — scroll-triggered fade-up (`y: 30, opacity: 0 → y: 0, opacity: 1`, `start: 'top 85%'`, `toggleActions: 'play none none reverse'`)
- `data-stagger` — container with staggered children (`stagger: 0.15`)
- `data-stagger-process`, `data-process-step` — process timeline with directional offsets + rotateY
- `data-stat-value` — numeric counter animation with `gsap.utils.snap`
- `data-parallax` — parallax scroll via `data-parallax-speed`
- `data-service` — hover scale (1.02 / 1.0)
- `data-footer`, `data-footer-item` — scroll-triggered footer reveal
- `data-header-logo`, `data-header-nav` — header entrance

Only `ScrollTrigger` plugin is registered. All animations guard with:
```typescript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

## Tailwind CSS v4

Tailwind imports in `global.css`:
```css
@import "tailwindcss";
@import "tailwind-animations";
```
The `tailwind-animations` package requires `ssr.noExternal` in `astro.config.mjs`.

### CSS Variables (from `global.css`, source of truth)
- `--color-base`: `#05080e`
- `--color-surface`: `#121b2b`
- `--color-accent`: `#08bbae` (teal)
- `--color-accent-2`: `#8f1ca9` (purple)
- `--color-accent-3`: `#ff6b9d` (pink)
- `--color-ink`: `#f3f8ff`
- `--color-ink-dim`: `rgba(243,248,255,0.5)`
- `--font-display`: `"Bebas Neue"`, `--font-sans`: `"Manrope"`, `--font-mono`: `"JetBrains Mono"`, `--font-serif`: `"Playfair Display"`

### Key Utility Classes
`section-shell` (`width: min(1280px, 96%)`), `section-title`, `chip`, `glass-card`, `glass-premium`, `glass-cinematic`, `btn-primary`, `link-hover`, `text-gradient`, `card-glow`, `stagger-children`, `noise-layer`, `grain-overlay`, `frame-indicator`, `film-overlay`, `film-matte`, `film-gate`, `projector-beam`, `lens-flare-element`, `film-leader`, `marquee-container`, `marquee-content`, `timeline-bar`, `waveform-bar`, `perspective-1000`

### CSS Keyframe Animations
`fade-up`, `fade-in`, `scale-in`, `float`, `glow-pulse`, `shimmer`, `text-reveal`, `border-glow`, `film-countdown`, `lens-flare`, `projector-flicker`, `film-grain-animation`, `marquee`, `timeline-scroll`, `waveform-pulse`

Animation utility classes: `.animate-fade-up`, `.animate-fade-in`, `.animate-scale-in`, `.animate-float`, `.animate-glow-pulse`, `.animate-film-countdown`, `.animate-lens-flare`, `.animate-projector-flicker`, `.animate-film-grain`, `.animate-marquee`

## Gotchas

- **No `/servicios` page** — the nav link points to `/#servicios` (homepage anchor). A dedicated `/servicios` route does not exist.
- **Form not connected** — `contacto.astro` has `action="#"`, no backend.
- **Grain overlay** — `.grain-overlay` (SVG turbulence) is only on `index.astro`, not in `MainLayout`. `.noise-layer` (CSS dots) is in `MainLayout`.
- **Layout.astro** is legacy/unused. `Welcome.astro` is unused scaffold. Both safe to remove.
- **No image optimization** — no `@astrojs/image` or `astro:assets` config; images served from `/public/media/`.
- **No `site` in astro config** — if you need `Astro.site`, set `site:` in `astro.config.mjs`.
- **All commits by `Chetti666`** — single contributor.
- **`@ts-check`** — used on `.mjs` config files for JSDoc type checking.
