import { GSEReportsPageHeader } from "@/components/gse-reports/gse-reports-page-header"
import { GSEReportsStats } from "@/components/gse-reports/gse-reports-stats"
import { GSEReportsTableSection } from "@/components/gse-reports/gse-reports-table-section"
import { GSEReportsDeadlines } from "@/components/gse-reports/gse-reports-deadlines"

// Simulate async data fetching
async function getGSEReportsData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    reports: [
      {
        id: 1,
        period: "Marzo 2024",
        type: "Mensile",
        status: "Completato",
        submissionDate: "31/03/2024",
        energyProduced: "45,230 kWh",
        energyShared: "38,450 kWh",
        incentiveAmount: "€ 4,229.50",
        paymentStatus: "Pagato",
        downloadUrl: "#",
      },
      {
        id: 2,
        period: "Febbraio 2024",
        type: "Mensile",
        status: "Completato",
        submissionDate: "29/02/2024",
        energyProduced: "41,850 kWh",
        energyShared: "35,200 kWh",
        incentiveAmount: "€ 3,872.00",
        paymentStatus: "Pagato",
        downloadUrl: "#",
      },
      {
        id: 3,
        period: "Gennaio 2024",
        type: "Mensile",
        status: "Completato",
        submissionDate: "31/01/2024",
        energyProduced: "39,120 kWh",
        energyShared: "32,100 kWh",
        incentiveAmount: "€ 3,531.00",
        paymentStatus: "In attesa",
        downloadUrl: "#",
      },
      {
        id: 4,
        period: "Q4 2023",
        type: "Trimestrale",
        status: "Completato",
        submissionDate: "15/01/2024",
        energyProduced: "125,450 kWh",
        energyShared: "105,230 kWh",
        incentiveAmount: "€ 11,575.30",
        paymentStatus: "Pagato",
        downloadUrl: "#",
      },
    ],
    stats: {
      totalReports: 48,
      pendingReports: 3,
      totalEnergyShared: "1,234,567 kWh",
      totalIncentives: "€ 135,802.40",
      averageShareRate: "85.2%",
      nextDeadline: "30/04/2024",
    },
    upcomingDeadlines: [
      { period: "Aprile 2024", type: "Mensile", deadline: "30/04/2024" },
      { period: "Q1 2024", type: "Trimestrale", deadline: "15/04/2024" },
      { period: "Maggio 2024", type: "Mensile", deadline: "31/05/2024" },
    ]
  }
}

export default async function GseReportsPage() {
  const { reports, stats, upcomingDeadlines } = await getGSEReportsData()
  
  return (
    <div className="space-y-6">
      <GSEReportsPageHeader />
      <GSEReportsStats stats={stats} />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GSEReportsTableSection initialReports={reports} />
        </div>
        <GSEReportsDeadlines deadlines={upcomingDeadlines} />
      </div>
    </div>
  )
}