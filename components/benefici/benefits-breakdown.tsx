"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
  Wallet, 
  Euro, 
  Building2, 
  MapPin, 
  Zap,
  TrendingUp,
  ShieldCheck,
  Banknote
} from "lucide-react"

interface BenefitsBreakdownProps {
  breakdown: {
    incentives: {
      gse: number
      regional: number
      municipal: number
    }
    savings: {
      selfConsumption: number
      peakShaving: number
      efficiency: number
    }
    revenue: {
      gridSales: number
      certificates: number
    }
  }
}

export function BenefitsBreakdown({ breakdown }: BenefitsBreakdownProps) {
  const totalIncentives = breakdown.incentives.gse + breakdown.incentives.regional + breakdown.incentives.municipal
  const totalSavings = breakdown.savings.selfConsumption + breakdown.savings.peakShaving + breakdown.savings.efficiency
  const totalRevenue = breakdown.revenue.gridSales + breakdown.revenue.certificates
  const grandTotal = totalIncentives + totalSavings + totalRevenue

  const sections = [
    {
      title: "Incentivi",
      total: totalIncentives,
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      items: [
        { 
          label: "Incentivo GSE", 
          value: breakdown.incentives.gse, 
          icon: Building2,
          percentage: (breakdown.incentives.gse / totalIncentives) * 100
        },
        { 
          label: "Incentivo Regionale", 
          value: breakdown.incentives.regional, 
          icon: MapPin,
          percentage: (breakdown.incentives.regional / totalIncentives) * 100
        },
        { 
          label: "Incentivo Comunale", 
          value: breakdown.incentives.municipal, 
          icon: Building2,
          percentage: (breakdown.incentives.municipal / totalIncentives) * 100
        },
      ],
    },
    {
      title: "Risparmi",
      total: totalSavings,
      icon: Wallet,
      color: "text-green-600",
      bgColor: "bg-green-100",
      items: [
        { 
          label: "Autoconsumo", 
          value: breakdown.savings.selfConsumption, 
          icon: Zap,
          percentage: (breakdown.savings.selfConsumption / totalSavings) * 100
        },
        { 
          label: "Peak Shaving", 
          value: breakdown.savings.peakShaving, 
          icon: TrendingUp,
          percentage: (breakdown.savings.peakShaving / totalSavings) * 100
        },
        { 
          label: "Efficienza", 
          value: breakdown.savings.efficiency, 
          icon: ShieldCheck,
          percentage: (breakdown.savings.efficiency / totalSavings) * 100
        },
      ],
    },
    {
      title: "Ricavi",
      total: totalRevenue,
      icon: Euro,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      items: [
        { 
          label: "Vendita in Rete", 
          value: breakdown.revenue.gridSales, 
          icon: Banknote,
          percentage: (breakdown.revenue.gridSales / totalRevenue) * 100
        },
        { 
          label: "Certificati Verdi", 
          value: breakdown.revenue.certificates, 
          icon: Award,
          percentage: (breakdown.revenue.certificates / totalRevenue) * 100
        },
      ],
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Composizione Benefici</CardTitle>
        <CardDescription>
          Dettaglio delle fonti di guadagno e risparmio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${section.bgColor}`}>
                  <section.icon className={`h-4 w-4 ${section.color}`} />
                </div>
                <span className="font-medium">{section.title}</span>
              </div>
              <span className="text-lg font-bold">€ {section.total.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3 pl-10">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">€ {item.value.toFixed(2)}</span>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Totale Complessivo</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                € {grandTotal.toFixed(2)}
              </div>
              <Badge variant="secondary" className="mt-1">
                {((grandTotal / 6) / 30).toFixed(2)} €/giorno
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}