# Mobile Sidebar Implementation Guide

This guide explains how to add mobile sidebar support to the remaining components.

## Components that need updating:
- `components/economic-simulation.tsx`
- `components/gse-reports-management.tsx`
- `components/dashboard.tsx`
- `components/member-dashboard.tsx`
- `app/devices/page.tsx`

## Required Changes

### 1. Add Imports
Add these imports at the top of each component:

```typescript
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
```

### 2. Add Mobile Menu State
Add this state variable in your component:

```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
```

### 3. Create NavigationContent Component
Add this component before the return statement:

```typescript
// Navigation content component that can be reused in both desktop and mobile
const NavigationContent = ({ isMobile = false }: { isMobile?: boolean }) => (
  <>
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {/* Copy your navigation links here */}
      {/* Make sure to:
         - Add onClick={() => isMobile && setMobileMenuOpen(false)} to each link
         - Change {!sidebarCollapsed && "Label"} to {(isMobile || !sidebarCollapsed) && "Label"}
         - Update className to use !isMobile && sidebarCollapsed
      */}
    </nav>
    {(isMobile || !sidebarCollapsed) && (
      <div className="mt-auto p-4">
        {/* Support card content */}
      </div>
    )}
  </>
)
```

### 4. Replace Desktop Navigation
In the desktop sidebar, replace the entire navigation section with:

```typescript
<NavigationContent isMobile={false} />
```

### 5. Add Mobile Menu to Header
In the header section, add this as the first child:

```typescript
{/* Mobile menu */}
<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
  <SheetTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="shrink-0 md:hidden"
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="flex flex-col p-0">
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Package2 className="h-6 w-6 text-green-600" />
        <span>CER Manager</span>
      </Link>
    </div>
    <div className="flex-1 overflow-y-auto">
      <NavigationContent isMobile={true} />
    </div>
  </SheetContent>
</Sheet>
```

## Example Implementation
See `components/members-management.tsx` and `components/documents-management.tsx` for complete working examples.

## Alternative: Use the Reusable Layout
Instead of updating each component individually, you can use the `NavigationLayout` component created in `components/layout/navigation-layout.tsx`. This provides a consistent layout with mobile support across all pages.