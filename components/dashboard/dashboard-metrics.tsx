import { DashboardMetricsRealtime } from "./dashboard-metrics-realtime"
import { DashboardMetricCard } from "./dashboard-metric-card"
import { Zap, Power, Share2, Activity, Battery, Wifi } from "lucide-react"

interface MetricsData {
  totalProduced: number
  totalConsumed: number
  totalShared: number
  instantPower: number
  deviceCount: number
  onlineDevices: number
}

interface DashboardMetricsProps {
  data: MetricsData
}

export function DashboardMetrics({ data }: DashboardMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardMetricCard
        title="Energia Prodotta"
        value={`${data.totalProduced.toFixed(0)} kWh`}
        change="+20.1% dal mese scorso"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardMetricCard
        title="Energia Consumata"
        value={`${data.totalConsumed.toFixed(0)} kWh`}
        change="+15.3% dal mese scorso"
        icon={<Power className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardMetricCard
        title="Energia Condivisa"
        value={`${data.totalShared.toFixed(0)} kWh`}
        change="+25.7% dal mese scorso"
        icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardMetricsRealtime initialPower={data.instantPower} />
      <DashboardMetricCard
        title="Dispositivi Totali"
        value={data.deviceCount.toString()}
        change="+3 questa settimana"
        icon={<Battery className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardMetricCard
        title="Dispositivi Online"
        value={`${data.onlineDevices}/${data.deviceCount}`}
        change={`${((data.onlineDevices / data.deviceCount) * 100).toFixed(0)}% online`}
        icon={<Wifi className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}