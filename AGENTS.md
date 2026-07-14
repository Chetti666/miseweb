# Steadfast Shepherd

- **Stack**: Astro 6 + Tailwind CSS v4 (`@tailwindcss/vite`, NOT PostCSS) + GSAP 3.14 + TypeScript strict
- **Purpose**: Portfolio for Carlo Gtz — motion graphics / video editing studio, Santiago Chile
- **Language**: Spanish content, English code identifiers
- **Output**: Static site to `./dist/`; `site: 'https://www.carlogtz.cl'` in `astro.config.mjs`
- **Analytics**: `@vercel/analytics` injected in `MainLayout.astro`
- **Sitemap**: `@astrojs/sitemap` active; `robots.txt` references `sitemap-index.xml`

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npx @astrojs/check` | TypeScript type check (not in scripts, run via npx) |

No test runner, CI, pre-commit hooks, linter, or formatter.

## Backend

Contact form POSTs to `/api/contact` — Vercel Serverless Function (`api/contact.js`) via `nodemailer`. Env vars `SMTP_USER` and `SMTP_PASSWORD` required at runtime. PHP fallback at `public/enviar.php` (inactive on Vercel).

## Architecture

```
src/
  components/         # Astro components (PascalCase)
    ScrollAnimations.astro  # GSAP via declarative data-* attrs
    SiteHeader.astro        # Sticky header + <details>/<summary> mobile menu
    ContactModal.astro      # Floating "Cotizar" button + <dialog> form
    Welcome.astro           # LEGACY/unused
    WhatsAppButton.astro    # LEGACY/unused
  layouts/            # MainLayout.astro used by all 4 pages; Layout.astro LEGACY/unused
  pages/              # File-based: index, portfolio, sobre-mi, contacto
  styles/             # global.css — sole stylesheet
api/contact.js        # Vercel Serverless Function
public/media/         # Videos, images, GIFs (no astro:assets, no optimization)
```

### Gotchas

- **No `/servicios` page** — nav link `/#servicios` anchors to homepage section
- **Mobile menu** — native `<details>/<summary>`, zero JS
- **No image optimization** — raw files from `/public/media/`, no `@astrojs/image` or `astro:assets`
- **`.noise-layer`** (CSS dot pattern) in `MainLayout`; **`.grain-overlay`** (SVG feTurbulence) only on `index.astro`
- **`Layout.astro`**, **`Welcome.astro`**, **`WhatsAppButton.astro`** — stale, not imported anywhere
- **ContactModal** — uses native `<dialog>` element `<form method="POST" action="/api/contact">`
- **Google verification** at `/google9c48faa7d8c2e48d.html`
- **`@ts-check`** on `.mjs` config files for JSDoc type checking
- **`.env` is in `.gitignore`** (no `.env.example`) — required vars: `SMTP_USER`, `SMTP_PASSWORD`
- **`skills-lock.json`** tracks installed agent skills (GSAP, Astro, SEO, etc.)

## GSAP Animation System

Single `ScrollAnimations.astro` per page, declarative `data-*` attribute API. Only `ScrollTrigger` registered. All animation guards on `prefers-reduced-motion: reduce`.

| Attribute | Effect |
|-----------|--------|
| `data-header-logo`, `data-header-nav` | Header entrance (master timeline) |
| `data-hero-*` (subtitle, description, cta, visual) + `.hero-text-word` | Hero entrance (master timeline, stagger on words) |
| `data-reveal` | Scroll fade-up: `y:30, opacity:0 → y:0, opacity:1`, start `top 85%`, toggleActions `play none none reverse` |
| `data-stagger` | Container — children stagger at 0.15, start `top 80%` |
| `data-stagger-process` + `data-process-step` | Process timeline: directional x offsets, rotateY, scale |
| `data-stat` + `[data-stat-value data-end-value data-suffix]` | Counter animation with `gsap.utils.snap` |
| `data-parallax` + `data-parallax-speed` | Parallax scroll with scrub |
| `data-service` + child `.glass-premium` | Hover scale (1.01 / 1.0) |
| `data-footer`, `data-footer-item` | Scroll-triggered footer + staggered children |

## Tailwind CSS v4

- Configured via `@tailwindcss/vite` plugin in `astro.config.mjs` (NOT PostCSS)
- `tailwind-animations` needs `ssr.noExternal: ['tailwind-animations']` in Astro config
- Body uses `/media/background.webp` with dark gradient overlay, `background-attachment: fixed`
- CSS utility classes: `.glass-premium`, `.glass-cinematic`, `.btn-primary`, `.chip`, `.text-gradient`, `.section-shell`, `.section-title`
- CSS animation classes: `.animate-fade-up`, `.animate-float`, `.animate-glow-pulse`, `.animate-projector-flicker`, etc.
- Cinema-themed elements: `.film-overlay`, `.film-matte`, `.film-gate`, `.grain-overlay`, `.projector-beam`, `.lens-flare-element`
- Google Fonts: Bebas Neue, Manrope, JetBrains Mono, Playfair Display — loaded via CSS `@import` in `global.css`

## Agent Config

Agent skill dirs: `.agents/`, `.claude/`, `.trae/`, `.windsurf/`. Skills locked via `skills-lock.json`: accessibility, astro, frontend-design, gsap-*, nodejs-*, premium-frontend-design, seo, tailwind-css-patterns, typescript-advanced-types.
