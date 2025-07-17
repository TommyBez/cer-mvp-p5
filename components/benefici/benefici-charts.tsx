"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BeneficiChartsProps {
  monthlyBenefits: any[]
  yearlyComparison: any[]
}

export function BeneficiCharts({ monthlyBenefits, yearlyComparison }: BeneficiChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Andamento Benefici Mensili</CardTitle>
          <CardDescription>Risparmio e incentivi degli ultimi 6 mesi</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyBenefits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} unit="€" />
              <Tooltip />
              <Legend />
              <Bar dataKey="risparmio" fill="#16a34a" name="Risparmio Bolletta" />
              <Bar dataKey="incentivi" fill="#2563eb" name="Incentivi GSE" />
              <Line type="monotone" dataKey="totale" stroke="#ea580c" name="Totale" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confronto Annuale</CardTitle>
          <CardDescription>Costi energetici con e senza CER</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yearlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} unit="€" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="senzaCER" stroke="#ea580c" fill="#ea580c" fillOpacity={0.3} name="Senza CER" />
              <Area type="monotone" dataKey="conCER" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} name="Con CER" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}