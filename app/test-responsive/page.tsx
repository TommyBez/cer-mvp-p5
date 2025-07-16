import { ResponsiveTable } from "@/components/ui/responsive-table"
import { TestResponsive } from "@/components/test-responsive"
import { Badge } from "@/components/ui/badge"

const testData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active", role: "User" },
]

export default function TestResponsivePage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Responsive Table Test</h1>
      
      <TestResponsive />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">ResponsiveTable Component Test</h2>
        <p className="text-sm text-muted-foreground">
          Resize your browser to less than 768px width to see the mobile card view
        </p>
        
        <ResponsiveTable
          columns={[
            { key: "name", header: "Name" },
            { key: "email", header: "Email", hideOnMobile: true },
            { key: "role", header: "Role" },
            { key: "status", header: "Status" }
          ]}
          data={testData}
          renderCell={(row, column) => {
            if (column.key === "status") {
              return <Badge variant={row.status === "Active" ? "default" : "secondary"}>{row.status}</Badge>
            }
            return row[column.key]
          }}
        />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>Window width will show here when component mounts</p>
          <div className="block md:hidden text-red-500">Mobile view (< 768px)</div>
          <div className="hidden md:block text-blue-500">Desktop view (>= 768px)</div>
        </div>
      </div>
    </div>
  )
}