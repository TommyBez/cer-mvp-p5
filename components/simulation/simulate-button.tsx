"use client"

import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SimulateButtonProps {
  onClick: () => void
  isCalculating: boolean
}

export function SimulateButton({ onClick, isCalculating }: SimulateButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      disabled={isCalculating}
      className="mt-6"
    >
      <Calculator className="mr-2 h-4 w-4" />
      {isCalculating ? "Calcolo in corso..." : "Simula"}
    </Button>
  )
}