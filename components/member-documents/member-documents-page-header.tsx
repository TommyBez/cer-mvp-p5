import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Upload } from "lucide-react"

export function MemberDocumentsPageHeader() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">I miei Documenti</h1>
          <p className="text-muted-foreground">
            Accedi a tutti i tuoi documenti, contratti e report energetici
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Richiedi Documento
        </Button>
      </div>
      
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Cerca documenti..." 
          className="pl-9"
        />
      </div>
    </div>
  )
}