import { Suspense } from "react"
import { fetchMembers } from "@/lib/data"
import { MembersManagementServer } from "@/components/server/members-management-server"
import { MembersSkeleton } from "@/components/ui/loading-skeletons"

async function MembersContent() {
  const members = await fetchMembers()
  return <MembersManagementServer members={members} />
}

export default function MembersPage() {
  return (
    <Suspense fallback={<MembersSkeleton />}>
      <MembersContent />
    </Suspense>
  )
}
