import { fetchMembers } from "@/lib/data"
import { MembersManagementClient } from "@/components/client/members-management-client"

export default async function MembersPage() {
  const members = await fetchMembers()
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Gestione Membri</h2>
        <p className="text-muted-foreground">
          Gestisci i membri della tua Comunità Energetica Rinnovabile.
        </p>
      </div>
      
      <MembersManagementClient members={members} />
    </div>
  )
}
