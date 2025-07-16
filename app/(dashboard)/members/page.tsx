import { Suspense } from "react"
import { MembersStats } from "@/components/members/members-stats"
import { MembersContent } from "@/components/members/members-content"
import { DashboardStatsSkeleton, TableSkeleton } from "@/components/ui/skeleton-loaders"

export default function MembersPage() {
  return (
    <div className="space-y-4">
      {/* Member Stats - Quick loading */}
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <MembersStats />
      </Suspense>

      {/* Members Table - Slower loading */}
      <Suspense fallback={<TableSkeleton rows={10} />}>
        <MembersContent />
      </Suspense>
    </div>
  )
}
