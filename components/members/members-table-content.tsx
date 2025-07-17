"use client"

import { Badge } from "@/components/ui/badge"
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { MemberRowActions } from "./member-row-actions"

interface Member {
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

interface MembersTableContentProps {
  members: Member[]
}

export function MembersTableContent({ members }: MembersTableContentProps) {
  const columns = [
    { 
      key: "member",
      header: "Membro", 
      accessor: (member: Member) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {member.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
        </div>
      ),
      priority: 3,
      filterable: true
    },
    { 
      key: "role",
      header: "Ruolo", 
      accessor: (member: Member) => (
        <Badge variant={member.role === "Produttore" ? "default" : "secondary"}>
          {member.role}
        </Badge>
      ),
      priority: 2,
      sortable: true
    },
    { 
      key: "status",
      header: "Stato", 
      accessor: (member: Member) => (
        <Badge 
          variant={
            member.status === "Attivo" ? "default" : 
            member.status === "In attesa" ? "secondary" : 
            "destructive"
          }
        >
          {member.status}
        </Badge>
      ),
      priority: 2,
      sortable: true
    },
    { 
      key: "energyShared",
      header: "Energia Condivisa", 
      accessor: (member: Member) => member.energyShared,
      priority: 1,
      sortable: true
    },
    { 
      key: "joinDate",
      header: "Data Iscrizione", 
      accessor: (member: Member) => member.joinDate,
      priority: 1,
      sortable: true
    },
    {
      key: "actions",
      header: "Azioni",
      accessor: (member: Member) => <MemberRowActions member={member} />,
      priority: 3
    }
  ]

  return (
    <ResponsiveTableAdvanced
      data={members}
      columns={columns}
      getRowKey={(member) => member.id}
      enableSorting={true}
      enableFiltering={false}
      enablePagination={true}
      itemsPerPage={10}
      mobileLayout="card"
    />
  )
}