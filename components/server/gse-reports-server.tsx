import { GSEReportsClient } from "@/components/client/gse-reports-client"

type GSEReport = {
  id: number
  reportType: string
  period: string
  status: string
  submissionDate: string
  amount: string
}

interface GSEReportsServerProps {
  reports: GSEReport[]
}

export function GSEReportsServer({ reports }: GSEReportsServerProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Report GSE</h2>
        <p className="text-muted-foreground">
          Gestisci i report da inviare al Gestore dei Servizi Energetici.
        </p>
      </div>
      
      <GSEReportsClient reports={reports} />
    </div>
  )
}