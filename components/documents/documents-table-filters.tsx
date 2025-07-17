"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DocumentsTableFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  typeFilter: string
  onTypeChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export function DocumentsTableFilters({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
}: DocumentsTableFiltersProps) {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca documenti..."
          className="pl-8 w-[250px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti i tipi</SelectItem>
          <SelectItem value="Contratto">Contratto</SelectItem>
          <SelectItem value="Regolamento">Regolamento</SelectItem>
          <SelectItem value="Report">Report</SelectItem>
          <SelectItem value="Modulo">Modulo</SelectItem>
          <SelectItem value="Guida">Guida</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Stato" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti gli stati</SelectItem>
          <SelectItem value="Pubblicato">Pubblicato</SelectItem>
          <SelectItem value="Approvato">Approvato</SelectItem>
          <SelectItem value="In revisione">In revisione</SelectItem>
          <SelectItem value="Rifiutato">Rifiutato</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}