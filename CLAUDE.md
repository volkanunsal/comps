# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for a UI engineering assignment to build a music discovery page with reusable search and filter components. The project uses pnpm workspaces, Turborepo for build orchestration, React, Vite, and TailwindCSS.

## Development Commands

### Root-level commands

- `pnpm dev` - Run development servers for all apps (uses Turbo)
- `pnpm build` - Build all packages and apps (uses Turbo)
- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Type-check all packages

### App-specific commands (from apps/search/)

- `pnpm dev` - Start Vite dev server for the search app
- `pnpm build` - Build the search app (runs TypeScript compilation first)
- `pnpm preview` - Preview production build

### UI package commands (from packages/ui/)

- `pnpm build` - Build both CSS and TypeScript (runs `build:css` and `build:ts`)
- `pnpm build:css` - Compile Tailwind CSS styles
- `pnpm build:ts` - Compile TypeScript and resolve path aliases
- `pnpm generate:component` - Generate a new React component
- `pnpm check-types` - Type-check without emitting files

## Architecture

### Monorepo Structure

- **apps/search** - Main Vite + React application displaying the music discovery page
- **packages/ui** - Reusable UI component library (shadcn/ui-based)
- **packages/eslint-config** - Shared ESLint configuration
- **packages/typescript-config** - Shared TypeScript configuration

### Component Strategy

The UI package (`@repo/ui`) contains primitive components built on shadcn/ui patterns:

- Components are in `packages/ui/src/components/`
- Styled with TailwindCSS v4 using CSS variables for theming
- Components export from `dist/` after build
- Import pattern: `import { Button } from '@repo/ui/components/button.js'`

**Key constraint**: The assignment requires building search and filter components from scratch (no third-party component libraries for these specific components).

### Tech Stack Details

- **TailwindCSS v4**: Uses `@tailwindcss/postcss` plugin, CSS imports in `styles.css`
- **shadcn/ui**: Component library foundation (New York style, with CSS variables)
- **State Management**: Consider using Jotai (already in dependencies) for state
- **Icons**: Uses `@tabler/icons-react` and `lucide-react`
- **Build**: TypeScript compilation with `tsc-alias` for path resolution

### UI Package Build Process

The UI package has a two-step build:

1. PostCSS processes `src/styles.css` → `dist/styles.css` (compiles TailwindCSS)
2. TypeScript compiles and `tsc-alias` resolves path aliases

Components use path aliases defined in `components.json`:

- `@/components` → components directory
- `@/lib` → lib directory (includes utilities like `cn()`)

## Important Notes

- Use pnpm for package management (enforced via `packageManager` field)
- Node version: >=18 required
- The search app uses Vite, not Next.js (despite tsconfig extending nextjs.json)
- Components must be built before the app can use them (`pnpm build` in packages/ui)
- Import UI components with `.js` extension: `'@repo/ui/components/button.js'`
