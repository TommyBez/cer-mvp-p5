"use client"

import { Badge } from "@/components/ui/badge"
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { GSEReportRowActions } from "./gse-report-row-actions"

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

interface GSEReportsTableContentProps {
  reports: Report[]
}

export function GSEReportsTableContent({ reports }: GSEReportsTableContentProps) {
  const columns = [
    { 
      key: "period",
      header: "Periodo", 
      accessor: (report: Report) => report.period,
      priority: 3,
      sortable: true
    },
    { 
      key: "type",
      header: "Tipo", 
      accessor: (report: Report) => (
        <Badge variant="outline">
          {report.type}
        </Badge>
      ),
      priority: 2
    },
    { 
      key: "status",
      header: "Stato", 
      accessor: (report: Report) => (
        <Badge 
          variant={report.status === "Completato" ? "default" : "secondary"}
        >
          {report.status}
        </Badge>
      ),
      priority: 3,
      sortable: true
    },
    { 
      key: "submissionDate",
      header: "Data Invio", 
      accessor: (report: Report) => report.submissionDate,
      priority: 2,
      sortable: true
    },
    { 
      key: "energyProduced",
      header: "Energia Prodotta", 
      accessor: (report: Report) => report.energyProduced,
      priority: 1,
      sortable: true
    },
    { 
      key: "energyShared",
      header: "Energia Condivisa", 
      accessor: (report: Report) => report.energyShared,
      priority: 1,
      sortable: true
    },
    { 
      key: "incentiveAmount",
      header: "Incentivo", 
      accessor: (report: Report) => report.incentiveAmount,
      priority: 2,
      sortable: true
    },
    { 
      key: "paymentStatus",
      header: "Pagamento", 
      accessor: (report: Report) => (
        <Badge 
          variant={report.paymentStatus === "Pagato" ? "default" : "secondary"}
        >
          {report.paymentStatus}
        </Badge>
      ),
      priority: 2
    },
    {
      key: "actions",
      header: "Azioni",
      accessor: (report: Report) => <GSEReportRowActions report={report} />,
      priority: 3
    }
  ]

  return (
    <ResponsiveTableAdvanced
      data={reports}
      columns={columns}
      getRowKey={(report) => report.id}
      enableSorting={true}
      enableFiltering={false}
      enablePagination={true}
      itemsPerPage={10}
      mobileLayout="card"
    />
  )
}