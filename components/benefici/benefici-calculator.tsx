"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function BeneficiCalculator() {
  const [consumoMensile, setConsumoMensile] = useState([250])
  const [percentualeCondivisa, setPercentualeCondivisa] = useState([45])

  const calcolaRisparmio = () => {
    const consumo = consumoMensile[0]
    const percentuale = percentualeCondivisa[0] / 100
    const energiaCondivisa = consumo * percentuale
    
    const tariffaIncentivante = 0.11
    const restituzioneComponenti = 0.008
    
    const incentivo = energiaCondivisa * tariffaIncentivante
    const restituzione = energiaCondivisa * restituzioneComponenti
    const risparmioEnergia = energiaCondivisa * 0.15
    
    return {
      incentivo: incentivo.toFixed(2),
      restituzione: restituzione.toFixed(2),
      risparmio: risparmioEnergia.toFixed(2),
      totale: (incentivo + restituzione + risparmioEnergia).toFixed(2)
    }
  }

  const risparmioCalcolato = calcolaRisparmio()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calcola il Tuo Risparmio</CardTitle>
        <CardDescription>Stima i tuoi benefici economici personalizzati</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="consumo">Consumo Mensile Stimato</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="consumo"
                  min={100}
                  max={500}
                  step={10}
                  value={consumoMensile}
                  onValueChange={setConsumoMensile}
                  className="flex-1"
                />
                <div className="w-20 text-right font-medium">{consumoMensile[0]} kWh</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="percentuale">Percentuale Energia Condivisa</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="percentuale"
                  min={0}
                  max={100}
                  step={5}
                  value={percentualeCondivisa}
                  onValueChange={setPercentualeCondivisa}
                  className="flex-1"
                />
                <div className="w-20 text-right font-medium">{percentualeCondivisa[0]}%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium">Risparmio Mensile Stimato</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Incentivo Tariffa Premio</span>
                <span className="font-medium">€{risparmioCalcolato.incentivo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Restituzione Componenti</span>
                <span className="font-medium">€{risparmioCalcolato.restituzione}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Risparmio in Bolletta</span>
                <span className="font-medium">€{risparmioCalcolato.risparmio}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Totale Mensile</span>
                  <span className="text-lg font-bold text-green-600">€{risparmioCalcolato.totale}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Risparmio annuale stimato: €{(parseFloat(risparmioCalcolato.totale) * 12).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}