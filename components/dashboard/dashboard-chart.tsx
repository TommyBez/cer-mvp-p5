"use client"

import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartData {
  name: string
  produzione: number
  consumo: number
}

interface DashboardChartProps {
  data: ChartData[]
}

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Andamento Settimanale</CardTitle>
        <CardDescription>
          Produzione ed consumo energetico degli ultimi 7 giorni
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <RechartsLine
              type="monotone"
              dataKey="produzione"
              stroke="#10b981"
              strokeWidth={2}
              name="Produzione (kWh)"
            />
            <RechartsLine
              type="monotone"
              dataKey="consumo"
              stroke="#ef4444"
              strokeWidth={2}
              name="Consumo (kWh)"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}