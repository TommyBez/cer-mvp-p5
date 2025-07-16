"use client"

import { Power, Share2, Zap, Activity } from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"

type DashboardData = {
  totalProduced: number
  totalConsumed: number
  totalShared: number
  instantPower: number
  deviceCount: number
  onlineDevices: number
  chartData: Array<{
    name: string
    produzione: number
    consumo: number
  }>
  recentTransactions: Array<{
    id: number
    member: string
    action: string
    amount: string
    date: string
    type: string
  }>
}

interface DashboardClientProps {
  dashboardData: DashboardData
}

export function DashboardClient({ dashboardData }: DashboardClientProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('it-IT').format(num)
  }

  const getTransactionBadgeVariant = (type: string) => {
    switch (type) {
      case "shared":
        return "default"
      case "consumed":
        return "secondary"
      case "produced":
        return "outline"
      default:
        return "secondary"
    }
  }

  const transactionColumns = [
    {
      accessorKey: "member",
      header: "Membro",
    },
    {
      accessorKey: "action",
      header: "Azione",
    },
    {
      accessorKey: "amount",
      header: "Quantità",
      cell: ({ row }: any) => (
        <span className="font-mono">{row.getValue("amount")}</span>
      ),
    },
    {
      accessorKey: "date",
      header: "Data",
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }: any) => {
        const type = row.getValue("type")
        return (
          <Badge variant={getTransactionBadgeVariant(type)}>
            {type === "shared" ? "Condivisa" : type === "consumed" ? "Consumata" : "Prodotta"}
          </Badge>
        )
      },
    },
  ]

  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energia Prodotta</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardData.totalProduced)} kWh</div>
            <p className="text-xs text-muted-foreground">
              +20.1% dal mese scorso
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energia Consumata</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardData.totalConsumed)} kWh</div>
            <p className="text-xs text-muted-foreground">
              +7% dal mese scorso
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardData.totalShared)} kWh</div>
            <p className="text-xs text-muted-foreground">
              +12% dal mese scorso
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivi Online</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.onlineDevices}/{dashboardData.deviceCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Potenza istantanea: {dashboardData.instantPower} kW
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Energy Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Andamento Energetico Settimanale</CardTitle>
          <CardDescription>
            Confronto tra produzione e consumo energetico della CER
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <RechartsLineChart data={dashboardData.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <RechartsLine
                type="monotone"
                dataKey="produzione"
                stroke="#8884d8"
                strokeWidth={2}
                name="Produzione (kWh)"
              />
              <RechartsLine
                type="monotone"
                dataKey="consumo"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Consumo (kWh)"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Attività Recente</CardTitle>
          <CardDescription>
            Ultimi movimenti energetici nella comunità
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            columns={transactionColumns}
            data={dashboardData.recentTransactions}
          />
        </CardContent>
      </Card>
    </>
  )
}