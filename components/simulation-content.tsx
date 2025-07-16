"use client"

import { useState } from "react"
import { SimulationConfig } from "./simulation/simulation-config"
import { SimulationResults } from "./simulation/simulation-results"
import { SimulationScenarios } from "./simulation/simulation-scenarios"

interface SimulationData {
  currentConfig: {
    energyPrice: number
    incentiveRate: number
    maintenanceCost: number
    memberCount: number
    averageProduction: number
    averageConsumption: number
  }
  projections: {
    monthly: Array<{
      month: string
      revenue: number
      costs: number
      profit: number
    }>
    annual: {
      totalRevenue: number
      totalCosts: number
      totalProfit: number
      roi: number
      paybackPeriod: number
    }
  }
  scenarios: Array<{
    id: number
    name: string
    description: string
    profit: number
    roi: number
  }>
}

interface SimulationContentProps {
  initialData: SimulationData
}

export function SimulationContent({ initialData }: SimulationContentProps) {
  const [config, setConfig] = useState(initialData.currentConfig)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleConfigChange = (newConfig: typeof config) => {
    setConfig(newConfig)
  }

  const handleSimulate = () => {
    setIsCalculating(true)
    // Simulate calculation delay
    setTimeout(() => {
      setIsCalculating(false)
      // In real app, recalculate projections based on new config
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Simulazione Economica</h1>
        <p className="text-muted-foreground">
          Simula scenari economici per la comunità energetica
        </p>
      </div>

      <SimulationConfig 
        config={config}
        onChange={handleConfigChange}
        onSimulate={handleSimulate}
        isCalculating={isCalculating}
      />

      <SimulationResults 
        projections={initialData.projections}
        isCalculating={isCalculating}
      />

      <SimulationScenarios 
        scenarios={initialData.scenarios}
        currentConfig={config}
      />
    </div>
  )
}