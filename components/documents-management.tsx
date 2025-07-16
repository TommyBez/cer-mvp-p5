"use client"

import type React from "react"
import Link from "next/link"
import {
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Plus,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Dati simulati per i documenti
const documentsData = [
  {
    id: 1,
    name: "Contratto CER - Mario Rossi",
    type: "Contratto",
    category: "Adesione",
    uploadDate: "2024-03-01",
    size: "2.4 MB",
    status: "Approvato",
    member: "Mario Rossi",
  },
  {
    id: 2,
    name: "Bolletta Gennaio 2024",
    type: "Bolletta",
    category: "Fatturazione",
    uploadDate: "2024-02-15",
    size: "156 KB",
    status: "Archiviato",
    member: "Laura Bianchi",
  },
  {
    id: 3,
    name: "Dichiarazione Impianto FV",
    type: "Tecnico",
    category: "Impianti",
    uploadDate: "2024-02-10",
    size: "5.2 MB",
    status: "In revisione",
    member: "Giuseppe Verdi",
  },
  {
    id: 4,
    name: "Report Produzione Q1 2024",
    type: "Report",
    category: "Produzione",
    uploadDate: "2024-04-05",
    size: "3.8 MB",
    status: "Approvato",
    member: "Sistema",
  },
  {
    id: 5,
    name: "Documento Identità - Anna Neri",
    type: "Identità",
    category: "Anagrafica",
    uploadDate: "2024-01-10",
    size: "892 KB",
    status: "Approvato",
    member: "Anna Neri",
  },
]

export function DocumentsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tutti")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Filtra i documenti in base ai criteri di ricerca
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tutti" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Approvato":
        return "success"
      case "In revisione":
        return "warning"
      case "Archiviato":
        return "secondary"
      default:
        return "default"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "Contratto":
      case "Tecnico":
        return <FileText className="h-4 w-4" />
      case "Report":
        return <FileSpreadsheet className="h-4 w-4" />
      case "Identità":
        return <FileImage className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Gestione Documenti</h1>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Carica Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Carica Nuovo Documento</DialogTitle>
              <DialogDescription>
                Seleziona e carica un nuovo documento nel sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  File
                </Label>
                <Input id="file" type="file" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleziona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adesione">Adesione</SelectItem>
                    <SelectItem value="Fatturazione">Fatturazione</SelectItem>
                    <SelectItem value="Impianti">Impianti</SelectItem>
                    <SelectItem value="Produzione">Produzione</SelectItem>
                    <SelectItem value="Anagrafica">Anagrafica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="member" className="text-right">
                  Membro
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleziona membro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mario-rossi">Mario Rossi</SelectItem>
                    <SelectItem value="laura-bianchi">Laura Bianchi</SelectItem>
                    <SelectItem value="giuseppe-verdi">Giuseppe Verdi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Note
                </Label>
                <Textarea id="notes" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Carica</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documenti Totali</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentsData.length}</div>
            <p className="text-xs text-muted-foreground">+12% dal mese scorso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Revisione</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documentsData.filter((doc) => doc.status === "In revisione").length}
            </div>
            <p className="text-xs text-muted-foreground">Richiedono attenzione</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approvati</CardTitle>
            <Badge className="h-4 w-4 bg-green-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documentsData.filter((doc) => doc.status === "Approvato").length}
            </div>
            <p className="text-xs text-muted-foreground">Documenti validati</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spazio Utilizzato</CardTitle>
            <div className="h-4 w-4 bg-blue-100 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.3 GB</div>
            <p className="text-xs text-muted-foreground">di 50 GB disponibili</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Archivio Documenti</CardTitle>
          <CardDescription>Gestisci tutti i documenti della comunità energetica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca documenti..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtra per categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutti">Tutte le categorie</SelectItem>
                <SelectItem value="Adesione">Adesione</SelectItem>
                <SelectItem value="Fatturazione">Fatturazione</SelectItem>
                <SelectItem value="Impianti">Impianti</SelectItem>
                <SelectItem value="Produzione">Produzione</SelectItem>
                <SelectItem value="Anagrafica">Anagrafica</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <ResponsiveTableAdvanced
              data={filteredDocuments}
              columns={[
                {
                  key: 'name',
                  header: 'Nome Documento',
                  accessor: (doc) => (
                    <div className="flex items-center gap-2">
                      {getFileIcon(doc.type)}
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  ),
                  sortable: true,
                  filterable: true,
                  priority: 10
                },
                {
                  key: 'category',
                  header: 'Categoria',
                  accessor: (doc) => doc.category,
                  sortable: true,
                  priority: 7
                },
                {
                  key: 'member',
                  header: 'Membro',
                  accessor: (doc) => doc.member,
                  sortable: true,
                  filterable: true,
                  priority: 8
                },
                {
                  key: 'uploadDate',
                  header: 'Data Caricamento',
                  accessor: (doc) => new Date(doc.uploadDate).toLocaleDateString("it-IT"),
                  sortable: true,
                  priority: 5
                },
                {
                  key: 'size',
                  header: 'Dimensione',
                  accessor: (doc) => doc.size,
                  sortable: true,
                  priority: 4
                },
                {
                  key: 'status',
                  header: 'Stato',
                  accessor: (doc) => (
                    <Badge variant={getStatusBadgeVariant(doc.status) as any}>
                      {doc.status}
                    </Badge>
                  ),
                  sortable: true,
                  priority: 6
                },
                {
                  key: 'actions',
                  header: 'Azioni',
                  accessor: () => (
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ),
                  className: 'text-right',
                  priority: 1
                }
              ]}
              getRowKey={(doc) => doc.id}
              enableFiltering={false} // We already have custom filtering
              enableSorting={true}
              enablePagination={true}
              itemsPerPage={10}
              emptyMessage="Nessun documento trovato"
              mobileLayout="card"
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
