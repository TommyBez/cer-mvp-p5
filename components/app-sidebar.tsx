"use client"

import * as React from "react"
import Link from "next/link"
import {
  Package2,
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
import { SidebarNavigationClient } from "@/components/sidebar-navigation-client"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CER Manager</span>
                  <span className="truncate text-xs">Comunità Energetiche</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarNavigationClient />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Card className="shadow-none">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm">Supporto</CardTitle>
            <CardDescription className="text-xs">
              Hai bisogno di aiuto? Contatta il nostro team di supporto.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <Button size="sm" className="w-full">
              Contattaci
            </Button>
          </CardContent>
        </Card>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}