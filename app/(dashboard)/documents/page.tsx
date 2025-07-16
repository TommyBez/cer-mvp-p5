import { fetchDocuments } from "@/lib/data"
import { DocumentsManagementClient } from "@/components/client/documents-management-client"

export default async function DocumentsPage() {
  const documents = await fetchDocuments()
  
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