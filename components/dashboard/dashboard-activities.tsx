import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"

interface Activity {
  id: number
  type: string
  description: string
  value: string
  timestamp: string
}

interface DashboardActivitiesProps {
  activities: Activity[]
}

export function DashboardActivities({ activities }: DashboardActivitiesProps) {
  const columns = [
    { header: "Tipo", accessorKey: "type", className: "w-[100px]" },
    { header: "Descrizione", accessorKey: "description" },
    { header: "Valore", accessorKey: "value", className: "text-right" },
    { header: "Timestamp", accessorKey: "timestamp", className: "text-right" },
  ]

  const formattedActivities = activities.map(activity => ({
    ...activity,
    type: (
      <Badge 
        variant={
          activity.type === "production" ? "default" : 
          activity.type === "sharing" ? "secondary" : 
          "outline"
        }
      >
        {activity.type === "production" ? "Produzione" : 
         activity.type === "sharing" ? "Condivisione" : 
         "Dispositivo"}
      </Badge>
    ),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attività Recenti</CardTitle>
        <CardDescription>
          Ultime attività registrate nella comunità energetica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveTable
          columns={columns}
          data={formattedActivities}
          pageSize={5}
          hideSearch
          hidePagination
        />
      </CardContent>
    </Card>
  )
}