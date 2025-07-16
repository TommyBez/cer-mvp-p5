import { Suspense } from "react"
import { fetchDocuments } from "@/lib/data"
import { DocumentsManagementServer } from "@/components/server/documents-management-server"
import { DocumentsSkeleton } from "@/components/ui/loading-skeletons"

async function DocumentsContent() {
  const documents = await fetchDocuments()
  return <DocumentsManagementServer documents={documents} />
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<DocumentsSkeleton />}>
      <DocumentsContent />
    </Suspense>
  )
}