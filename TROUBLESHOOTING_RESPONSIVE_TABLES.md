# Troubleshooting Responsive Tables

## Problem: Still Seeing Old Tables on Mobile

If you're still seeing the old table layout on mobile devices, here are steps to debug and fix the issue:

### 1. Clear Browser Cache
- **Hard Refresh**: Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- **Clear Site Data**: Open DevTools → Application → Clear Storage → Clear site data
- **Try Incognito/Private Mode**: Test in a fresh browser session

### 2. Verify CSS is Loading
Open browser DevTools and check:
- **Network Tab**: Ensure all CSS files are loading (no 404 errors)
- **Console**: Check for any JavaScript errors
- **Elements Tab**: Inspect a table element and verify the classes `block md:hidden` and `hidden md:block` are present

### 3. Test Responsive Behavior
1. Visit `/test-responsive` page
2. You should see:
   - Red box on mobile (< 768px)
   - Blue box on desktop (>= 768px)
3. If this doesn't work, Tailwind CSS might not be compiling correctly

### 4. Check Tailwind Configuration
Ensure your `tailwind.config.ts` includes all component paths:
```ts
content: [
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
]
```

### 5. Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Clear Next.js cache
rm -rf .next
# Restart
npm run dev
```

### 6. Verify Component Usage
Check that components are using `ResponsiveTable` not `Table`:
```tsx
// ❌ Old way
<Table>
  <TableHeader>...

// ✅ New way
<ResponsiveTable
  columns={[...]}
  data={[...]}
  renderCell={...}
/>
```

### 7. Force Mobile View (Testing)
To verify the mobile card layout is working, temporarily replace `ResponsiveTable` with `ResponsiveTableForceMobile`:
```tsx
import { ResponsiveTableForceMobile } from "@/components/ui/responsive-table-force-mobile"

// This will always show the mobile card view
<ResponsiveTableForceMobile
  columns={columns}
  data={data}
  renderCell={renderCell}
/>
```

### 8. Check Browser DevTools
1. Open DevTools (F12)
2. Toggle device emulation (Ctrl+Shift+M)
3. Select a mobile device or set width < 768px
4. The tables should transform to cards

### 9. Manual CSS Override (Last Resort)
If nothing else works, add this CSS to force mobile view:
```css
/* In app/globals.css */
@media (max-width: 767px) {
  .force-mobile-cards table {
    display: none !important;
  }
}
```

### 10. Check for CSS Conflicts
Look for any custom CSS that might be overriding the responsive classes:
- Global styles overriding Tailwind
- Component-specific styles with `!important`
- Third-party CSS libraries

## Still Not Working?

If you've tried all the above and tables still aren't responsive:

1. **Check the rendered HTML**: Right-click → View Page Source to see if both mobile and desktop versions are in the HTML
2. **Test on actual device**: Sometimes browser emulation doesn't work correctly
3. **Check for JavaScript errors**: The console might show errors preventing the components from rendering
4. **Verify build output**: Run `npm run build` and check for any build errors

## Alternative Solution

If ResponsiveTable isn't working, use the simpler wrapper approach:
```tsx
import { ResponsiveTableWrapper } from "@/components/ui/responsive-table-wrapper"

<ResponsiveTableWrapper>
  <Table>
    {/* Your existing table */}
  </Table>
</ResponsiveTableWrapper>
```

This adds horizontal scrolling on mobile without changing the table structure.