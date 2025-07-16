import { Suspense, type ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        {/* Header resolves on the client while the rest of the page streams */}
        <Suspense fallback={<Skeleton className="h-14 w-full" />}>
          <DashboardHeader />
        </Suspense>

        {/* AuthGuard runs on the client and handles redirects */}
        <AuthGuard>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </AuthGuard>
      </SidebarInset>
    </>
  )
}