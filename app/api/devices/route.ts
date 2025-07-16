import { NextRequest, NextResponse } from 'next/server'
import { Device } from '@/components/device-management'

// In-memory storage for demo purposes
// In production, this would be a database
let devices: Device[] = [
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

export async function GET(request: NextRequest) {
  try {
    // You could add query parameters for filtering here
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    
    let filteredDevices = devices
    
    if (type && type !== 'all') {
      filteredDevices = filteredDevices.filter(d => d.type === type)
    }
    
    if (status && status !== 'all') {
      filteredDevices = filteredDevices.filter(d => d.status === status)
    }
    
    return NextResponse.json({ devices: filteredDevices }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch devices' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newDevice: Device = {
      id: `DEV${Date.now()}`,
      ...body,
      lastSeen: new Date(),
      status: "offline",
      installationDate: new Date(),
    }
    
    devices.push(newDevice)
    
    return NextResponse.json({ device: newDevice }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create device' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    const deviceIndex = devices.findIndex(d => d.id === id)
    if (deviceIndex === -1) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    }
    
    devices[deviceIndex] = { ...devices[deviceIndex], ...updates }
    
    return NextResponse.json({ device: devices[deviceIndex] }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update device' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Device ID required' }, { status: 400 })
    }
    
    const deviceIndex = devices.findIndex(d => d.id === id)
    if (deviceIndex === -1) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    }
    
    devices.splice(deviceIndex, 1)
    
    return NextResponse.json({ message: 'Device deleted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete device' }, { status: 500 })
  }
}