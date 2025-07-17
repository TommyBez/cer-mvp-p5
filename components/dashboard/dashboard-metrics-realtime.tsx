"use client"

import { useState, useEffect } from "react"
import { Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardMetricsRealtimeProps {
  initialPower: number
}

export function DashboardMetricsRealtime({ initialPower }: DashboardMetricsRealtimeProps) {
  const [instantPower, setInstantPower] = useState(initialPower)

  useEffect(() => {
    const interval = setInterval(() => {
      setInstantPower(prev => Math.max(0, prev + (Math.random() - 0.5) * 0.5))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Potenza Istantanea
        </CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{instantPower.toFixed(1)} kW</div>
        <p className="text-xs text-muted-foreground">
          In tempo reale
        </p>
      </CardContent>
    </Card>
  )
}