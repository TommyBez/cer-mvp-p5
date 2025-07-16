"use client"

import { usePathname } from "next/navigation"

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

export function PageTitle() {
  const pathname = usePathname()
  const title = getPageTitle(pathname)
  
  return title ? <h1 className="text-lg font-semibold md:text-2xl">{title}</h1> : null
}