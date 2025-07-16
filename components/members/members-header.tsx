import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MembersHeaderProps {
  onAddClick: () => void
}

export function MembersHeader({ onAddClick }: MembersHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestione Membri</h1>
        <p className="text-muted-foreground">
          Gestisci i membri della comunità energetica
        </p>
      </div>
      <Button onClick={onAddClick}>
        <Plus className="mr-2 h-4 w-4" />
        Aggiungi Membro
      </Button>
    </div>
  )
}