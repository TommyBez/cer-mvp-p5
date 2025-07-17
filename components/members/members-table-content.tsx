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
      header: "Membro", 
      accessorKey: "member",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {row.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Ruolo", 
      accessorKey: "role",
      cell: (row: any) => (
        <Badge variant={row.role === "Produttore" ? "default" : "secondary"}>
          {row.role}
        </Badge>
      )
    },
    { 
      header: "Stato", 
      accessorKey: "status",
      cell: (row: any) => (
        <Badge 
          variant={
            row.status === "Attivo" ? "default" : 
            row.status === "In attesa" ? "secondary" : 
            "destructive"
          }
        >
          {row.status}
        </Badge>
      )
    },
    { header: "Energia Condivisa", accessorKey: "energyShared", className: "text-right" },
    { header: "Data Iscrizione", accessorKey: "joinDate" },
    {
      header: "Azioni",
      accessorKey: "actions",
      cell: (row: any) => <MemberRowActions member={row} />
    }
  ]

  return (
    <ResponsiveTableAdvanced
      columns={columns}
      data={members}
      pageSize={10}
      hideSearch
    />
  )
}