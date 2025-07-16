# Responsive Design Guide

## Overview
This guide provides best practices and patterns for implementing responsive design in the application, with a special focus on tables and mobile optimization.

## Table Responsiveness

### 1. Using ResponsiveTable Component
For data tables that need to work well on mobile:

```tsx
import { ResponsiveTable } from "@/components/ui/responsive-table"

<ResponsiveTable
  columns={[
    { key: "name", header: "Name" },
    { key: "email", header: "Email", hideOnMobile: true },
    { key: "status", header: "Status", mobileLabel: "Status" },
    { key: "actions", header: "", className: "w-12" }
  ]}
  data={data}
  renderCell={(row, column) => {
    // Custom rendering logic
    if (column.key === "status") {
      return <Badge>{row.status}</Badge>
    }
    return row[column.key]
  }}
/>
```

### 2. Standard Table with Scroll
For simple tables that can scroll horizontally:

```tsx
<div className="table-auto-scroll">
  <Table>
    {/* Table content */}
  </Table>
</div>
```

## Mobile-First Patterns

### 1. Responsive Spacing
Use responsive padding and margins:
- `p-4 sm:p-6` - Smaller padding on mobile
- `space-y-4 sm:space-y-6` - Tighter spacing on mobile
- `gap-4 md:gap-6` - Responsive gaps in grid/flex

### 2. Responsive Typography
- `text-lg sm:text-2xl` - Smaller headings on mobile
- `text-sm sm:text-base` - Readable body text

### 3. Responsive Grid Layouts
```tsx
// Stack on mobile, grid on larger screens
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Grid items */}
</div>
```

### 4. Hide/Show Elements
- `hidden md:block` - Hide on mobile, show on desktop
- `block md:hidden` - Show on mobile, hide on desktop
- `hideOnMobile: true` - In ResponsiveTable columns

## Mobile Card Pattern
Transform complex layouts into cards on mobile:

```tsx
// Desktop: Table row
// Mobile: Card
<div className="hidden md:table-row">
  {/* Table cells */}
</div>
<div className="block md:hidden mobile-card">
  <div className="mobile-card-row">
    <span className="mobile-card-label">Label:</span>
    <span className="mobile-card-value">Value</span>
  </div>
</div>
```

## Performance Tips

1. **Use CSS over JavaScript** for responsive behavior when possible
2. **Lazy load** heavy components on mobile
3. **Optimize images** with responsive sizing
4. **Minimize DOM elements** on mobile views
5. **Use mobile-specific hooks** like `useIsMobile()` sparingly

## Testing Responsive Design

1. Test on real devices when possible
2. Use Chrome DevTools device emulation
3. Check these key breakpoints:
   - 320px (small phones)
   - 375px (iPhone)
   - 768px (tablets)
   - 1024px (desktop)

## Common Responsive Utilities

```css
/* In globals.css */
.table-auto-scroll - Horizontal scroll for tables
.mobile-card-view - Card layout container
.mobile-card - Individual card styling
.mobile-card-row - Row within a card
.mobile-card-label - Label styling
.mobile-card-value - Value styling
```

## Accessibility Considerations

1. Ensure touch targets are at least 44x44px on mobile
2. Maintain proper contrast ratios
3. Test with screen readers
4. Provide clear focus indicators
5. Use semantic HTML structure