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
import type { Member } from "@/lib/data-service"

interface MembersTableProps {
  initialData: Member[]
}

export function MembersTable({ initialData }: MembersTableProps) {
  const [members, setMembers] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filtra i membri in base ai criteri di ricerca
  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.fiscalCode.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filterRole === "all" || member.role === filterRole

    return matchesSearch && matchesRole
  })

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id))
  }

  const handleEditMember = (member: Member) => {
    setSelectedMember(member)
    setIsEditDialogOpen(true)
  }

  const columns = [
    {
      key: 'name',
      header: 'Nome',
      sortable: true,
      accessor: (member: Member) => (
        <div className="font-medium">{member.name}</div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      className: 'hidden md:table-cell',
      accessor: (member: Member) => member.email
    },
    {
      key: 'role',
      header: 'Ruolo',
      accessor: (member: Member) => (
        <Badge variant={member.role === 'Produttore' ? 'default' : 'secondary'}>
          {member.role}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Stato',
      accessor: (member: Member) => (
        <Badge variant={member.status === 'Attivo' ? 'default' : 'outline'}>
          {member.status}
        </Badge>
      )
    },
    {
      key: 'energyShared',
      header: 'Energia Condivisa',
      className: 'hidden lg:table-cell',
      accessor: (member: Member) => member.energyShared
    },
    {
      key: 'actions',
      header: '',
      accessor: (member: Member) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Azioni</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditMember(member)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifica
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handleDeleteMember(member.id)}
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
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome, email o codice fiscale..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtra per ruolo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i ruoli</SelectItem>
            <SelectItem value="Produttore">Produttore</SelectItem>
            <SelectItem value="Consumatore">Consumatore</SelectItem>
            <SelectItem value="Prosumer">Prosumer</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Aggiungi Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Membro</DialogTitle>
              <DialogDescription>
                Inserisci i dati del nuovo membro della comunità energetica.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Mario Rossi" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="mario.rossi@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fiscal-code">Codice Fiscale</Label>
                <Input id="fiscal-code" placeholder="RSSMRA80A01F205V" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Ruolo</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleziona un ruolo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="producer">Produttore</SelectItem>
                    <SelectItem value="consumer">Consumatore</SelectItem>
                    <SelectItem value="prosumer">Prosumer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrizione (opzionale)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Informazioni aggiuntive sul membro..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Aggiungi Membro</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ResponsiveTableAdvanced 
        columns={columns} 
        data={filteredMembers}
        getRowKey={(member, index) => member.id}
        itemsPerPage={10}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifica Membro</DialogTitle>
            <DialogDescription>
              Modifica i dati del membro selezionato.
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome completo</Label>
                <Input id="edit-name" defaultValue={selectedMember.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" defaultValue={selectedMember.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Stato</Label>
                <Select defaultValue={selectedMember.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Attivo">Attivo</SelectItem>
                    <SelectItem value="Inattivo">Inattivo</SelectItem>
                    <SelectItem value="Sospeso">Sospeso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Salva Modifiche</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}