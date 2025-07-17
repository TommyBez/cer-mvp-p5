import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function BeneficiCta() {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-0">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Vuoi massimizzare i tuoi benefici?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Scopri come ottimizzare i tuoi consumi per aumentare il risparmio
            </p>
          </div>
          <Button>
            Richiedi Consulenza
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}