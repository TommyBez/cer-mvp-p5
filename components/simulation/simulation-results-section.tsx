import { SimulationChart } from "./simulation-chart"
import { SimulationSummary } from "./simulation-summary"

interface ProjectionsData {
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

interface SimulationResultsSectionProps {
  projections: ProjectionsData
}

export function SimulationResultsSection({ projections }: SimulationResultsSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SimulationChart data={projections.monthly} />
      <SimulationSummary annual={projections.annual} />
    </div>
  )
}