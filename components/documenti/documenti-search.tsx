"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DocumentiSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cerca Documenti</CardTitle>
        <CardDescription>Trova rapidamente i documenti che ti servono</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Label htmlFor="search" className="sr-only">Cerca</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Cerca per nome o descrizione..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le categorie</SelectItem>
              <SelectItem value="Legale">Legale</SelectItem>
              <SelectItem value="Tecnico">Tecnico</SelectItem>
              <SelectItem value="Contratto">Contratto</SelectItem>
              <SelectItem value="Report">Report</SelectItem>
              <SelectItem value="Fattura">Fattura</SelectItem>
              <SelectItem value="Privacy">Privacy</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo file" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i tipi</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="DOC">DOC</SelectItem>
              <SelectItem value="XLS">XLS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}