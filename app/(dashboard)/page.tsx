import { Suspense } from "react"
import { fetchDashboardData } from "@/lib/data"
import { DashboardServer } from "@/components/server/dashboard-server"
import { DashboardSkeleton } from "@/components/ui/loading-skeletons"

async function DashboardContent() {
  const dashboardData = await fetchDashboardData()
  return <DashboardServer dashboardData={dashboardData} />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}