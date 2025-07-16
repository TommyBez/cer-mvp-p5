import { Activity, AlertCircle, TrendingUp, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecentActivity } from "@/lib/data-service"

const iconMap: Record<string, any> = {
  "Nuovo membro": User,
  "Produzione": TrendingUp,
  "Manutenzione": AlertCircle,
  "Report": Activity,
}

export async function RecentActivity() {
  const activities = await getRecentActivity()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attività Recente</CardTitle>
        <CardDescription>
          Le ultime attività nella tua comunità energetica
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        {activities.map((activity) => {
          const Icon = iconMap[activity.action] || Activity
          return (
            <div key={activity.id} className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {activity.action}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.detail}
                </p>
              </div>
              <div className="ml-auto font-medium text-sm text-muted-foreground">
                {activity.time}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}