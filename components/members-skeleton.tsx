import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function MembersSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header with action buttons skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-2" />
        </div>
        <Skeleton className="h-10 w-[140px]" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-[120px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[80px]" />
              <Skeleton className="h-3 w-[100px] mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table card skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[250px] mt-1" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-[150px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table skeleton */}
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
              <Skeleton className="h-4 w-[80px]" />
            </div>
            {/* Rows */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b">
                <div className="flex gap-4 items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[200px] mt-1" />
                  </div>
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-6 w-[60px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}