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
  ComposedChart,
} from "recharts"

interface BenefitsChartProps {
  data: Array<{
    month: string
    incentivi: number
    risparmio: number
    vendita: number
    totale: number
  }>
}

export function BenefitsChart({ data }: BenefitsChartProps) {
  // Calculate cumulative data
  let cumulative = 0
  const cumulativeData = data.map(item => {
    cumulative += item.totale
    return {
      ...item,
      cumulativo: cumulative,
    }
  })

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Andamento Benefici</CardTitle>
        <CardDescription>
          Visualizza l'andamento dei tuoi benefici economici nel tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dettaglio" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dettaglio">Dettaglio Mensile</TabsTrigger>
            <TabsTrigger value="cumulativo">Andamento Cumulativo</TabsTrigger>
          </TabsList>
          <TabsContent value="dettaglio" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `€ ${value.toFixed(2)}`}
                  labelFormatter={(label) => `Mese: ${label}`}
                />
                <Legend />
                <Bar dataKey="incentivi" stackId="a" fill="#3b82f6" name="Incentivi" />
                <Bar dataKey="risparmio" stackId="a" fill="#10b981" name="Risparmi" />
                <Bar dataKey="vendita" stackId="a" fill="#8b5cf6" name="Vendita" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="cumulativo" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={cumulativeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value: number) => `€ ${value.toFixed(2)}`}
                  labelFormatter={(label) => `Mese: ${label}`}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="totale" fill="#10b981" name="Benefici Mensili" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="cumulativo" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Totale Cumulativo"
                  dot={{ fill: '#3b82f6' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}