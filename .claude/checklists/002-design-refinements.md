# Design Refinements Checklist - Phase 2

Based on the "Clarifications, 2" section in the PROMPT.md, the following additional issues need to be addressed:

## Search Input

- [x] **Search Background Color**: Add white background to search field
  - File: `packages/ui/src/components/search-input.tsx`
  - Fixed: Added `bg-white` to input className

## Multi-Select Filter - Selected Items Panel

- [x] **Remove Icon Visibility**: Remove icon should always be visible, not only on hover
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Removed opacity classes, icon now always visible

- [x] **Remove Icon Position**: Move remove icon to the LEFT of item text, flush to text
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Icon moved to left with `gap-1.5`, changed layout from `justify-between` to start

- [x] **Remove Icon Color**: Change to blue (#016088) to match checkbox color
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Added `text-[#016088]` to button

- [x] **Search Input Padding**: Reduce padding around search input in dropdown
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Changed from `p-3` to `p-2`

## Multi-Select Filter - Action Buttons

- [x] **Primary Button Color**: Use specific blue (#016088) for Apply button
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Changed to `bg-[#016088] hover:bg-[#014d6b]`

- [x] **Clear All Button Position**: Move to the right, adjacent to Apply button
  - File: `packages/ui/src/components/multi-select-filter.tsx`
  - Fixed: Changed to `justify-end gap-2`, both buttons now on right

## Filter Button Styling

- [x] **Filter Border Radius**: Make filter buttons almost pill-shaped
  - File: `packages/ui/src/components/button.tsx`
  - Fixed: Changed from `rounded-lg` to `rounded-full` (pill-shaped)

## Layout Spacing

- [x] **Action Bar to Table Margin**: Reduce margin between filter bar and music table
  - File: `apps/search/src/App.tsx`
  - Fixed: Changed from `mb-6` to `mb-4`

## Color Reference

The specific blue color to use: **#016088** ✅
- Checkboxes - Updated to `bg-[#016088]`
- Remove icons - Updated to `text-[#016088]`
- Apply button - Updated to `bg-[#016088]`

## Implementation Notes

### Priority Order:

1. **Critical (visual consistency)**: Color updates to match exact blue (#016088)
2. **High (UX improvements)**: Remove icon visibility and position, button alignment
3. **Medium (polish)**: Padding adjustments, spacing refinements

### Color Update Strategy:

The current implementation uses Tailwind's `blue-600` which is close but not exact. Need to either:
- Use arbitrary values: `bg-[#016088]`
- Or extend Tailwind config with custom color

### Testing After Changes:

- [ ] Verify search field has white background
- [ ] Check remove icons are always visible and positioned correctly
- [ ] Confirm all blues match #016088
- [ ] Test Clear All button is adjacent to Apply
- [ ] Verify filter buttons are pill-shaped
- [ ] Check spacing between filters and table is reduced
- [ ] Ensure no regressions in functionality
