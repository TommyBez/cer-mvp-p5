"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Download, Trash2, FileText, FileSpreadsheet, FileImage, File } from "lucide-react"
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

interface Document {
  id: number
  name: string
  type: string
  size: string
  uploadDate: string
  uploadedBy: string
  status: string
  description: string
}

interface DocumentsTableProps {
  documents: Document[]
  onDelete: (id: number) => void
  onDownload: (document: Document) => void
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'contratto':
    case 'regolamento':
      return <FileText className="h-5 w-5" />
    case 'report':
      return <FileSpreadsheet className="h-5 w-5" />
    case 'guida':
      return <FileImage className="h-5 w-5" />
    default:
      return <File className="h-5 w-5" />
  }
}

export function DocumentsTable({ documents, onDelete, onDownload }: DocumentsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const columns = [
    { 
      header: "Documento", 
      accessorKey: "document",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
            {getFileIcon(row.type)}
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">{row.description}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Tipo", 
      accessorKey: "type",
      cell: (row: any) => (
        <Badge variant="outline">
          {row.type}
        </Badge>
      )
    },
    { header: "Dimensione", accessorKey: "size", className: "text-right" },
    { header: "Data Upload", accessorKey: "uploadDate" },
    { header: "Caricato da", accessorKey: "uploadedBy" },
    { 
      header: "Stato", 
      accessorKey: "status",
      cell: (row: any) => (
        <Badge 
          variant={
            row.status === "Pubblicato" || row.status === "Approvato" ? "default" : 
            row.status === "In revisione" ? "secondary" : 
            "destructive"
          }
        >
          {row.status}
        </Badge>
      )
    },
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
            <DropdownMenuItem onClick={() => onDownload(row)}>
              <Download className="mr-2 h-4 w-4" />
              Scarica
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
            <CardTitle>Elenco Documenti</CardTitle>
            <CardDescription>
              Visualizza e gestisci tutti i documenti della comunità
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca documenti..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveTableAdvanced
          columns={columns}
          data={filteredDocuments}
          pageSize={10}
          hideSearch
        />
      </CardContent>
    </Card>
  )
}