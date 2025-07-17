import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Share2, TrendingUp } from "lucide-react"

interface Activity {
  id: number
  type: string
  description: string
  value: string
  timestamp: string
}

interface MemberAreaActivitiesProps {
  activities: Activity[]
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "production":
      return <Zap className="h-4 w-4" />
    case "sharing":
      return <Share2 className="h-4 w-4" />
    case "earning":
      return <TrendingUp className="h-4 w-4" />
    default:
      return <Zap className="h-4 w-4" />
  }
}

const getActivityBadge = (type: string) => {
  const variants: Record<string, "default" | "secondary" | "outline"> = {
    production: "default",
    sharing: "secondary",
    earning: "outline",
  }
  
  const labels: Record<string, string> = {
    production: "Produzione",
    sharing: "Condivisione",
    earning: "Guadagno",
  }
  
  return (
    <Badge variant={variants[type] || "outline"}>
      {labels[type] || type}
    </Badge>
  )
}

export function MemberAreaActivities({ activities }: MemberAreaActivitiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attività Recenti</CardTitle>
        <CardDescription>
          Le tue ultime attività nella comunità energetica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getActivityBadge(activity.type)}
                  <span className="text-sm font-medium">{activity.description}</span>
                </div>
                <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
              </div>
              <div className="text-sm font-medium">{activity.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}