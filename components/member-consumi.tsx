"use client"

import { useState } from "react"
import { 
  Calendar, 
  Download, 
  Power, 
  TrendingDown, 
  TrendingUp, 
  Zap,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Sun,
  Moon
} from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import { ResponsiveTable } from "@/components/responsive-table"

// Dati mockkati per i consumi
const weeklyData = [
  { day: "Lun", consumo: 24, condiviso: 8, produzione: 5 },
  { day: "Mar", consumo: 18, condiviso: 12, produzione: 8 },
  { day: "Mer", consumo: 32, condiviso: 15, produzione: 10 },
  { day: "Gio", consumo: 28, condiviso: 10, produzione: 6 },
  { day: "Ven", consumo: 22, condiviso: 14, produzione: 9 },
  { day: "Sab", consumo: 35, condiviso: 18, produzione: 12 },
  { day: "Dom", consumo: 30, condiviso: 16, produzione: 11 },
]

const monthlyData = [
  { mese: "Gen", consumo: 520, condiviso: 250, produzione: 180 },
  { mese: "Feb", consumo: 480, condiviso: 280, produzione: 200 },
  { mese: "Mar", consumo: 550, condiviso: 320, produzione: 280 },
  { mese: "Apr", consumo: 510, condiviso: 340, produzione: 320 },
  { mese: "Mag", consumo: 490, condiviso: 350, produzione: 380 },
  { mese: "Giu", consumo: 530, condiviso: 330, produzione: 350 },
]

const yearlyData = [
  { anno: "2021", consumo: 6200, condiviso: 2800, produzione: 2200 },
  { anno: "2022", consumo: 5900, condiviso: 3100, produzione: 2600 },
  { anno: "2023", consumo: 5700, condiviso: 3500, produzione: 3000 },
  { anno: "2024", consumo: 2850, condiviso: 1800, produzione: 1600 },
]

const hourlyData = [
  { ora: "00:00", consumo: 0.5, produzione: 0 },
  { ora: "02:00", consumo: 0.4, produzione: 0 },
  { ora: "04:00", consumo: 0.3, produzione: 0 },
  { ora: "06:00", consumo: 0.8, produzione: 0.2 },
  { ora: "08:00", consumo: 1.5, produzione: 0.8 },
  { ora: "10:00", consumo: 2.2, produzione: 1.5 },
  { ora: "12:00", consumo: 2.8, produzione: 2.0 },
  { ora: "14:00", consumo: 2.5, produzione: 1.8 },
  { ora: "16:00", consumo: 2.0, produzione: 1.2 },
  { ora: "18:00", consumo: 3.0, produzione: 0.5 },
  { ora: "20:00", consumo: 2.5, produzione: 0 },
  { ora: "22:00", consumo: 1.2, produzione: 0 },
]

const deviceData = [
  { name: "Climatizzazione", value: 35, color: "#ea580c" },
  { name: "Elettrodomestici", value: 25, color: "#16a34a" },
  { name: "Illuminazione", value: 15, color: "#2563eb" },
  { name: "Cucina", value: 20, color: "#7c3aed" },
  { name: "Altri", value: 5, color: "#6b7280" },
]

const detailedConsumptionData = [
  { id: 1, date: "2024-01-15", time: "14:30", device: "Condizionatore", consumption: 2.5, cost: 0.75 },
  { id: 2, date: "2024-01-15", time: "10:15", device: "Lavatrice", consumption: 1.8, cost: 0.54 },
  { id: 3, date: "2024-01-14", time: "19:00", device: "Forno", consumption: 3.2, cost: 0.96 },
  { id: 4, date: "2024-01-14", time: "08:00", device: "Asciugatrice", consumption: 2.0, cost: 0.60 },
  { id: 5, date: "2024-01-13", time: "21:30", device: "TV + Console", consumption: 0.8, cost: 0.24 },
]

export function MemberConsumi() {
  const [timeFrame, setTimeFrame] = useState("week")
  const [chartType, setChartType] = useState("line")

  // Seleziona i dati in base al timeframe
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
    <div className="space-y-6">
      {/* Header con statistiche */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">I Miei Consumi</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consumo Oggi</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5 kWh</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                -8% rispetto a ieri
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
              <Power className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.8 kWh</div>
              <Progress value={46} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">46% del consumo totale</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Picco Giornaliero</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.0 kWh</div>
              <p className="text-xs text-muted-foreground">alle 18:00</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Previsione Mensile</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">375 kWh</div>
              <p className="text-xs text-muted-foreground">€112.50 stimati</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Grafici principali */}
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

      {/* Consigli per il risparmio */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-600" />
              Fascia Diurna
            </CardTitle>
            <CardDescription>Consumo nelle ore di sole (8:00 - 19:00)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Consumo medio</span>
                  <span className="font-medium">2.1 kWh/ora</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>✓ 65% del tuo consumo avviene in fascia diurna</p>
                <p>✓ Massimizza l'uso quando c'è produzione solare</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-blue-600" />
              Fascia Notturna
            </CardTitle>
            <CardDescription>Consumo nelle ore serali (19:00 - 8:00)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Consumo medio</span>
                  <span className="font-medium">1.2 kWh/ora</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>💡 Riduci i consumi serali del 10%</p>
                <p>💡 Sposta carichi flessibili in fascia diurna</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dettaglio consumi recenti */}
      <Card>
        <CardHeader>
          <CardTitle>Dettaglio Consumi Recenti</CardTitle>
          <CardDescription>Ultimi consumi registrati per dispositivo</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            data={detailedConsumptionData}
            columns={[
              {
                key: 'date',
                header: 'Data',
                accessor: (item) => new Date(item.date).toLocaleDateString("it-IT"),
                priority: 8
              },
              {
                key: 'time',
                header: 'Ora',
                accessor: (item) => item.time,
                priority: 6
              },
              {
                key: 'device',
                header: 'Dispositivo',
                accessor: (item) => <div className="font-medium">{item.device}</div>,
                priority: 10
              },
              {
                key: 'consumption',
                header: 'Consumo',
                accessor: (item) => `${item.consumption} kWh`,
                priority: 7
              },
              {
                key: 'cost',
                header: 'Costo',
                accessor: (item) => <span className="font-medium">€{item.cost.toFixed(2)}</span>,
                priority: 5
              }
            ]}
            getRowKey={(item) => item.id}
            mobileLayout="card"
          />
        </CardContent>
      </Card>

      {/* Suggerimenti personalizzati */}
      <Card>
        <CardHeader>
          <CardTitle>Suggerimenti Personalizzati</CardTitle>
          <CardDescription>Basati sul tuo profilo di consumo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-orange-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Picco serale elevato</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Il tuo consumo aumenta del 40% tra le 18:00 e le 20:00. Prova a spostare alcuni carichi in fascia diurna per massimizzare l'energia condivisa.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Ottimo utilizzo dell'energia condivisa</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Stai utilizzando il 46% di energia condivisa. Continua così! Potresti aumentare ancora programmando la lavatrice nelle ore centrali della giornata.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}