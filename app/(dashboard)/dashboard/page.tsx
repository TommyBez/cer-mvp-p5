import { Suspense } from "react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardChartWrapper } from "@/components/dashboard/dashboard-chart-wrapper"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DashboardStatsSkeleton, ChartSkeleton, ActivityListSkeleton } from "@/components/ui/skeleton-loaders"

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Dashboard Stats - Quick loading */}
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* Chart - Slower loading */}
        <div className="col-span-full xl:col-span-2">
          <Suspense fallback={<ChartSkeleton />}>
            <DashboardChartWrapper />
          </Suspense>
        </div>

        {/* Recent Activity - Medium loading */}
        <div className="col-span-full lg:col-span-1 xl:col-span-1">
          <Suspense fallback={<ActivityListSkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>
    </div>
  )
}