import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, File, BarChart, FileCheck } from "lucide-react"

interface DocumentiMetricsProps {
  metrics: {
    totalDocuments: number
    personalDocuments: number
    reportsAvailable: number
    newDocuments: number
  }
}

export function DocumentiMetrics({ metrics }: DocumentiMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Totale Documenti</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalDocuments}</div>
          <p className="text-xs text-muted-foreground">Disponibili per il download</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Documenti Personali</CardTitle>
          <File className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.personalDocuments}</div>
          <p className="text-xs text-muted-foreground">Contratti e schede tecniche</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Report Disponibili</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.reportsAvailable}</div>
          <p className="text-xs text-muted-foreground">Analisi e statistiche</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nuovi Documenti</CardTitle>
          <FileCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.newDocuments}</div>
          <p className="text-xs text-muted-foreground">Ultimi 7 giorni</p>
        </CardContent>
      </Card>
    </div>
  )
}