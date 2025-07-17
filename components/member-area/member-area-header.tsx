import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  name: string
  email: string
  memberSince: string
  role: string
}

interface MemberAreaHeaderProps {
  user: User
}

export function MemberAreaHeader({ user }: MemberAreaHeaderProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <Card className="p-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Benvenuto, {user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Membro dal: {user.memberSince}</span>
            <span>•</span>
            <span>Ruolo: {user.role}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}