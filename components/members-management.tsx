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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

// Dati simulati per i membri
const membersData = [
  {
    id: 1,
    name: "Mario Rossi",
    email: "mario.rossi@email.com",
    role: "Produttore",
    status: "Attivo",
    energyShared: "1,234 kWh",
    joinDate: "01/03/2024",
    address: "Via Roma 123, Milano",
    phone: "+39 333 1234567",
    fiscalCode: "RSSMRA80A01F205V",
  },
  {
    id: 2,
    name: "Laura Bianchi",
    email: "laura.bianchi@email.com",
    role: "Consumatore",
    status: "Attivo",
    energyShared: "856 kWh",
    joinDate: "15/02/2024",
    address: "Corso Italia 45, Roma",
    phone: "+39 340 9876543",
    fiscalCode: "BNCLRA75B45H501T",
  },
  {
    id: 3,
    name: "Giuseppe Verdi",
    email: "giuseppe.verdi@email.com",
    role: "Prosumer",
    status: "In attesa",
    energyShared: "0 kWh",
    joinDate: "20/03/2024",
    address: "Piazza Garibaldi 7, Napoli",
    phone: "+39 328 5551234",
    fiscalCode: "VRDGPP65C12F839X",
  },
  {
    id: 4,
    name: "Anna Neri",
    email: "anna.neri@email.com",
    role: "Consumatore",
    status: "Attivo",
    energyShared: "543 kWh",
    joinDate: "10/01/2024",
    address: "Via Dante 89, Torino",
    phone: "+39 347 3332211",
    fiscalCode: "NRANNA82D50L219K",
  },
  {
    id: 5,
    name: "Franco Gialli",
    email: "franco.gialli@email.com",
    role: "Produttore",
    status: "Inattivo",
    energyShared: "2,100 kWh",
    joinDate: "05/12/2023",
    address: "Via Manzoni 22, Bologna",
    phone: "+39 338 7654321",
    fiscalCode: "GLLFNC70R05A944G",
  },
  {
    id: 6,
    name: "Paola Blu",
    email: "paola.blu@email.com",
    role: "Prosumer",
    status: "Attivo",
    energyShared: "1,789 kWh",
    joinDate: "18/01/2024",
    address: "Viale Europa 156, Firenze",
    phone: "+39 366 4445556",
    fiscalCode: "BLUPLA88E58D612Z",
  },
]

