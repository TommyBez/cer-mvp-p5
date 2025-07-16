import { fetchDashboardData } from "@/lib/data"
import { DashboardServer } from "@/components/server/dashboard-server"

export default async function DashboardPage() {
  const dashboardData = await fetchDashboardData()
  return <DashboardServer dashboardData={dashboardData} />
}