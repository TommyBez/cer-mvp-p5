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
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

interface ConsumptionData {
  period: string
  consumed: number
  produced: number
  selfConsumed: number
  gridImported: number
  gridExported: number
  cost: number
  savings: number
}

interface ConsumptionTableProps {
  data: ConsumptionData[]
}

export function ConsumptionTable({ data }: ConsumptionTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Dettaglio Consumi Giornalieri</CardTitle>
            <CardDescription>
              Analisi dettagliata dei consumi e della produzione giorno per giorno
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Esporta CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Consumato</TableHead>
                <TableHead className="text-right">Prodotto</TableHead>
                <TableHead className="text-right">Autoconsumo</TableHead>
                <TableHead className="text-right">Prelievo</TableHead>
                <TableHead className="text-right">Immissione</TableHead>
                <TableHead className="text-right">Costo</TableHead>
                <TableHead className="text-right">Risparmio</TableHead>
                <TableHead className="text-center">Efficienza</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => {
                const efficiency = (row.selfConsumed / row.consumed) * 100
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.period}</TableCell>
                    <TableCell className="text-right">{row.consumed.toFixed(1)} kWh</TableCell>
                    <TableCell className="text-right">{row.produced.toFixed(1)} kWh</TableCell>
                    <TableCell className="text-right">{row.selfConsumed.toFixed(1)} kWh</TableCell>
                    <TableCell className="text-right">{row.gridImported.toFixed(1)} kWh</TableCell>
                    <TableCell className="text-right">{row.gridExported.toFixed(1)} kWh</TableCell>
                    <TableCell className="text-right">€ {row.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-green-600">
                      € {row.savings.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={efficiency > 70 ? "default" : efficiency > 50 ? "secondary" : "outline"}
                        className={efficiency > 70 ? "bg-green-600" : ""}
                      >
                        {efficiency.toFixed(0)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Pagina {currentPage} di {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}