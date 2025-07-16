# Responsive Table Component

A Tailwind CSS-based responsive table component for React/Next.js applications that provides excellent mobile experience with two layout options: card view and horizontal scroll.

## Features

- **Tailwind CSS Based**: Uses utility classes for all styling
- **Two Mobile Layouts**: Card view (default) or horizontal scroll
- **Column Priority**: Control which columns appear first on mobile
- **Advanced Features**: Sorting, filtering, pagination (in advanced version)
- **TypeScript Support**: Fully typed with generics
- **Dark Mode Support**: Works with Tailwind's dark mode
- **Clean Mobile Cards**: Beautiful card layout on mobile devices

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

## Styling with Tailwind

The component uses standard Tailwind CSS classes. You can customize the appearance by:

1. Passing custom `className` props to columns
2. Using Tailwind's built-in utilities like `text-right`, `font-mono`, etc.
3. Leveraging your app's existing theme classes

Common column classes:
- `text-right` - Right-align content (good for numbers)
- `font-mono` - Monospace font (good for numeric data)
- `text-center` - Center-align content
- Any other Tailwind utility classes

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