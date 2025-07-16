import { NextRequest, NextResponse } from 'next/server'
import { SmartMeterReading } from '@/lib/mqtt-client'

// Simulated real-time data store
// In production, this would come from an MQTT broker or time-series database
const deviceReadings: Map<string, SmartMeterReading[]> = new Map()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deviceId = params.id
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const from = searchParams.get('from')
    
    // Get or initialize readings for this device
    if (!deviceReadings.has(deviceId)) {
      deviceReadings.set(deviceId, [])
    }
    
    let readings = deviceReadings.get(deviceId)!
    
    // Filter by timestamp if 'from' parameter is provided
    if (from) {
      const fromDate = new Date(from)
      readings = readings.filter(r => r.timestamp >= fromDate)
    }
    
    // Limit the results
    readings = readings.slice(-limit)
    
    return NextResponse.json({ readings }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch readings' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deviceId = params.id
    const body = await request.json()
    
    const reading: SmartMeterReading = {
      deviceId,
      timestamp: new Date(body.timestamp || Date.now()),
      energyProduced: parseFloat(body.energyProduced || 0),
      energyConsumed: parseFloat(body.energyConsumed || 0),
      instantPower: parseFloat(body.instantPower || 0),
      voltage: parseFloat(body.voltage || 0),
      current: parseFloat(body.current || 0),
      powerFactor: parseFloat(body.powerFactor || 1),
    }
    
    // Get or initialize readings for this device
    if (!deviceReadings.has(deviceId)) {
      deviceReadings.set(deviceId, [])
    }
    
    const readings = deviceReadings.get(deviceId)!
    readings.push(reading)
    
    // Keep only last 1000 readings per device
    if (readings.length > 1000) {
      readings.shift()
    }
    
    // In production, you would also:
    // 1. Store in a time-series database
    // 2. Update device status and lastSeen
    // 3. Calculate aggregated values
    // 4. Send real-time updates via WebSocket
    
    return NextResponse.json({ reading }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to store reading' }, { status: 500 })
  }
}

// Simulate real-time data generation
export function generateSimulatedData(deviceId: string, type: string) {
  const baseValues = {
    smart_meter: {
      energyProduced: 0,
      energyConsumed: 15 + Math.random() * 10,
      instantPower: 2 + Math.random() * 3,
      voltage: 220 + Math.random() * 10 - 5,
      current: 10 + Math.random() * 20,
    },
    solar_inverter: {
      energyProduced: 20 + Math.random() * 10,
      energyConsumed: 0,
      instantPower: 3 + Math.random() * 4,
      voltage: 220 + Math.random() * 10 - 5,
      current: 15 + Math.random() * 10,
    },
    battery: {
      energyProduced: Math.random() * 5,
      energyConsumed: Math.random() * 5,
      instantPower: -2 + Math.random() * 4,
      voltage: 48 + Math.random() * 2 - 1,
      current: -20 + Math.random() * 40,
    },
    ev_charger: {
      energyProduced: 0,
      energyConsumed: 7 + Math.random() * 3,
      instantPower: 7 + Math.random() * 3,
      voltage: 220 + Math.random() * 10 - 5,
      current: 32 + Math.random() * 8,
    },
  }
  
  const values = baseValues[type as keyof typeof baseValues] || baseValues.smart_meter
  
  const reading: SmartMeterReading = {
    deviceId,
    timestamp: new Date(),
    ...values,
    powerFactor: 0.85 + Math.random() * 0.15,
  }
  
  return reading
}