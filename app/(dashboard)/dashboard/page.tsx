import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Dashboard as DashboardComponent } from "@/components/dashboard"

async function DashboardContent() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return <DashboardComponent />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[60vh]" />}>
      <DashboardContent />
    </Suspense>
  )
}