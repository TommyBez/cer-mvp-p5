import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { DocumentsManagement } from "@/components/documents-management"

async function DocumentsContent() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return <DocumentsManagement />
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[60vh]" />}>
      <DocumentsContent />
    </Suspense>
  )
}