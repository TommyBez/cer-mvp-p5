"use client"

import type React from "react"

import Link from "next/link"
import {
  Bell,
  Calculator,
  FileText,
  Home,
  LineChart,
  Package2,
  Users,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Plus,
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

// Dati simulati per i documenti
const documentsData = [
  {
    id: 1,
    name: "Statuto CER Milano Nord",
    category: "Statuti e Regolamenti",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "Admin CER",
    status: "Approvato",
    description: "Statuto ufficiale della Comunità Energetica Rinnovabile Milano Nord",
  },
  {
    id: 2,
    name: "Contratto Adesione Tipo",
    category: "Contratti",
    type: "DOCX",
    size: "156 KB",
    uploadDate: "2024-01-10",
    uploadedBy: "Ufficio Legale",
    status: "Attivo",
    description: "Modello di contratto per l'adesione di nuovi membri",
  },
  {
    id: 3,
    name: "Autorizzazione GSE 2024",
    category: "Autorizzazioni",
    type: "PDF",
    size: "890 KB",
    uploadDate: "2024-01-08",
    uploadedBy: "Admin CER",
    status: "Valido",
    description: "Autorizzazione rilasciata dal GSE per l'anno 2024",
  },
  {
    id: 4,
    name: "Report Energetico Q4 2023",
    category: "Report",
    type: "XLSX",
    size: "1.2 MB",
    uploadDate: "2024-01-05",
    uploadedBy: "Responsabile Tecnico",
    status: "Archiviato",
    description: "Report trimestrale della produzione e consumo energetico",
  },
  {
    id: 5,
    name: "Delibera Costituzione CER",
    category: "Delibere",
    type: "PDF",
    size: "3.1 MB",
    uploadDate: "2023-12-20",
    uploadedBy: "Segretario",
    status: "Approvato",
    description: "Delibera di costituzione della Comunità Energetica",
  },
]

const categories = [
  "Tutti",
  "Statuti e Regolamenti",
  "Contratti",
  "Autorizzazioni",
  "Report",
  "Delibere",
  "Comunicazioni GSE",
]

export function DocumentsManagement() {
  const [user, setUser] = useState<any>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tutti")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "",
    description: "",
    file: null as File | null,
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

  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tutti" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadForm((prev) => ({ ...prev, file }))
    }
  }

  const handleUploadSubmit = () => {
    // Qui implementeresti la logica di upload
    console.log("Upload documento:", uploadForm)
    setIsUploadDialogOpen(false)
    setUploadForm({ name: "", category: "", description: "", file: null })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approvato":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approvato
          </Badge>
        )
      case "Attivo":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Attivo
          </Badge>
        )
      case "Valido":
        return (
          <Badge variant="default" className="bg-emerald-100 text-emerald-800">
            Valido
          </Badge>
        )
      case "Archiviato":
        return <Badge variant="secondary">Archiviato</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Membri" : ""}
              >
                <Users className="h-4 w-4" />
                {!sidebarCollapsed && "Membri"}
              </Link>
              <Link
                href="/documents"
                className={`flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
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
                href="#"
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
            <h1 className="text-lg font-semibold md:text-2xl">Gestione Documenti</h1>
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
          {/* Statistiche documenti */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Totale Documenti</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentsData.length}</div>
                <p className="text-xs text-muted-foreground">+2 questo mese</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documenti Attivi</CardTitle>
                <Badge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    documentsData.filter(
                      (doc) => doc.status === "Attivo" || doc.status === "Approvato" || doc.status === "Valido",
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">In uso corrente</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spazio Utilizzato</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.8 MB</div>
                <p className="text-xs text-muted-foreground">di 1 GB disponibile</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categorie</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length - 1}</div>
                <p className="text-xs text-muted-foreground">Tipologie documenti</p>
              </CardContent>
            </Card>
          </div>

          {/* Filtri e ricerca */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>Repository Documenti</CardTitle>
                  <CardDescription>Gestisci tutti i documenti della Comunità Energetica Rinnovabile</CardDescription>
                </div>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Carica Documento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Carica Nuovo Documento</DialogTitle>
                      <DialogDescription>Aggiungi un nuovo documento al repository della CER</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          value={uploadForm.name}
                          onChange={(e) => setUploadForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="col-span-3"
                          placeholder="Nome del documento"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Categoria
                        </Label>
                        <Select
                          value={uploadForm.category}
                          onValueChange={(value) => setUploadForm((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Seleziona categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                          File
                        </Label>
                        <Input
                          id="file"
                          type="file"
                          onChange={handleFileUpload}
                          className="col-span-3"
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Descrizione
                        </Label>
                        <Textarea
                          id="description"
                          value={uploadForm.description}
                          onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                          className="col-span-3"
                          placeholder="Descrizione del documento"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleUploadSubmit}>
                        Carica Documento
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
                      placeholder="Cerca documenti..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtra per categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabella documenti */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome Documento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Dimensione</TableHead>
                    <TableHead>Data Upload</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{document.name}</div>
                          <div className="text-sm text-muted-foreground">{document.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{document.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{document.type}</Badge>
                      </TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell>{new Date(document.uploadDate).toLocaleDateString("it-IT")}</TableCell>
                      <TableCell>{getStatusBadge(document.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Apri menu</span>
                              <FileText className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizza
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Scarica
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Elimina
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
