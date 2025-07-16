"use client"

import { useState } from "react"
import { GSEReportsHeader } from "./gse-reports/gse-reports-header"
import { GSEReportsStats } from "./gse-reports/gse-reports-stats"
import { GSEReportsTable } from "./gse-reports/gse-reports-table"
import { GSEReportsDeadlines } from "./gse-reports/gse-reports-deadlines"
import { GSEReportFormDialog } from "./gse-reports/gse-report-form-dialog"

interface Report {
  id: number
  period: string
  type: string
  status: string
  submissionDate: string
  energyProduced: string
  energyShared: string
  incentiveAmount: string
  paymentStatus: string
  downloadUrl: string
}

interface GSEReportsData {
  reports: Report[]
  stats: {
    totalReports: number
    pendingReports: number
    totalEnergyShared: string
    totalIncentives: string
    averageShareRate: string
    nextDeadline: string
  }
  upcomingDeadlines: Array<{
    period: string
    type: string
    deadline: string
  }>
}

interface GSEReportsContentProps {
  initialData: GSEReportsData
}

export function GSEReportsContent({ initialData }: GSEReportsContentProps) {
  const [reports, setReports] = useState(initialData.reports)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateReport = (newReport: Omit<Report, "id" | "submissionDate" | "downloadUrl">) => {
    const report = {
      ...newReport,
      id: Math.max(...reports.map(r => r.id)) + 1,
      submissionDate: new Date().toLocaleDateString('it-IT'),
      downloadUrl: "#",
    }
    setReports([report, ...reports])
    setIsDialogOpen(false)
  }

  const handleDownloadReport = (report: Report) => {
    // In real app, trigger report download
    console.log("Downloading report:", report.period)
  }

  return (
    <div className="space-y-6">
      <GSEReportsHeader onCreateClick={() => setIsDialogOpen(true)} />
      <GSEReportsStats stats={initialData.stats} />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GSEReportsTable 
            reports={reports}
            onDownload={handleDownloadReport}
          />
        </div>
        <GSEReportsDeadlines deadlines={initialData.upcomingDeadlines} />
      </div>

      <GSEReportFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleCreateReport}
      />
    </div>
  )
}