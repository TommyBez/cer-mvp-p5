"use client"

import {
  BarChart,
  Bar,
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
  revenue: number
  costs: number
  profit: number
}

interface SimulationChartProps {
  data: ChartData[]
}

export function SimulationChart({ data }: SimulationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proiezione Mensile</CardTitle>
        <CardDescription>
          Ricavi, costi e profitti previsti per i prossimi 6 mesi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `€ ${value.toLocaleString('it-IT')}`} />
            <Legend />
            <Bar dataKey="revenue" fill="#10b981" name="Ricavi" />
            <Bar dataKey="costs" fill="#ef4444" name="Costi" />
            <Bar dataKey="profit" fill="#3b82f6" name="Profitti" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}