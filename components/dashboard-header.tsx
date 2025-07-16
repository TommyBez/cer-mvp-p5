"use client"

import { usePathname } from "next/navigation"
import { AppHeader } from "@/components/app-header"

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/members": "Gestione Membri",
  "/documents": "Gestione Documenti",
  "/simulation": "Simulazione Economica",
  "/gse-reports": "Report GSE",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const title = ROUTE_TITLES[pathname] || ""

  return <AppHeader title={title} />
}