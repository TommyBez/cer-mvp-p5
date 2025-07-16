import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/data-service"

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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication server-side
  const user = await getCurrentUser()
  
  if (!user || user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </>
  )
}