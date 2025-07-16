import { fetchDashboardData } from "@/lib/data"
import { DashboardClient } from "@/components/client/dashboard-client"

export default async function DashboardPage() {
  const dashboardData = await fetchDashboardData()
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard CER</h2>
        <p className="text-muted-foreground">
          Panoramica dell'attività della tua Comunità Energetica Rinnovabile.
        </p>
      </div>
      
      <DashboardClient dashboardData={dashboardData} />
    </div>
  )
}