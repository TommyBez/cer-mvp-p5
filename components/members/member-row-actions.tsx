"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MemberFormDialog } from "./member-form-dialog"

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

interface MemberRowActionsProps {
  member: Member
}

export function MemberRowActions({ member }: MemberRowActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEdit = (updatedMember: Member) => {
    // In a real app, this would call an API
    console.log("Updating member:", updatedMember)
    setIsEditDialogOpen(false)
    // Trigger a revalidation or use server actions
  }

  const handleDelete = () => {
    // In a real app, this would call an API
    console.log("Deleting member:", member.id)
    // Trigger a revalidation or use server actions
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Azioni</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Modifica
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleDelete}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Elimina
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <MemberFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        member={member}
        onSave={handleEdit}
      />
    </>
  )
}