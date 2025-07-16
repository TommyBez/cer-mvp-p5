import { fetchDocuments } from "@/lib/data"
import { DocumentsManagementServer } from "@/components/server/documents-management-server"

export default async function DocumentsPage() {
  const documents = await fetchDocuments()
  return <DocumentsManagementServer documents={documents} />
}