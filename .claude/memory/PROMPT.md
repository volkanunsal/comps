## UI Engineering Assignment

You are a seasoned UI engineer who is an expert in building reusable components and translating designs into high-quality code. Your task is to recreate a provided Figma design of a music discovery page, focusing on building reusable components for search and filtering functionality.

The screenshots of the Figma design can be found in the docs folder of this repo.

## Detailed Task Descriptions

### 1. Recreate the Entire Page

All screenshots feature a single page that displays a list of songs and provides search and filtering capabilities. Your first task is to analyze the design and break it down into reusable components. Consider the following aspects:

1. **Component Structure**: Break down the page into logical components (e.g., Header, SearchBar, FilterPanel, MusicList, MusicCard). Identify which components can be reused.
2. **State Management**: Think about how to manage the state for search and filter selections.
3. **Props and Configuration**: Consider the props to use for each component, especially for the reusable search and filter components.
4. **Styling**: Which TailwindCSS classes to style each component according to the design?
5. **Interactions**: Necessary interactions for search and filter components, including handling user input, selection, and applying filters.

You will implement each primitive component in the `packages/ui` folder, ensuring they are reusable and configurable. Before you begin, examine the primitive components already available in the `packages/ui` folder to get a sense of the existing component library. Then plan out which components you will keep and which new ones you will create. If any existing components are not suitable, you may remove them.

Once the primitive components are ready, you should implement the page components in the `packages/app` folder, using the primitive components from `packages/ui`.

You should import the component from the `@repo/ui` package like this:

<example id="1">
import { Input } from '@repo/ui/components/input.js';
</example>

IMPORTANT: There should be a single page rendered by the `App.tsx` file in the `packages/app` folder, not multiple pages or routes. The images in the `docs` folder display different states of the same page (e.g., with filters applied, with search results, etc.).

### 2. Build Search and Two Filters as Reusable Components

You must build the following components as reusable components:

- A Search component (the search bar at the top of the page)
- A Single-Select filter (the 'Genre' filter)
- A Multi-Select filter (the 'Artist' filter)

The search and single select filter should behave as follows:

- The Search component should allow users to type in a query and filter the music list based on the song title or artist name.
- The Single-Select filter (the 'Genre' filter) should allow users to select one genre from a dropdown list, filtering the music list accordingly.

The Multi-Select filter (the 'Artist' filter) have the following additional requirements:

- Allow search
- Allow selecting and deselecting multiple items.
- Display selected items.
- Include proper interaction (Clear All, Apply).
- Be reusable and easily configurable.
- Extra credit (optional, not required): Animations or subtle transitions.

IMPORTANT: You must NOT name the reusable components with domain specific names like 'GenreFilter' or 'ArtistFilter'. Instead, use generic names like 'SingleSelectFilter' and 'MultiSelectFilter' to ensure reusability across different contexts.

## Rules

- You must use TailwindCSS for styling the components.
- You must use React for building components.
- You may NOT use any third-party component libraries for the filters or search components; these must be built from scratch.
- You must use the ui components in the `packaces/ui` folder for base components (e.g., buttons, inputs, modals), and reusable components.
- The page components must be implemented in the `packages/app` folder and rendered by the `App.tsx` file.

## How to Approach the Task

Think about your answer step by step before you start coding. Ask any clarifying questions if needed. Plan out your component structure, state management, and interactions before you start coding. Focus on building reusable components that can be easily configured and used in different contexts.

## Output Formatting

You will provide two main deliverables:

- The complete implementation of the music discovery page with reusable components.
- A briefing document discussing your componentization strategy.

The briefing document should cover:

- How you decided to structure the entire page into components.
- How you determined the right level of component granularity.
- How you'd enforce consistency and reuse across the application.

Additionally, make sure to include a README file in the root of the repo with instructions on how to run the project locally.

## Clarifications

- The background color should be a light shade of gray, as in the design mockup.
- The search input and filter components should be aligned horizontally.
- When the search field is in focus, the border color should change to black, and it should not have a shadow effect.
- The filter dropdowns should have more rounded corners, similar to the design mockup.
- The checkbox color in the multiselect filter should be a shade of blue that matches the design mockup.
- Pay closer attention to the action buttons of multiselect filters. There should be 2 buttons, not 3, and they should be styled according to the design mockup with blueish theme colors.
- When a selected single-select filter is clicked again, it should deselect the option and revert to the default state.
- When filters are focused, they should have a black border color without any shadow effect.
- The search field should not have a border when not focused.
