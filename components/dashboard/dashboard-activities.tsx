"use client"

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
    { 
      key: "type",
      header: "Tipo", 
      accessor: (activity: Activity) => (
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
      className: "w-[100px]",
      priority: 3
    },
    { 
      key: "description",
      header: "Descrizione", 
      accessor: (activity: Activity) => activity.description,
      priority: 2
    },
    { 
      key: "value",
      header: "Valore", 
      accessor: (activity: Activity) => activity.value,
      className: "text-right",
      priority: 2
    },
    { 
      key: "timestamp",
      header: "Timestamp", 
      accessor: (activity: Activity) => activity.timestamp,
      className: "text-right",
      priority: 1
    },
  ]

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
          data={activities}
          columns={columns}
          getRowKey={(activity) => activity.id}
        />
      </CardContent>
    </Card>
  )
}