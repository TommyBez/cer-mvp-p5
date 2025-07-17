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
      header: "Documento", 
      accessorKey: "document",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
            {getFileIcon(row.type)}
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">{row.description}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Tipo", 
      accessorKey: "type",
      cell: (row: any) => (
        <Badge variant="outline">
          {row.type}
        </Badge>
      )
    },
    { header: "Dimensione", accessorKey: "size", className: "text-right" },
    { header: "Data Upload", accessorKey: "uploadDate" },
    { header: "Caricato da", accessorKey: "uploadedBy" },
    { 
      header: "Stato", 
      accessorKey: "status",
      cell: (row: any) => (
        <Badge 
          variant={
            row.status === "Pubblicato" || row.status === "Approvato" ? "default" : 
            row.status === "In revisione" ? "secondary" : 
            "destructive"
          }
        >
          {row.status}
        </Badge>
      )
    },
    {
      header: "Azioni",
      accessorKey: "actions",
      cell: (row: any) => <DocumentRowActions document={row} />
    }
  ]

  return (
    <ResponsiveTableAdvanced
      columns={columns}
      data={documents}
      pageSize={10}
      hideSearch
    />
  )
}