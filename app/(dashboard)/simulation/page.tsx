import { SimulationPageHeader } from "@/components/simulation/simulation-page-header"
import { SimulationConfigSection } from "@/components/simulation/simulation-config-section"
import { SimulationResultsSection } from "@/components/simulation/simulation-results-section"
import { SimulationScenarios } from "@/components/simulation/simulation-scenarios"

// Simulate async data fetching
async function getSimulationData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    currentConfig: {
      energyPrice: 0.25,
      incentiveRate: 110,
      maintenanceCost: 500,
      memberCount: 50,
      averageProduction: 1200,
      averageConsumption: 800,
    },
    projections: {
      monthly: [
        { month: "Gen", revenue: 12000, costs: 3000, profit: 9000 },
        { month: "Feb", revenue: 11500, costs: 3000, profit: 8500 },
        { month: "Mar", revenue: 13000, costs: 3200, profit: 9800 },
        { month: "Apr", revenue: 14000, costs: 3200, profit: 10800 },
        { month: "Mag", revenue: 15000, costs: 3500, profit: 11500 },
        { month: "Giu", revenue: 16000, costs: 3500, profit: 12500 },
      ],
      annual: {
        totalRevenue: 165000,
        totalCosts: 40000,
        totalProfit: 125000,
        roi: 22.5,
        paybackPeriod: 4.5,
      }
    },
    scenarios: [
      {
        id: "1",
        name: "Scenario Base",
        description: "Configurazione attuale",
        impact: "neutral" as const,
        savings: 125000,
        lastRun: "2 giorni fa",
      },
      {
        id: "2",
        name: "Scenario Ottimistico",
        description: "+20% produzione",
        impact: "positive" as const,
        savings: 150000,
        lastRun: "1 settimana fa",
      },
      {
        id: "3",
        name: "Scenario Conservativo",
        description: "-10% produzione",
        impact: "negative" as const,
        savings: 95000,
        lastRun: "2 settimane fa",
      },
    ]
  }
}

export default async function SimulationPage() {
  const { currentConfig, projections, scenarios } = await getSimulationData()
  
  return (
    <div className="space-y-6">
      <SimulationPageHeader />
      <SimulationConfigSection initialConfig={currentConfig} />
      <SimulationResultsSection projections={projections} />
      <SimulationScenarios scenarios={scenarios} currentConfig={currentConfig} />
    </div>
  )
}