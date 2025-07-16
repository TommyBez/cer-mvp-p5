// Mock data service for simulating server-side data fetching
// These functions simulate API calls with artificial delays

export interface User {
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'member' | 'producer' | 'consumer';
  email: string;
}

export interface DashboardStats {
  totalProduced: number;
  totalConsumed: number;
  totalShared: number;
  instantPower: number;
  deviceCount: number;
  onlineDevices: number;
}

export interface ChartDataPoint {
  name: string;
  produzione: number;
  consumo: number;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  energyShared: string;
  joinDate: string;
  address: string;
  phone: string;
  fiscalCode: string;
  description?: string;
}

// Simulate delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCurrentUser(): Promise<User | null> {
  await delay(100);
  // In a real app, this would check session/cookies server-side
  return {
    id: 1,
    username: "admin",
    name: "Admin User",
    role: "admin",
    email: "admin@example.com"
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(800); // Simulate API delay
  return {
    totalProduced: 8234,
    totalConsumed: 5932,
    totalShared: 2302,
    instantPower: 245,
    deviceCount: 18,
    onlineDevices: 15,
  };
}

export async function getChartData(): Promise<ChartDataPoint[]> {
  await delay(1200); // Simulate API delay
  return [
    { name: "Lun", produzione: 400, consumo: 240 },
    { name: "Mar", produzione: 300, consumo: 139 },
    { name: "Mer", produzione: 200, consumo: 980 },
    { name: "Gio", produzione: 278, consumo: 390 },
    { name: "Ven", produzione: 189, consumo: 480 },
    { name: "Sab", produzione: 239, consumo: 380 },
    { name: "Dom", produzione: 349, consumo: 430 },
  ];
}

export async function getRecentActivity() {
  await delay(600); // Simulate API delay
  return [
    { id: 1, action: "Nuovo membro", detail: "Mario Rossi ha aderito", time: "10:30" },
    { id: 2, action: "Produzione", detail: "Picco di 458kW", time: "09:15" },
    { id: 3, action: "Manutenzione", detail: "Dispositivo #12 offline", time: "Ieri" },
    { id: 4, action: "Report", detail: "Report GSE generato", time: "2 giorni fa" },
  ];
}

export async function getMembers(): Promise<Member[]> {
  await delay(1000); // Simulate API delay
  return [
    {
      id: 1,
      name: "Mario Rossi",
      email: "mario.rossi@email.com",
      role: "Produttore",
      status: "Attivo",
      energyShared: "1,234 kWh",
      joinDate: "01/03/2024",
      address: "Via Roma 123, Milano",
      phone: "+39 333 1234567",
      fiscalCode: "RSSMRA80A01F205V",
      description: "Impianto fotovoltaico da 6kW installato sul tetto"
    },
    {
      id: 2,
      name: "Laura Bianchi",
      email: "laura.bianchi@email.com",
      role: "Consumatore",
      status: "Attivo",
      energyShared: "892 kWh",
      joinDate: "15/02/2024",
      address: "Via Verdi 45, Milano",
      phone: "+39 333 7654321",
      fiscalCode: "BNCLRA85B45F205X",
      description: "Famiglia di 4 persone, consumo medio mensile 350kWh"
    },
    {
      id: 3,
      name: "Giuseppe Verdi",
      email: "giuseppe.verdi@email.com",
      role: "Prosumer",
      status: "Attivo",
      energyShared: "2,156 kWh",
      joinDate: "20/01/2024",
      address: "Corso Italia 78, Milano",
      phone: "+39 333 9876543",
      fiscalCode: "VRDGPP75C20F205Z",
      description: "Impianto FV 4kW + sistema di accumulo 5kWh"
    },
  ];
}

export async function getMemberStats() {
  await delay(500);
  return {
    totalMembers: 156,
    activeMembers: 142,
    producers: 48,
    consumers: 94,
    prosumers: 14,
    monthlyGrowth: "+12%"
  };
}