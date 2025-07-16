"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Bell,
  Calculator,
  FileText,
  Home,
  LineChart,
  Package2,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface NavigationLayoutProps {
  children: React.ReactNode
  title: string
  activeRoute: string
  user?: any
}

export function NavigationLayout({ children, title, activeRoute, user }: NavigationLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    router.push("/login")
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/", label: "Membri", icon: Users },
    { href: "/documents", label: "Documenti", icon: FileText },
    { href: "/simulation", label: "Simulazione", icon: Calculator },
    { href: "/gse-reports", label: "Report GSE", icon: LineChart },
  ]

  // Navigation content component that can be reused in both desktop and mobile
  const NavigationContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeRoute === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              } ${!isMobile && sidebarCollapsed ? "justify-center" : ""}`}
              title={!isMobile && sidebarCollapsed ? item.label : ""}
              onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {(isMobile || !sidebarCollapsed) && item.label}
            </Link>
          )
        })}
      </nav>
      {(isMobile || !sidebarCollapsed) && (
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
    </>
  )

  return (
    <div
      className={`grid min-h-screen w-full transition-all duration-300 ${
        sidebarCollapsed
          ? "md:grid-cols-[64px_1fr]"
          : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
      }`}
    >
      {/* Desktop Sidebar */}
      <div
        className={`hidden border-r bg-background md:block transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-[220px] lg:w-[280px]"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
            <Link
              href="/"
              className={`flex items-center gap-2 font-semibold ${
                sidebarCollapsed ? "justify-center w-full" : ""
              }`}
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
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex-1">
            <NavigationContent isMobile={false} />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Package2 className="h-6 w-6 text-green-600" />
                  <span>CER Manager</span>
                </Link>
              </div>
              <div className="flex-1 overflow-y-auto">
                <NavigationContent isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
          </div>
          
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8 bg-transparent">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <Image
                    src="/placeholder-user.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Benvenuto, {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Impostazioni</DropdownMenuItem>
                <DropdownMenuItem>Supporto</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </header>
        
        {children}
      </div>
    </div>
  )
}