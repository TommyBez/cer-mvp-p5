import { MembersManagementClient } from "@/components/client/members-management-client"

type Member = {
  id: number
  name: string
  email: string
  role: string
  status: string
  energyShared: string
  joinDate: string
  address: string
  phone: string
  fiscalCode: string
}

interface MembersManagementServerProps {
  members: Member[]
}

export function MembersManagementServer({ members }: MembersManagementServerProps) {
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