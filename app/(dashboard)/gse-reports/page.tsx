import { Suspense } from "react"
import { fetchGSEReports } from "@/lib/data"
import { GSEReportsServer } from "@/components/server/gse-reports-server"
import { TableSkeleton } from "@/components/ui/loading-skeletons"

async function GSEReportsContent() {
  const reports = await fetchGSEReports()
  return <GSEReportsServer reports={reports} />
}

export default function GSEReportsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <GSEReportsContent />
    </Suspense>
  )
}