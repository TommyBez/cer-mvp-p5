import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sun, Moon } from "lucide-react"

interface ConsumiTimeAnalysisProps {
  timeAnalysis: {
    dayTime: {
      averageConsumption: number
      percentage: number
    }
    nightTime: {
      averageConsumption: number
      percentage: number
    }
  }
}

export function ConsumiTimeAnalysis({ timeAnalysis }: ConsumiTimeAnalysisProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-600" />
            Fascia Diurna
          </CardTitle>
          <CardDescription>Consumo nelle ore di sole (8:00 - 19:00)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Consumo medio</span>
                <span className="font-medium">{timeAnalysis.dayTime.averageConsumption} kWh/ora</span>
              </div>
              <Progress value={timeAnalysis.dayTime.percentage} className="h-2" />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>✓ {timeAnalysis.dayTime.percentage}% del tuo consumo avviene in fascia diurna</p>
              <p>✓ Massimizza l'uso quando c'è produzione solare</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-blue-600" />
            Fascia Notturna
          </CardTitle>
          <CardDescription>Consumo nelle ore serali (19:00 - 8:00)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Consumo medio</span>
                <span className="font-medium">{timeAnalysis.nightTime.averageConsumption} kWh/ora</span>
              </div>
              <Progress value={timeAnalysis.nightTime.percentage} className="h-2" />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>💡 Riduci i consumi serali del 10%</p>
              <p>💡 Sposta carichi flessibili in fascia diurna</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}