export function MembersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("Tutti")
  const [selectedStatus, setSelectedStatus] = useState("Tutti")
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<(typeof membersData)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Filtra i membri in base ai criteri di ricerca
  const filteredMembers = membersData.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "Tutti" || member.role === selectedRole
    const matchesStatus = selectedStatus === "Tutti" || member.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Produttore":
        return "default"
      case "Consumatore":
        return "secondary"
      case "Prosumer":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Attivo":
        return "success"
      case "In attesa":
        return "warning"
      case "Inattivo":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Gestione Membri</h1>
        <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Aggiungi Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Membro</DialogTitle>
              <DialogDescription>Inserisci i dati del nuovo membro della comunità energetica.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Ruolo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleziona ruolo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Produttore">Produttore</SelectItem>
                    <SelectItem value="Consumatore">Consumatore</SelectItem>
                    <SelectItem value="Prosumer">Prosumer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Indirizzo
                </Label>
                <Textarea id="address" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salva</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membri Attivi</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {membersData.filter((member) => member.status === "Attivo").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (membersData.filter((member) => member.status === "Attivo").length / membersData.length) * 100,
              )}
              % del totale
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produttori</CardTitle>
            <div className="h-4 w-4 bg-blue-100 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {membersData.filter((member) => member.role === "Produttore").length}
            </div>
            <p className="text-xs text-muted-foreground">Generano energia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumatori</CardTitle>
            <div className="h-4 w-4 bg-green-100 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {membersData.filter((member) => member.role === "Consumatore").length}
            </div>
            <p className="text-xs text-muted-foreground">Utilizzano energia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prosumer</CardTitle>
            <div className="h-4 w-4 bg-purple-100 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {membersData.filter((member) => member.role === "Prosumer").length}
            </div>
            <p className="text-xs text-muted-foreground">Producono e consumano</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista Membri</CardTitle>
          <CardDescription>Gestisci i membri della comunità energetica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca per nome o email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtra per ruolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutti">Tutti i ruoli</SelectItem>
                <SelectItem value="Produttore">Produttore</SelectItem>
                <SelectItem value="Consumatore">Consumatore</SelectItem>
                <SelectItem value="Prosumer">Prosumer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtra per stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutti">Tutti gli stati</SelectItem>
                <SelectItem value="Attivo">Attivo</SelectItem>
                <SelectItem value="In attesa">In attesa</SelectItem>
                <SelectItem value="Inattivo">Inattivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <ResponsiveTableAdvanced
              data={filteredMembers}
              columns={[
                {
                  key: 'name',
                  header: 'Nome',
                  accessor: (member) => <span className="font-medium">{member.name}</span>,
                  sortable: true,
                  filterable: true,
                  priority: 10
                },
                {
                  key: 'email',
                  header: 'Email',
                  accessor: (member) => member.email,
                  sortable: true,
                  filterable: true,
                  priority: 8
                },
                {
                  key: 'role',
                  header: 'Ruolo',
                  accessor: (member) => (
                    <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                  ),
                  sortable: true,
                  priority: 6
                },
                {
                  key: 'status',
                  header: 'Stato',
                  accessor: (member) => (
                    <Badge
                      variant={getStatusBadgeVariant(member.status) as "default" | "secondary" | "outline"}
                    >
                      {member.status}
                    </Badge>
                  ),
                  sortable: true,
                  priority: 7
                },
                {
                  key: 'energyShared',
                  header: 'Energia Condivisa',
                  accessor: (member) => member.energyShared,
                  sortable: true,
                  priority: 4
                },
                {
                  key: 'joinDate',
                  header: 'Data Iscrizione',
                  accessor: (member) => member.joinDate,
                  sortable: true,
                  priority: 5
                },
                {
                  key: 'actions',
                  header: '',
                  accessor: (member) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Apri menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedMember(member)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          Visualizza dettagli
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifica
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Elimina
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ),
                  className: 'text-right',
                  priority: 1
                }
              ]}
              getRowKey={(member) => member.id}
              enableFiltering={false} // We already have custom filtering
              enableSorting={true}
              enablePagination={true}
              itemsPerPage={10}
              emptyMessage="Nessun membro trovato"
              mobileLayout="card"
            />
          </div>
        </CardContent>
      </Card>

      {/* Dialog per visualizzare i dettagli del membro */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dettagli Membro</DialogTitle>
            <DialogDescription>Informazioni complete del membro selezionato.</DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Nome:</span>
                <span className="col-span-2">{selectedMember.name}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Email:</span>
                <span className="col-span-2">{selectedMember.email}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Telefono:</span>
                <span className="col-span-2">{selectedMember.phone}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Indirizzo:</span>
                <span className="col-span-2">{selectedMember.address}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Codice Fiscale:</span>
                <span className="col-span-2">{selectedMember.fiscalCode}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Ruolo:</span>
                <span className="col-span-2">
                  <Badge variant={getRoleBadgeVariant(selectedMember.role)}>{selectedMember.role}</Badge>
                </span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Stato:</span>
                <span className="col-span-2">
                  <Badge
                    variant={getStatusBadgeVariant(selectedMember.status) as "default" | "secondary" | "outline"}
                  >
                    {selectedMember.status}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Energia Condivisa:</span>
                <span className="col-span-2">{selectedMember.energyShared}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Data Iscrizione:</span>
                <span className="col-span-2">{selectedMember.joinDate}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Chiudi
            </Button>
            <Button>Modifica</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
