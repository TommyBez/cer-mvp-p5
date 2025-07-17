import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"

interface Deadline {
  id: string
  reportType: string
  dueDate: string
  status: "upcoming" | "due-soon" | "overdue"
}

interface GSEReportsDeadlinesProps {
  deadlines: Deadline[]
}

export function GSEReportsDeadlines({ deadlines }: GSEReportsDeadlinesProps) {
  const getStatusBadge = (status: Deadline["status"]) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>
      case "due-soon":
        return <Badge variant="default">Due Soon</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>GSE report submission deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{deadline.reportType}</p>
                  <p className="text-xs text-muted-foreground">Due: {deadline.dueDate}</p>
                </div>
              </div>
              {getStatusBadge(deadline.status)}
            </div>
          ))}
          {deadlines.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No upcoming deadlines
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}