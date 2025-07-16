"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Member {
  id: number
  name: string
  email: string
  role: string
  status: string
  energyShared: string
  joinDate: string
  address: string
  phone: string
  fiscalCode: string
}

interface MembersTableProps {
  members: Member[]
  onEdit: (member: Member) => void
  onDelete: (id: number) => void
}

export function MembersTable({ members, onEdit, onDelete }: MembersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const columns = [
    { 
      header: "Membro", 
      accessorKey: "member",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {row.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Ruolo", 
      accessorKey: "role",
      cell: (row: any) => (
        <Badge variant={row.role === "Produttore" ? "default" : "secondary"}>
          {row.role}
        </Badge>
      )
    },
    { 
      header: "Stato", 
      accessorKey: "status",
      cell: (row: any) => (
        <Badge 
          variant={
            row.status === "Attivo" ? "default" : 
            row.status === "In attesa" ? "secondary" : 
            "destructive"
          }
        >
          {row.status}
        </Badge>
      )
    },
    { header: "Energia Condivisa", accessorKey: "energyShared", className: "text-right" },
    { header: "Data Iscrizione", accessorKey: "joinDate" },
    {
      header: "Azioni",
      accessorKey: "actions",
      cell: (row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Azioni</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(row)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifica
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(row.id)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Elimina
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Elenco Membri</CardTitle>
            <CardDescription>
              Visualizza e gestisci tutti i membri della comunità
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca membri..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveTableAdvanced
          columns={columns}
          data={filteredMembers}
          pageSize={10}
          hideSearch
        />
      </CardContent>
    </Card>
  )
}