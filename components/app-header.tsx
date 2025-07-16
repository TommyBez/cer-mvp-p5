"use client"

import { Bell } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { PageTitle } from "@/components/page-title"

export function AppHeader() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    router.push("/login")
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="-ml-1" />
      
      <div className="w-full flex-1">
        <PageTitle />
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
  )
}