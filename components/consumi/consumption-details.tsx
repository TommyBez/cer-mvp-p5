"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Zap, Sun, Grid, Battery } from "lucide-react"

interface ConsumptionDetailsProps {
  hourlyPattern: {
    labels: string[]
    consumption: number[]
    production: number[]
  }
}

export function ConsumptionDetails({ hourlyPattern }: ConsumptionDetailsProps) {
  // Calculate some metrics from hourly data
  const totalProduction = hourlyPattern.production.reduce((a, b) => a + b, 0)
  const totalConsumption = hourlyPattern.consumption.reduce((a, b) => a + b, 0)
  const selfConsumption = Math.min(totalProduction, totalConsumption)
  const gridImport = Math.max(0, totalConsumption - totalProduction)
  const gridExport = Math.max(0, totalProduction - totalConsumption)

  const energyFlows = [
    {
      label: "Produzione Solare",
      value: totalProduction.toFixed(1),
      unit: "kWh",
      icon: Sun,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      progress: 100,
    },
    {
      label: "Autoconsumo",
      value: selfConsumption.toFixed(1),
      unit: "kWh",
      icon: Battery,
      color: "text-green-600",
      bgColor: "bg-green-100",
      progress: (selfConsumption / totalProduction) * 100 || 0,
    },
    {
      label: "Prelievo dalla Rete",
      value: gridImport.toFixed(1),
      unit: "kWh",
      icon: Grid,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      progress: (gridImport / totalConsumption) * 100 || 0,
    },
    {
      label: "Immissione in Rete",
      value: gridExport.toFixed(1),
      unit: "kWh",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      progress: (gridExport / totalProduction) * 100 || 0,
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Flussi Energetici</CardTitle>
        <CardDescription>
          Dettaglio dei flussi energetici giornalieri
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {energyFlows.map((flow, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${flow.bgColor}`}>
                  <flow.icon className={`h-4 w-4 ${flow.color}`} />
                </div>
                <span className="text-sm font-medium">{flow.label}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{flow.value}</span>
                <span className="text-sm text-muted-foreground ml-1">{flow.unit}</span>
              </div>
            </div>
            <Progress value={flow.progress} className="h-2" />
          </div>
        ))}

        <div className="border-t pt-4 mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Efficienza Autoconsumo</span>
            <Badge variant="default" className="bg-green-600">
              {((selfConsumption / totalProduction) * 100 || 0).toFixed(1)}%
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risparmio Stimato</span>
            <div className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">
                € {(selfConsumption * 0.22).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}