import { MemberAreaAuthCheck } from "@/components/member-area/member-area-auth-check"
import { ConsumiPageHeader } from "@/components/consumi/consumi-page-header"
import { ConsumiMetrics } from "@/components/consumi/consumi-metrics"
import { ConsumiChartSection } from "@/components/consumi/consumi-chart-section"
import { ConsumiTimeAnalysis } from "@/components/consumi/consumi-time-analysis"
import { ConsumiDetailsTable } from "@/components/consumi/consumi-details-table"
import { ConsumiSuggestions } from "@/components/consumi/consumi-suggestions"

// Simulate async data fetching
async function getConsumiData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    metrics: {
      todayConsumption: 12.5,
      todayTrend: -8,
      sharedEnergy: 5.8,
      sharedPercentage: 46,
      dailyPeak: 3.0,
      peakTime: "18:00",
      monthlyForecast: 375,
      monthlyForecastCost: 112.50,
    },
    weeklyData: [
      { day: "Lun", consumo: 24, condiviso: 8, produzione: 5 },
      { day: "Mar", consumo: 18, condiviso: 12, produzione: 8 },
      { day: "Mer", consumo: 32, condiviso: 15, produzione: 10 },
      { day: "Gio", consumo: 28, condiviso: 10, produzione: 6 },
      { day: "Ven", consumo: 22, condiviso: 14, produzione: 9 },
      { day: "Sab", consumo: 35, condiviso: 18, produzione: 12 },
      { day: "Dom", consumo: 30, condiviso: 16, produzione: 11 },
    ],
    monthlyData: [
      { mese: "Gen", consumo: 520, condiviso: 250, produzione: 180 },
      { mese: "Feb", consumo: 480, condiviso: 280, produzione: 200 },
      { mese: "Mar", consumo: 550, condiviso: 320, produzione: 280 },
      { mese: "Apr", consumo: 510, condiviso: 340, produzione: 320 },
      { mese: "Mag", consumo: 490, condiviso: 350, produzione: 380 },
      { mese: "Giu", consumo: 530, condiviso: 330, produzione: 350 },
    ],
    yearlyData: [
      { anno: "2021", consumo: 6200, condiviso: 2800, produzione: 2200 },
      { anno: "2022", consumo: 5900, condiviso: 3100, produzione: 2600 },
      { anno: "2023", consumo: 5700, condiviso: 3500, produzione: 3000 },
      { anno: "2024", consumo: 2850, condiviso: 1800, produzione: 1600 },
    ],
    hourlyData: [
      { ora: "00:00", consumo: 0.5, produzione: 0 },
      { ora: "02:00", consumo: 0.4, produzione: 0 },
      { ora: "04:00", consumo: 0.3, produzione: 0 },
      { ora: "06:00", consumo: 0.8, produzione: 0.2 },
      { ora: "08:00", consumo: 1.5, produzione: 0.8 },
      { ora: "10:00", consumo: 2.2, produzione: 1.5 },
      { ora: "12:00", consumo: 2.8, produzione: 2.0 },
      { ora: "14:00", consumo: 2.5, produzione: 1.8 },
      { ora: "16:00", consumo: 2.0, produzione: 1.2 },
      { ora: "18:00", consumo: 3.0, produzione: 0.5 },
      { ora: "20:00", consumo: 2.5, produzione: 0 },
      { ora: "22:00", consumo: 1.2, produzione: 0 },
    ],
    deviceData: [
      { name: "Climatizzazione", value: 35, color: "#ea580c" },
      { name: "Elettrodomestici", value: 25, color: "#16a34a" },
      { name: "Illuminazione", value: 15, color: "#2563eb" },
      { name: "Cucina", value: 20, color: "#7c3aed" },
      { name: "Altri", value: 5, color: "#6b7280" },
    ],
    detailedConsumption: [
      { id: 1, date: "2024-01-15", time: "14:30", device: "Condizionatore", consumption: 2.5, cost: 0.75 },
      { id: 2, date: "2024-01-15", time: "10:15", device: "Lavatrice", consumption: 1.8, cost: 0.54 },
      { id: 3, date: "2024-01-14", time: "19:00", device: "Forno", consumption: 3.2, cost: 0.96 },
      { id: 4, date: "2024-01-14", time: "08:00", device: "Asciugatrice", consumption: 2.0, cost: 0.60 },
      { id: 5, date: "2024-01-13", time: "21:30", device: "TV + Console", consumption: 0.8, cost: 0.24 },
    ],
    timeAnalysis: {
      dayTime: {
        averageConsumption: 2.1,
        percentage: 65,
      },
      nightTime: {
        averageConsumption: 1.2,
        percentage: 35,
      },
    },
    suggestions: [
      {
        id: 1,
        type: "warning",
        title: "Picco serale elevato",
        description: "Il tuo consumo aumenta del 40% tra le 18:00 e le 20:00. Prova a spostare alcuni carichi in fascia diurna per massimizzare l'energia condivisa.",
      },
      {
        id: 2,
        type: "success",
        title: "Ottimo utilizzo dell'energia condivisa",
        description: "Stai utilizzando il 46% di energia condivisa. Continua così! Potresti aumentare ancora programmando la lavatrice nelle ore centrali della giornata.",
      },
    ],
  }
}

export default async function ConsumiPage() {
  const data = await getConsumiData()

  return (
    <>
      <MemberAreaAuthCheck />
      <div className="space-y-6">
        <ConsumiPageHeader />
        <ConsumiMetrics metrics={data.metrics} />
        <ConsumiChartSection 
          weeklyData={data.weeklyData}
          monthlyData={data.monthlyData}
          yearlyData={data.yearlyData}
          hourlyData={data.hourlyData}
          deviceData={data.deviceData}
        />
        <ConsumiTimeAnalysis timeAnalysis={data.timeAnalysis} />
        <ConsumiDetailsTable data={data.detailedConsumption} />
        <ConsumiSuggestions suggestions={data.suggestions} />
      </div>
    </>
  )
}