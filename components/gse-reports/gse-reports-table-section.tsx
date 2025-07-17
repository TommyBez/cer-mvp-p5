import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GSEReportsTableContent } from "./gse-reports-table-content"

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

interface GSEReportsTableSectionProps {
  initialReports: Report[]
}

export function GSEReportsTableSection({ initialReports }: GSEReportsTableSectionProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Report Inviati</CardTitle>
        <CardDescription>
          Elenco dei report inviati al GSE
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GSEReportsTableContent reports={initialReports} />
      </CardContent>
    </Card>
  )
}