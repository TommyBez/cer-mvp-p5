"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Responsive AlertDialog Root
export const ResponsiveAlertDialog = React.forwardRef<
  React.ElementRef<typeof AlertDialog>,
  React.ComponentPropsWithoutRef<typeof AlertDialog>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? Sheet : AlertDialog
  
  return <Component {...props}>{children}</Component>
})
ResponsiveAlertDialog.displayName = "ResponsiveAlertDialog"

// Responsive AlertDialog Trigger
export const ResponsiveAlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof AlertDialogTrigger>,
  React.ComponentPropsWithoutRef<typeof AlertDialogTrigger>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetTrigger : AlertDialogTrigger
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveAlertDialogTrigger.displayName = "ResponsiveAlertDialogTrigger"

// Responsive AlertDialog Content
export const ResponsiveAlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogContent>,
  React.ComponentPropsWithoutRef<typeof AlertDialogContent>
>(({ children, className, ...props }, ref) => {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <SheetContent 
        ref={ref} 
        side="bottom" 
        className={cn("px-4", className)}
        {...props}
      >
        {/* Add drag handle for mobile bottom sheet */}
        <div className="mx-auto w-[100px] h-[5px] bg-muted rounded-full mb-4" />
        {children}
      </SheetContent>
    )
  }
  
  return (
    <AlertDialogContent ref={ref} className={className} {...props}>
      {children}
    </AlertDialogContent>
  )
})
ResponsiveAlertDialogContent.displayName = "ResponsiveAlertDialogContent"

// Responsive AlertDialog Header
export const ResponsiveAlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetHeader : AlertDialogHeader
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveAlertDialogHeader.displayName = "ResponsiveAlertDialogHeader"

// Responsive AlertDialog Footer
export const ResponsiveAlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <SheetFooter ref={ref} className={cn("mt-4", className)} {...props}>
        {children}
      </SheetFooter>
    )
  }
  
  return (
    <AlertDialogFooter ref={ref} className={className} {...props}>
      {children}
    </AlertDialogFooter>
  )
})
ResponsiveAlertDialogFooter.displayName = "ResponsiveAlertDialogFooter"

// Responsive AlertDialog Title
export const ResponsiveAlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogTitle>,
  React.ComponentPropsWithoutRef<typeof AlertDialogTitle>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetTitle : AlertDialogTitle
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveAlertDialogTitle.displayName = "ResponsiveAlertDialogTitle"

// Responsive AlertDialog Description
export const ResponsiveAlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogDescription>,
  React.ComponentPropsWithoutRef<typeof AlertDialogDescription>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const Component = isMobile ? SheetDescription : AlertDialogDescription
  
  return <Component ref={ref} {...props}>{children}</Component>
})
ResponsiveAlertDialogDescription.displayName = "ResponsiveAlertDialogDescription"

// Export all components with both naming conventions
export {
  ResponsiveAlertDialog as AlertDialog,
  ResponsiveAlertDialogTrigger as AlertDialogTrigger,
  ResponsiveAlertDialogContent as AlertDialogContent,
  ResponsiveAlertDialogHeader as AlertDialogHeader,
  ResponsiveAlertDialogFooter as AlertDialogFooter,
  ResponsiveAlertDialogTitle as AlertDialogTitle,
  ResponsiveAlertDialogDescription as AlertDialogDescription,
  // Keep original AlertDialog exports
  AlertDialogAction,
  AlertDialogCancel,
  // Keep the original names as well
  ResponsiveAlertDialog,
  ResponsiveAlertDialogTrigger,
  ResponsiveAlertDialogContent,
  ResponsiveAlertDialogHeader,
  ResponsiveAlertDialogFooter,
  ResponsiveAlertDialogTitle,
  ResponsiveAlertDialogDescription,
}