import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { MemberDashboard } from "@/components/member-dashboard"

async function MemberAreaContent() {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return <MemberDashboard />
}

export default function MemberAreaPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[60vh]" />}>
      <MemberAreaContent />
    </Suspense>
  )
}
