import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentsHeaderProps {
  onUploadClick: () => void
}

export function DocumentsHeader({ onUploadClick }: DocumentsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestione Documenti</h1>
        <p className="text-muted-foreground">
          Gestisci i documenti della comunità energetica
        </p>
      </div>
      <Button onClick={onUploadClick}>
        <Upload className="mr-2 h-4 w-4" />
        Carica Documento
      </Button>
    </div>
  )
}