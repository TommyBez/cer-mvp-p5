import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function GSEReportsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header with action buttons skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[350px] mt-2" />
        </div>
        <Skeleton className="h-10 w-[140px]" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-[120px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[100px]" />
              <Skeleton className="h-3 w-[140px] mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reports table skeleton - spans 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Table header */}
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                {/* Table rows */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b">
                    <div className="flex gap-4 items-center flex-1">
                      <Skeleton className="h-4 w-[80px]" />
                      <Skeleton className="h-6 w-[60px]" />
                      <Skeleton className="h-6 w-[80px]" />
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-6 w-[80px]" />
                    </div>
                    <Skeleton className="h-8 w-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming deadlines skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-5 w-[60px]" />
                  </div>
                  <Skeleton className="h-3 w-[80px]" />
                  <Skeleton className="h-6 w-[100px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}