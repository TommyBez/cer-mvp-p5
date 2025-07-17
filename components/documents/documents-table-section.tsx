"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentsTableFilters } from "./documents-table-filters"
import { DocumentsTableContent } from "./documents-table-content"

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

interface DocumentsTableSectionProps {
  initialDocuments: Document[]
}

export function DocumentsTableSection({ initialDocuments }: DocumentsTableSectionProps) {
  const [documents] = useState(initialDocuments)
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
          <DocumentsTableFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>
      </CardHeader>
      <CardContent>
        <DocumentsTableContent documents={filteredDocuments} />
      </CardContent>
    </Card>
  )
}