import { fetchSimulationData } from "@/lib/data"
import { EconomicSimulationServer } from "@/components/server/economic-simulation-server"

export default async function SimulationPage() {
  const simulationData = await fetchSimulationData()
  return <EconomicSimulationServer simulationData={simulationData} />
}