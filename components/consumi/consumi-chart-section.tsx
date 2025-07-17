"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConsumiChartSectionProps {
  weeklyData: any[]
  monthlyData: any[]
  yearlyData: any[]
  hourlyData: any[]
  deviceData: any[]
}

export function ConsumiChartSection({
  weeklyData,
  monthlyData,
  yearlyData,
  hourlyData,
  deviceData,
}: ConsumiChartSectionProps) {
  const [timeFrame, setTimeFrame] = useState("week")

  const getData = () => {
    switch (timeFrame) {
      case "week":
        return weeklyData
      case "month":
        return monthlyData
      case "year":
        return yearlyData
      default:
        return weeklyData
    }
  }

  const getXAxisKey = () => {
    switch (timeFrame) {
      case "week":
        return "day"
      case "month":
        return "mese"
      case "year":
        return "anno"
      default:
        return "day"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Analisi Consumi</CardTitle>
            <CardDescription>Visualizza i tuoi consumi energetici nel tempo</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Settimana</SelectItem>
                <SelectItem value="month">Mese</SelectItem>
                <SelectItem value="year">Anno</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Confronto</TabsTrigger>
            <TabsTrigger value="trend">Andamento</TabsTrigger>
            <TabsTrigger value="distribution">Distribuzione</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisKey()} stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} unit=" kWh" />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumo" fill="#ea580c" name="Consumo Totale" />
                <Bar dataKey="condiviso" fill="#16a34a" name="Energia Condivisa" />
                <Bar dataKey="produzione" fill="#2563eb" name="Produzione CER" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="trend" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisKey()} stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} unit=" kWh" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="consumo"
                  stackId="1"
                  stroke="#ea580c"
                  fill="#ea580c"
                  fillOpacity={0.6}
                  name="Consumo Totale"
                />
                <Area
                  type="monotone"
                  dataKey="condiviso"
                  stackId="2"
                  stroke="#16a34a"
                  fill="#16a34a"
                  fillOpacity={0.6}
                  name="Energia Condivisa"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-4">Distribuzione per Dispositivo</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-4">Profilo Orario</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ora" stroke="#888888" fontSize={10} />
                    <YAxis stroke="#888888" fontSize={12} unit=" kW" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="consumo"
                      stroke="#ea580c"
                      name="Consumo"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="produzione"
                      stroke="#16a34a"
                      name="Produzione CER"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}