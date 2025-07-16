"use client"

import { useState } from "react"
import { MembersHeader } from "./members/members-header"
import { MembersStats } from "./members/members-stats"
import { MembersTable } from "./members/members-table"
import { MemberFormDialog } from "./members/member-form-dialog"

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

interface MembersData {
  members: Member[]
  stats: {
    totalMembers: number
    activeMembers: number
    pendingMembers: number
    suspendedMembers: number
    totalEnergyShared: string
    averageEnergyPerMember: string
  }
}

interface MembersContentProps {
  initialData: MembersData
}

export function MembersContent({ initialData }: MembersContentProps) {
  const [members, setMembers] = useState(initialData.members)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)

  const handleAddMember = (newMember: Omit<Member, "id">) => {
    const member = {
      ...newMember,
      id: Math.max(...members.map(m => m.id)) + 1,
    }
    setMembers([...members, member])
    setIsDialogOpen(false)
  }

  const handleEditMember = (updatedMember: Member) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m))
    setIsDialogOpen(false)
    setEditingMember(null)
  }

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id))
  }

  const openEditDialog = (member: Member) => {
    setEditingMember(member)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditingMember(null)
  }

  return (
    <div className="space-y-6">
      <MembersHeader onAddClick={() => setIsDialogOpen(true)} />
      <MembersStats stats={initialData.stats} />
      <MembersTable 
        members={members}
        onEdit={openEditDialog}
        onDelete={handleDeleteMember}
      />
      <MemberFormDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        member={editingMember}
        onSave={editingMember ? handleEditMember : handleAddMember}
      />
    </div>
  )
}