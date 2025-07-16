// Server-side data fetching utilities
export async function fetchMembers() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
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
    },
    {
      id: 2,
      name: "Laura Bianchi",
      email: "laura.bianchi@email.com",
      role: "Consumatore",
      status: "Attivo",
      energyShared: "987 kWh",
      joinDate: "15/02/2024",
      address: "Via Verdi 456, Roma",
      phone: "+39 334 2345678",
      fiscalCode: "BNCLRA85B15H501W",
    },
    {
      id: 3,
      name: "Giuseppe Verde",
      email: "giuseppe.verde@email.com",
      role: "Prosumer",
      status: "Sospeso",
      energyShared: "2,156 kWh",
      joinDate: "22/01/2024",
      address: "Via Garibaldi 789, Napoli",
      phone: "+39 335 3456789",
      fiscalCode: "VRDGPP90C22F839X",
    },
  ]
}

export async function fetchDocuments() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return [
    {
      id: 1,
      name: "Contratto CER 2024",
      type: "Contratto",
      uploadDate: "15/03/2024",
      size: "2.3 MB",
      status: "Approvato",
      uploadedBy: "Mario Rossi",
    },
    {
      id: 2,
      name: "Fattura Gennaio 2024",
      type: "Fattura",
      uploadDate: "10/03/2024",
      size: "1.8 MB",
      status: "In Revisione",
      uploadedBy: "Laura Bianchi",
    },
  ]
}

export async function fetchDashboardData() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  return {
    totalProduced: 12567,
    totalConsumed: 9876,
    totalShared: 3891,
    instantPower: 4.2,
    deviceCount: 25,
    onlineDevices: 23,
    chartData: [
      { name: "Lun", produzione: 400, consumo: 240 },
      { name: "Mar", produzione: 300, consumo: 139 },
      { name: "Mer", produzione: 200, consumo: 980 },
      { name: "Gio", produzione: 278, consumo: 390 },
      { name: "Ven", produzione: 189, consumo: 480 },
      { name: "Sab", produzione: 239, consumo: 380 },
      { name: "Dom", produzione: 349, consumo: 430 },
    ],
    recentTransactions: [
      {
        id: 1,
        member: "Mario Rossi",
        action: "Energia Condivisa",
        amount: "12.5 kWh",
        date: "15/03/2024",
        type: "shared",
      },
      {
        id: 2,
        member: "Laura Bianchi",
        action: "Consumo",
        amount: "8.2 kWh",
        date: "15/03/2024",
        type: "consumed",
      },
    ]
  }
}

export async function fetchSimulationData() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 900))
  
  return {
    scenarios: [
      { id: 1, name: "Scenario Base", savings: 1250.50, efficiency: 85 },
      { id: 2, name: "Scenario Ottimizzato", savings: 1890.75, efficiency: 92 },
    ],
    monthlyData: [
      { month: "Gen", savings: 150, production: 1200, consumption: 1000 },
      { month: "Feb", savings: 180, production: 1400, consumption: 1100 },
    ]
  }
}

export async function fetchGSEReports() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  return [
    {
      id: 1,
      reportType: "Energia Condivisa",
      period: "Gennaio 2024",
      status: "Inviato",
      submissionDate: "05/02/2024",
      amount: "€ 1,234.56",
    },
    {
      id: 2,
      reportType: "Incentivi",
      period: "Dicembre 2023",
      status: "Approvato",
      submissionDate: "15/01/2024",
      amount: "€ 987.65",
    },
  ]
}