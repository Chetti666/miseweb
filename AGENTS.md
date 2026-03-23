# AGENTS.md - Steadfast Shepherd

## Project Overview

- **Project name**: Steadfast Shepherd (CG Motion Studio portfolio)
- **Type**: Astro + Tailwind CSS v4 + GSAP
- **Language**: TypeScript (strict mode)
- **Purpose**: Personal portfolio website for a motion graphics and video editing studio

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro check` | Run Astro type checking |

No test runner or linter configured.

## Code Style Guidelines

### General

- Use TypeScript with strict mode (inherits from `astro/tsconfigs/strict`)
- Prefer Astro components (`.astro`) for UI; keep them small and focused
- Use Spanish for content, English for code identifiers
- Prefer CSS animations over JS when possible for performance

### File Organization

```
src/
├── assets/        # Images, videos, fonts
├── components/    # Reusable Astro components
├── layouts/       # Page layouts
├── pages/         # File-based routing
├── styles/        # Global CSS, Tailwind config
└── utils/         # TypeScript utilities
```

### Imports

Order: Astro built-ins → external libraries → local components → local utils. Use relative imports with `../` prefix.

```typescript
// Correct order
import type { ComponentProps } from 'astro';
import MainLayout from '../layouts/MainLayout.astro';
import { formatDate } from '../utils/date';
```

### Formatting

- 2 spaces indentation
- Trailing commas in arrays/objects
- Parentheses around arrow function arguments: `(arg) => {}`
- Template literals for strings with variables
- Use semicolons in TypeScript files
- Maximum line length: 100 characters

### Naming Conventions

- Components: PascalCase (`SiteHeader.astro`, `ScrollAnimations.astro`)
- Pages: kebab-case (`sobre-mi.astro`, `contacto.astro`)
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- CSS classes: Tailwind utilities or kebab-case
- Data attributes: kebab-case (`data-process-step`)

### TypeScript

- Prefer explicit types over `any`
- Use interfaces for object shapes
- Use `type` for unions and primitives
- Leverage Astro's built-in types (`Astro.props`, `Astro.url`, etc.)
- Never use `as` type assertions; use type guards instead

```typescript
// Good
interface Props {
  title: string;
  items?: string[];
}
const { title, items = [] } = Astro.props;

// Avoid
const title = props.title as string;
```

### Tailwind CSS

- Use Tailwind v4 with `@import "tailwindcss"` in `src/styles/global.css`
- Custom colors as CSS variables in `:root`:
  - `--color-base`, `--color-surface`, `--color-ink`
  - `--color-accent` (cyan), `--color-accent-2` (gold)
- Utility classes: `.section-shell`, `.glass-card`, `.glass-premium`, `.chip`, `.font-display`
- Use `min()` for responsive max-widths: `width: min(1120px, 92%)`
- Use `group` and `group-hover` for coordinated hover effects

### Fonts (loaded in global.css)

- Display: Bebas Neue (headings, large text)
- Mono: JetBrains Mono (code, technical text)
- Sans: Manrope (body text)

### Error Handling

- Handle null/undefined explicitly with optional chaining (`?.`) and nullish coalescing (`??`)
- Provide fallback content for external resources
- Use try/catch for async operations with meaningful error messages

```typescript
// Safe access with fallbacks
const imageUrl = project?.image?.url ?? '/placeholder.jpg';

// Error boundary pattern
try {
  const data = await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', error);
  return fallbackData;
}
```

## Component Patterns

### Astro Frontmatter
```astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
}
const { title, description = '', image } = Astro.props;
---
```

### Conditional Classes
```astro
<a href={href} class:list={['base-classes', isActive && 'active-classes']} />
```

### Active Link Detection
```typescript
const normalizePath = (path: string) => 
  path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
const currentPath = normalizePath(Astro.url.pathname);
const isActive = (href: string) => {
  if (href.includes('#')) return false;
  return currentPath === normalizePath(href);
};
```

### Responsive Patterns
```astro
{/* Mobile-first: hide on mobile, show on md+ */}
<div class="hidden md:block">{/* desktop */}</div>

{/* Toggle between layouts */}
<ul class="hidden items-center gap-2 md:flex">{/* desktop */}</ul>
<details class="relative md:hidden">{/* mobile */}</details>
```

## GSAP Animation Guidelines

- Use GSAP for scroll-triggered animations and complex sequences
- Always set `transformPerspective` on parent elements for 3D effects
- Use `scrollTrigger` with `toggleActions: 'play none none reverse'` for reveal on scroll
- Clean up animations on component unmount when possible

```typescript
// 3D card flip pattern
gsap.set(card, {
  transformPerspective: 1000,
  transformOrigin: 'center center'
});

gsap.fromTo(card,
  { rotationX: 90, opacity: 0, scale: 0.8 },
  { rotationX: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
);
```

## SEO & Accessibility

- Always include `title` and `description` props in layouts
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- Include `alt` attributes on all images
- Ensure color contrast meets WCAG AA standards

## Assets

- Place static assets in `public/media/`
- Use `loading="lazy"` for below-fold images, `loading="eager"` for hero
- Optimize images before adding to the project

## Scripts

- Avoid client-side JS unless necessary
- Use `<script is:inline>` for simple inline scripts
- Place complex client-side logic in dedicated script tags

## Adding Dependencies

1. Check if functionality exists in existing dependencies (GSAP, Tailwind)
2. Verify SSR compatibility (`astro.config.mjs` has `ssr.noExternal`)
3. Run `npm install <package>`
4. Test both dev and build modes

## Project Structure Reference

### Key Components
- `src/components/SiteHeader.astro` - Navigation header
- `src/components/SiteFooter.astro` - Footer with contact info
- `src/components/ScrollAnimations.astro` - GSAP scroll animations
- `src/layouts/MainLayout.astro` - Base layout with SEO

### Key Pages
- `src/pages/index.astro` - Home page with hero, services, process
- `src/pages/sobre-mi.astro` - About page
- `src/pages/portfolio.astro` - Portfolio showcase
- `src/pages/contacto.astro` - Contact form

## Best Practices

1. Test with `npm run dev` before committing
2. Run `npm run build` to verify production build succeeds
3. Run `npm run astro check` for type errors
4. Keep Astro frontmatter concise; extract complex logic to utilities
5. Minimize client-side JS; prefer CSS solutions when possible
6. Use GSAP's `power3.out` or `power2.out` for smooth easings