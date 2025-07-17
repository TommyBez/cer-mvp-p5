"use client"

import { MoreHorizontal, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface DocumentRowActionsProps {
  document: Document
}

export function DocumentRowActions({ document }: DocumentRowActionsProps) {
  const handleDownload = () => {
    // In a real app, this would trigger file download
    console.log("Downloading:", document.name)
  }

  const handleDelete = () => {
    // In a real app, this would call an API
    console.log("Deleting document:", document.id)
    // Trigger a revalidation or use server actions
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Azioni</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Scarica
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDelete}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Elimina
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}