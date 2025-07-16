import { DeviceManagementClient } from "@/components/device-management-client"

// Server Component
export async function DeviceManagement() {
  // In a real app, fetch devices from API/database
  // const devices = await fetchDevices()
  
  return <DeviceManagementClient />
}