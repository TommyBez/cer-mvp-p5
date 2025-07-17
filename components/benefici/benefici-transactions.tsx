"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ChevronRight } from "lucide-react"
import { ResponsiveTable } from "@/components/responsive-table"

interface BeneficiTransactionsProps {
  transactions: any[]
}

export function BeneficiTransactions({ transactions }: BeneficiTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Storico Movimenti</CardTitle>
            <CardDescription>Ultimi pagamenti e accrediti ricevuti</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Esporta
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveTable
          data={transactions}
          columns={[
            {
              key: 'date',
              header: 'Data',
              accessor: (item) => new Date(item.date).toLocaleDateString("it-IT"),
              priority: 8
            },
            {
              key: 'type',
              header: 'Tipo',
              accessor: (item) => <div className="font-medium">{item.type}</div>,
              priority: 10
            },
            {
              key: 'amount',
              header: 'Importo',
              accessor: (item) => (
                <span className="font-medium text-green-600">+€{item.amount.toFixed(2)}</span>
              ),
              priority: 9
            },
            {
              key: 'status',
              header: 'Stato',
              accessor: (item) => (
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {item.status}
                </span>
              ),
              priority: 7
            },
            {
              key: 'actions',
              header: '',
              accessor: () => (
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ),
              className: 'text-right',
              priority: 1
            }
          ]}
          getRowKey={(item) => item.id}
          mobileLayout="card"
        />
      </CardContent>
    </Card>
  )
}