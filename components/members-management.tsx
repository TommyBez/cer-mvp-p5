import { MembersManagementClient } from "@/components/members-management-client"

// Server Component
export async function MembersManagement() {
  // In a real app, fetch members data from database/API
  // const members = await fetchMembers()
  
  return <MembersManagementClient />
}