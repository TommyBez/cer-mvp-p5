import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"

export function ConsumptionPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">I miei Consumi</h1>
        <p className="text-muted-foreground">
          Monitora i tuoi consumi energetici e la produzione in tempo reale
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Ultimo mese
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Esporta dati
        </Button>
      </div>
    </div>
  )
}