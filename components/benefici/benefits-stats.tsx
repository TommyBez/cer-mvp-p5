import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Euro, TrendingUp, Wallet, Award, Calendar, Target } from "lucide-react"

interface BenefitsStatsProps {
  stats: {
    totalIncentives: number
    totalSavings: number
    totalRevenue: number
    totalBenefits: number
    monthlyAverage: number
    yearlyProjection: number
  }
}

export function BenefitsStats({ stats }: BenefitsStatsProps) {
  const statCards = [
    {
      title: "Incentivi Totali",
      value: `€ ${stats.totalIncentives.toFixed(2)}`,
      description: "Ultimi 6 mesi",
      icon: Award,
      color: "text-blue-600",
      trend: "+12.5%",
    },
    {
      title: "Risparmi Totali",
      value: `€ ${stats.totalSavings.toFixed(2)}`,
      description: "Da autoconsumo",
      icon: Wallet,
      color: "text-green-600",
      trend: "+8.3%",
    },
    {
      title: "Ricavi Vendita",
      value: `€ ${stats.totalRevenue.toFixed(2)}`,
      description: "Energia immessa",
      icon: Euro,
      color: "text-purple-600",
      trend: "+15.2%",
    },
    {
      title: "Benefici Totali",
      value: `€ ${stats.totalBenefits.toFixed(2)}`,
      description: "Somma totale",
      icon: TrendingUp,
      color: "text-emerald-600",
      trend: "+11.7%",
    },
    {
      title: "Media Mensile",
      value: `€ ${stats.monthlyAverage.toFixed(2)}`,
      description: "Ultimi 6 mesi",
      icon: Calendar,
      color: "text-orange-600",
      trend: "+5.8%",
    },
    {
      title: "Proiezione Annuale",
      value: `€ ${stats.yearlyProjection.toFixed(2)}`,
      description: "Stima 12 mesi",
      icon: Target,
      color: "text-indigo-600",
      trend: "+10.2%",
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
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <span className="text-xs text-green-600 font-medium">
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}