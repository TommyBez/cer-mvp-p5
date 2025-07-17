"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GSEReportFormDialog } from "./gse-report-form-dialog"

export function GSEReportsCreateButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateReport = (newReport: any) => {
    // In a real app, this would call an API
    console.log("Creating report:", newReport)
    setIsDialogOpen(false)
    // Trigger a revalidation or use server actions
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <FileText className="mr-2 h-4 w-4" />
        Crea Report
      </Button>
      <GSEReportFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleCreateReport}
      />
    </>
  )
}