"use client"

import { usePathname } from "next/navigation"
import { SidebarNavigation } from "@/components/sidebar-navigation"

export function SidebarNavigationClient() {
  const pathname = usePathname()
  return <SidebarNavigation currentPath={pathname} />
}