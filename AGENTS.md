# AGENTS.md - Steadfast Shepherd

## Project Overview

- **Project name**: Steadfast Shepherd (CG Motion Studio portfolio)
- **Type**: Astro + Tailwind CSS v4 + GSAP
- **Language**: TypeScript (strict mode)
- **Purpose**: Personal portfolio website for a motion graphics and video editing studio

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run astro` | Run Astro CLI commands |

No test runner or linter configured. If you add tests: `vitest run` or `jest`

## Code Style Guidelines

### General

- Use TypeScript with strict mode (inherits from `astro/tsconfigs/strict`)
- Prefer Astro components (`.astro`) for UI
- Keep components small and focused
- Use Spanish for content, English for code identifiers

### File Organization

```
src/
├── assets/        # Images, videos, fonts
├── components/    # Reusable Astro components
├── layouts/       # Page layouts
├── pages/         # File-based routing
└── styles/        # Global CSS, Tailwind config
```

### Imports

- Use relative imports with `../` prefix
- Order: Astro built-ins → external libraries → local components → local utils
- Example:
  ```astro
  ---
  import MainLayout from '../layouts/MainLayout.astro';
  import ScrollAnimations from '../components/ScrollAnimations.astro';
  import { formatDate } from '../utils/date';
  ---
  ```

### Formatting

- Use 2 spaces for indentation
- Trailing commas in arrays and objects
- Use parentheses around arrow function arguments: `(arg) => {}`
- Template literals for strings with variables

### TypeScript
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Leverage Astro's built-in types (Astro.props, Astro.url, etc.)

### Tailwind CSS

- Use Tailwind v4 with `@import "tailwindcss"` (see `src/styles/global.css`)
- Custom colors as CSS variables in `:root`
- Available: `--color-base`, `--color-surface`, `--color-accent`, `--color-accent-2`, `--color-ink`
- Utility classes: `.section-shell`, `.glass-card`, `.chip`, `.font-display`
- Use `min()` for responsive max-widths: `width: min(1120px, 92%)`

### Naming Conventions

- Components: PascalCase (`SiteHeader.astro`, `ScrollAnimations.astro`)
- Pages: kebab-case (`sobre-mi.astro`, `contacto.astro`)
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE or camelCase with prefix
- CSS classes: Tailwind classes or kebab-case for custom classes

### Error Handling

- Handle null/undefined values explicitly
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- For external resources, provide fallback content

### Component Patterns

#### Astro Frontmatter
```astro
---
// Define props interface
interface Props {
  title: string;
  description?: string;
}

const { title, description = '' } = Astro.props;

// Helper functions
const normalizePath = (path: string) => path.replace(/\/$/, '');
// ---
```

#### Conditional Classes
```astro
<a
  href={href}
  class:list={[
    'base-classes',
    isActive ? 'active-classes' : 'inactive-classes'
  ]}
/>
```

### Animations
- Use GSAP for complex animations (already installed)
- Use Tailwind animations via `tailwind-animations` plugin
- Custom utilities in `global.css` (e.g., `animate-zoom-in`)

### SEO & Accessibility

- Always include `title` and `description` props in layouts
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- Include `alt` attributes on images

### Assets
- Place static assets in `public/media/`
- Use `loading="lazy"` for below-fold images
- Use `loading="eager"` for hero/above-fold images

### Scripts
- Avoid client-side JS unless necessary
- Use `<script>` tags with `is:inline` for simple scripts

## Common Patterns

### Active Link Detection
```typescript
const normalizePath = (path: string) => 
  (path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path);
const currentPath = normalizePath(Astro.url.pathname);

const isActive = (href: string) => {
  if (href.includes('#')) return false;
  return currentPath === normalizePath(href);
};
```

### Responsive Navigation
```astro
<ul class="hidden items-center gap-2 md:flex">
  {/* Desktop nav */}
</ul>
<details class="relative md:hidden">
  {/* Mobile nav */}
</details>
```

## Adding New Dependencies

Before adding new packages:
1. Check if functionality is already available in existing dependencies
2. Verify compatibility with SSR (`astro.config.mjs` has `ssr.noExternal`)
3. Run `npm install <package>` to add

## Best Practices

1. Test changes with `npm run dev` before committing
2. Run `npm run build` to verify production build succeeds
3. Use descriptive commit messages
4. Keep Astro frontmatter concise; extract complex logic to utility functions
5. Minimize client-side JavaScript; prefer CSS solutions when possible
