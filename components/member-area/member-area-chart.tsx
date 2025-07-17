"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartData {
  month: string
  produzione: number
  consumo: number
  condivisione: number
}

interface MemberAreaChartProps {
  data: ChartData[]
}

export function MemberAreaChart({ data }: MemberAreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Andamento Energetico</CardTitle>
        <CardDescription>
          Produzione, consumo e condivisione degli ultimi 6 mesi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="produzione"
              stroke="#10b981"
              strokeWidth={2}
              name="Produzione"
            />
            <Line
              type="monotone"
              dataKey="consumo"
              stroke="#ef4444"
              strokeWidth={2}
              name="Consumo"
            />
            <Line
              type="monotone"
              dataKey="condivisione"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Condivisione"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}