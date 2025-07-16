"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTableWrapperProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveTableWrapper({ children, className }: ResponsiveTableWrapperProps) {
  return (
    <div className={cn(
      "w-full",
      // On mobile, add horizontal scroll with proper padding
      "overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0",
      // Add visual indicator for scrollable content
      "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
      "dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800",
      className
    )}>
      {/* Add a shadow gradient to indicate scrollable content on mobile */}
      <div className="relative min-w-full">
        {children}
        {/* Right shadow indicator */}
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
        {/* Left shadow indicator */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none sm:hidden" />
      </div>
    </div>
  )
}