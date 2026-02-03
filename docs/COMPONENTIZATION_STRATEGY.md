# Componentization Strategy

## Overview

This document outlines the component architecture and design decisions for the music discovery application, focusing on reusability, maintainability, and consistency.

## Component Structure

The application follows a two-tier architecture that separates primitive UI components from domain-specific page components:

### Tier 1: Primitive Components (`packages/ui`)

These are generic, reusable components that have no knowledge of the music domain. They can be used across different applications and contexts.

**Created Components:**

- `SearchInput` - A search input with icon
- `SingleSelectFilter` - Single-selection dropdown filter
- `MultiSelectFilter` - Multi-selection filter with search capability
- `DataTable` - Sortable data table
- `SimplePagination` - Simple pagination control

**Existing Components Used:**

- `Button` - Action triggers and clickable elements
- `Input` - Base text input
- `Checkbox` - Selection indicators
- `Popover` - Dropdown containers for filters

### Tier 2: Page Components (`apps/search`)

The main application (`App.tsx`) composes primitive components with business logic to create the music discovery interface.

## Design Decisions

### 1. Component Granularity

**Decision: Build Focused, Single-Responsibility Components**

Each primitive component handles one specific UI pattern:

- **SearchInput**: Combines an input field with a search icon. Stops at the UI level - doesn't include search logic.
- **SingleSelectFilter**: Manages single-selection from a list. Handles UI state (open/closed) but delegates value changes to parent.
- **MultiSelectFilter**: More complex component that includes search, selection state, and apply/cancel actions. This could have been split further, but was kept as one component because:
  - The search, selection panel, and selected items panel are tightly coupled in the UX
  - Splitting would require complex state coordination between sub-components
  - The component is still under 200 lines and maintainable

- **DataTable**: Handles table rendering and sort UI. Delegates actual sorting logic to parent.
- **SimplePagination**: Simple page navigation. Parent controls actual page state.

**Why This Level:**

- Components are reusable across different data types (not tied to "songs")
- Each component can be understood and modified independently
- Testing is straightforward - each component has clear inputs and outputs
- Balance between reusability and complexity - not too atomic, not too coupled

### 2. State Management Approach

**Decision: Lift State Up, Keep Components Controlled**

All primitive components are **controlled components** that:

- Receive their state as props (`value`, `sortState`, etc.)
- Notify parents of changes via callbacks (`onValueChange`, `onSort`, etc.)
- Don't manage domain logic internally

**Rationale:**

- Makes components predictable and testable
- Parent component (`App.tsx`) owns all business logic (filtering, sorting, pagination)
- Easy to debug - single source of truth for application state
- Enables features like resetting filters or saving/loading filter state

**State Ownership:**

```
App.tsx (State Owner)
  ├─ searchQuery: string
  ├─ selectedArtists: string[]
  ├─ selectedGenre: string | null
  ├─ sortState: { column, direction }
  └─ currentPage: number
       │
       ├─> SearchInput (controlled)
       ├─> MultiSelectFilter (controlled)
       ├─> SingleSelectFilter (controlled)
       ├─> DataTable (controlled)
       └─> SimplePagination (controlled)
```

### 3. Naming Conventions

**Decision: Use Generic, Domain-Agnostic Names**

Components are named for **what they do**, not **what data they display**:

✅ **Good (Generic):**

- `SingleSelectFilter` - can filter genres, categories, statuses, etc.
- `MultiSelectFilter` - can select artists, tags, authors, etc.
- `DataTable` - can display songs, users, products, etc.

❌ **Bad (Domain-Specific):**

- `GenreFilter` - only works for genres
- `ArtistSelector` - only for artists
- `SongsTable` - only for songs

**Benefits:**

- Components can be reused in different contexts
- Easier to extract into a shared component library
- Clearer separation between UI patterns and business logic

### 4. Props Interface Design

**Decision: Consistent, Flexible Prop Patterns**

All filter components follow a similar prop structure:

```typescript
interface FilterProps {
  label: string; // Display label
  options: Option[]; // Data to display
  value: T; // Current selection
  onValueChange: (T) => void; // Change handler
  className?: string; // Style overrides
  placeholder?: string; // Optional customization
}
```

