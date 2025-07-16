import { DashboardClient } from "@/components/dashboard-client"

// Server Component - can fetch data, access databases, etc.
export async function Dashboard() {
  // In a real application, you would fetch data here
  // const energyData = await fetchEnergyData()
  // const deviceStats = await fetchDeviceStats()
  
  // For now, we'll let the client component handle its own data
  return <DashboardClient />
}