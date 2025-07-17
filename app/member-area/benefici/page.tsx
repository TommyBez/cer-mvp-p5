import { MemberAreaAuthCheck } from "@/components/member-area/member-area-auth-check"
import { BeneficiPageHeader } from "@/components/benefici/benefici-page-header"
import { BeneficiMetrics } from "@/components/benefici/benefici-metrics"
import { BeneficiInfoAlert } from "@/components/benefici/benefici-info-alert"
import { BeneficiCharts } from "@/components/benefici/benefici-charts"
import { BeneficiCalculator } from "@/components/benefici/benefici-calculator"
import { BeneficiBreakdown } from "@/components/benefici/benefici-breakdown"
import { BeneficiTransactions } from "@/components/benefici/benefici-transactions"
import { BeneficiCta } from "@/components/benefici/benefici-cta"

// Simulate async data fetching
async function getBeneficiData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    metrics: {
      totalSavings2024: 270,
      monthlyIncentive: 32,
      monthlyIncentiveTrend: 12,
      billSavings: 58,
      nextPayment: 95,
      nextPaymentDate: "25/01",
    },
    monthlyBenefits: [
      { month: "Gen", risparmio: 45, incentivi: 23, totale: 68 },
      { month: "Feb", risparmio: 52, incentivi: 28, totale: 80 },
      { month: "Mar", risparmio: 48, incentivi: 25, totale: 73 },
      { month: "Apr", risparmio: 58, incentivi: 32, totale: 90 },
      { month: "Mag", risparmio: 62, incentivi: 35, totale: 97 },
      { month: "Giu", risparmio: 55, incentivi: 30, totale: 85 },
    ],
    yearlyComparison: [
      { year: "2021", senzaCER: 1200, conCER: 1200, risparmio: 0 },
      { year: "2022", senzaCER: 1350, conCER: 1180, risparmio: 170 },
      { year: "2023", senzaCER: 1450, conCER: 1050, risparmio: 400 },
      { year: "2024", senzaCER: 750, conCER: 480, risparmio: 270 },
    ],
    incentiveBreakdown: [
      { name: "Tariffa Incentivante", value: 35, color: "#16a34a" },
      { name: "Restituzione Componenti", value: 25, color: "#2563eb" },
      { name: "Valorizzazione Eccedenze", value: 15, color: "#7c3aed" },
      { name: "Bonus Sociale", value: 25, color: "#ea580c" },
    ],
    transactions: [
      { id: 1, date: "2024-01-15", type: "Incentivo GSE", amount: 28.50, status: "Accreditato" },
      { id: 2, date: "2024-01-10", type: "Risparmio Bolletta", amount: 45.20, status: "Applicato" },
      { id: 3, date: "2024-01-05", type: "Bonus Sociale", amount: 15.00, status: "Accreditato" },
      { id: 4, date: "2023-12-15", type: "Incentivo GSE", amount: 32.80, status: "Accreditato" },
      { id: 5, date: "2023-12-10", type: "Risparmio Bolletta", amount: 52.10, status: "Applicato" },
    ],
    additionalBenefits: [
      {
        id: 1,
        type: "savings",
        title: "Riduzione Costi Fissi",
        description: "Risparmio del 15% sui costi fissi in bolletta",
      },
      {
        id: 2,
        type: "tax",
        title: "Detrazioni Fiscali",
        description: "Possibilità di detrazioni per investimenti green",
      },
      {
        id: 3,
        type: "stability",
        title: "Stabilità Prezzi",
        description: "Protezione dalle fluttuazioni del mercato energetico",
      },
    ],
  }
}

export default async function BeneficiPage() {
  const data = await getBeneficiData()

  return (
    <>
      <MemberAreaAuthCheck />
      <div className="space-y-6">
        <BeneficiPageHeader />
        <BeneficiMetrics metrics={data.metrics} />
        <BeneficiInfoAlert />
        <BeneficiCharts 
          monthlyBenefits={data.monthlyBenefits}
          yearlyComparison={data.yearlyComparison}
        />
        <BeneficiCalculator />
        <BeneficiBreakdown 
          incentiveBreakdown={data.incentiveBreakdown}
          additionalBenefits={data.additionalBenefits}
        />
        <BeneficiTransactions transactions={data.transactions} />
        <BeneficiCta />
      </div>
    </>
  )
}