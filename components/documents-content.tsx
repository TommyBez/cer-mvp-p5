"use client"

import { useState } from "react"
import { DocumentsHeader } from "./documents/documents-header"
import { DocumentsStats } from "./documents/documents-stats"
import { DocumentsTable } from "./documents/documents-table"
import { DocumentFormDialog } from "./documents/document-form-dialog"

interface Document {
  id: number
  name: string
  type: string
  size: string
  uploadDate: string
  uploadedBy: string
  status: string
  description: string
}

interface DocumentsData {
  documents: Document[]
  stats: {
    totalDocuments: number
    publishedDocuments: number
    pendingDocuments: number
    rejectedDocuments: number
    totalSize: string
    recentUploads: number
  }
}

interface DocumentsContentProps {
  initialData: DocumentsData
}

export function DocumentsContent({ initialData }: DocumentsContentProps) {
  const [documents, setDocuments] = useState(initialData.documents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleUploadDocument = (newDocument: Omit<Document, "id" | "uploadDate" | "uploadedBy" | "size">) => {
    const document = {
      ...newDocument,
      id: Math.max(...documents.map(d => d.id)) + 1,
      uploadDate: new Date().toLocaleDateString('it-IT'),
      uploadedBy: "Admin", // In real app, get from auth context
      size: "0 KB", // In real app, calculate from file
    }
    setDocuments([document, ...documents])
    setIsDialogOpen(false)
  }

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  const handleDownloadDocument = (document: Document) => {
    // In real app, trigger file download
    console.log("Downloading:", document.name)
  }

  return (
    <div className="space-y-6">
      <DocumentsHeader onUploadClick={() => setIsDialogOpen(true)} />
      <DocumentsStats stats={initialData.stats} />
      <DocumentsTable 
        documents={documents}
        onDelete={handleDeleteDocument}
        onDownload={handleDownloadDocument}
      />
      <DocumentFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleUploadDocument}
      />
    </div>
  )
}