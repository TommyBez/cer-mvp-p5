# Responsive Table Component

A CSS-first responsive table component for React/Next.js applications that provides excellent mobile experience with two layout options: card view and horizontal scroll.

## Features

- **CSS-First Approach**: Minimal JavaScript, leveraging CSS for responsive behavior
- **Two Mobile Layouts**: Card view (default) or horizontal scroll
- **Column Priority**: Control which columns appear first on mobile
- **Advanced Features**: Sorting, filtering, pagination (in advanced version)
- **TypeScript Support**: Fully typed with generics
- **Dark Mode Support**: CSS variables for theming
- **Print Friendly**: Optimized print styles

## Installation

The component is already included in the project. Just import and use:

```typescript
import { ResponsiveTable } from '@/components/responsive-table'
import { ResponsiveTableAdvanced } from '@/components/responsive-table-advanced'
```

## Basic Usage

```tsx
import { ResponsiveTable } from '@/components/responsive-table'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  // ... more data
]

function MyComponent() {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      accessor: (user: User) => user.name,
      priority: 10 // Higher priority = shown first on mobile
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (user: User) => user.email,
      priority: 8
    },
    {
      key: 'role',
      header: 'Role',
      accessor: (user: User) => user.role,
      priority: 5
    }
  ]

  return (
    <ResponsiveTable
      data={users}
      columns={columns}
      getRowKey={(user) => user.id}
      mobileLayout="card" // or "scroll"
    />
  )
}
```

## Advanced Usage with Sorting, Filtering, and Pagination

```tsx
import { ResponsiveTableAdvanced } from '@/components/responsive-table-advanced'

function MyAdvancedComponent() {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      accessor: (user: User) => user.name,
      sortable: true,
      filterable: true,
      priority: 10
    },
    // ... more columns
  ]

  return (
    <ResponsiveTableAdvanced
      data={users}
      columns={columns}
      getRowKey={(user) => user.id}
      enableSorting={true}
      enableFiltering={true}
      enablePagination={true}
      itemsPerPage={10}
      onRowClick={(user) => console.log('Clicked:', user)}
      emptyMessage="No users found"
      loading={false}
    />
  )
}
```

## Column Configuration

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Unique identifier for the column |
| `header` | `string` | Column header text |
| `accessor` | `(item: T) => ReactNode` | Function to extract/render cell content |
| `className` | `string` | Optional CSS class for the column |
| `priority` | `number` | Column priority for mobile view (higher = first) |
| `sortable` | `boolean` | Enable sorting for this column (advanced only) |
| `filterable` | `boolean` | Include in search filter (advanced only) |
| `width` | `string` | Optional fixed width for the column |

## Props

### ResponsiveTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | required | Array of data to display |
| `columns` | `Column<T>[]` | required | Column configurations |
| `getRowKey` | `(item: T, index: number) => string \| number` | required | Function to get unique row key |
| `className` | `string` | `''` | Additional CSS class |
| `mobileLayout` | `'card' \| 'scroll'` | `'card'` | Mobile layout type |

### ResponsiveTableAdvanced Props

All of the above, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSorting` | `boolean` | `true` | Enable column sorting |
| `enableFiltering` | `boolean` | `true` | Enable search filter |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `itemsPerPage` | `number` | `10` | Items per page |
| `onRowClick` | `(item: T) => void` | - | Row click handler |
| `emptyMessage` | `string` | `'No data available'` | Empty state message |
| `loading` | `boolean` | `false` | Loading state |

## CSS Customization

The component uses CSS variables for theming:

```css
:root {
  --background: #ffffff;
  --background-secondary: #f9fafb;
  --background-hover: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --border-color-light: #f3f4f6;
  --primary-color: #3b82f6;
}
```

## Utility Classes

The component provides several utility classes:

- `.numeric` - Right-aligned, tabular numbers
- `.actions` - Center-aligned, no wrap
- `.truncate` - Ellipsis overflow for long text

## Mobile Layouts

### Card View (Default)
- Each row becomes a card
- Columns are stacked vertically
- Respects column priority order

### Horizontal Scroll
- Table maintains structure
- Horizontal scrolling on mobile
- Better for data comparison

## Demo

Run the demo at `/table-demo` to see the component in action.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Chrome for Android 80+