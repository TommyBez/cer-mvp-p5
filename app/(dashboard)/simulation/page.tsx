import { SimulationContent } from "@/components/simulation-content"

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
        id: 1,
        name: "Scenario Base",
        description: "Configurazione attuale",
        profit: 125000,
        roi: 22.5,
      },
      {
        id: 2,
        name: "Scenario Ottimistico",
        description: "+20% produzione",
        profit: 150000,
        roi: 27.0,
      },
      {
        id: 3,
        name: "Scenario Pessimistico",
        description: "-20% produzione",
        profit: 100000,
        roi: 18.0,
      },
    ]
  }
}

export default async function SimulationPage() {
  const simulationData = await getSimulationData()
  
  return <SimulationContent initialData={simulationData} />
}