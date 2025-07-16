import { redirect } from "next/navigation"

export default function DashboardHome() {
  // Server-side redirect keeps this component fully on the server.
  redirect("/members")
}