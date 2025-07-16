"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Download,
  Send,
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type GSEReport = {
  id: number
  reportType: string
  period: string
  status: string
  submissionDate: string
  amount: string
}

interface GSEReportsClientProps {
  reports: GSEReport[]
}

export function GSEReportsClient({ reports }: GSEReportsClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter reports based on search and status
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.period.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "inviato":
        return "default"
      case "approvato":
        return "default"
      case "in preparazione":
        return "outline"
      case "rifiutato":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleView = (reportId: number) => {
    console.log("Viewing report:", reportId)
  }

  const handleDownload = (reportId: number) => {
    console.log("Downloading report:", reportId)
  }

  const handleSubmit = (reportId: number) => {
    console.log("Submitting report:", reportId)
  }

  const columns = [
    {
      accessorKey: "reportType",
      header: "Tipo Report",
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue("reportType")}</div>
      ),
    },
    {
      accessorKey: "period",
      header: "Periodo",
      cell: ({ row }: any) => (
        <div className="text-sm">{row.getValue("period")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Stato",
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        return (
          <Badge variant={getStatusBadgeVariant(status as string)}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "submissionDate",
      header: "Data Invio",
      cell: ({ row }: any) => (
        <div className="text-sm">{row.getValue("submissionDate")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Importo",
      cell: ({ row }: any) => (
        <div className="font-mono text-sm font-medium">{row.getValue("amount")}</div>
      ),
    },
    {
      id: "actions",
      header: "Azioni",
      cell: ({ row }: any) => {
        const report = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleView(report.id)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(report.id)}
            >
              <Download className="h-4 w-4" />
            </Button>
            {report.status === "In preparazione" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(report.id)}
                className="text-blue-600 hover:text-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle>Report GSE</CardTitle>
            <CardDescription>
              Gestisci i report da inviare al Gestore dei Servizi Energetici.
            </CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuovo Report
          </Button>
        </div>
        
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca report..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtra per stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli stati</SelectItem>
              <SelectItem value="Inviato">Inviato</SelectItem>
              <SelectItem value="Approvato">Approvato</SelectItem>
              <SelectItem value="In preparazione">In preparazione</SelectItem>
              <SelectItem value="Rifiutato">Rifiutato</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <ResponsiveTableAdvanced
          columns={columns}
          data={filteredReports}
        />
      </CardContent>
    </Card>
  )
}