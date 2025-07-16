"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardHome() {
  const router = useRouter()
  
  useEffect(() => {
    router.push("/members")
  }, [router])
  
  return null
}