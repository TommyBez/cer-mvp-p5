"use client"

import { useState } from "react"
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Receipt,
  FileText,
  Download,
  Info,
  ChevronRight,
  Euro
} from "lucide-react"
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
  RadialBarChart,
  RadialBar,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ResponsiveTable } from "@/components/responsive-table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Dati mock per i benefici economici
const monthlyBenefits = [
  { month: "Gen", risparmio: 45, incentivi: 23, totale: 68 },
  { month: "Feb", risparmio: 52, incentivi: 28, totale: 80 },
  { month: "Mar", risparmio: 48, incentivi: 25, totale: 73 },
  { month: "Apr", risparmio: 58, incentivi: 32, totale: 90 },
  { month: "Mag", risparmio: 62, incentivi: 35, totale: 97 },
  { month: "Giu", risparmio: 55, incentivi: 30, totale: 85 },
]

const yearlyComparison = [
  { year: "2021", senzaCER: 1200, conCER: 1200, risparmio: 0 },
  { year: "2022", senzaCER: 1350, conCER: 1180, risparmio: 170 },
  { year: "2023", senzaCER: 1450, conCER: 1050, risparmio: 400 },
  { year: "2024", senzaCER: 750, conCER: 480, risparmio: 270 },
]

const incentiveBreakdown = [
  { name: "Tariffa Incentivante", value: 35, color: "#16a34a" },
  { name: "Restituzione Componenti", value: 25, color: "#2563eb" },
  { name: "Valorizzazione Eccedenze", value: 15, color: "#7c3aed" },
  { name: "Bonus Sociale", value: 25, color: "#ea580c" },
]

const transactionHistory = [
  { id: 1, date: "2024-01-15", type: "Incentivo GSE", amount: 28.50, status: "Accreditato" },
  { id: 2, date: "2024-01-10", type: "Risparmio Bolletta", amount: 45.20, status: "Applicato" },
  { id: 3, date: "2024-01-05", type: "Bonus Sociale", amount: 15.00, status: "Accreditato" },
  { id: 4, date: "2023-12-15", type: "Incentivo GSE", amount: 32.80, status: "Accreditato" },
  { id: 5, date: "2023-12-10", type: "Risparmio Bolletta", amount: 52.10, status: "Applicato" },
]

