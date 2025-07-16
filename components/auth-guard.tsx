"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

/**
 * AuthGuard
 * A lightweight client component that redirects unauthenticated users
 * to the /login route. Authentication is currently verified via
 * localStorage to preserve the existing behaviour while allowing the
 * surrounding layout to remain a Server Component.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (!user) {
        router.replace("/login")
      }
    }
  }, [router])

  return <>{children}</>
}