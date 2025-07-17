"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function DashboardAuthCheck() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}