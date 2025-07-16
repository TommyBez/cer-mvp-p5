"use client"

import Link from "next/link"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/responsive-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

type Member = {
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

interface MembersManagementClientProps {
  members: Member[]
}

export function MembersManagementClient({ members }: MembersManagementClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter members based on search and filters
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Attivo":
        return "default"
      case "Inattivo":
        return "secondary"
      case "In attesa":
        return "outline"
      case "Sospeso":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleEditMember = (member: Member) => {
    setSelectedMember(member)
    setIsEditDialogOpen(true)
  }

  const handleDeleteMember = (memberId: number) => {
    // In a real app, this would make an API call
    console.log("Deleting member:", memberId)
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: any) => (
        <div className="text-muted-foreground">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Ruolo",
      cell: ({ row }: any) => {
        const role = row.getValue("role")
        return <Badge variant="outline">{role}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "Stato",
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        return (
          <Badge variant={getStatusBadgeVariant(status as string)}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "energyShared",
      header: "Energia Condivisa",
      cell: ({ row }: any) => (
        <div className="font-mono text-sm">{row.getValue("energyShared")}</div>
      ),
    },
    {
      accessorKey: "joinDate",
      header: "Data Iscrizione",
      cell: ({ row }: any) => (
        <div className="text-sm">{row.getValue("joinDate")}</div>
      ),
    },
    {
      id: "actions",
      header: "Azioni",
      cell: ({ row }: any) => {
        const member = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Apri menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Azioni</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(member.email)}
              >
                Copia email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEditMember(member)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifica
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDeleteMember(member.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Elimina
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle>Membri della CER</CardTitle>
            <CardDescription>
              Gestisci i membri della tua Comunità Energetica Rinnovabile.
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Aggiungi Membro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Aggiungi Nuovo Membro</DialogTitle>
                <DialogDescription>
                  Inserisci i dettagli del nuovo membro della CER.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario.rossi@email.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input
                    id="phone"
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fiscalCode">Codice Fiscale</Label>
                  <Input
                    id="fiscalCode"
                    placeholder="RSSMRA80A01F205V"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Ruolo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona ruolo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="produttore">Produttore</SelectItem>
                      <SelectItem value="consumatore">Consumatore</SelectItem>
                      <SelectItem value="prosumer">Prosumer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Textarea
                    id="address"
                    placeholder="Via Roma 123, Milano"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Aggiungi Membro</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca membri..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtra per stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli stati</SelectItem>
              <SelectItem value="Attivo">Attivo</SelectItem>
              <SelectItem value="Inattivo">Inattivo</SelectItem>
              <SelectItem value="In attesa">In attesa</SelectItem>
              <SelectItem value="Sospeso">Sospeso</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtra per ruolo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i ruoli</SelectItem>
              <SelectItem value="Produttore">Produttore</SelectItem>
              <SelectItem value="Consumatore">Consumatore</SelectItem>
              <SelectItem value="Prosumer">Prosumer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <ResponsiveTableAdvanced
          columns={columns}
          data={filteredMembers}
        />
      </CardContent>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifica Membro</DialogTitle>
            <DialogDescription>
              Modifica i dettagli del membro selezionato.
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome completo</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedMember.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedMember.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Telefono</Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedMember.phone}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Ruolo</Label>
                <Select defaultValue={selectedMember.role.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produttore">Produttore</SelectItem>
                    <SelectItem value="consumatore">Consumatore</SelectItem>
                    <SelectItem value="prosumer">Prosumer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Indirizzo</Label>
                <Textarea
                  id="edit-address"
                  defaultValue={selectedMember.address}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Salva Modifiche</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}