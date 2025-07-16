"use client"

import Link from "next/link"
import { Bell, Download, FileText, Home, Package2, Power, Share2, TrendingUp, Zap } from "lucide-react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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

export function MemberDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "member") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) {
    return <div>Caricamento...</div>
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/member-area" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6 text-green-600" />
              <span>Area Membri CER</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/member-area"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Zap className="h-4 w-4" />I Miei Consumi
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <TrendingUp className="h-4 w-4" />
                Benefici Economici
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                Documenti
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Supporto</CardTitle>
                <CardDescription>Hai bisogno di aiuto? Contatta il nostro team di supporto.</CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Contattaci
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">Benvenuto, {user?.name}</h1>
          </div>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8 bg-transparent">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Il Mio Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Impostazioni</DropdownMenuItem>
              <DropdownMenuItem>Supporto</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome Documento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Dimensione</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentsData.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="font-medium">{document.name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{document.type}</Badge>
                      </TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell>{new Date(document.date).toLocaleDateString("it-IT")}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Scarica
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
