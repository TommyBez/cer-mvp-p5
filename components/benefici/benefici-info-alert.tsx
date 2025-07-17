import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function BeneficiInfoAlert() {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Come funzionano gli incentivi</AlertTitle>
      <AlertDescription>
        Gli incentivi della CER includono la tariffa premio GSE (110€/MWh), la restituzione delle componenti tariffarie e la valorizzazione dell'energia eccedente. Il pagamento avviene trimestralmente.
      </AlertDescription>
    </Alert>
  )
}