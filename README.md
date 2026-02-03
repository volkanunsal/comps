# Music Discovery App

A music discovery page built with reusable React components, featuring search and advanced filtering capabilities.

## Project Structure

This is a monorepo containing:

- **`apps/search`** - Main Vite + React application
- **`packages/ui`** - Reusable UI component library (built on shadcn/ui)
- **`packages/eslint-config`** - Shared ESLint configuration
- **`packages/typescript-config`** - Shared TypeScript configuration

## Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9.0.0

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

This will install dependencies for all packages in the monorepo.

### 2. Build the UI Component Library

The search app depends on the UI package, so you need to build it first:

```bash
pnpm --filter @repo/ui build
```

Or build all packages:

```bash
pnpm build
```

### 3. Run the Development Server

Start the development server for the search app:

```bash
pnpm --filter search dev
```

Or run all apps in development mode:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 4. Build for Production

To create a production build:

```bash
pnpm --filter search build
```

To build all packages and apps:

```bash
pnpm build
```

## Features

### Search

- Real-time search across song titles, artists, and genres
- Updates results as you type

### Filtering

- **Artist Filter** - Multi-select with search functionality
  - Search within artists
  - Select/deselect multiple artists
  - See selected items
  - Clear all or apply selections
- **Genre Filter** - Single-select dropdown
  - Choose one genre at a time

### Table

- Sortable columns (Title and Artist)
- Click column headers to sort ascending/descending
- Click again to remove sorting

### Pagination

- Navigate through results
- Shows current page and total pages

## Component Architecture

The application follows a two-tier component architecture:

### Primitive Components (`packages/ui`)

Generic, reusable components with no domain knowledge:

- `SearchInput` - Search input with icon
- `SingleSelectFilter` - Single-selection dropdown
- `MultiSelectFilter` - Multi-selection with search
- `DataTable` - Sortable table
- `SimplePagination` - Page navigation

### Page Components (`apps/search`)

Domain-specific components that compose primitives:

- `App.tsx` - Main application with state management and business logic

For detailed information about the component architecture and design decisions, see [COMPONENTIZATION_STRATEGY.md](./docs/COMPONENTIZATION_STRATEGY.md).

## Development

### Available Commands

From the root directory:

```bash
# Development
pnpm dev              # Run all apps in dev mode
pnpm build            # Build all packages and apps
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm check-types      # Type-check all packages

# UI Package
pnpm --filter @repo/ui build        # Build UI components
pnpm --filter @repo/ui build:css    # Build CSS only
pnpm --filter @repo/ui build:ts     # Build TypeScript only

# Search App
pnpm --filter search dev      # Run dev server
pnpm --filter search build    # Build for production
pnpm --filter search preview  # Preview production build
```

### Adding New Components

1. Create component in `packages/ui/src/components/`
2. Export from the component file
3. Rebuild the UI package: `pnpm --filter @repo/ui build`
4. Import in your app: `import { Component } from '@repo/ui/components/component.js'`

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS v4** - Styling
- **shadcn/ui** - Base component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icons
- **Turborepo** - Monorepo build orchestration
- **pnpm** - Package management

## Documentation

- [Componentization Strategy](./docs/COMPONENTIZATION_STRATEGY.md) - Architecture and design decisions
- [Assignment Prompt](./docs/PROMPT.md) - Original requirements
