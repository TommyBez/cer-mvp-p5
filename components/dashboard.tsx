"use client"

import Link from "next/link"
import { Bell, Calculator, FileText, Home, LineChart, Package2, Power, Share2, Users, Zap, Router } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
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
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [realTimeData, setRealTimeData] = useState({
    totalProduced: 0,
    totalConsumed: 0,
    totalShared: 0,
    instantPower: 0,
    deviceCount: 0,
    onlineDevices: 0,
  })
  const [chartData, setChartData] = useState([
    { name: "Lun", produzione: 400, consumo: 240 },
    { name: "Mar", produzione: 300, consumo: 139 },
    { name: "Mer", produzione: 200, consumo: 980 },
    { name: "Gio", produzione: 278, consumo: 390 },
    { name: "Ven", produzione: 189, consumo: 480 },
    { name: "Sab", produzione: 239, consumo: 380 },
    { name: "Dom", produzione: 349, consumo: 430 },
  ])
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

  // Simulate real-time data updates from IoT devices
  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        // Fetch device summary data
        const response = await fetch('/api/devices')
        const data = await response.json()
        const devices = data.devices || []
        
        // Calculate aggregated real-time values
        let totalProduced = 0
        let totalConsumed = 0
        let instantPower = 0
        let onlineCount = 0
        
        devices.forEach((device: any) => {
          if (device.status === 'online' && device.lastReading) {
            totalProduced += device.lastReading.energyProduced || 0
            totalConsumed += device.lastReading.energyConsumed || 0
            instantPower += device.lastReading.instantPower || 0
            onlineCount++
          }
        })
        
        setRealTimeData({
          totalProduced: 1250 + totalProduced, // Base value + real-time
          totalConsumed: 975 + totalConsumed,
          totalShared: Math.max(0, (1250 + totalProduced) - (975 + totalConsumed)),
          instantPower,
          deviceCount: devices.length,
          onlineDevices: onlineCount,
        })
      } catch (error) {
        console.error('Failed to fetch device data:', error)
      }
    }

    // Initial fetch
    fetchDeviceData()
    
    // Update every 5 seconds
    const interval = setInterval(fetchDeviceData, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

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
                className={`flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Membri" : ""}
              >
                <Users className="h-4 w-4" />
                {!sidebarCollapsed && "Membri"}
              </Link>
              <Link
                href="/devices"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? "Dispositivi IoT" : ""}
              >
                <Router className="h-4 w-4" />
                {!sidebarCollapsed && "Dispositivi IoT"}
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${sidebarCollapsed ? "justify-center" : ""}`}
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
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard Energetica</h1>
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
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energia Prodotta</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeData.totalProduced.toFixed(0)} kWh</div>
                <p className="text-xs text-muted-foreground">
                  {realTimeData.onlineDevices > 0 && (
                    <span className="text-green-600">● {realTimeData.onlineDevices} dispositivi online</span>
                  )}
                  {realTimeData.onlineDevices === 0 && (
                    <span>+20.1% rispetto al mese scorso</span>
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energia Consumata</CardTitle>
                <Power className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeData.totalConsumed.toFixed(0)} kWh</div>
                <p className="text-xs text-muted-foreground">
                  {realTimeData.instantPower > 0 && (
                    <span>Potenza istantanea: {realTimeData.instantPower.toFixed(1)} kW</span>
                  )}
                  {realTimeData.instantPower === 0 && (
                    <span>+18.3% rispetto al mese scorso</span>
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeData.totalShared.toFixed(0)} kWh</div>
                <p className="text-xs text-muted-foreground">
                  {realTimeData.deviceCount > 0 && (
                    <span>Totale dispositivi: {realTimeData.deviceCount}</span>
                  )}
                  {realTimeData.deviceCount === 0 && (
                    <span>+19% rispetto al mese scorso</span>
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Andamento Energetico (Ultimi 7 giorni)</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsLineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} unit="kWh" />
                    <Tooltip />
                    <Legend />
                    <RechartsLine type="monotone" dataKey="produzione" stroke="#16a34a" activeDot={{ r: 8 }} />
                    <RechartsLine type="monotone" dataKey="consumo" stroke="#ea580c" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Membri Recenti</CardTitle>
                <CardDescription>Gli ultimi 5 membri che si sono uniti alla comunità.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveTable
                  data={[
                    { id: 1, name: 'Mario Rossi', email: 'mario.rossi@email.com', status: 'Attivo' },
                    { id: 2, name: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', status: 'Attivo' },
                    { id: 3, name: 'Luca Verdi', email: 'luca.verdi@email.com', status: 'In attesa' },
                    { id: 4, name: 'Anna Neri', email: 'anna.neri@email.com', status: 'Attivo' },
                    { id: 5, name: 'Paolo Gialli', email: 'paolo.gialli@email.com', status: 'Attivo' }
                  ]}
                  columns={[
                    {
                      key: 'name',
                      header: 'Nome',
                      accessor: (member) => (
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      ),
                      priority: 10
                    },
                    {
                      key: 'status',
                      header: 'Stato',
                      accessor: (member) => (
                        <Badge variant={member.status === 'In attesa' ? 'secondary' : 'outline'}>
                          {member.status}
                        </Badge>
                      ),
                      className: 'text-right',
                      priority: 5
                    }
                  ]}
                  getRowKey={(member) => member.id}
                  mobileLayout="card"
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
