"use client"

import { FileText, FileSpreadsheet, FileImage, File } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { DocumentRowActions } from "./document-row-actions"

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

interface DocumentsTableContentProps {
  documents: Document[]
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'contratto':
    case 'regolamento':
      return <FileText className="h-5 w-5" />
    case 'report':
      return <FileSpreadsheet className="h-5 w-5" />
    case 'guida':
      return <FileImage className="h-5 w-5" />
    default:
      return <File className="h-5 w-5" />
  }
}

export function DocumentsTableContent({ documents }: DocumentsTableContentProps) {
  const columns = [
    { 
      key: "document",
      header: "Documento", 
      accessor: (doc: Document) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
            {getFileIcon(doc.type)}
          </div>
          <div>
            <div className="font-medium">{doc.name}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">{doc.description}</div>
          </div>
        </div>
      ),
      priority: 3,
      filterable: true
    },
    { 
      key: "type",
      header: "Tipo", 
      accessor: (doc: Document) => (
        <Badge variant="secondary">{doc.type}</Badge>
      ),
      priority: 2,
      sortable: true
    },
    { 
      key: "size",
      header: "Dimensione", 
      accessor: (doc: Document) => doc.size,
      priority: 1,
      sortable: true
    },
    { 
      key: "uploadDate",
      header: "Data Caricamento", 
      accessor: (doc: Document) => doc.uploadDate,
      priority: 2,
      sortable: true
    },
    { 
      key: "uploadedBy",
      header: "Caricato da", 
      accessor: (doc: Document) => doc.uploadedBy,
      priority: 1,
      filterable: true
    },
    { 
      key: "actions",
      header: "Azioni", 
      accessor: (doc: Document) => <DocumentRowActions document={doc} />,
      priority: 3
    }
  ]

  return (
    <ResponsiveTableAdvanced
      data={documents}
      columns={columns}
      getRowKey={(doc) => doc.id}
      enableSorting={true}
      enableFiltering={false}
      enablePagination={true}
      itemsPerPage={10}
      mobileLayout="card"
    />
  )
}