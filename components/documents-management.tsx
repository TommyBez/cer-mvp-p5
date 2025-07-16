import { DocumentsManagementClient } from "@/components/documents-management-client"

// Server Component
export async function DocumentsManagement() {
  // In a real app, fetch documents from storage/database
  // const documents = await fetchDocuments()
  
  return <DocumentsManagementClient />
}