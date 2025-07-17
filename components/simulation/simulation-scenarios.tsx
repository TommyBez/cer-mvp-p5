import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface Scenario {
  id: string
  name: string
  description: string
  impact: "positive" | "negative" | "neutral"
  savings: number
  lastRun: string
}

interface SimulationScenariosProps {
  scenarios: Scenario[]
}

export function SimulationScenarios({ scenarios }: SimulationScenariosProps) {
  const getImpactIcon = (impact: Scenario["impact"]) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "neutral":
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getImpactBadge = (impact: Scenario["impact"]) => {
    switch (impact) {
      case "positive":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Positive</Badge>
      case "negative":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Negative</Badge>
      case "neutral":
        return <Badge variant="secondary">Neutral</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Scenarios</CardTitle>
        <CardDescription>Previously run economic simulations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {getImpactIcon(scenario.impact)}
                  <h4 className="text-sm font-semibold">{scenario.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-muted-foreground">
                    Savings: ${scenario.savings.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Last run: {scenario.lastRun}
                  </span>
                </div>
              </div>
              {getImpactBadge(scenario.impact)}
            </div>
          ))}
          {scenarios.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No saved scenarios yet. Run a simulation to save scenarios.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}