"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package2, Zap, TrendingUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MemberSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/member-area",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/member-area/consumi",
      label: "I Miei Consumi",
      icon: Zap,
    },
    {
      href: "/member-area/benefici",
      label: "Benefici Economici",
      icon: TrendingUp,
    },
    {
      href: "/member-area/documenti",
      label: "Documenti",
      icon: FileText,
    },
  ]

  return (
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
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
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
  )
}