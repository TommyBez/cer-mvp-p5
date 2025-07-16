"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calculator,
  FileText,
  Home,
  LineChart,
  Package2,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Menu items with their routes and icons
const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Membri",
    icon: Users,
    href: "/members",
  },
  {
    title: "Documenti",
    icon: FileText,
    href: "/documents",
  },
  {
    title: "Simulazione",
    icon: Calculator,
    href: "/simulation",
  },
  {
    title: "Report GSE",
    icon: LineChart,
    href: "/gse-reports",
  },
]

export function SidebarClient() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Package2 className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">CER Manager</span>
          <span className="truncate text-xs">Community Energy</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-1">
          <Card className="shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm">Aggiorna Piano</CardTitle>
              <CardDescription className="text-xs">
                Passa a Pro per funzionalità avanzate.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button size="sm" className="w-full">
                Aggiorna
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}