"use client"

import Link from "next/link"
import {
  Bell,
  Calculator,
  FileText,
  Home,
  LineChart,
  Package2,
  Users,
  Download,
  Euro,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  Send,
  RefreshCw,
  Eye,
  Settings,
} from "lucide-react"
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
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/responsive-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Dati simulati per i report GSE
const gseReportsData = [
  {
    id: 1,
    period: "2024-01",
    type: "Mensile",
    status: "Inviato",
    submissionDate: "2024-02-05",
    energyShared: 12450,
    incentiveAmount: 1369.5,
    members: 25,
    fileName: "Report_GSE_2024_01.xlsx",
  },
  {
    id: 2,
    period: "2024-02",
    type: "Mensile",
    status: "Approvato",
    submissionDate: "2024-03-05",
    energyShared: 13200,
    incentiveAmount: 1452.0,
    members: 25,
    fileName: "Report_GSE_2024_02.xlsx",
  },
  {
    id: 3,
    period: "2024-03",
    type: "Mensile",
    status: "In Elaborazione",
    submissionDate: "2024-04-05",
    energyShared: 14100,
    incentiveAmount: 1551.0,
    members: 26,
    fileName: "Report_GSE_2024_03.xlsx",
  },
  {
    id: 4,
    period: "2024-04",
    type: "Mensile",
    status: "Bozza",
    submissionDate: null,
    energyShared: 15200,
    incentiveAmount: 1672.0,
    members: 26,
    fileName: null,
  },
]

// Dati per il calcolo automatico degli incentivi
const incentiveCalculationData = {
  currentMonth: "2024-04",
  energyData: [
    { memberId: 1, name: "Mario Rossi", consumed: 280, shared: 120, incentive: 13.2 },
    { memberId: 2, name: "Giulia Bianchi", consumed: 320, shared: 140, incentive: 15.4 },
    { memberId: 3, name: "Luca Verdi", consumed: 450, shared: 180, incentive: 19.8 },
    { memberId: 4, name: "Anna Neri", consumed: 380, shared: 160, incentive: 17.6 },
    { memberId: 5, name: "Paolo Gialli", consumed: 290, shared: 125, incentive: 13.75 },
  ],
  totalSharedEnergy: 15200,
  totalIncentive: 1672.0,
  incentiveRate: 0.11,
  baseDate: "2024-04-01",
}

// Dati storici per i grafici
const historicalData = [
  { month: "Gen", energiaCondivisa: 12450, incentivi: 1369.5, membri: 25 },
  { month: "Feb", energiaCondivisa: 13200, incentivi: 1452.0, membri: 25 },
  { month: "Mar", energiaCondivisa: 14100, incentivi: 1551.0, membri: 26 },
  { month: "Apr", energiaCondivisa: 15200, incentivi: 1672.0, membri: 26 },
]

