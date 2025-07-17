import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Power, BarChart as BarChartIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ConsumiMetricsProps {
  metrics: {
    todayConsumption: number
    todayTrend: number
    sharedEnergy: number
    sharedPercentage: number
    dailyPeak: number
    peakTime: string
    monthlyForecast: number
    monthlyForecastCost: number
  }
}

export function ConsumiMetrics({ metrics }: ConsumiMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Consumo Oggi</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.todayConsumption} kWh</div>
          <div className="flex items-center text-xs text-muted-foreground">
            {metrics.todayTrend < 0 ? (
              <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 text-red-600 mr-1" />
            )}
            {Math.abs(metrics.todayTrend)}% rispetto a ieri
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
          <Power className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.sharedEnergy} kWh</div>
          <Progress value={metrics.sharedPercentage} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{metrics.sharedPercentage}% del consumo totale</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Picco Giornaliero</CardTitle>
          <BarChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.dailyPeak} kWh</div>
          <p className="text-xs text-muted-foreground">alle {metrics.peakTime}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Previsione Mensile</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.monthlyForecast} kWh</div>
          <p className="text-xs text-muted-foreground">€{metrics.monthlyForecastCost} stimati</p>
        </CardContent>
      </Card>
    </div>
  )
}