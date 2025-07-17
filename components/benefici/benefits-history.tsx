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
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Download } from "lucide-react"

interface BenefitEntry {
  date: string
  type: string
  description: string
  amount: number
  status: string
}

interface BenefitsHistoryProps {
  history: BenefitEntry[]
}

export function BenefitsHistory({ history }: BenefitsHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredHistory = history.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || entry.type === filterType
    const matchesStatus = filterStatus === "all" || entry.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className: string }> = {
      "Pagato": { variant: "default", className: "bg-green-600" },
      "In elaborazione": { variant: "secondary", className: "" },
      "Confermato": { variant: "default", className: "bg-blue-600" },
      "In attesa": { variant: "outline", className: "" },
    }
    const config = variants[status] || { variant: "outline", className: "" }
    return <Badge variant={config.variant} className={config.className}>{status}</Badge>
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      "Incentivo GSE": "🏛️",
      "Incentivo Regionale": "🏘️",
      "Vendita Energia": "⚡",
      "Risparmio": "💰",
      "Certificati": "📜",
    }
    return icons[type] || "📄"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Storico Transazioni</CardTitle>
            <CardDescription>
              Dettaglio di tutti i benefici economici ricevuti
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Esporta
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca transazione..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i tipi</SelectItem>
              <SelectItem value="Incentivo GSE">Incentivo GSE</SelectItem>
              <SelectItem value="Incentivo Regionale">Incentivo Regionale</SelectItem>
              <SelectItem value="Vendita Energia">Vendita Energia</SelectItem>
              <SelectItem value="Risparmio">Risparmio</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli stati</SelectItem>
              <SelectItem value="Pagato">Pagato</SelectItem>
              <SelectItem value="In elaborazione">In elaborazione</SelectItem>
              <SelectItem value="Confermato">Confermato</SelectItem>
              <SelectItem value="In attesa">In attesa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrizione</TableHead>
                <TableHead className="text-right">Importo</TableHead>
                <TableHead>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{getTypeIcon(entry.type)}</span>
                      <span className="text-sm">{entry.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    € {entry.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(entry.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Nessuna transazione trovata
          </div>
        )}
      </CardContent>
    </Card>
  )
}