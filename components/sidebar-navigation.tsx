import {
  Calculator,
  FileText,
  Home,
  LineChart,
  Users,
} from "lucide-react"
import Link from "next/link"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items configuration - can be moved to a config file
const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Membri",
    icon: Users,
    href: "/members",
  },
  {
    title: "Documenti",
    icon: FileText,
    href: "/documents",
  },
  {
    title: "Simulazione",
    icon: Calculator,
    href: "/simulation",
  },
  {
    title: "Report GSE",
    icon: LineChart,
    href: "/gse-reports",
  },
]

interface SidebarNavigationProps {
  currentPath?: string
}

export function SidebarNavigation({ currentPath }: SidebarNavigationProps) {
  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={currentPath === item.href}>
            <Link href={item.href}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}