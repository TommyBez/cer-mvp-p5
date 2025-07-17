"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MembersTableFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  roleFilter: string
  onRoleChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export function MembersTableFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
}: MembersTableFiltersProps) {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca membri..."
          className="pl-8 w-[250px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={roleFilter} onValueChange={onRoleChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Ruolo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti i ruoli</SelectItem>
          <SelectItem value="Produttore">Produttore</SelectItem>
          <SelectItem value="Consumatore">Consumatore</SelectItem>
          <SelectItem value="Prosumer">Prosumer</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Stato" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti gli stati</SelectItem>
          <SelectItem value="Attivo">Attivo</SelectItem>
          <SelectItem value="In attesa">In attesa</SelectItem>
          <SelectItem value="Sospeso">Sospeso</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}