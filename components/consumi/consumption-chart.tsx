"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

interface ConsumptionChartProps {
  monthlyData: Array<{
    month: string
    consumo: number
    produzione: number
    autoconsumo: number
  }>
  hourlyPattern: {
    labels: string[]
    consumption: number[]
    production: number[]
  }
}

export function ConsumptionChart({ monthlyData, hourlyPattern }: ConsumptionChartProps) {
  // Transform hourly data for Recharts
  const hourlyData = hourlyPattern.labels.map((label, index) => ({
    hour: label,
    consumo: hourlyPattern.consumption[index],
    produzione: hourlyPattern.production[index],
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Analisi Consumi</CardTitle>
        <CardDescription>
          Visualizza i tuoi consumi e la produzione nel tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mensile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mensile">Mensile</TabsTrigger>
            <TabsTrigger value="giornaliero">Profilo Giornaliero</TabsTrigger>
          </TabsList>
          <TabsContent value="mensile" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumo" fill="#3b82f6" name="Consumo" />
                <Bar dataKey="produzione" fill="#10b981" name="Produzione" />
                <Bar dataKey="autoconsumo" fill="#8b5cf6" name="Autoconsumo" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="giornaliero" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="produzione"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Produzione"
                />
                <Area
                  type="monotone"
                  dataKey="consumo"
                  stackId="2"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Consumo"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}