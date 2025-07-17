import { MemberAreaHeader } from "@/components/member-area/member-area-header"
import { MemberAreaMetrics } from "@/components/member-area/member-area-metrics"
import { MemberAreaChart } from "@/components/member-area/member-area-chart"
import { MemberAreaDevices } from "@/components/member-area/member-area-devices"
import { MemberAreaActivities } from "@/components/member-area/member-area-activities"

// Simulate async data fetching
async function getMemberData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    user: {
      name: "Mario Rossi",
      email: "mario.rossi@email.com",
      memberSince: "01/03/2024",
      role: "Prosumer",
    },
    metrics: {
      totalProduced: 1234,
      totalConsumed: 856,
      totalShared: 378,
      earnings: 125.50,
      savedCO2: 234,
      efficiency: 85.5,
    },
    monthlyData: [
      { month: "Gen", produzione: 120, consumo: 90, condivisione: 30 },
      { month: "Feb", produzione: 110, consumo: 85, condivisione: 25 },
      { month: "Mar", produzione: 130, consumo: 95, condivisione: 35 },
      { month: "Apr", produzione: 140, consumo: 88, condivisione: 52 },
      { month: "Mag", produzione: 150, consumo: 92, condivisione: 58 },
      { month: "Giu", produzione: 145, consumo: 90, condivisione: 55 },
    ],
    devices: [
      { id: 1, name: "Inverter Principale", type: "Inverter", status: "Online", power: 4.2 },
      { id: 2, name: "Batteria Tesla", type: "Batteria", status: "Online", charge: 85 },
      { id: 3, name: "Smart Meter", type: "Contatore", status: "Online", reading: 12345 },
    ],
    activities: [
      { id: 1, type: "production", description: "Picco di produzione", value: "5.2 kW", timestamp: "2 ore fa" },
      { id: 2, type: "sharing", description: "Energia condivisa", value: "3.5 kWh", timestamp: "4 ore fa" },
      { id: 3, type: "earning", description: "Incentivo ricevuto", value: "€ 12.50", timestamp: "1 giorno fa" },
    ]
  }
}

export default async function MemberAreaPage() {
  const { user, metrics, monthlyData, devices, activities } = await getMemberData()
  
  return (
    <div className="space-y-6">
      <MemberAreaHeader user={user} />
      <MemberAreaMetrics metrics={metrics} />
      <div className="grid gap-6 lg:grid-cols-2">
        <MemberAreaChart data={monthlyData} />
        <MemberAreaDevices devices={devices} />
      </div>
      <MemberAreaActivities activities={activities} />
    </div>
  )
}
