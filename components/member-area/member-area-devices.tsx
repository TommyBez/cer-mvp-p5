import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Cpu, Gauge } from "lucide-react"

interface Device {
  id: number
  name: string
  type: string
  status: string
  power?: number
  charge?: number
  reading?: number
}

interface MemberAreaDevicesProps {
  devices: Device[]
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "Inverter":
      return <Cpu className="h-5 w-5" />
    case "Batteria":
      return <Battery className="h-5 w-5" />
    case "Contatore":
      return <Gauge className="h-5 w-5" />
    default:
      return <Cpu className="h-5 w-5" />
  }
}

const getDeviceValue = (device: Device) => {
  if (device.power) return `${device.power} kW`
  if (device.charge) return `${device.charge}%`
  if (device.reading) return `${device.reading} kWh`
  return "-"
}

export function MemberAreaDevices({ devices }: MemberAreaDevicesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>I Tuoi Dispositivi</CardTitle>
        <CardDescription>
          Stato e informazioni dei tuoi dispositivi energetici
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <div className="font-medium">{device.name}</div>
                  <div className="text-sm text-muted-foreground">{device.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">{getDeviceValue(device)}</div>
                  <Badge variant={device.status === "Online" ? "default" : "secondary"}>
                    {device.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}