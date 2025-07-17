"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SimulationConfigForm } from "./simulation-config-form"
import { SimulateButton } from "./simulate-button"

interface SimulationConfig {
  energyPrice: number
  incentiveRate: number
  maintenanceCost: number
  memberCount: number
  averageProduction: number
  averageConsumption: number
}

interface SimulationConfigSectionProps {
  initialConfig: SimulationConfig
}

export function SimulationConfigSection({ initialConfig }: SimulationConfigSectionProps) {
  const [config, setConfig] = useState(initialConfig)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleConfigChange = (field: keyof SimulationConfig, value: number) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const handleSimulate = () => {
    setIsCalculating(true)
    // Simulate calculation delay
    setTimeout(() => {
      setIsCalculating(false)
      // In real app, trigger recalculation with new config
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurazione Parametri</CardTitle>
        <CardDescription>
          Modifica i parametri per simulare diversi scenari economici
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimulationConfigForm 
          config={config}
          onChange={handleConfigChange}
          disabled={isCalculating}
        />
        <SimulateButton 
          onClick={handleSimulate}
          isCalculating={isCalculating}
        />
      </CardContent>
    </Card>
  )
}