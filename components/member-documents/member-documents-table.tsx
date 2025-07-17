"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  FileText, 
  Download, 
  Eye, 
  MoreVertical,
  Mail,
  Share2,
  Clock
} from "lucide-react"

interface Document {
  id: number
  name: string
  category: string
  type: string
  size: string
  uploadDate: string
  lastModified: string
  description: string
  downloadUrl: string
  status: "available" | "pending" | "expired"
}

interface MemberDocumentsTableProps {
  documents: Document[]
}

export function MemberDocumentsTable({ documents }: MemberDocumentsTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredDocuments = selectedCategory
    ? documents.filter(doc => doc.category === selectedCategory)
    : documents

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="default" className="bg-green-600">Disponibile</Badge>
      case "pending":
        return <Badge variant="secondary">In attesa</Badge>
      case "expired":
        return <Badge variant="destructive">Scaduto</Badge>
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      "Contratti": "📄",
      "Bollette e Fatture": "💸",
      "Report Energetici": "📊",
      "Certificati": "🏆",
      "Guide e Manuali": "📚",
      "Comunicazioni": "📧",
    }
    return icons[category] || "📁"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documenti Disponibili</CardTitle>
        <CardDescription>
          {filteredDocuments.length} documenti trovati
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Categoria</TableHead>
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
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getFileIcon(document.type)}</div>
                      <div>
                        <div className="font-medium">{document.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {document.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{getCategoryIcon(document.category)}</span>
                      <span className="text-sm">{document.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>{document.size}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{document.uploadDate}</div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Modificato: {document.lastModified}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(document.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizza
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Scarica
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Condividi
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Invia via email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}