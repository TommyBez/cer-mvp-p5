import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardMetricCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

export function DashboardMetricCard({ title, value, change, icon }: DashboardMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change}
        </p>
      </CardContent>
    </Card>
  )
}