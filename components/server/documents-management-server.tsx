import { DocumentsManagementClient } from "@/components/client/documents-management-client"

type Document = {
  id: number
  name: string
  type: string
  uploadDate: string
  size: string
  status: string
  uploadedBy: string
}

interface DocumentsManagementServerProps {
  documents: Document[]
}

export function DocumentsManagementServer({ documents }: DocumentsManagementServerProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Gestione Documenti</h2>
        <p className="text-muted-foreground">
          Gestisci tutti i documenti della tua Comunità Energetica Rinnovabile.
        </p>
      </div>
      
      <DocumentsManagementClient documents={documents} />
    </div>
  )
}