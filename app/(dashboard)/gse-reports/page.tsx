import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = 'force-dynamic'

export default function GSEReportsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Report GSE</CardTitle>
          <CardDescription>
            I report GSE saranno disponibili a breve
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