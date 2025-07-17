"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Filter, RotateCcw } from "lucide-react"

export function MemberDocumentsFilters() {
  const categories = [
    "Contratti",
    "Bollette e Fatture",
    "Report Energetici",
    "Certificati",
    "Guide e Manuali",
    "Comunicazioni",
  ]

  const periods = [
    { value: "all", label: "Tutti i periodi" },
    { value: "month", label: "Ultimo mese" },
    { value: "quarter", label: "Ultimi 3 mesi" },
    { value: "semester", label: "Ultimi 6 mesi" },
    { value: "year", label: "Ultimo anno" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtri
        </CardTitle>
        <CardDescription>
          Filtra i documenti per categoria e periodo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-3">Categorie</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <Label 
                    htmlFor={category} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-3">Periodo</h4>
            <RadioGroup defaultValue="all">
              {periods.map((period) => (
                <div key={period.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={period.value} id={period.value} />
                  <Label 
                    htmlFor={period.value} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {period.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <RotateCcw className="mr-2 h-3 w-3" />
            Reset
          </Button>
          <Button size="sm" className="flex-1">
            Applica
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}