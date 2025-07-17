"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function MemberAreaAuthCheck() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      const user = JSON.parse(userData)
      if (user.role === "admin") {
        router.push("/dashboard")
      }
    }
  }, [router])

  return null
}