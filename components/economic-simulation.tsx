"use client"

import {
  Calculator,
  Zap,
  Euro,
  TrendingUp,
  BarChart3,
  Download,
  Save,
  RefreshCw,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"

// Configurazioni standard predefinite
const standardConfigurations = [
  {
    id: "residential",
    name: "Residenziale Standard",
    description: "Configurazione tipica per comunità residenziali",
    members: 25,
    totalPower: 150, // kW
    avgConsumption: 3500, // kWh/anno per membro
    productionProfile: "residential",
    incentiveRate: 0.11, // €/kWh
  },
  {
    id: "mixed",
    name: "Mista Residenziale-Commerciale",
    description: "Mix di utenze residenziali e piccole attività commerciali",
    members: 40,
    totalPower: 300,
    avgConsumption: 4200,
    productionProfile: "mixed",
    incentiveRate: 0.11,
  },
  {
    id: "industrial",
    name: "Industriale Leggera",
    description: "Piccole e medie imprese con consumi elevati",
    members: 15,
    totalPower: 500,
    avgConsumption: 8500,
    productionProfile: "industrial",
    incentiveRate: 0.11,
  },
]

// Profili di produzione mensile (% della produzione annuale)
const productionProfiles = {
  residential: [4, 5, 8, 10, 12, 14, 15, 13, 10, 7, 5, 3],
  mixed: [4, 5, 8, 11, 13, 15, 16, 14, 11, 8, 5, 3],
  industrial: [5, 6, 9, 11, 13, 15, 15, 13, 11, 8, 6, 4],
}

const COLORS = ["#16a34a", "#2563eb", "#ea580c", "#8b5cf6", "#f59e0b"]

export function EconomicSimulation() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // Parametri di simulazione
  const [selectedConfig, setSelectedConfig] = useState<string>("")
  const [customParams, setCustomParams] = useState({
    members: 25,
    totalPower: 150,
    avgConsumption: 3500,
    energyPrice: 0.25, // €/kWh
    incentiveRate: 0.11,
    productionHours: 1400, // ore equivalenti annue
    sharingPercentage: 65, // % di energia condivisa
  })

  const [isSimulating, setIsSimulating] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleConfigurationChange = (configId: string) => {
    setSelectedConfig(configId)
    const config = standardConfigurations.find((c) => c.id === configId)
    if (config) {
      setCustomParams((prev) => ({
        ...prev,
        members: config.members,
        totalPower: config.totalPower,
        avgConsumption: config.avgConsumption,
        incentiveRate: config.incentiveRate,
      }))
    }
  }

  // Calcoli della simulazione
  const simulationResults = useMemo(() => {
    const totalAnnualProduction = customParams.totalPower * customParams.productionHours
    const totalAnnualConsumption = customParams.members * customParams.avgConsumption
    const sharedEnergy =
      Math.min(totalAnnualProduction, totalAnnualConsumption) * (customParams.sharingPercentage / 100)

    // Benefici economici
    const incentivesBenefit = sharedEnergy * customParams.incentiveRate
    const energySavings = sharedEnergy * customParams.energyPrice * 0.3 // 30% di risparmio sulla componente energia
    const totalAnnualBenefit = incentivesBenefit + energySavings
    const benefitPerMember = totalAnnualBenefit / customParams.members

    // Dati mensili per i grafici
    const profileKey = selectedConfig
      ? standardConfigurations.find((c) => c.id === selectedConfig)?.productionProfile || "residential"
      : "residential"
    const monthlyProfile = productionProfiles[profileKey as keyof typeof productionProfiles]

    const monthlyData = monthlyProfile.map((percentage, index) => {
      const monthlyProduction = (totalAnnualProduction * percentage) / 100
      const monthlyConsumption = totalAnnualConsumption / 12
      const monthlyShared = Math.min(monthlyProduction, monthlyConsumption) * (customParams.sharingPercentage / 100)
      const monthlyBenefit = monthlyShared * (customParams.incentiveRate + customParams.energyPrice * 0.3)

      return {
        month: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"][index],
        produzione: Math.round(monthlyProduction),
        consumo: Math.round(monthlyConsumption),
        condivisa: Math.round(monthlyShared),
        beneficio: Math.round(monthlyBenefit),
      }
    })

    // Distribuzione benefici
    const benefitDistribution = [
      {
        name: "Incentivi GSE",
        value: Math.round(incentivesBenefit),
        percentage: Math.round((incentivesBenefit / totalAnnualBenefit) * 100),
      },
      {
        name: "Risparmio Energia",
        value: Math.round(energySavings),
        percentage: Math.round((energySavings / totalAnnualBenefit) * 100),
      },
    ]

    return {
      totalAnnualProduction: Math.round(totalAnnualProduction),
      totalAnnualConsumption: Math.round(totalAnnualConsumption),
      sharedEnergy: Math.round(sharedEnergy),
      sharingRate: Math.round((sharedEnergy / Math.min(totalAnnualProduction, totalAnnualConsumption)) * 100),
      totalAnnualBenefit: Math.round(totalAnnualBenefit),
      benefitPerMember: Math.round(benefitPerMember),
      incentivesBenefit: Math.round(incentivesBenefit),
      energySavings: Math.round(energySavings),
      monthlyData,
      benefitDistribution,
      paybackYears: Math.round(((customParams.totalPower * 1500) / totalAnnualBenefit) * 10) / 10, // Stima payback
    }
  }, [customParams, selectedConfig])

  const runSimulation = async () => {
    setIsSimulating(true)
    // Simula il tempo di calcolo
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSimulating(false)
  }

  if (!user) {
    return <div>Caricamento...</div>
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Pannello di configurazione */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Parametri Simulazione
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Configurazioni standard */}
              <div className="space-y-3">
                <Label>Configurazione Standard</Label>
                <Select value={selectedConfig} onValueChange={handleConfigurationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona configurazione" />
                  </SelectTrigger>
                  <SelectContent>
                    {standardConfigurations.map((config) => (
                      <SelectItem key={config.id} value={config.id}>
                        {config.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedConfig && (
                  <Alert>
                    <AlertDescription>
                      {standardConfigurations.find((c) => c.id === selectedConfig)?.description}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Parametri personalizzabili */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Numero Membri: {customParams.members}</Label>
                  <Slider
                    value={[customParams.members]}
                    onValueChange={([value]) => setCustomParams((prev) => ({ ...prev, members: value }))}
                    max={100}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Potenza Totale Impianti</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={customParams.totalPower}
                      onChange={(e) => setCustomParams((prev) => ({ ...prev, totalPower: Number(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">kW</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Consumo Medio Annuo per Membro</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={customParams.avgConsumption}
                      onChange={(e) =>
                        setCustomParams((prev) => ({ ...prev, avgConsumption: Number(e.target.value) }))
                      }
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">kWh</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Prezzo Energia: {customParams.energyPrice.toFixed(3)} €/kWh</Label>
                  <Slider
                    value={[customParams.energyPrice * 1000]}
                    onValueChange={([value]) => setCustomParams((prev) => ({ ...prev, energyPrice: value / 1000 }))}
                    max={400}
                    min={150}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>% Energia Condivisa: {customParams.sharingPercentage}%</Label>
                  <Slider
                    value={[customParams.sharingPercentage]}
                    onValueChange={([value]) => setCustomParams((prev) => ({ ...prev, sharingPercentage: value }))}
                    max={90}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={runSimulation} disabled={isSimulating} className="flex-1">
                  {isSimulating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Simulando...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Simula
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risultati della simulazione */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="monthly">Andamento Mensile</TabsTrigger>
              <TabsTrigger value="benefits">Benefici</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* KPI principali */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{simulationResults.sharedEnergy.toLocaleString()} kWh</div>
                    <p className="text-xs text-muted-foreground">{simulationResults.sharingRate}% del totale</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Beneficio Totale</CardTitle>
                    <Euro className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      €{simulationResults.totalAnnualBenefit.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">All'anno</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Beneficio per Membro</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€{simulationResults.benefitPerMember}</div>
                    <p className="text-xs text-muted-foreground">All'anno per membro</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payback Stimato</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{simulationResults.paybackYears} anni</div>
                    <p className="text-xs text-muted-foreground">Tempo di ritorno</p>
                  </CardContent>
                </Card>
              </div>

              {/* Bilancio energetico */}
              <Card>
                <CardHeader>
                  <CardTitle>Bilancio Energetico Annuale</CardTitle>
                  <CardDescription>Confronto tra produzione e consumo della comunità</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {simulationResults.totalAnnualProduction.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">kWh Prodotti</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {simulationResults.totalAnnualConsumption.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-600">kWh Consumati</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {simulationResults.sharedEnergy.toLocaleString()}
                      </div>
                      <div className="text-sm text-orange-600">kWh Condivisi</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Andamento Mensile Energia</CardTitle>
                  <CardDescription>Produzione, consumo e condivisione per mese</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsLineChart data={simulationResults.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} unit="kWh" />
                      <Tooltip />
                      <Legend />
                      <RechartsLine type="monotone" dataKey="produzione" stroke="#16a34a" name="Produzione" />
                      <RechartsLine type="monotone" dataKey="consumo" stroke="#2563eb" name="Consumo" />
                      <RechartsLine
                        type="monotone"
                        dataKey="condivisa"
                        stroke="#ea580c"
                        name="Condivisa"
                        strokeWidth={3}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Benefici Economici Mensili</CardTitle>
                  <CardDescription>Distribuzione dei benefici durante l'anno</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={simulationResults.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} unit="€" />
                      <Tooltip />
                      <Bar dataKey="beneficio" fill="#16a34a" name="Beneficio Mensile" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Composizione Benefici</CardTitle>
                    <CardDescription>Suddivisione delle fonti di beneficio economico</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={simulationResults.benefitDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {simulationResults.benefitDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`€${value}`, "Valore"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dettaglio Benefici Annuali</CardTitle>
                    <CardDescription>Breakdown completo dei vantaggi economici</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Incentivi GSE</span>
                      <span className="font-bold text-green-600">
                        €{simulationResults.incentivesBenefit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Risparmio Energia</span>
                      <span className="font-bold text-blue-600">
                        €{simulationResults.energySavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2">
                      <span className="font-medium">Totale Annuale</span>
                      <span className="font-bold text-lg">
                        €{simulationResults.totalAnnualBenefit.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          €{simulationResults.benefitPerMember}
                        </div>
                        <div className="text-sm text-muted-foreground">Beneficio medio per membro/anno</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Esporta Risultati</CardTitle>
                  <CardDescription>
                    Scarica i risultati della simulazione per presentazioni o analisi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Report PDF
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Dati Excel
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Presentazione
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
