import { MemberSidebar } from "@/components/member-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MemberAreaAuthCheck } from "@/components/member-area/member-area-auth-check"

export default function MemberAreaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MemberAreaAuthCheck />
      <SidebarProvider>
        <MemberSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}