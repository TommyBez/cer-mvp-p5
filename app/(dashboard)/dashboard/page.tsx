import { Suspense } from "react"
import { DashboardContent } from "@/components/dashboard-content"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

// Simulate async data fetching
async function getDashboardData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    realTimeData: {
      totalProduced: 15420,
      totalConsumed: 12350,
      totalShared: 3070,
      instantPower: 4.5,
      deviceCount: 45,
      onlineDevices: 38,
    },
    chartData: [
      { name: "Lun", produzione: 400, consumo: 240 },
      { name: "Mar", produzione: 300, consumo: 139 },
      { name: "Mer", produzione: 200, consumo: 980 },
      { name: "Gio", produzione: 278, consumo: 390 },
      { name: "Ven", produzione: 189, consumo: 480 },
      { name: "Sab", produzione: 239, consumo: 380 },
      { name: "Dom", produzione: 349, consumo: 430 },
    ],
    activities: [
      {
        id: 1,
        type: "production",
        description: "Nuovo picco di produzione",
        value: "5.2 kW",
        timestamp: "10 minuti fa",
      },
      {
        id: 2,
        type: "sharing",
        description: "Energia condivisa con Maria Bianchi",
        value: "2.3 kWh",
        timestamp: "25 minuti fa",
      },
      {
        id: 3,
        type: "device",
        description: "Nuovo dispositivo connesso",
        value: "Inverter #23",
        timestamp: "1 ora fa",
      },
    ],
  }
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData()
  
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent initialData={dashboardData} />
    </Suspense>
  )
}