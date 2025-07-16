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
  Router,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { DeviceManagement } from "@/components/device-management"

export default function DevicesPage() {
  const [user, setUser] = useState<any>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
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
              className={`flex items-center gap-2 font-semibold ${sidebarCollapsed ? "justify-center" : ""}`}
            >
              <Package2 className="h-6 w-6" />
              {!sidebarCollapsed && <span>CER Manager</span>}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                {!sidebarCollapsed && "Dashboard"}
              </Link>
              <Link
                href="/members"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                {!sidebarCollapsed && "Gestione Membri"}
              </Link>
              <Link
                href="/devices"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Router className="h-4 w-4" />
                {!sidebarCollapsed && "Dispositivi IoT"}
              </Link>
              <Link
                href="/documents"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                {!sidebarCollapsed && "Documenti"}
              </Link>
              <Link
                href="/gse-reports"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                {!sidebarCollapsed && "Report GSE"}
              </Link>
              <Link
                href="/simulation"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Calculator className="h-4 w-4" />
                {!sidebarCollapsed && "Simulazione Economica"}
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <div
              className={`flex gap-3 rounded-lg p-3 ${sidebarCollapsed ? "justify-center" : ""}`}
            >
              <Image
                src="/placeholder.svg"
                width={40}
                height={40}
                alt="Avatar"
                className="rounded-full"
              />
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Gestione Dispositivi IoT</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="rounded-full"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Il mio Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Impostazioni</DropdownMenuItem>
              <DropdownMenuItem>Supporto</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 lg:gap-6 lg:p-6">
          <DeviceManagement />
        </main>
      </div>
    </div>
  )
}