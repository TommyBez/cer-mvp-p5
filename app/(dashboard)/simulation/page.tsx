import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { EconomicSimulation } from "@/components/economic-simulation"

async function SimulationContent() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return <EconomicSimulation />
}

export default function SimulationPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[60vh]" />}>
      <SimulationContent />
    </Suspense>
  )
}