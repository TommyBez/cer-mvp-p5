import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { MembersManagement } from "@/components/members-management"

async function MembersContent() {
  // Simulate an API/database call on the server.
  await new Promise((resolve) => setTimeout(resolve, 800))
  return <MembersManagement />
}

export default function MembersPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[60vh]" />}>
      {/* Streaming will reveal this section once the async work above completes */}
      <MembersContent />
    </Suspense>
  )
}
