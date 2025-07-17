"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MembersTableFilters } from "./members-table-filters"
import { MembersTableContent } from "./members-table-content"

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

interface MembersTableSectionProps {
  initialMembers: Member[]
}

export function MembersTableSection({ initialMembers }: MembersTableSectionProps) {
  const [members] = useState(initialMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Elenco Membri</CardTitle>
            <CardDescription>
              Visualizza e gestisci tutti i membri della comunità
            </CardDescription>
          </div>
          <MembersTableFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            roleFilter={roleFilter}
            onRoleChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>
      </CardHeader>
      <CardContent>
        <MembersTableContent members={filteredMembers} />
      </CardContent>
    </Card>
  )
}