**Benefits:**

- Predictable API across components
- Easy to learn - once you understand one filter, you understand them all
- Type-safe with TypeScript generics
- Extensible through optional props

### 5. Styling Strategy

**Decision: Tailwind CSS with Shadcn/ui Patterns**

- Use Tailwind utility classes for styling
- Follow shadcn/ui's design system (CSS variables, consistent spacing)
- Use `cn()` utility for conditional class merging
- Keep all styling co-located with components (no separate CSS files per component)

**Why:**

- Consistency across the component library
- Easy to customize through CSS variables
- No CSS naming conflicts
- Clear what styles apply where (no hidden cascading)

## Enforcing Consistency and Reuse

### 1. Shared Component Library

All reusable components live in `packages/ui` and are:

- Built and distributed as a package (`@repo/ui`)
- Imported with explicit paths (e.g., `@repo/ui/components/button.js`)
- Type-safe through TypeScript definitions
- Documented through TypeScript interfaces

### 2. TypeScript for Contracts

Strong typing ensures components are used correctly:

```typescript
// Compiler enforces correct usage
<SingleSelectFilter
  label="Genre"                    // ✅ Required string
  options={genreOptions}           // ✅ Correct type
  value={selectedGenre}            // ✅ string | null
  onValueChange={setSelectedGenre} // ✅ Correct signature
/>
```

### 3. Consistent File Structure

```
packages/ui/src/components/
  ├─ button.tsx              # Existing shadcn component
  ├─ input.tsx               # Existing shadcn component
  ├─ search-input.tsx        # New: Composed from Input
  ├─ single-select-filter.tsx # New: Uses Popover + Button
  ├─ multi-select-filter.tsx  # New: Uses Popover + Input + Checkbox
  ├─ data-table.tsx          # New: Standalone
  └─ simple-pagination.tsx   # New: Uses Button
```

Each component:

- Single file per component
- Exports both the component and its types
- Follows shadcn/ui patterns (data-slot attributes, client directives when needed)

### 4. Code Review Guidelines

To maintain consistency, future components should:

1. **Be Generic**: No domain-specific naming or logic
2. **Be Controlled**: State managed by parent
3. **Be Typed**: Full TypeScript interfaces
4. **Be Accessible**: Proper ARIA attributes, keyboard navigation
5. **Follow Patterns**: Match existing component structure

### 5. Testing Strategy

While not implemented in this initial version, the component structure enables:

- **Unit tests** for each primitive component in isolation
- **Integration tests** for the composed page
- **Visual regression tests** for UI consistency
- **Accessibility tests** for WCAG compliance

Each component's controlled nature makes it easy to test with different prop combinations.

## Future Improvements

### Scalability

As the application grows, consider:

1. **Component Documentation**: Add Storybook or similar for visual component documentation
2. **More Variants**: Add size variants (`sm`, `md`, `lg`) to filters
3. **Loading States**: Add loading indicators to table and filters
4. **Empty States**: Better empty state handling with illustrations
5. **Error States**: Validation and error display patterns
6. **Animations**: Add subtle transitions (already partially implemented with Radix animations)

### Performance

For larger datasets:

1. **Virtual Scrolling**: Use for long lists in MultiSelectFilter
2. **Debouncing**: Add to SearchInput for API calls
3. **Memoization**: Optimize re-renders in table rows
4. **Code Splitting**: Lazy load heavy components

### Developer Experience

1. **Component Generator**: CLI tool to scaffold new components following patterns
2. **Lint Rules**: Custom ESLint rules to enforce naming conventions
3. **TypeScript Utilities**: Shared types for common patterns (Option, FilterProps, etc.)

## Conclusion

This architecture balances several concerns:

- **Reusability**: Components work across different contexts
- **Maintainability**: Clear separation of concerns, easy to understand
- **Consistency**: Predictable patterns across all components
- **Type Safety**: TypeScript catches errors at compile time
- **Flexibility**: Easy to customize and extend

The key insight is treating UI components as **pure functions of props**, delegating business logic to parent components. This creates a clean, testable, and scalable architecture that can grow with the application.
