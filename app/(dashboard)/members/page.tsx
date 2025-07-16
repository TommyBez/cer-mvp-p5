import { MembersContent } from "@/components/members-content"

// Simulate async data fetching
async function getMembersData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    members: [
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
        energyShared: "856 kWh",
        joinDate: "15/02/2024",
        address: "Corso Italia 45, Roma",
        phone: "+39 340 9876543",
        fiscalCode: "BNCLRA75B45H501T",
      },
      {
        id: 3,
        name: "Giuseppe Verdi",
        email: "giuseppe.verdi@email.com",
        role: "Prosumer",
        status: "In attesa",
        energyShared: "0 kWh",
        joinDate: "20/03/2024",
        address: "Piazza Garibaldi 7, Napoli",
        phone: "+39 328 5551234",
        fiscalCode: "VRDGPP65C12F839X",
      },
      {
        id: 4,
        name: "Anna Neri",
        email: "anna.neri@email.com",
        role: "Consumatore",
        status: "Attivo",
        energyShared: "423 kWh",
        joinDate: "10/01/2024",
        address: "Via Dante 89, Torino",
        phone: "+39 335 7778899",
        fiscalCode: "NRENNA90D55L219K",
      },
      {
        id: 5,
        name: "Franco Gialli",
        email: "franco.gialli@email.com",
        role: "Produttore",
        status: "Sospeso",
        energyShared: "2,156 kWh",
        joinDate: "05/12/2023",
        address: "Viale Europa 34, Bologna",
        phone: "+39 331 4445566",
        fiscalCode: "GLLFNC70M15A944L",
      },
    ],
    stats: {
      totalMembers: 156,
      activeMembers: 142,
      pendingMembers: 8,
      suspendedMembers: 6,
      totalEnergyShared: "234,567 kWh",
      averageEnergyPerMember: "1,504 kWh",
    }
  }
}

export default async function MembersPage() {
  const membersData = await getMembersData()
  
  return <MembersContent initialData={membersData} />
}
