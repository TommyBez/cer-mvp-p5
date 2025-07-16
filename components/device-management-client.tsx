"use client"

import { useState, useEffect } from "react"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Wifi, 
  WifiOff,
  Activity,
  Zap,
  AlertCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTableAdvanced } from "@/components/responsive-table-advanced"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/responsive-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export interface Device {
  id: string
  name: string
  type: "smart_meter" | "solar_inverter" | "battery" | "ev_charger"
  serialNumber: string
  memberId: string
  memberName: string
  status: "online" | "offline" | "error"
  lastSeen: Date
  firmwareVersion: string
  location: string
  installationDate: Date
  mqttTopic: string
  lastReading?: {
    timestamp: Date
    energyProduced: number
    energyConsumed: number
    instantPower: number
    voltage: number
    current: number
  }
}

// Simulated device data
const initialDevices: Device[] = [
  {
    id: "SM001",
    name: "Smart Meter Casa Rossi",
    type: "smart_meter",
    serialNumber: "2G-IT-2024-001",
    memberId: "M001",
    memberName: "Mario Rossi",
    status: "online",
    lastSeen: new Date(),
    firmwareVersion: "2.1.4",
    location: "Via Roma 1, Milano",
    installationDate: new Date("2024-01-15"),
    mqttTopic: "cer/devices/SM001/data",
    lastReading: {
      timestamp: new Date(),
      energyProduced: 0,
      energyConsumed: 4.5,
      instantPower: 1.2,
      voltage: 223,
      current: 5.4,
    }
  },
  {
    id: "SI001",
    name: "Inverter Solare Bianchi",
    type: "solar_inverter",
    serialNumber: "INV-2024-002",
    memberId: "M002",
    memberName: "Luigi Bianchi",
    status: "online",
    lastSeen: new Date(),
    firmwareVersion: "3.0.1",
    location: "Via Milano 15, Roma",
    installationDate: new Date("2024-02-20"),
    mqttTopic: "cer/devices/SI001/data",
    lastReading: {
      timestamp: new Date(),
      energyProduced: 3.2,
      energyConsumed: 0,
      instantPower: 3.2,
      voltage: 220,
      current: 14.5,
    }
  },
  {
    id: "SM002",
    name: "Smart Meter Verdi",
    type: "smart_meter",
    serialNumber: "2G-IT-2024-003",
    memberId: "M003",
    memberName: "Anna Verdi",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    firmwareVersion: "2.1.3",
    location: "Via Napoli 7, Torino",
    installationDate: new Date("2024-03-10"),
    mqttTopic: "cer/devices/SM002/data",
  }
]

