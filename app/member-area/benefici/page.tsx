import { BenefitsPageHeader } from "@/components/benefici/benefits-page-header"
import { BenefitsStats } from "@/components/benefici/benefits-stats"
import { BenefitsChart } from "@/components/benefici/benefits-chart"
import { BenefitsBreakdown } from "@/components/benefici/benefits-breakdown"
import { BenefitsHistory } from "@/components/benefici/benefits-history"

// Types
interface BenefitEntry {
  date: string
  type: string
  description: string
  amount: number
  status: string
}

interface MonthlyBenefit {
  month: string
  incentivi: number
  risparmio: number
  vendita: number
  totale: number
}

// Simulate async data fetching
async function getBenefitsData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    stats: {
      totalIncentives: 458.75,
      totalSavings: 234.50,
      totalRevenue: 125.80,
      totalBenefits: 819.05,
      monthlyAverage: 136.51,
      yearlyProjection: 1638.10,
    },
    monthlyData: [
      { month: "Gen", incentivi: 65.50, risparmio: 38.20, vendita: 18.50, totale: 122.20 },
      { month: "Feb", incentivi: 72.30, risparmio: 35.80, vendita: 20.10, totale: 128.20 },
      { month: "Mar", incentivi: 78.40, risparmio: 42.10, vendita: 22.30, totale: 142.80 },
      { month: "Apr", incentivi: 82.15, risparmio: 39.50, vendita: 19.80, totale: 141.45 },
      { month: "Mag", incentivi: 85.90, risparmio: 41.20, vendita: 23.10, totale: 150.20 },
      { month: "Giu", incentivi: 74.50, risparmio: 37.70, vendita: 22.00, totale: 134.20 },
    ],
    breakdown: {
      incentives: {
        gse: 285.50,
        regional: 125.25,
        municipal: 48.00,
      },
      savings: {
        selfConsumption: 189.30,
        peakShaving: 28.20,
        efficiency: 17.00,
      },
      revenue: {
        gridSales: 98.50,
        certificates: 27.30,
      },
    },
    history: [
      {
        date: "05/06/2024",
        type: "Incentivo GSE",
        description: "Incentivo mensile produzione maggio",
        amount: 85.90,
        status: "Pagato",
      },
      {
        date: "03/06/2024",
        type: "Vendita Energia",
        description: "Vendita eccedenza maggio",
        amount: 23.10,
        status: "In elaborazione",
      },
      {
        date: "01/06/2024",
        type: "Risparmio",
        description: "Risparmio autoconsumo maggio",
        amount: 41.20,
        status: "Confermato",
      },
      {
        date: "28/05/2024",
        type: "Incentivo Regionale",
        description: "Bonus efficienza energetica Q2",
        amount: 125.25,
        status: "Pagato",
      },
      {
        date: "05/05/2024",
        type: "Incentivo GSE",
        description: "Incentivo mensile produzione aprile",
        amount: 82.15,
        status: "Pagato",
      },
    ],
  }
}

export default async function BeneficiPage() {
  const { stats, monthlyData, breakdown, history } = await getBenefitsData()
  
  return (
    <div className="space-y-6">
      <BenefitsPageHeader />
      <BenefitsStats stats={stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <BenefitsChart data={monthlyData} />
        <BenefitsBreakdown breakdown={breakdown} />
      </div>
      <BenefitsHistory history={history} />
    </div>
  )
}