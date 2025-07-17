import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, Zap, TrendingUp, Euro, Activity, Gauge } from "lucide-react"

interface ConsumptionStatsProps {
  stats: {
    totalConsumed: number
    totalProduced: number
    selfConsumptionRate: number
    totalSavings: number
    avgDailyConsumption: number
    peakConsumption: number
  }
}

export function ConsumptionStats({ stats }: ConsumptionStatsProps) {
  const statCards = [
    {
      title: "Energia Consumata",
      value: `${stats.totalConsumed} kWh`,
      description: "Ultimo mese",
      icon: Zap,
      color: "text-blue-600",
    },
    {
      title: "Energia Prodotta",
      value: `${stats.totalProduced} kWh`,
      description: "Ultimo mese",
      icon: Battery,
      color: "text-green-600",
    },
    {
      title: "Autoconsumo",
      value: `${stats.selfConsumptionRate}%`,
      description: "Media mensile",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Risparmio Totale",
      value: `€ ${stats.totalSavings.toFixed(2)}`,
      description: "Ultimo mese",
      icon: Euro,
      color: "text-emerald-600",
    },
    {
      title: "Consumo Medio",
      value: `${stats.avgDailyConsumption} kWh`,
      description: "Media giornaliera",
      icon: Activity,
      color: "text-orange-600",
    },
    {
      title: "Picco Consumo",
      value: `${stats.peakConsumption} kW`,
      description: "Potenza massima",
      icon: Gauge,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}