import { ResponsiveTable } from "@/components/ui/responsive-table"
import { Badge } from "@/components/ui/badge"

const testData = [
  { id: 1, name: "Test User 1", email: "test1@example.com", status: "Active" },
  { id: 2, name: "Test User 2", email: "test2@example.com", status: "Inactive" },
  { id: 3, name: "Test User 3", email: "test3@example.com", status: "Active" },
]

export default function TestPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Responsive Table Test</h1>
      
      {/* Debug info */}
      <div className="space-y-2">
        <div className="block md:hidden bg-red-500 text-white p-4 rounded">
          Mobile View (visible on screens &lt; 768px)
        </div>
        <div className="hidden md:block bg-blue-500 text-white p-4 rounded">
          Desktop View (visible on screens &gt;= 768px)
        </div>
      </div>
      
      {/* Test ResponsiveTable */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">ResponsiveTable Component</h2>
        <ResponsiveTable
          columns={[
            { key: "name", header: "Name" },
            { key: "email", header: "Email", hideOnMobile: true },
            { key: "status", header: "Status" }
          ]}
          data={testData}
          renderCell={(row, column) => {
            if (column.key === "status") {
              return (
                <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                  {row.status}
                </Badge>
              )
            }
            return row[column.key]
          }}
        />
      </div>
    </div>
  )
}