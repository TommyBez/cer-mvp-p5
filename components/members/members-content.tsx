import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMembers } from "@/lib/data-service"
import { MembersTable } from "./members-table"

export async function MembersContent() {
  const members = await getMembers()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestione Membri</CardTitle>
        <CardDescription>
          Visualizza e gestisci i membri della comunità energetica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MembersTable initialData={members} />
      </CardContent>
    </Card>
  )
}