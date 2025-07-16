import { getChartData } from "@/lib/data-service"
import { DashboardChart } from "./dashboard-chart"

export async function DashboardChartWrapper() {
  const data = await getChartData()
  return <DashboardChart data={data} />
}