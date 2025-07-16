import { fetchSimulationData } from "@/lib/data"
import { EconomicSimulationClient } from "@/components/client/economic-simulation-client"

export default async function SimulationPage() {
  const simulationData = await fetchSimulationData()
  
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