import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SimulationSummaryProps {
  annual: {
    totalRevenue: number
    totalCosts: number
    totalProfit: number
    roi: number
    paybackPeriod: number
  }
}

export function SimulationSummary({ annual }: SimulationSummaryProps) {
  const summaryItems = [
    {
      label: "Ricavi Totali Annuali",
      value: `€ ${annual.totalRevenue.toLocaleString('it-IT')}`
    },
    {
      label: "Costi Totali Annuali",
      value: `€ ${annual.totalCosts.toLocaleString('it-IT')}`
    },
    {
      label: "Profitto Netto Annuale",
      value: `€ ${annual.totalProfit.toLocaleString('it-IT')}`,
      highlight: true
    },
    {
      label: "ROI (Return on Investment)",
      value: `${annual.roi.toFixed(1)}%`
    },
    {
      label: "Periodo di Ammortamento",
      value: `${annual.paybackPeriod.toFixed(1)} anni`
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riepilogo Annuale</CardTitle>
        <CardDescription>
          Proiezione economica su base annuale
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className={`text-sm font-medium ${item.highlight ? 'text-primary' : ''}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}