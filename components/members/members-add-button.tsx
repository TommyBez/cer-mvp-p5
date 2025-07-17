"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MemberFormDialog } from "./member-form-dialog"

export function MembersAddButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddMember = (newMember: any) => {
    // In a real app, this would call an API
    console.log("Adding member:", newMember)
    setIsDialogOpen(false)
    // Trigger a revalidation or use server actions
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Aggiungi Membro
      </Button>
      <MemberFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        member={null}
        onSave={handleAddMember}
      />
    </>
  )
}