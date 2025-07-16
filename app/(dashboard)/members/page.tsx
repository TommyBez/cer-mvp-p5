import { fetchMembers } from "@/lib/data"
import { MembersManagementServer } from "@/components/server/members-management-server"

export default async function MembersPage() {
  const members = await fetchMembers()
  return <MembersManagementServer members={members} />
}
