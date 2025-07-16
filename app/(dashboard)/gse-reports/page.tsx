import { fetchGSEReports } from "@/lib/data"
import { GSEReportsServer } from "@/components/server/gse-reports-server"

export default async function GSEReportsPage() {
  const reports = await fetchGSEReports()
  return <GSEReportsServer reports={reports} />
}