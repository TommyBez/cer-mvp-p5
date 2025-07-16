import { Power, Share2, Zap, Wifi, Battery, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
  const metrics = [
    {
      title: "Energia Prodotta",
      value: `${data.totalProduced.toFixed(0)} kWh`,
      change: "+20.1% dal mese scorso",
      icon: <Zap className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Energia Consumata",
      value: `${data.totalConsumed.toFixed(0)} kWh`,
      change: "+15.3% dal mese scorso",
      icon: <Power className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Energia Condivisa",
      value: `${data.totalShared.toFixed(0)} kWh`,
      change: "+25.7% dal mese scorso",
      icon: <Share2 className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Potenza Istantanea",
      value: `${data.instantPower.toFixed(1)} kW`,
      change: "In tempo reale",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Dispositivi Totali",
      value: data.deviceCount.toString(),
      change: "+3 questa settimana",
      icon: <Battery className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Dispositivi Online",
      value: `${data.onlineDevices}/${data.deviceCount}`,
      change: `${((data.onlineDevices / data.deviceCount) * 100).toFixed(0)}% online`,
      icon: <Wifi className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}