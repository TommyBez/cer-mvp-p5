import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DocumentiInfoAlert() {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Conservazione Documenti</AlertTitle>
      <AlertDescription>
        Tutti i documenti sono conservati in modo sicuro e sono sempre accessibili dal tuo account. 
        I documenti fiscali sono conservati per 10 anni come previsto dalla normativa.
      </AlertDescription>
    </Alert>
  )
}