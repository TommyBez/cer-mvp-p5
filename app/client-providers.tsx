"use client"

import { SidebarProvider } from '@/components/ui/sidebar'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}