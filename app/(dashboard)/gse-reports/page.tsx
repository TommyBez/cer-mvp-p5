import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { GSEReportsManagement } from "@/components/gse-reports-management"

async function ReportsContent() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return <GSEReportsManagement />
}

export default function GseReportsPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[60vh]" />}>
      <ReportsContent />
    </Suspense>
  )
}