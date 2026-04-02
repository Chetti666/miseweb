# AGENTS.md - Steadfast Shepherd

## Project Overview

- **Type**: Astro 5 + Tailwind CSS v4 (Vite plugin) + GSAP + TypeScript (strict)
- **Purpose**: Portfolio website for motion graphics and video editing studio
- **Language**: Spanish for content, English for code identifiers

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build production to ./dist/ |
| `npm run preview` | Preview production build |
| `npm run astro check` | Type checking (0 errors target) |
| `npm run astro -- --help` | View all Astro CLI options |

No test runner, linter, or formatter configured.

## Code Style

### General

- TypeScript strict mode (`extends "astro/tsconfigs/strict"`)
- Prefer CSS animations over JS for performance
- 2-space indentation, trailing commas, semicolons in TS
- Max line length: 100 characters
- Arrow functions with parentheses: `(arg) => {}`

### File Organization
```
src/
├── components/   # Reusable Astro components
├── layouts/      # Page layouts (MainLayout.astro is primary)
├── pages/        # File-based routing (kebab-case filenames)
└── styles/       # global.css with Tailwind v4 + custom utilities
```
Note: `src/utils/` does not exist yet. Logic lives in frontmatter or `<script>` blocks.

### Imports
Order: Astro built-ins → external libraries → local components → local utils.
```typescript
import type { ComponentProps } from 'astro';
import MainLayout from '../layouts/MainLayout.astro';
import { gsap } from 'gsap';
```

### Naming
- Components: PascalCase (`SiteHeader.astro`, `ScrollAnimations.astro`)
- Pages: kebab-case (`sobre-mi.astro`, `contacto.astro`)
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

### TypeScript
- Prefer explicit types over `any`; never use `as` assertions
- Use `interface` for objects, `type` for unions
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Add `@ts-check` to .js/.mjs files for JSDoc type checking

### Error Handling
- Try/catch for async with meaningful `console.error` messages
- Provide fallback content for external resources
- Check `prefers-reduced-motion` before running animations

## Component Patterns

### Frontmatter Props
```astro
---
interface Props { title: string; description?: string; }
const { title, description = '' } = Astro.props;
---
```

### Conditional Classes
```astro
<a href={href} class:list={['base', isActive && 'active']} />
```

### Active Link Detection
```typescript
const normalizePath = (p: string) =>
  p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;
const isActive = (href: string) =>
  !href.includes('#') && normalizePath(href) === normalizePath(Astro.url.pathname);
```

### Component Archetypes
1. **Pure markup** — No frontmatter, no `<script>` (e.g., `SiteFooter.astro`)
2. **Hybrid** — Frontmatter + markup + inline `<script>` (e.g., `SiteHeader.astro`)
3. **Script-only** — Pure `<script>` delivery vehicle, no markup (e.g., `ScrollAnimations.astro`)

Every page imports `MainLayout` and `<ScrollAnimations />` at the end.

## GSAP Animation System

### Data Attribute Convention
Components use `data-*` attributes as a declarative animation API:

| Attribute | Purpose |
|-----------|---------|
| `data-header-logo`, `data-header-nav` | Header elements |
| `data-hero-title`, `data-hero-subtitle`, `data-hero-description`, `data-hero-cta`, `data-hero-visual` | Hero section |
| `data-reveal` | Scroll-triggered fade-up (`y: 30`, `start: 'top 85%'`) |
| `data-stagger` | Container with staggered children |
| `data-stagger-process`, `data-process-step` | Process methodology timeline |
| `data-footer`, `data-footer-item` | Footer reveal animation |
| `data-service` | Service card hover scale |

### ScrollTrigger Pattern
```typescript
gsap.fromTo(el,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }
);
```

### Accessibility
Wrap all animations in `prefers-reduced-motion` check:
```typescript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

### Session-Based Animation Gating
Use `sessionStorage` to run animations only once per session:
```typescript
if (!sessionStorage.getItem('site_visited')) { /* animate */ }
sessionStorage.setItem('site_visited', 'true');
```

## Tailwind CSS v4

### Configuration
- Uses `@tailwindcss/vite` Vite plugin (NOT PostCSS)
- `tailwind-animations` requires `ssr.noExternal` in `astro.config.mjs`
- `@import "tailwindcss"` and `@import "tailwind-animations"` in `global.css`

### CSS Variables
| Variable | Value | Purpose |
|----------|-------|---------|
| `--color-base` | `#090f1a` | Background (dark navy) |
| `--color-surface` | `#121b2b` | Card backgrounds |
| `--color-accent` | `#53e1d1` | Primary accent (cyan) |
| `--color-accent-2` | `#f2b66d` | Secondary accent (gold) |
| `--color-ink` | `#f3f8ff` | Text (off-white) |
| `--color-ink-dim` | `rgba(243,248,255,0.5)` | Dimmed text |

### Custom Utility Classes
`.section-shell`, `.section-title`, `.glass-card`, `.glass-premium`, `.chip`,
`.btn-primary`, `.link-hover`, `.text-gradient`, `.card-glow`, `.noise-layer`,
`.grain-overlay`, `.timeline-bar`, `.waveform-bar`, `.stagger-children`,
`.frame-indicator`, `.text-accent`, `.text-accent-2`, `.bg-accent`,
`.decoration-accent`, `.font-display`, `.perspective-1000`

### Keyframe Animations
`fade-up`, `fade-in`, `scale-in`, `float`, `glow-pulse`, `shimmer`,
`text-reveal`, `border-glow`, `timeline-scroll`, `waveform-pulse`

### Responsive Widths
Use `min()` for containers: `width: min(1120px, 92%)`

## Layout & Page Conventions

- `MainLayout.astro` is the only active layout; `Layout.astro` is legacy/unused
- Dual favicon with `prefers-color-scheme` media queries
- Film grain overlay: `.noise-layer` (CSS) + `.grain-overlay` (SVG turbulence)
- Video previews use `<video autoplay loop muted playsinline>`
- Mobile menu uses native `<details>/<summary>` (zero-JS)
- `Welcome.astro` is unused scaffold; safe to remove

## SEO & Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`
- Open Graph tags: `og:title`, `og:description`, `og:type`
- Alt attributes on all images; `loading="lazy"` for below-fold media
- WCAG AA color contrast; `lang="es"` on `<html>`

## Best Practices

1. Run `npm run astro check` — target 0 errors before committing
2. Run `npm run build` to verify production output
3. Keep frontmatter concise; extract complex logic to utilities
4. Minimize client-side JS; prefer CSS animations and `@keyframes`
5. Register GSAP plugins in `<script>`, not globally
6. Clean up ScrollTrigger with `ctx.revert()` on unmount
7. Use `gsap.matchMedia()` for responsive/reduced-motion animations
