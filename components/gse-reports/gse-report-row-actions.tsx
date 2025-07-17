"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface GSEReportRowActionsProps {
  report: Report
}

export function GSEReportRowActions({ report }: GSEReportRowActionsProps) {
  const handleDownload = () => {
    // In a real app, this would trigger file download
    console.log("Downloading report:", report.period)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4" />
    </Button>
  )
}