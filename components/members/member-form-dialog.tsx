"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/responsive-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Member {
  id: number
  name: string
  email: string
  role: string
  status: string
  energyShared: string
  joinDate: string
  address: string
  phone: string
  fiscalCode: string
}

interface MemberFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: Member | null
  onSave: (member: any) => void
}

export function MemberFormDialog({ open, onOpenChange, member, onSave }: MemberFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Consumatore",
    status: "In attesa",
    address: "",
    phone: "",
    fiscalCode: "",
  })

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
        address: member.address,
        phone: member.phone,
        fiscalCode: member.fiscalCode,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Consumatore",
        status: "In attesa",
        address: "",
        phone: "",
        fiscalCode: "",
      })
    }
  }, [member])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const memberData = member 
      ? { ...member, ...formData }
      : {
          ...formData,
          energyShared: "0 kWh",
          joinDate: new Date().toLocaleDateString('it-IT'),
        }
    
    onSave(memberData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{member ? "Modifica Membro" : "Aggiungi Nuovo Membro"}</DialogTitle>
            <DialogDescription>
              {member ? "Modifica i dettagli del membro selezionato" : "Inserisci i dettagli del nuovo membro"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Ruolo</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consumatore">Consumatore</SelectItem>
                    <SelectItem value="Produttore">Produttore</SelectItem>
                    <SelectItem value="Prosumer">Prosumer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Stato</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Attivo">Attivo</SelectItem>
                    <SelectItem value="In attesa">In attesa</SelectItem>
                    <SelectItem value="Sospeso">Sospeso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fiscalCode">Codice Fiscale</Label>
              <Input
                id="fiscalCode"
                value={formData.fiscalCode}
                onChange={(e) => setFormData({ ...formData, fiscalCode: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type="submit">
              {member ? "Salva Modifiche" : "Aggiungi Membro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}