"use client"

import Link from "next/link"
import {
  Bell,
  Calculator,
  FileText,
  Home,
  LineChart,
  Package2,
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Dati simulati per i membri
const membersData = [
  {
    id: 1,
    name: "Mario Rossi",
    email: "mario.rossi@email.com",
    phone: "+39 333 1234567",
    role: "Consumatore",
    joinDate: "2024-01-15",
    status: "Attivo",
    address: "Via Roma 123, Milano",
    fiscalCode: "RSSMRA80A01F205X",
  },
  {
    id: 2,
    name: "Giulia Bianchi",
    email: "giulia.bianchi@email.com",
    phone: "+39 333 2345678",
    role: "Produttore",
    joinDate: "2024-01-10",
    status: "Attivo",
    address: "Via Garibaldi 45, Milano",
    fiscalCode: "BNCGLI85B02F205Y",
  },
  {
    id: 3,
    name: "Luca Verdi",
    email: "luca.verdi@email.com",
    phone: "+39 333 3456789",
    role: "Prosumer",
    joinDate: "2024-01-08",
    status: "In attesa",
    address: "Corso Buenos Aires 78, Milano",
    fiscalCode: "VRDLCU90C03F205Z",
  },
  {
    id: 4,
    name: "Anna Neri",
    email: "anna.neri@email.com",
    phone: "+39 333 4567890",
    role: "Consumatore",
    joinDate: "2024-01-05",
    status: "Attivo",
    address: "Via Dante 12, Milano",
    fiscalCode: "NRANNA75D04F205W",
  },
  {
    id: 5,
    name: "Paolo Gialli",
    email: "paolo.gialli@email.com",
    phone: "+39 333 5678901",
    role: "Produttore",
    joinDate: "2023-12-20",
    status: "Attivo",
    address: "Via Manzoni 34, Milano",
    fiscalCode: "GLLPLA88E05F205V",
  },
]

export function MembersManagement() {
  const [user, setUser] = useState<any>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("Tutti")
  const [selectedStatus, setSelectedStatus] = useState("Tutti")
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [newMemberForm, setNewMemberForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    fiscalCode: "",
    notes: "",
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "Tutti" || member.role === selectedRole
    const matchesStatus = selectedStatus === "Tutti" || member.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddMember = () => {
    // Qui implementeresti la logica per aggiungere un nuovo membro
    console.log("Nuovo membro:", newMemberForm)
    setIsAddMemberDialogOpen(false)
    setNewMemberForm({
      name: "",
      email: "",
      phone: "",
      role: "",
      address: "",
      fiscalCode: "",
      notes: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Attivo":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Attivo
          </Badge>
        )
      case "In attesa":
        return <Badge variant="secondary">In attesa</Badge>
      case "Sospeso":
        return <Badge variant="destructive">Sospeso</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Produttore":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Produttore
          </Badge>
        )
      case "Consumatore":
        return (
          <Badge variant="default" className="bg-orange-100 text-orange-800">
            Consumatore
          </Badge>
        )
      case "Prosumer":
        return (
          <Badge variant="default" className="bg-purple-100 text-purple-800">
            Prosumer
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  if (!user) {
    return <div>Caricamento...</div>
  }

  return (
    <div
      className={`grid min-h-screen w-full transition-all duration-300 ${sidebarCollapsed ? "md:grid-cols-[64px_1fr]" : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"}`}
    >
      <div
        className={`hidden border-r bg-background md:block transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-[220px] lg:w-[280px]"}`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
            <Link
              href="/"
              className={`flex items-center gap-2 font-semibold ${sidebarCollapsed ? "justify-center w-full" : ""}`}
            >
              <Package2 className="h-6 w-6 text-green-600" />
              {!sidebarCollapsed && <span>CER Manager</span>}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-6 w-6"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Dashboard" : ""}
              >
                <Home className="h-4 w-4" />
                {!sidebarCollapsed && "Dashboard"}
              </Link>
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Membri" : ""}
              >
                <Users className="h-4 w-4" />
                {!sidebarCollapsed && "Membri"}
              </Link>
              <Link
                href="/documents"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Documenti" : ""}
              >
                <FileText className="h-4 w-4" />
                {!sidebarCollapsed && "Documenti"}
              </Link>
              <Link
                href="/simulation"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Simulazione" : ""}
              >
                <Calculator className="h-4 w-4" />
                {!sidebarCollapsed && "Simulazione"}
              </Link>
              <Link
                href="/gse-reports"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Report GSE" : ""}
              >
                <LineChart className="h-4 w-4" />
                {!sidebarCollapsed && "Report GSE"}
              </Link>
            </nav>
          </div>
          {!sidebarCollapsed && (
            <div className="mt-auto p-4">
              <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Supporto</CardTitle>
                  <CardDescription>Hai bisogno di aiuto? Contatta il nostro team di supporto.</CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Contattaci
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">Gestione Membri</h1>
          </div>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8 bg-transparent">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Benvenuto, {user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Impostazioni</DropdownMenuItem>
              <DropdownMenuItem>Supporto</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {/* Statistiche membri */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Totale Membri</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{membersData.length}</div>
                <p className="text-xs text-muted-foreground">+2 questo mese</p>
              </CardContent>
            </Card>
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
                <p className="text-xs text-muted-foreground">Con impianti attivi</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Attesa</CardTitle>
                <div className="h-4 w-4 bg-yellow-100 rounded" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {membersData.filter((member) => member.status === "In attesa").length}
                </div>
                <p className="text-xs text-muted-foreground">Da approvare</p>
              </CardContent>
            </Card>
          </div>

          {/* Filtri e ricerca */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>Anagrafica Membri</CardTitle>
                  <CardDescription>Gestisci i membri della Comunità Energetica Rinnovabile</CardDescription>
                </div>
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
                      <DialogDescription>Inserisci i dati del nuovo membro della CER</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          value={newMemberForm.name}
                          onChange={(e) => setNewMemberForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="col-span-3"
                          placeholder="Nome e cognome"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newMemberForm.email}
                          onChange={(e) => setNewMemberForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="col-span-3"
                          placeholder="email@esempio.com"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Telefono
                        </Label>
                        <Input
                          id="phone"
                          value={newMemberForm.phone}
                          onChange={(e) => setNewMemberForm((prev) => ({ ...prev, phone: e.target.value }))}
                          className="col-span-3"
                          placeholder="+39 333 1234567"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Ruolo
                        </Label>
                        <Select
                          value={newMemberForm.role}
                          onValueChange={(value) => setNewMemberForm((prev) => ({ ...prev, role: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Seleziona ruolo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Consumatore">Consumatore</SelectItem>
                            <SelectItem value="Produttore">Produttore</SelectItem>
                            <SelectItem value="Prosumer">Prosumer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fiscalCode" className="text-right">
                          Codice Fiscale
                        </Label>
                        <Input
                          id="fiscalCode"
                          value={newMemberForm.fiscalCode}
                          onChange={(e) => setNewMemberForm((prev) => ({ ...prev, fiscalCode: e.target.value }))}
                          className="col-span-3"
                          placeholder="RSSMRA80A01F205X"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                          Indirizzo
                        </Label>
                        <Textarea
                          id="address"
                          value={newMemberForm.address}
                          onChange={(e) => setNewMemberForm((prev) => ({ ...prev, address: e.target.value }))}
                          className="col-span-3"
                          placeholder="Via, numero civico, città"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddMember}>
                        Aggiungi Membro
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cerca membri..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Ruolo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tutti">Tutti i ruoli</SelectItem>
                    <SelectItem value="Consumatore">Consumatore</SelectItem>
                    <SelectItem value="Produttore">Produttore</SelectItem>
                    <SelectItem value="Prosumer">Prosumer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tutti">Tutti gli stati</SelectItem>
                    <SelectItem value="Attivo">Attivo</SelectItem>
                    <SelectItem value="In attesa">In attesa</SelectItem>
                    <SelectItem value="Sospeso">Sospeso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabella membri */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ruolo</TableHead>
                    <TableHead>Contatto</TableHead>
                    <TableHead>Data Adesione</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.fiscalCode}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{member.email}</div>
                          <div className="text-sm text-muted-foreground">{member.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString("it-IT")}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Apri menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifica
                            </DropdownMenuItem>
                            <DropdownMenuItem>Visualizza dettagli</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Rimuovi
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
