import { EconomicSimulationClient } from "@/components/client/economic-simulation-client"

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

interface EconomicSimulationServerProps {
  simulationData: SimulationData
}

export function EconomicSimulationServer({ simulationData }: EconomicSimulationServerProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Simulazione Economica</h2>
        <p className="text-muted-foreground">
          Analizza i benefici economici della partecipazione alla CER attraverso simulazioni avanzate.
        </p>
      </div>
      
      <EconomicSimulationClient simulationData={simulationData} />
    </div>
  )
}