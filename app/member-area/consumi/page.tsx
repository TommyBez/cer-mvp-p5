import { ConsumptionPageHeader } from "@/components/consumi/consumption-page-header"
import { ConsumptionStats } from "@/components/consumi/consumption-stats"
import { ConsumptionChart } from "@/components/consumi/consumption-chart"
import { ConsumptionTable } from "@/components/consumi/consumption-table"
import { ConsumptionDetails } from "@/components/consumi/consumption-details"

// Types
interface ConsumptionData {
  period: string
  consumed: number
  produced: number
  selfConsumed: number
  gridImported: number
  gridExported: number
  cost: number
  savings: number
}

interface ConsumptionStats {
  totalConsumed: number
  totalProduced: number
  selfConsumptionRate: number
  totalSavings: number
  avgDailyConsumption: number
  peakConsumption: number
}

// Simulate async data fetching
async function getConsumptionData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    stats: {
      totalConsumed: 856,
      totalProduced: 1234,
      selfConsumptionRate: 72.5,
      totalSavings: 234.50,
      avgDailyConsumption: 28.5,
      peakConsumption: 5.2,
    },
    monthlyData: [
      { month: "Gen", consumo: 90, produzione: 120, autoconsumo: 75 },
      { month: "Feb", consumo: 85, produzione: 110, autoconsumo: 70 },
      { month: "Mar", consumo: 95, produzione: 130, autoconsumo: 80 },
      { month: "Apr", consumo: 88, produzione: 140, autoconsumo: 78 },
      { month: "Mag", consumo: 92, produzione: 150, autoconsumo: 82 },
      { month: "Giu", consumo: 90, produzione: 145, autoconsumo: 80 },
    ],
    detailedData: [
      {
        period: "01/06/2024",
        consumed: 28.5,
        produced: 42.3,
        selfConsumed: 22.1,
        gridImported: 6.4,
        gridExported: 20.2,
        cost: 8.50,
        savings: 12.30,
      },
      {
        period: "02/06/2024",
        consumed: 30.2,
        produced: 38.7,
        selfConsumed: 24.5,
        gridImported: 5.7,
        gridExported: 14.2,
        cost: 7.20,
        savings: 10.80,
      },
      {
        period: "03/06/2024",
        consumed: 27.8,
        produced: 45.1,
        selfConsumed: 21.3,
        gridImported: 6.5,
        gridExported: 23.8,
        cost: 8.90,
        savings: 13.40,
      },
      {
        period: "04/06/2024",
        consumed: 29.1,
        produced: 41.5,
        selfConsumed: 23.7,
        gridImported: 5.4,
        gridExported: 17.8,
        cost: 6.80,
        savings: 11.20,
      },
      {
        period: "05/06/2024",
        consumed: 31.5,
        produced: 39.2,
        selfConsumed: 25.8,
        gridImported: 5.7,
        gridExported: 13.4,
        cost: 7.10,
        savings: 10.50,
      },
    ],
    hourlyPattern: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
      consumption: [0.8, 0.6, 2.5, 3.2, 2.8, 3.5, 1.2],
      production: [0, 0, 1.5, 4.8, 3.5, 0.8, 0],
    }
  }
}

export default async function ConsumiPage() {
  const { stats, monthlyData, detailedData, hourlyPattern } = await getConsumptionData()
  
  return (
    <div className="space-y-6">
      <ConsumptionPageHeader />
      <ConsumptionStats stats={stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ConsumptionChart 
          monthlyData={monthlyData} 
          hourlyPattern={hourlyPattern}
        />
        <ConsumptionDetails hourlyPattern={hourlyPattern} />
      </div>
      <ConsumptionTable data={detailedData} />
    </div>
  )
}