import { Users, UserCheck, Clock, UserX, Zap, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsProps {
  stats: {
    totalMembers: number
    activeMembers: number
    pendingMembers: number
    suspendedMembers: number
    totalEnergyShared: string
    averageEnergyPerMember: string
  }
}

export function MembersStats({ stats }: StatsProps) {
  const cards = [
    {
      title: "Membri Totali",
      value: stats.totalMembers,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: "Membri registrati"
    },
    {
      title: "Membri Attivi",
      value: stats.activeMembers,
      icon: <UserCheck className="h-4 w-4 text-muted-foreground" />,
      description: `${((stats.activeMembers / stats.totalMembers) * 100).toFixed(0)}% del totale`
    },
    {
      title: "In Attesa",
      value: stats.pendingMembers,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      description: "Da approvare"
    },
    {
      title: "Sospesi",
      value: stats.suspendedMembers,
      icon: <UserX className="h-4 w-4 text-muted-foreground" />,
      description: "Account sospesi"
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}