import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = 'force-dynamic'

export default function SimulationPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Simulazione Economica</CardTitle>
          <CardDescription>
            La simulazione economica sarà disponibile a breve
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Questa pagina è in fase di refactoring per seguire le best practices di Next.js 15.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}