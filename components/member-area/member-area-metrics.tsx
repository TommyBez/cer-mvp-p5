import { Zap, Share2, TrendingUp, Leaf } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Metrics {
  totalProduced: number
  totalConsumed: number
  totalShared: number
  earnings: number
  savedCO2: number
  efficiency: number
}

interface MemberAreaMetricsProps {
  metrics: Metrics
}

export function MemberAreaMetrics({ metrics }: MemberAreaMetricsProps) {
  const cards = [
    {
      title: "Energia Prodotta",
      value: `${metrics.totalProduced} kWh`,
      icon: <Zap className="h-4 w-4 text-muted-foreground" />,
      description: "Questo mese"
    },
    {
      title: "Energia Consumata",
      value: `${metrics.totalConsumed} kWh`,
      icon: <Zap className="h-4 w-4 text-muted-foreground" />,
      description: "Questo mese"
    },
    {
      title: "Energia Condivisa",
      value: `${metrics.totalShared} kWh`,
      icon: <Share2 className="h-4 w-4 text-muted-foreground" />,
      description: "Con la comunità"
    },
    {
      title: "Guadagni",
      value: `€ ${metrics.earnings.toFixed(2)}`,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      description: "Incentivi questo mese"
    },
    {
      title: "CO₂ Risparmiata",
      value: `${metrics.savedCO2} kg`,
      icon: <Leaf className="h-4 w-4 text-muted-foreground" />,
      description: "Impatto ambientale"
    },
    {
      title: "Efficienza",
      value: `${metrics.efficiency}%`,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      description: "Autoconsumo"
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}