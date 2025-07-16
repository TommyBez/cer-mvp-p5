import { Power, Share2, Zap, Package2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/data-service"

export async function DashboardStats() {
  const stats = await getDashboardStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Energia Prodotta
          </CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProduced.toLocaleString()} kWh</div>
          <p className="text-xs text-muted-foreground">
            +20.1% rispetto al mese scorso
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Energia Consumata
          </CardTitle>
          <Power className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalConsumed.toLocaleString()} kWh</div>
          <p className="text-xs text-muted-foreground">
            +10.5% rispetto al mese scorso
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
          <Share2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalShared.toLocaleString()} kWh</div>
          <p className="text-xs text-muted-foreground">
            +19% rispetto al mese scorso
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dispositivi Attivi</CardTitle>
          <Package2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.onlineDevices}/{stats.deviceCount}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.onlineDevices / stats.deviceCount) * 100)}% online
          </p>
        </CardContent>
      </Card>
    </div>
  )
}