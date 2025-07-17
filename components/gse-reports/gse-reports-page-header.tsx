import { GSEReportsCreateButton } from "./gse-reports-create-button"

export function GSEReportsPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report GSE</h1>
        <p className="text-muted-foreground">
          Gestisci i report e le pratiche con il Gestore dei Servizi Energetici
        </p>
      </div>
      <GSEReportsCreateButton />
    </div>
  )
}