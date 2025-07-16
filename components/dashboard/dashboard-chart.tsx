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
import type { ChartDataPoint } from "@/lib/data-service"

interface DashboardChartProps {
  data: ChartDataPoint[]
}

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Produzione vs Consumo</CardTitle>
        <CardDescription>
          Andamento settimanale della produzione e del consumo energetico
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
              stroke="#f59e0b"
              strokeWidth={2}
              name="Consumo (kWh)"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}