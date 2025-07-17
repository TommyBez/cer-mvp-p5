import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, FileText, PiggyBank } from "lucide-react"

interface BeneficiBreakdownProps {
  incentiveBreakdown: any[]
  additionalBenefits: any[]
}

export function BeneficiBreakdown({ incentiveBreakdown, additionalBenefits }: BeneficiBreakdownProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "savings":
        return <TrendingDown className="h-4 w-4 text-green-600" />
      case "tax":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "stability":
        return <PiggyBank className="h-4 w-4 text-purple-600" />
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Composizione Incentivi</CardTitle>
          <CardDescription>Dettaglio delle componenti economiche</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {incentiveBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefici Aggiuntivi</CardTitle>
          <CardDescription>Altri vantaggi della partecipazione alla CER</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {additionalBenefits.map((benefit) => (
              <div key={benefit.id} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                    {getIcon(benefit.type)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}