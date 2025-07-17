"use client"

import Link from "next/link"
import { Download, FileText, Power, Share2, TrendingUp } from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"

const consumptionData = [
  { name: "Lun", consumo: 24, condiviso: 8 },
  { name: "Mar", consumo: 18, condiviso: 12 },
  { name: "Mer", consumo: 32, condiviso: 15 },
  { name: "Gio", consumo: 28, condiviso: 10 },
  { name: "Ven", consumo: 22, condiviso: 14 },
  { name: "Sab", consumo: 35, condiviso: 18 },
  { name: "Dom", consumo: 30, condiviso: 16 },
]

const benefitsData = [
  { month: "Gen", risparmio: 45, incentivi: 23 },
  { month: "Feb", risparmio: 52, incentivi: 28 },
  { month: "Mar", risparmio: 48, incentivi: 25 },
  { month: "Apr", risparmio: 58, incentivi: 32 },
]

const documentsData = [
  {
    id: 1,
    name: "Statuto CER Milano Nord",
    type: "PDF",
    size: "2.4 MB",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Contratto Adesione",
    type: "PDF",
    size: "156 KB",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Report Energetico Q4 2023",
    type: "PDF",
    size: "1.2 MB",
    date: "2024-01-05",
  },
]

export function MemberDashboardContent() {
  return (
    <>
      {/* Panoramica personale */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mio Consumo Mensile</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189 kWh</div>
            <p className="text-xs text-muted-foreground">-5.2% rispetto al mese scorso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93 kWh</div>
            <p className="text-xs text-muted-foreground">49% del mio consumo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risparmio Stimato</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€58</div>
            <p className="text-xs text-muted-foreground">Questo mese</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        {/* Grafico consumi */}
        <Card>
          <CardHeader>
            <CardTitle>I Miei Consumi (Ultimi 7 giorni)</CardTitle>
            <CardDescription>Consumo totale vs energia condivisa dalla CER</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} unit="kWh" />
                <Tooltip />
                <Legend />
                <RechartsLine type="monotone" dataKey="consumo" stroke="#ea580c" name="Consumo Totale" />
                <RechartsLine type="monotone" dataKey="condiviso" stroke="#16a34a" name="Energia Condivisa" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Benefici economici */}
        <Card>
          <CardHeader>
            <CardTitle>Benefici Economici</CardTitle>
            <CardDescription>Risparmio e incentivi degli ultimi 4 mesi</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={benefitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} unit="€" />
                <Tooltip />
                <Legend />
                <Bar dataKey="risparmio" fill="#16a34a" name="Risparmio" />
                <Bar dataKey="incentivi" fill="#2563eb" name="Incentivi" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Documenti disponibili */}
      <Card>
        <CardHeader>
          <CardTitle>Documenti della Comunità</CardTitle>
          <CardDescription>Documenti essenziali e report disponibili per il download</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            data={documentsData}
            columns={[
              {
                key: 'name',
                header: 'Nome Documento',
                accessor: (document) => <div className="font-medium">{document.name}</div>,
                priority: 10
              },
              {
                key: 'type',
                header: 'Tipo',
                accessor: (document) => <Badge variant="secondary">{document.type}</Badge>,
                priority: 6
              },
              {
                key: 'size',
                header: 'Dimensione',
                accessor: (document) => document.size,
                priority: 4
              },
              {
                key: 'date',
                header: 'Data',
                accessor: (document) => new Date(document.date).toLocaleDateString("it-IT"),
                priority: 5
              },
              {
                key: 'actions',
                header: 'Azioni',
                accessor: () => (
                  <Button variant="ghost" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Scarica
                  </Button>
                ),
                className: 'text-right',
                priority: 1
              }
            ]}
            getRowKey={(document) => document.id}
            mobileLayout="card"
          />
        </CardContent>
      </Card>
    </>
  )
}