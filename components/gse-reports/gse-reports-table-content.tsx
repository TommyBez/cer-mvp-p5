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
    { header: "Periodo", accessorKey: "period" },
    { 
      header: "Tipo", 
      accessorKey: "type",
      cell: (row: any) => (
        <Badge variant="outline">
          {row.type}
        </Badge>
      )
    },
    { 
      header: "Stato", 
      accessorKey: "status",
      cell: (row: any) => (
        <Badge 
          variant={row.status === "Completato" ? "default" : "secondary"}
        >
          {row.status}
        </Badge>
      )
    },
    { header: "Data Invio", accessorKey: "submissionDate" },
    { header: "Energia Prodotta", accessorKey: "energyProduced", className: "text-right" },
    { header: "Energia Condivisa", accessorKey: "energyShared", className: "text-right" },
    { header: "Incentivo", accessorKey: "incentiveAmount", className: "text-right" },
    { 
      header: "Pagamento", 
      accessorKey: "paymentStatus",
      cell: (row: any) => (
        <Badge 
          variant={
            row.paymentStatus === "Pagato" ? "default" : 
            row.paymentStatus === "In attesa" ? "secondary" : 
            "destructive"
          }
        >
          {row.paymentStatus}
        </Badge>
      )
    },
    {
      header: "Azioni",
      accessorKey: "actions",
      cell: (row: any) => <GSEReportRowActions report={row} />
    }
  ]

  return (
    <ResponsiveTableAdvanced
      columns={columns}
      data={reports}
      pageSize={5}
      hideSearch
    />
  )
}