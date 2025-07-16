"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { LucideIcon } from "lucide-react"

interface SidebarNavItemProps {
  item: {
    title: string
    icon: LucideIcon
    href: string
  }
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link href={item.href}>
        <item.icon />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  )
}