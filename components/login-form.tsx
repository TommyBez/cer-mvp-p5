"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package2 } from "lucide-react"

// Database simulato degli utenti
const users = [
  {
    email: "admin@cer.it",
    password: "admin123",
    role: "admin",
    name: "Amministratore CER",
    id: 1,
  },
  {
    email: "mario.rossi@email.com",
    password: "member123",
    role: "member",
    name: "Mario Rossi",
    id: 2,
  },
  {
    email: "giulia.bianchi@email.com",
    password: "member123",
    role: "member",
    name: "Giulia Bianchi",
    id: 3,
  },
]

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simula una chiamata API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verifica le credenziali
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      // Salva i dati utente nel localStorage
      localStorage.setItem("user", JSON.stringify(user))

      // Reindirizza in base al ruolo
      if (user.role === "admin") {
        router.push("/dashboard")
      } else {
        router.push("/member-area")
      }
    } else {
      setError("Credenziali non valide. Riprova.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Package2 className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-2xl font-bold">CER Manager</span>
          </div>
          <CardTitle className="text-2xl text-center">Accedi al sistema</CardTitle>
          <CardDescription className="text-center">
            Inserisci le tue credenziali per accedere alla piattaforma CER
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Inserisci la tua password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Accesso in corso..." : "Accedi"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Credenziali di test:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                <strong>Amministratore:</strong> admin@cer.it / admin123
              </div>
              <div>
                <strong>Membro:</strong> mario.rossi@email.com / member123
              </div>
              <div>
                <strong>Membro:</strong> giulia.bianchi@email.com / member123
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
