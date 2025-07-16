"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset } from "@/components/ui/sidebar"

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/members": "Gestione Membri",
    "/documents": "Gestione Documenti", 
    "/simulation": "Simulazione Economica",
    "/gse-reports": "Report GSE",
  }
  return routes[pathname] || ""
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (!user) {
        router.push("/login")
      }
    }
  }, [router])

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title={getPageTitle(pathname)} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </>
  )
}