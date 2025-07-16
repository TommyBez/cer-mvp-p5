import { Suspense } from "react"
import { fetchSimulationData } from "@/lib/data"
import { EconomicSimulationServer } from "@/components/server/economic-simulation-server"
import { SimulationSkeleton } from "@/components/ui/loading-skeletons"

async function SimulationContent() {
  const simulationData = await fetchSimulationData()
  return <EconomicSimulationServer simulationData={simulationData} />
}

export default function SimulationPage() {
  return (
    <Suspense fallback={<SimulationSkeleton />}>
      <SimulationContent />
    </Suspense>
  )
}