export function MemberBenefici() {
  const [consumoMensile, setConsumoMensile] = useState([250])
  const [percentualeCondivisa, setPercentualeCondivisa] = useState([45])

  // Calcolo risparmio stimato
  const calcolaRisparmio = () => {
    const consumo = consumoMensile[0]
    const percentuale = percentualeCondivisa[0] / 100
    const energiaCondivisa = consumo * percentuale
    
    // Tariffa incentivante (€/kWh)
    const tariffaIncentivante = 0.11
    const restituzioneComponenti = 0.008
    
    const incentivo = energiaCondivisa * tariffaIncentivante
    const restituzione = energiaCondivisa * restituzioneComponenti
    const risparmioEnergia = energiaCondivisa * 0.15 // risparmio medio sulla bolletta
    
    return {
      incentivo: incentivo.toFixed(2),
      restituzione: restituzione.toFixed(2),
      risparmio: risparmioEnergia.toFixed(2),
      totale: (incentivo + restituzione + risparmioEnergia).toFixed(2)
    }
  }

  const risparmioCalcolato = calcolaRisparmio()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Benefici Economici</h2>
        
        {/* Statistiche principali */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risparmio Totale 2024</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€270</div>
              <p className="text-xs text-muted-foreground">Da inizio anno</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incentivo Mensile</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€32</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                +12% vs mese scorso
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risparmio in Bolletta</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€58</div>
              <p className="text-xs text-muted-foreground">Questo mese</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prossimo Pagamento</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€95</div>
              <p className="text-xs text-muted-foreground">Previsto il 25/01</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alert informativo */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Come funzionano gli incentivi</AlertTitle>
        <AlertDescription>
          Gli incentivi della CER includono la tariffa premio GSE (110€/MWh), la restituzione delle componenti tariffarie e la valorizzazione dell'energia eccedente. Il pagamento avviene trimestralmente.
        </AlertDescription>
      </Alert>

      {/* Grafici benefici */}
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

      {/* Calcolatore risparmio */}
      <Card>
        <CardHeader>
          <CardTitle>Calcola il Tuo Risparmio</CardTitle>
          <CardDescription>Stima i tuoi benefici economici personalizzati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="consumo">Consumo Mensile Stimato</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="consumo"
                    min={100}
                    max={500}
                    step={10}
                    value={consumoMensile}
                    onValueChange={setConsumoMensile}
                    className="flex-1"
                  />
                  <div className="w-20 text-right font-medium">{consumoMensile[0]} kWh</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="percentuale">Percentuale Energia Condivisa</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="percentuale"
                    min={0}
                    max={100}
                    step={5}
                    value={percentualeCondivisa}
                    onValueChange={setPercentualeCondivisa}
                    className="flex-1"
                  />
                  <div className="w-20 text-right font-medium">{percentualeCondivisa[0]}%</div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Risparmio Mensile Stimato</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Incentivo Tariffa Premio</span>
                  <span className="font-medium">€{risparmioCalcolato.incentivo}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Restituzione Componenti</span>
                  <span className="font-medium">€{risparmioCalcolato.restituzione}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Risparmio in Bolletta</span>
                  <span className="font-medium">€{risparmioCalcolato.risparmio}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Totale Mensile</span>
                    <span className="text-lg font-bold text-green-600">€{risparmioCalcolato.totale}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Risparmio annuale stimato: €{(parseFloat(risparmioCalcolato.totale) * 12).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dettaglio componenti incentivo */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Composizione Incentivi</CardTitle>
            <CardDescription>Dettaglio delle componenti economiche</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={incentiveBreakdown}>
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  clockWise
                  dataKey="value"
                  fill="#8884d8"
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {incentiveBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefici Aggiuntivi</CardTitle>
            <CardDescription>Altri vantaggi della partecipazione alla CER</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Riduzione Costi Fissi</h4>
                  <p className="text-sm text-muted-foreground">Risparmio del 15% sui costi fissi in bolletta</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Detrazioni Fiscali</h4>
                  <p className="text-sm text-muted-foreground">Possibilità di detrazioni per investimenti green</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <PiggyBank className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Stabilità Prezzi</h4>
                  <p className="text-sm text-muted-foreground">Protezione dalle fluttuazioni del mercato energetico</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storico transazioni */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Storico Movimenti</CardTitle>
              <CardDescription>Ultimi pagamenti e accrediti ricevuti</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Esporta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            data={transactionHistory}
            columns={[
              {
                key: 'date',
                header: 'Data',
                accessor: (item) => new Date(item.date).toLocaleDateString("it-IT"),
                priority: 8
              },
              {
                key: 'type',
                header: 'Tipo',
                accessor: (item) => <div className="font-medium">{item.type}</div>,
                priority: 10
              },
              {
                key: 'amount',
                header: 'Importo',
                accessor: (item) => (
                  <span className="font-medium text-green-600">+€{item.amount.toFixed(2)}</span>
                ),
                priority: 9
              },
              {
                key: 'status',
                header: 'Stato',
                accessor: (item) => (
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {item.status}
                  </span>
                ),
                priority: 7
              },
              {
                key: 'actions',
                header: '',
                accessor: () => (
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ),
                className: 'text-right',
                priority: 1
              }
            ]}
            getRowKey={(item) => item.id}
            mobileLayout="card"
          />
        </CardContent>
      </Card>

      {/* Call to action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Vuoi massimizzare i tuoi benefici?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Scopri come ottimizzare i tuoi consumi per aumentare il risparmio
              </p>
            </div>
            <Button>
              Richiedi Consulenza
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}