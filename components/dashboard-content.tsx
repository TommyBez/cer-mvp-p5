"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardMetrics } from "./dashboard/dashboard-metrics"
import { DashboardChart } from "./dashboard/dashboard-chart"
import { DashboardActivities } from "./dashboard/dashboard-activities"

interface DashboardData {
  realTimeData: {
    totalProduced: number
    totalConsumed: number
    totalShared: number
    instantPower: number
    deviceCount: number
    onlineDevices: number
  }
  chartData: Array<{
    name: string
    produzione: number
    consumo: number
  }>
  activities: Array<{
    id: number
    type: string
    description: string
    value: string
    timestamp: string
  }>
}

interface DashboardContentProps {
  initialData: DashboardData
}

export function DashboardContent({ initialData }: DashboardContentProps) {
  const [user, setUser] = useState<any>(null)
  const [realTimeData, setRealTimeData] = useState(initialData.realTimeData)
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

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        instantPower: Math.max(0, prev.instantPower + (Math.random() - 0.5) * 0.5),
        totalProduced: prev.totalProduced + Math.random() * 10,
        totalConsumed: prev.totalConsumed + Math.random() * 8,
        totalShared: prev.totalShared + Math.random() * 2,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <DashboardMetrics data={realTimeData} />
      <DashboardChart data={initialData.chartData} />
      <DashboardActivities activities={initialData.activities} />
    </div>
  )
}