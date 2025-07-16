"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Responsive Dialog Root
export const ResponsiveDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? Sheet : Dialog
  
  return <Component {...props}>{children}</Component>
})
ResponsiveDialog.displayName = "ResponsiveDialog"

// Responsive Dialog Trigger
export const ResponsiveDialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogTrigger>,
  React.ComponentPropsWithoutRef<typeof DialogTrigger>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetTrigger : DialogTrigger
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveDialogTrigger.displayName = "ResponsiveDialogTrigger"

// Responsive Dialog Content
export const ResponsiveDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ children, className, ...props }, ref) => {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <SheetContent 
        ref={ref} 
        side="bottom" 
        className={className}
        {...props}
      >
        {/* Add drag handle for mobile bottom sheet */}
        <div className="mx-auto w-[100px] h-[5px] bg-muted rounded-full mb-4" />
        {children}
      </SheetContent>
    )
  }
  
  return (
    <DialogContent ref={ref} className={className} {...props}>
      {children}
    </DialogContent>
  )
})
ResponsiveDialogContent.displayName = "ResponsiveDialogContent"

// Responsive Dialog Header
export const ResponsiveDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetHeader : DialogHeader
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveDialogHeader.displayName = "ResponsiveDialogHeader"

// Responsive Dialog Footer
export const ResponsiveDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetFooter : DialogFooter
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveDialogFooter.displayName = "ResponsiveDialogFooter"

// Responsive Dialog Title
export const ResponsiveDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetTitle : DialogTitle
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveDialogTitle.displayName = "ResponsiveDialogTitle"

// Responsive Dialog Description
export const ResponsiveDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescription>,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetDescription : DialogDescription
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveDialogDescription.displayName = "ResponsiveDialogDescription"

// Export all components
export {
  ResponsiveDialog as Dialog,
  ResponsiveDialogTrigger as DialogTrigger,
  ResponsiveDialogContent as DialogContent,
  ResponsiveDialogHeader as DialogHeader,
  ResponsiveDialogFooter as DialogFooter,
  ResponsiveDialogTitle as DialogTitle,
  ResponsiveDialogDescription as DialogDescription,
  // Keep the original names as well for flexibility
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
}