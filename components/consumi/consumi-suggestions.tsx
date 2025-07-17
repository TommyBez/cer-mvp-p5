import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, TrendingUp } from "lucide-react"

interface ConsumiSuggestionsProps {
  suggestions: Array<{
    id: number
    type: "warning" | "success"
    title: string
    description: string
  }>
}

export function ConsumiSuggestions({ suggestions }: ConsumiSuggestionsProps) {
  const getIcon = (type: "warning" | "success") => {
    switch (type) {
      case "warning":
        return <Zap className="h-4 w-4 text-orange-600" />
      case "success":
        return <TrendingUp className="h-4 w-4 text-green-600" />
    }
  }

  const getColorClasses = (type: "warning" | "success") => {
    switch (type) {
      case "warning":
        return "bg-orange-50 dark:bg-orange-950"
      case "success":
        return "bg-green-50 dark:bg-green-950"
    }
  }

  const getIconColorClasses = (type: "warning" | "success") => {
    switch (type) {
      case "warning":
        return "bg-orange-100 dark:bg-orange-900"
      case "success":
        return "bg-green-100 dark:bg-green-900"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggerimenti Personalizzati</CardTitle>
        <CardDescription>Basati sul tuo profilo di consumo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={`flex gap-4 p-4 rounded-lg ${getColorClasses(suggestion.type)}`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${getIconColorClasses(
                    suggestion.type
                  )}`}
                >
                  {getIcon(suggestion.type)}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}