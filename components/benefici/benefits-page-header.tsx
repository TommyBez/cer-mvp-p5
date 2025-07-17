import { Button } from "@/components/ui/button"
import { Calendar, Download, Info } from "lucide-react"

export function BenefitsPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Benefici Economici</h1>
        <p className="text-muted-foreground">
          Monitora i tuoi guadagni, risparmi e incentivi dalla comunità energetica
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Ultimo semestre
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Scarica report
        </Button>
        <Button variant="outline" size="sm">
          <Info className="mr-2 h-4 w-4" />
          Info incentivi
        </Button>
      </div>
    </div>
  )
}