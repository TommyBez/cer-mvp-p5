import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PiggyBank, Euro, Receipt, DollarSign, TrendingUp } from "lucide-react"

interface BeneficiMetricsProps {
  metrics: {
    totalSavings2024: number
    monthlyIncentive: number
    monthlyIncentiveTrend: number
    billSavings: number
    nextPayment: number
    nextPaymentDate: string
  }
}

export function BeneficiMetrics({ metrics }: BeneficiMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risparmio Totale 2024</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{metrics.totalSavings2024}</div>
          <p className="text-xs text-muted-foreground">Da inizio anno</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Incentivo Mensile</CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{metrics.monthlyIncentive}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
            +{metrics.monthlyIncentiveTrend}% vs mese scorso
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risparmio in Bolletta</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{metrics.billSavings}</div>
          <p className="text-xs text-muted-foreground">Questo mese</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prossimo Pagamento</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{metrics.nextPayment}</div>
          <p className="text-xs text-muted-foreground">Previsto il {metrics.nextPaymentDate}</p>
        </CardContent>
      </Card>
    </div>
  )
}