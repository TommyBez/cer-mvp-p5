"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface SimulationConfig {
  energyPrice: number
  incentiveRate: number
  maintenanceCost: number
  memberCount: number
  averageProduction: number
  averageConsumption: number
}

interface SimulationConfigFormProps {
  config: SimulationConfig
  onChange: (field: keyof SimulationConfig, value: number) => void
  disabled: boolean
}

export function SimulationConfigForm({ config, onChange, disabled }: SimulationConfigFormProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="energyPrice">Prezzo Energia (€/kWh)</Label>
        <Input
          id="energyPrice"
          type="number"
          step="0.01"
          value={config.energyPrice}
          onChange={(e) => onChange('energyPrice', parseFloat(e.target.value))}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="incentiveRate">Tariffa Incentivante (€/MWh)</Label>
        <Input
          id="incentiveRate"
          type="number"
          value={config.incentiveRate}
          onChange={(e) => onChange('incentiveRate', parseFloat(e.target.value))}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maintenanceCost">Costi Manutenzione (€/mese)</Label>
        <Input
          id="maintenanceCost"
          type="number"
          value={config.maintenanceCost}
          onChange={(e) => onChange('maintenanceCost', parseFloat(e.target.value))}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="memberCount">Numero Membri</Label>
        <div className="flex items-center gap-3">
          <Slider
            id="memberCount"
            min={10}
            max={200}
            step={1}
            value={[config.memberCount]}
            onValueChange={([value]) => onChange('memberCount', value)}
            disabled={disabled}
            className="flex-1"
          />
          <span className="w-12 text-sm font-medium">{config.memberCount}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="averageProduction">Produzione Media (kWh/mese)</Label>
        <Input
          id="averageProduction"
          type="number"
          value={config.averageProduction}
          onChange={(e) => onChange('averageProduction', parseFloat(e.target.value))}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="averageConsumption">Consumo Medio (kWh/mese)</Label>
        <Input
          id="averageConsumption"
          type="number"
          value={config.averageConsumption}
          onChange={(e) => onChange('averageConsumption', parseFloat(e.target.value))}
          disabled={disabled}
        />
      </div>
    </div>
  )
}