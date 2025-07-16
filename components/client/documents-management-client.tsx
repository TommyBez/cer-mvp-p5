"use client"

import type React from "react"
import {
  Upload,
  Search,
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

type Document = {
  id: number
  name: string
  type: string
  uploadDate: string
  size: string
  status: string
  uploadedBy: string
}

interface DocumentsManagementClientProps {
  documents: Document[]
}

export function DocumentsManagementClient({ documents }: DocumentsManagementClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Filter documents based on search and type
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    return matchesSearch && matchesType
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "approvato":
        return "default"
      case "in revisione":
        return "outline"
      case "archiviato":
        return "secondary"
      case "rifiutato":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "contratto":
        return <FileText className="h-4 w-4" />
      case "fattura":
        return <FileSpreadsheet className="h-4 w-4" />
      case "immagine":
        return <FileImage className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  const handleDownload = (docId: number) => {
    console.log("Downloading document:", docId)
  }

  const handleView = (docId: number) => {
    console.log("Viewing document:", docId)
  }

  const handleDelete = (docId: number) => {
    console.log("Deleting document:", docId)
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Nome Documento",
      cell: ({ row }: any) => {
        const type = row.getValue("type")
        return (
          <div className="flex items-center space-x-2">
            {getFileIcon(type)}
            <span className="font-medium">{row.getValue("name")}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }: any) => {
        const type = row.getValue("type")
        return <Badge variant="outline">{type}</Badge>
      },
    },
    {
      accessorKey: "uploadDate",
      header: "Data Caricamento",
      cell: ({ row }: any) => (
        <div className="text-sm">{row.getValue("uploadDate")}</div>
      ),
    },
    {
      accessorKey: "size",
      header: "Dimensione",
      cell: ({ row }: any) => (
        <div className="font-mono text-sm">{row.getValue("size")}</div>
      ),
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
      accessorKey: "uploadedBy",
      header: "Caricato da",
      cell: ({ row }: any) => (
        <div className="text-sm text-muted-foreground">{row.getValue("uploadedBy")}</div>
      ),
    },
    {
      id: "actions",
      header: "Azioni",
      cell: ({ row }: any) => {
        const document = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleView(document.id)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(document.id)}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(document.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle>Documenti CER</CardTitle>
            <CardDescription>
              Gestisci tutti i documenti della Comunità Energetica.
            </CardDescription>
          </div>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Carica Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Carica Nuovo Documento</DialogTitle>
                <DialogDescription>
                  Seleziona e carica un nuovo documento per la CER.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="document-name">Nome Documento</Label>
                  <Input
                    id="document-name"
                    placeholder="Inserisci il nome del documento"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="document-type">Tipo Documento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contratto">Contratto</SelectItem>
                      <SelectItem value="fattura">Fattura</SelectItem>
                      <SelectItem value="tecnico">Documento Tecnico</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="document-file">File</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Clicca per selezionare un file o trascinalo qui
                    </p>
                    <Input
                      id="document-file"
                      type="file"
                      className="mt-2"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="document-notes">Note (opzionale)</Label>
                  <Textarea
                    id="document-notes"
                    placeholder="Aggiungi note o descrizione"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Carica Documento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca documenti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtra per tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i tipi</SelectItem>
              <SelectItem value="Contratto">Contratto</SelectItem>
              <SelectItem value="Fattura">Fattura</SelectItem>
              <SelectItem value="Tecnico">Documento Tecnico</SelectItem>
              <SelectItem value="Report">Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <ResponsiveTableAdvanced
          columns={columns}
          data={filteredDocuments}
        />
      </CardContent>
    </Card>
  )
}