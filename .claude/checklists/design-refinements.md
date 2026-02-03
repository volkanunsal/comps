# Design Refinements Checklist

Based on the Clarifications section in the PROMPT.md, the following issues need to be addressed:

## Background & Layout

- [x] **Background Color**: Change page background to light shade of gray (matching design mockup)
  - File: `apps/search/src/App.tsx`
  - Fixed: Changed from `bg-background` to `bg-gray-50`

- [x] **Filter Alignment**: Ensure search input and filter components are aligned horizontally
  - File: `apps/search/src/App.tsx`
  - Fixed: Removed `flex-wrap` and changed SearchInput from `w-full` to `flex-1`
  - Result: All elements now display inline horizontally

- [x] **Search Input and Filters Alignment**: Ensure search input and filter components are aligned horizontally
  - File: `apps/search/src/App.tsx`
  - Fixed: Changed SearchInput to `w-72` and updated component to respect width

## Search Input Styling

- [x] **Search Focus State**: Border should change to black with no shadow on focus
  - File: `packages/ui/src/components/search-input.tsx`
  - Fixed: Added `focus-visible:border-black focus-visible:shadow-none` to search input

- [x] **Search Default State**: Remove border when not focused
  - File: `packages/ui/src/components/search-input.tsx`
  - Fixed: Added `border-0 shadow-none` for no border in default state

## Filter Dropdowns

- [x] **Filter Border Radius**: Increase rounded corners to match design mockup
  - File: `packages/ui/src/components/button.tsx`
  - Fixed: Changed from `rounded-md` to `rounded-lg` for all buttons

- [x] **Filter Focus State**: Black border with no shadow on focus
  - File: `packages/ui/src/components/button.tsx`
  - Fixed: Changed to `focus-visible:border-black` and removed ring effects

## Multi-Select Filter

- [x] **Checkbox Color**: Change to blue shade matching design mockup
  - File: `packages/ui/src/components/checkbox.tsx`
  - Fixed: Changed to `data-[state=checked]:bg-blue-600 data-[state=checked]:text-white`

- [x] **Action Buttons Count**: Verify only 2 buttons (Clear All + Apply)
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Removed Cancel button, now only Clear All and Apply

- [x] **Action Buttons Styling**: Apply blueish theme colors to buttons
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Apply button now uses `bg-blue-600 hover:bg-blue-700 text-white`

## Single-Select Filter Behavior

- [x] **Deselect on Re-click**: Clicking selected option should deselect and revert to default
  - File: `packages/ui/src/components/single-select-filter.tsx`
  - Fixed: Added toggle logic - clicking same option now deselects it

## Implementation Notes

### Priority Order:

1. Critical (affects core functionality): Single-select deselect behavior, button count
2. High (visual consistency): Colors, borders, shadows
3. Medium (polish): Border radius adjustments

### Testing After Changes:

- [ ] Verify search input focus/blur states
- [ ] Test filter dropdown open/close states
- [ ] Confirm multi-select interactions (select, deselect, clear, apply)
- [ ] Test single-select toggle behavior
- [ ] Check overall visual consistency with design mockups
- [ ] Verify no regressions in existing functionality
