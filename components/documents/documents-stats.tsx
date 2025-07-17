import { FileText, CheckCircle, Clock, XCircle, HardDrive, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsProps {
  stats: {
    totalDocuments: number
    publishedDocuments: number
    pendingDocuments: number
    rejectedDocuments: number
    totalSize: string
    recentUploads: number
  }
}

export function DocumentsStats({ stats }: StatsProps) {
  const cards = [
    {
      title: "Documenti Totali",
      value: stats.totalDocuments,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
      description: "Documenti nel sistema"
    },
    {
      title: "Pubblicati",
      value: stats.publishedDocuments,
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
      description: `${((stats.publishedDocuments / stats.totalDocuments) * 100).toFixed(0)}% del totale`
    },
    {
      title: "In Revisione",
      value: stats.pendingDocuments,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      description: "Da approvare"
    },
    {
      title: "Rifiutati",
      value: stats.rejectedDocuments,
      icon: <XCircle className="h-4 w-4 text-muted-foreground" />,
      description: "Non approvati"
    },
    {
      title: "Spazio Utilizzato",
      value: stats.totalSize,
      icon: <HardDrive className="h-4 w-4 text-muted-foreground" />,
      description: "Storage totale"
    },
    {
      title: "Upload Recenti",
      value: stats.recentUploads,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      description: "Ultimi 7 giorni"
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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