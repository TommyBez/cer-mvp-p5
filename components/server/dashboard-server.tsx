import { DashboardClient } from "@/components/client/dashboard-client"

type DashboardData = {
  totalProduced: number
  totalConsumed: number
  totalShared: number
  instantPower: number
  deviceCount: number
  onlineDevices: number
  chartData: Array<{
    name: string
    produzione: number
    consumo: number
  }>
  recentTransactions: Array<{
    id: number
    member: string
    action: string
    amount: string
    date: string
    type: string
  }>
}

interface DashboardServerProps {
  dashboardData: DashboardData
}

export function DashboardServer({ dashboardData }: DashboardServerProps) {
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