"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function DashboardAuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (!user) {
        router.push("/login")
      }
    }
  }, [router])

  return <>{children}</>
}