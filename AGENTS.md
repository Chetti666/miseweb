# AGENTS.md - Steadfast Shepherd

## Project Overview

- **Type**: Astro + Tailwind CSS v4 + GSAP + TypeScript (strict mode)
- **Purpose**: Portfolio website for motion graphics and video editing studio

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build to ./dist/ |
| `npm run preview` | Preview production build |
| `npm run astro check` | Type checking |
| `npm run astro -- --help` | View all Astro CLI options |

No test runner or linter configured.

## Code Style

### General

- Use TypeScript strict mode
- Prefer Astro components (.astro) for UI
- Spanish for content, English for code identifiers
- Prefer CSS animations over JS for performance

### File Organization
```
src/
├── assets/       # Images, videos, fonts
├── components/   # Reusable Astro components
├── layouts/      # Page layouts
├── pages/        # File-based routing
├── styles/       # Global CSS, Tailwind config
└── utils/        # TypeScript utilities
```

### Imports
Order: Astro built-ins → external libraries → local components → local utils.
```typescript
import type { ComponentProps } from 'astro';
import MainLayout from '../layouts/MainLayout.astro';
import { formatDate } from '../utils/date';
```

### Formatting
- 2 spaces indentation, trailing commas, semicolons in TS
- Arrow functions with parentheses: `(arg) => {}`
- Max line length: 100 characters

### Naming
- Components: PascalCase (`SiteHeader.astro`)
- Pages: kebab-case (`sobre-mi.astro`)
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

### TypeScript
- Prefer explicit types over `any`
- Use interfaces for objects, `type` for unions
- Never use `as` assertions; use type guards instead
```typescript
interface Props { title: string; items?: string[]; }
const { title, items = [] } = Astro.props;
```

### Tailwind CSS v4
- Use `@import "tailwindcss"` in `src/styles/global.css`
- CSS variables: `--color-base`, `--color-surface`, `--color-ink`, `--color-accent` (cyan), `--color-accent-2` (gold)
- Classes: `.section-shell`, `.glass-card`, `.glass-premium`, `.chip`
- Use `min()` for responsive widths: `width: min(1120px, 92%)`

### Error Handling
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Provide fallback content for external resources
- Try/catch for async with meaningful errors

## Component Patterns

### Frontmatter
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
const normalizePath = (p: string) => p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;
const isActive = (href: string) => !href.includes('#') && normalizePath(href) === normalizePath(Astro.url.pathname);
```

## GSAP

- Use scrollTrigger with `toggleActions: 'play none none reverse'`
- Set `transformPerspective` on parent for 3D effects
- Use `power3.out` or `power2.out` for easing

```typescript
gsap.fromTo(card,
  { rotationX: 90, opacity: 0, scale: 0.8 },
  { rotationX: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
);
```

## SEO & Accessibility

- Always include title/description in layouts
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`
- Alt attributes on all images
- WCAG AA color contrast

## Best Practices

1. Run `npm run dev` before committing
2. Run `npm run build` to verify production build
3. Run `npm run astro check` for type errors
4. Keep frontmatter concise; extract logic to utilities
5. Minimize client-side JS; prefer CSS solutions