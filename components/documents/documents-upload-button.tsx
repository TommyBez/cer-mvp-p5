"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentFormDialog } from "./document-form-dialog"

export function DocumentsUploadButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleUploadDocument = (newDocument: any) => {
    // In a real app, this would call an API
    console.log("Uploading document:", newDocument)
    setIsDialogOpen(false)
    // Trigger a revalidation or use server actions
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Carica Documento
      </Button>
      <DocumentFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleUploadDocument}
      />
    </>
  )
}