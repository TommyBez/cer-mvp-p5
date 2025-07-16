# Responsive Dialog Implementation

## Overview

This implementation automatically converts dialog modals to bottom sheets on mobile devices, providing a better user experience for touch interfaces.

## Components Created

### 1. `components/ui/responsive-dialog.tsx`
A wrapper component that automatically switches between Dialog (desktop) and Sheet (mobile) based on screen size.

**Features:**
- Detects mobile devices using the `useIsMobile` hook (breakpoint: 768px)
- Provides drop-in replacements for all Dialog components
- On mobile: Shows as a bottom sheet sliding up from the bottom
- On desktop: Shows as a centered modal dialog
- Includes a drag handle for mobile bottom sheets

### 2. `components/ui/responsive-alert-dialog.tsx`
Similar wrapper for AlertDialog components with responsive behavior.

## Modified Components

### Updated Sheet Component (`components/ui/sheet.tsx`)
- Added rounded corners to bottom sheets: `rounded-t-[10px]`
- Set maximum height for bottom sheets: `max-h-[90vh]`
- Added overflow handling: `overflow-y-auto` for bottom sheets

## Migration Guide

### Basic Usage
Simply replace your dialog imports:

```tsx
// Before
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// After
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/responsive-dialog"
```

### Updated Components
The following components have been updated to use responsive dialogs:
- `components/documents-management.tsx`
- `components/device-management.tsx`
- `components/gse-reports-management.tsx`
- `components/members-management.tsx`
- `components/ui/command.tsx` (CommandDialog)

## Technical Details

### Mobile Detection
Uses the `useIsMobile` hook from `hooks/use-mobile.tsx`:
- Breakpoint: 768px
- Listens to window resize events
- Returns boolean indicating mobile state

### Styling
- **Desktop Dialog**: Centered modal with backdrop
- **Mobile Bottom Sheet**: 
  - Slides up from bottom
  - Rounded top corners (10px)
  - Maximum height of 90vh
  - Includes drag handle indicator
  - Overflow scrolling enabled

## Benefits

1. **Better Mobile UX**: Bottom sheets are more natural for mobile interactions
2. **Consistent API**: Same component interface works for both desktop and mobile
3. **Automatic**: No need to manually handle responsive behavior
4. **Accessible**: Maintains all accessibility features from the original components
5. **Performance**: Only loads necessary components based on device type

## Future Enhancements

Potential improvements:
- Swipe-to-dismiss gesture for mobile bottom sheets
- Customizable breakpoint
- Animation customization options
- Support for nested dialogs/sheets