export function DeviceManagementClient() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [showRealTimeData, setShowRealTimeData] = useState(false)
  const [realTimeData, setRealTimeData] = useState<any[]>([])

  // Simulate real-time data updates
  useEffect(() => {
    if (showRealTimeData && selectedDevice && selectedDevice.status === "online") {
      const interval = setInterval(() => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString(),
          power: Math.random() * 5 + 2,
          voltage: 220 + Math.random() * 10 - 5,
        }
        setRealTimeData(prev => [...prev.slice(-20), newDataPoint])
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [showRealTimeData, selectedDevice])

  const deviceTypes = {
    smart_meter: { label: "Smart Meter", icon: Activity },
    solar_inverter: { label: "Inverter Solare", icon: Zap },
    battery: { label: "Batteria", icon: Zap },
    ev_charger: { label: "Caricatore EV", icon: Zap },
  }

  const filteredDevices = devices.filter(device => {
    const matchesSearch = 
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || device.type === filterType
    const matchesStatus = filterStatus === "all" || device.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddDevice = (newDevice: Partial<Device>) => {
    const device: Device = {
      id: `DEV${Date.now()}`,
      ...newDevice as Device,
      lastSeen: new Date(),
      status: "offline",
    }
    setDevices([...devices, device])
    setIsAddDialogOpen(false)
  }

  const handleUpdateDevice = (updatedDevice: Device) => {
    setDevices(devices.map(d => d.id === updatedDevice.id ? updatedDevice : d))
    setEditingDevice(null)
  }

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id))
  }

  const DeviceForm = ({ device, onSubmit }: { device?: Device | null, onSubmit: (device: any) => void }) => {
    const [formData, setFormData] = useState({
      name: device?.name || "",
      type: device?.type || "smart_meter",
      serialNumber: device?.serialNumber || "",
      memberId: device?.memberId || "",
      memberName: device?.memberName || "",
      firmwareVersion: device?.firmwareVersion || "",
      location: device?.location || "",
      mqttTopic: device?.mqttTopic || "",
    })

    return (
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome Dispositivo</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="es. Smart Meter Casa Rossi"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">Tipo Dispositivo</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smart_meter">Smart Meter</SelectItem>
              <SelectItem value="solar_inverter">Inverter Solare</SelectItem>
              <SelectItem value="battery">Batteria</SelectItem>
              <SelectItem value="ev_charger">Caricatore EV</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="serialNumber">Numero Seriale</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            placeholder="es. 2G-IT-2024-001"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="memberName">Membro Associato</Label>
          <Input
            id="memberName"
            value={formData.memberName}
            onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
            placeholder="es. Mario Rossi"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Ubicazione</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="es. Via Roma 1, Milano"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mqttTopic">Topic MQTT</Label>
          <Input
            id="mqttTopic"
            value={formData.mqttTopic}
            onChange={(e) => setFormData({ ...formData, mqttTopic: e.target.value })}
            placeholder="es. cer/devices/SM001/data"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="firmwareVersion">Versione Firmware</Label>
          <Input
            id="firmwareVersion"
            value={formData.firmwareVersion}
            onChange={(e) => setFormData({ ...formData, firmwareVersion: e.target.value })}
            placeholder="es. 2.1.4"
          />
        </div>
        <Button onClick={() => onSubmit(formData)}>
          {device ? "Aggiorna" : "Aggiungi"} Dispositivo
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivi Totali</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
            <Wifi className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {devices.filter(d => d.status === "online").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <WifiOff className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {devices.filter(d => d.status === "offline").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errori</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {devices.filter(d => d.status === "error").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Gestione Dispositivi IoT</CardTitle>
          <CardDescription>
            Gestisci smart meter e dispositivi IoT connessi alla comunità energetica
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca dispositivi..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo dispositivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i tipi</SelectItem>
                <SelectItem value="smart_meter">Smart Meter</SelectItem>
                <SelectItem value="solar_inverter">Inverter Solare</SelectItem>
                <SelectItem value="battery">Batteria</SelectItem>
                <SelectItem value="ev_charger">Caricatore EV</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="error">Errore</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Aggiungi Dispositivo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Aggiungi Nuovo Dispositivo</DialogTitle>
                  <DialogDescription>
                    Aggiungi un nuovo smart meter o dispositivo IoT alla comunità energetica
                  </DialogDescription>
                </DialogHeader>
                <DeviceForm onSubmit={handleAddDevice} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Devices Table */}
          <div className="rounded-md border">
            <ResponsiveTableAdvanced
              data={filteredDevices}
              columns={[
                {
                  key: 'device',
                  header: 'Dispositivo',
                  accessor: (device) => {
                    const DeviceIcon = deviceTypes[device.type].icon
                    return (
                      <div className="flex items-center gap-2">
                        <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{device.name}</div>
                          <div className="text-sm text-muted-foreground">{device.serialNumber}</div>
                        </div>
                      </div>
                    )
                  },
                  sortable: true,
                  filterable: true,
                  priority: 10
                },
                {
                  key: 'type',
                  header: 'Tipo',
                  accessor: (device) => deviceTypes[device.type].label,
                  sortable: true,
                  priority: 6
                },
                {
                  key: 'memberName',
                  header: 'Membro',
                  accessor: (device) => device.memberName,
                  sortable: true,
                  filterable: true,
                  priority: 8
                },
                {
                  key: 'status',
                  header: 'Stato',
                  accessor: (device) => (
                    <Badge
                      variant={
                        device.status === "online"
                          ? "default"
                          : device.status === "offline"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {device.status === "online" && <Wifi className="mr-1 h-3 w-3" />}
                      {device.status === "offline" && <WifiOff className="mr-1 h-3 w-3" />}
                      {device.status === "error" && <AlertCircle className="mr-1 h-3 w-3" />}
                      {device.status}
                    </Badge>
                  ),
                  sortable: true,
                  priority: 7
                },
                {
                  key: 'lastReading',
                  header: 'Ultima Lettura',
                  accessor: (device) => device.lastReading ? (
                    <div className="text-sm">
                      <div>P: {device.lastReading.instantPower.toFixed(1)} kW</div>
                      <div className="text-muted-foreground">
                        {new Date(device.lastReading.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  ),
                  sortable: true,
                  priority: 5
                },
                {
                  key: 'location',
                  header: 'Ubicazione',
                  accessor: (device) => device.location,
                  sortable: true,
                  filterable: true,
                  priority: 4
                },
                {
                  key: 'actions',
                  header: 'Azioni',
                  accessor: (device) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDevice(device)
                            setShowRealTimeData(true)
                          }}
                        >
                          <Activity className="mr-2 h-4 w-4" />
                          Visualizza Dati Real-time
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setEditingDevice(device)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifica
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteDevice(device.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Elimina
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ),
                  className: 'text-right',
                  priority: 1
                }
              ]}
              getRowKey={(device) => device.id}
              enableFiltering={false} // We already have custom filtering
              enableSorting={true}
              enablePagination={true}
              itemsPerPage={10}
              emptyMessage="Nessun dispositivo trovato"
              mobileLayout="card"
            />
          </div>
        </CardContent>
      </Card>

      {/* Real-time Data Modal */}
      <Dialog open={showRealTimeData} onOpenChange={setShowRealTimeData}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Dati Real-time: {selectedDevice?.name}</DialogTitle>
            <DialogDescription>
              Monitoraggio in tempo reale dei dati del dispositivo
            </DialogDescription>
          </DialogHeader>
          {selectedDevice?.status === "online" ? (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Potenza Istantanea</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {selectedDevice.lastReading?.instantPower.toFixed(2)} kW
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Tensione</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {selectedDevice.lastReading?.voltage.toFixed(0)} V
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Corrente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {selectedDevice.lastReading?.current.toFixed(1)} A
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="power"
                      stroke="#8884d8"
                      name="Potenza (kW)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="voltage"
                      stroke="#82ca9d"
                      name="Tensione (V)"
                      strokeWidth={2}
                      yAxisId="right"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Dispositivo Offline</AlertTitle>
              <AlertDescription>
                Il dispositivo non è attualmente connesso. Impossibile visualizzare i dati in tempo reale.
              </AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Device Dialog */}
      <Dialog open={!!editingDevice} onOpenChange={() => setEditingDevice(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifica Dispositivo</DialogTitle>
            <DialogDescription>
              Modifica le informazioni del dispositivo
            </DialogDescription>
          </DialogHeader>
          <DeviceForm device={editingDevice} onSubmit={(data) => handleUpdateDevice({ ...editingDevice!, ...data })} />
        </DialogContent>
      </Dialog>
    </div>
  )
}