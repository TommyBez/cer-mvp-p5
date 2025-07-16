"use client"

import { useState } from "react"
import {
  Calculator,
  TrendingUp,
  Zap,
  Euro,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
} from "recharts"

type SimulationData = {
  scenarios: Array<{
    id: number
    name: string
    savings: number
    efficiency: number
  }>
  monthlyData: Array<{
    month: string
    savings: number
    production: number
    consumption: number
  }>
}

interface EconomicSimulationClientProps {
  simulationData: SimulationData
}

export function EconomicSimulationClient({ simulationData }: EconomicSimulationClientProps) {
  const [powerConsumption, setPowerConsumption] = useState("3000")
  const [memberType, setMemberType] = useState("consumatore")
  const [panelPower, setPanelPower] = useState("6")
  const [selectedScenario, setSelectedScenario] = useState(simulationData.scenarios[0]?.id || 1)

  const runSimulation = () => {
    console.log("Running simulation with:", {
      powerConsumption,
      memberType,
      panelPower,
      selectedScenario
    })
  }

  const selectedScenarioData = simulationData.scenarios.find(s => s.id === selectedScenario)

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Parametri di Simulazione
          </CardTitle>
          <CardDescription>
            Configura i parametri per eseguire la simulazione economica.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="consumption">Consumo Annuo (kWh)</Label>
              <Input
                id="consumption"
                type="number"
                value={powerConsumption}
                onChange={(e) => setPowerConsumption(e.target.value)}
                placeholder="3000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-type">Tipo Membro</Label>
              <Select value={memberType} onValueChange={setMemberType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consumatore">Consumatore</SelectItem>
                  <SelectItem value="produttore">Produttore</SelectItem>
                  <SelectItem value="prosumer">Prosumer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="panel-power">Potenza Pannelli (kW)</Label>
              <Input
                id="panel-power"
                type="number"
                value={panelPower}
                onChange={(e) => setPanelPower(e.target.value)}
                placeholder="6"
                disabled={memberType === "consumatore"}
              />
            </div>
          </div>
          <Button onClick={runSimulation} className="w-full md:w-auto">
            <Calculator className="mr-2 h-4 w-4" />
            Esegui Simulazione
          </Button>
        </CardContent>
      </Card>

      {/* Results Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risparmio Annuo</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {selectedScenarioData?.savings.toFixed(2) || "0.00"}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% dal mese scorso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficienza</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedScenarioData?.efficiency || 0}%</div>
            <p className="text-xs text-muted-foreground">
              +2% dal mese scorso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,340 kWh</div>
            <p className="text-xs text-muted-foreground">
              +15% dal mese scorso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Annuale</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              +0.5% dal mese scorso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Andamento Risparmi Mensili</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={simulationData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <RechartsLine
                  type="monotone"
                  dataKey="savings"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Risparmi (€)"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produzione vs Consumo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={simulationData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <RechartsBar dataKey="production" fill="#8884d8" name="Produzione (kWh)" />
                <RechartsBar dataKey="consumption" fill="#82ca9d" name="Consumo (kWh)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Scenarios Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Confronto Scenari</CardTitle>
          <CardDescription>
            Confronta diversi scenari di partecipazione alla CER.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simulationData.scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedScenario === scenario.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-medium">{scenario.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Efficienza: {scenario.efficiency}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    € {scenario.savings.toFixed(2)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Risparmio annuo
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}