export function GSEReportsManagement() {
  const [user, setUser] = useState<any>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("2024-04")
  const [isCalculating, setIsCalculating] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [calculationResults, setCalculationResults] = useState(incentiveCalculationData)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
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

  const handleCalculateIncentives = async () => {
    setIsCalculating(true)
    // Simula il calcolo degli incentivi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Aggiorna i risultati del calcolo
    setCalculationResults({
      ...calculationResults,
      totalSharedEnergy: Math.round(calculationResults.totalSharedEnergy * (0.95 + Math.random() * 0.1)),
      totalIncentive: Math.round(calculationResults.totalIncentive * (0.95 + Math.random() * 0.1) * 100) / 100,
    })

    setIsCalculating(false)
  }

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    // Simula la generazione del report
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGeneratingReport(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approvato":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approvato
          </Badge>
        )
      case "Inviato":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            <Send className="w-3 h-3 mr-1" />
            Inviato
          </Badge>
        )
      case "In Elaborazione":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            In Elaborazione
          </Badge>
        )
      case "Bozza":
        return (
          <Badge variant="secondary">
            <FileText className="w-3 h-3 mr-1" />
            Bozza
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const currentMonthStats = useMemo(() => {
    const current = gseReportsData.find((report) => report.period === selectedPeriod)
    const previous = gseReportsData.find((report) => {
      const currentDate = new Date(selectedPeriod + "-01")
      const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      return report.period === prevMonth.toISOString().slice(0, 7)
    })

    return {
      current: current || gseReportsData[gseReportsData.length - 1],
      previous,
      growth:
        current && previous
          ? Math.round(((current.energyShared - previous.energyShared) / previous.energyShared) * 100)
          : 0,
    }
  }, [selectedPeriod])

  if (!user) {
    return <div>Caricamento...</div>
  }

  return (
    <div
      className={`grid min-h-screen w-full transition-all duration-300 ${sidebarCollapsed ? "md:grid-cols-[64px_1fr]" : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"}`}
    >
      <div
        className={`hidden border-r bg-background md:block transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-[220px] lg:w-[280px]"}`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
            <Link
              href="/"
              className={`flex items-center gap-2 font-semibold ${sidebarCollapsed ? "justify-center w-full" : ""}`}
            >
              <Package2 className="h-6 w-6 text-green-600" />
              {!sidebarCollapsed && <span>CER Manager</span>}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-6 w-6"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Dashboard" : ""}
              >
                <Home className="h-4 w-4" />
                {!sidebarCollapsed && "Dashboard"}
              </Link>
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Membri" : ""}
              >
                <Users className="h-4 w-4" />
                {!sidebarCollapsed && "Membri"}
              </Link>
              <Link
                href="/documents"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Documenti" : ""}
              >
                <FileText className="h-4 w-4" />
                {!sidebarCollapsed && "Documenti"}
              </Link>
              <Link
                href="/simulation"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Simulazione" : ""}
              >
                <Calculator className="h-4 w-4" />
                {!sidebarCollapsed && "Simulazione"}
              </Link>
              <Link
                href="/gse-reports"
                className={`flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Report GSE" : ""}
              >
                <LineChart className="h-4 w-4" />
                {!sidebarCollapsed && "Report GSE"}
              </Link>
            </nav>
          </div>
          {!sidebarCollapsed && (
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
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">Gestione Pratiche GSE</h1>
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
              <DropdownMenuLabel>Benvenuto, {user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Impostazioni</DropdownMenuItem>
              <DropdownMenuItem>Supporto</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {/* KPI Dashboard */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonthStats.current.energyShared.toLocaleString()} kWh</div>
                <p className="text-xs text-muted-foreground">
                  {currentMonthStats.growth > 0 ? "+" : ""}
                  {currentMonthStats.growth}% rispetto al mese precedente
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incentivi Totali</CardTitle>
                <Euro className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{currentMonthStats.current.incentiveAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Mese corrente</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Report Inviati</CardTitle>
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{gseReportsData.filter((r) => r.status !== "Bozza").length}</div>
                <p className="text-xs text-muted-foreground">Quest'anno</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membri Attivi</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonthStats.current.members}</div>
                <p className="text-xs text-muted-foreground">Partecipanti alla CER</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="calculation" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calculation">Calcolo Incentivi</TabsTrigger>
              <TabsTrigger value="reports">Report GSE</TabsTrigger>
              <TabsTrigger value="analytics">Analisi</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="calculation" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-3">
                {/* Pannello di controllo calcolo */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Calcolo Automatico Incentivi
                      </CardTitle>
                      <CardDescription>Calcola gli incentivi GSE per il periodo selezionato</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Periodo di Riferimento</Label>
                        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-01">Gennaio 2024</SelectItem>
                            <SelectItem value="2024-02">Febbraio 2024</SelectItem>
                            <SelectItem value="2024-03">Marzo 2024</SelectItem>
                            <SelectItem value="2024-04">Aprile 2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Tariffa Incentivo:</span>
                          <span className="font-medium">€0.11/kWh</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Membri Attivi:</span>
                          <span className="font-medium">{calculationResults.energyData.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Energia Totale:</span>
                          <span className="font-medium">
                            {calculationResults.totalSharedEnergy.toLocaleString()} kWh
                          </span>
                        </div>
                      </div>

                      <Button onClick={handleCalculateIncentives} disabled={isCalculating} className="w-full">
                        {isCalculating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Calcolando...
                          </>
                        ) : (
                          <>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calcola Incentivi
                          </>
                        )}
                      </Button>

                      {!isCalculating && (
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Calcolo completato. Incentivo totale: €{calculationResults.totalIncentive.toLocaleString()}
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Risultati del calcolo */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dettaglio Calcolo Incentivi - {selectedPeriod}</CardTitle>
                      <CardDescription>Ripartizione degli incentivi per membro della comunità</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveTableAdvanced
                        data={calculationResults.energyData}
                        columns={[
                          {
                            key: 'name',
                            header: 'Membro',
                            accessor: (member) => <span className="font-medium">{member.name}</span>,
                            sortable: true,
                            priority: 10
                          },
                          {
                            key: 'consumed',
                            header: 'Energia Consumata',
                            accessor: (member) => `${member.consumed} kWh`,
                            sortable: true,
                            className: 'text-right font-mono',
                            priority: 7
                          },
                          {
                            key: 'shared',
                            header: 'Energia Condivisa',
                            accessor: (member) => `${member.shared} kWh`,
                            sortable: true,
                            className: 'text-right font-mono',
                            priority: 8
                          },
                          {
                            key: 'incentive',
                            header: 'Incentivo',
                            accessor: (member) => `€${member.incentive.toFixed(2)}`,
                            sortable: true,
                            className: 'text-right font-mono',
                            priority: 9
                          },
                          {
                            key: 'percentage',
                            header: '% sul Totale',
                            accessor: (member) => `${((member.incentive / calculationResults.totalIncentive) * 100).toFixed(1)}%`,
                            sortable: true,
                            className: 'text-right font-mono',
                            priority: 5
                          }
                        ]}
                        getRowKey={(member) => member.memberId}
                        enablePagination={false}
                        enableFiltering={false}
                        enableSorting={true}
                        mobileLayout="scroll"
                      />

                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Totale Incentivi:</span>
                          <span className="text-xl font-bold text-green-600">
                            €{calculationResults.totalIncentive.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">Energia Condivisa Totale:</span>
                          <span className="text-sm font-medium">
                            {calculationResults.totalSharedEnergy.toLocaleString()} kWh
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Report GSE</h3>
                  <p className="text-sm text-muted-foreground">Gestisci i report mensili da inviare al GSE</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Genera Nuovo Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Genera Report GSE</DialogTitle>
                      <DialogDescription>Crea un nuovo report per l'invio al GSE</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Periodo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona periodo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-04">Aprile 2024</SelectItem>
                            <SelectItem value="2024-05">Maggio 2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo Report</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Mensile</SelectItem>
                            <SelectItem value="quarterly">Trimestrale</SelectItem>
                            <SelectItem value="annual">Annuale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {isGeneratingReport && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Generazione in corso...</span>
                          </div>
                          <Progress value={66} className="w-full" />
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
                        {isGeneratingReport ? "Generando..." : "Genera Report"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <ResponsiveTableAdvanced
                    data={gseReportsData}
                    columns={[
                      {
                        key: 'period',
                        header: 'Periodo',
                        accessor: (report) => (
                          <span className="font-medium">
                            {new Date(report.period + "-01").toLocaleDateString("it-IT", {
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        ),
                        sortable: true,
                        priority: 10
                      },
                      {
                        key: 'type',
                        header: 'Tipo',
                        accessor: (report) => report.type,
                        sortable: true,
                        priority: 7
                      },
                      {
                        key: 'status',
                        header: 'Stato',
                        accessor: (report) => getStatusBadge(report.status),
                        sortable: true,
                        priority: 8
                      },
                      {
                        key: 'energyShared',
                        header: 'Energia Condivisa',
                        accessor: (report) => `${report.energyShared.toLocaleString()} kWh`,
                        sortable: true,
                        className: 'text-right font-mono',
                        priority: 6
                      },
                      {
                        key: 'incentiveAmount',
                        header: 'Incentivi',
                        accessor: (report) => `€${report.incentiveAmount.toLocaleString()}`,
                        sortable: true,
                        className: 'text-right font-mono',
                        priority: 9
                      },
                      {
                        key: 'submissionDate',
                        header: 'Data Invio',
                        accessor: (report) => report.submissionDate ? new Date(report.submissionDate).toLocaleDateString("it-IT") : "-",
                        sortable: true,
                        priority: 5
                      },
                      {
                        key: 'actions',
                        header: 'Azioni',
                        accessor: (report) => (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Apri menu</span>
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizza
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Scarica
                              </DropdownMenuItem>
                              {report.status === "Bozza" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Send className="mr-2 h-4 w-4" />
                                    Invia a GSE
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ),
                        className: 'text-right',
                        priority: 1
                      }
                    ]}
                    getRowKey={(report) => report.id}
                    enableFiltering={false}
                    enableSorting={true}
                    enablePagination={true}
                    itemsPerPage={10}
                    emptyMessage="Nessun report trovato"
                    mobileLayout="card"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Andamento Energia Condivisa</CardTitle>
                    <CardDescription>Evoluzione mensile dell'energia condivisa nella CER</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                        <YAxis stroke="#888888" fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <RechartsLine
                          type="monotone"
                          dataKey="energiaCondivisa"
                          stroke="#16a34a"
                          strokeWidth={2}
                          name="Energia Condivisa (kWh)"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Incentivi Mensili</CardTitle>
                    <CardDescription>Evoluzione degli incentivi GSE ricevuti</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                        <YAxis stroke="#888888" fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="incentivi" fill="#2563eb" name="Incentivi (€)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiche Annuali</CardTitle>
                  <CardDescription>Riepilogo delle performance della CER</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {historicalData.reduce((sum, month) => sum + month.energiaCondivisa, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">kWh Condivisi Totali</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        €{historicalData.reduce((sum, month) => sum + month.incentivi, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-600">Incentivi Totali</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        €
                        {Math.round(
                          historicalData.reduce((sum, month) => sum + month.incentivi, 0) /
                            historicalData[historicalData.length - 1].membri,
                        )}
                      </div>
                      <div className="text-sm text-orange-600">Incentivo Medio per Membro</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Compliance Normativa
                  </CardTitle>
                  <CardDescription>
                    Verifica della conformità alle normative GSE e requisiti di reporting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Configurazione CER</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Conforme
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Documentazione Membri</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Completa
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">Report Mensile Aprile</span>
                      </div>
                      <Badge variant="secondary">In Scadenza</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Misurazioni Smart Meter</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Attive
                      </Badge>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Prossima scadenza: Report mensile aprile 2024 entro il 15/05/2024
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Documenti di Compliance</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Checklist Compliance GSE
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Template Report Mensile
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Guida Normativa CER
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
