import { MemberDocumentsPageHeader } from "@/components/member-documents/member-documents-page-header"
import { MemberDocumentsCategories } from "@/components/member-documents/member-documents-categories"
import { MemberDocumentsTable } from "@/components/member-documents/member-documents-table"
import { MemberDocumentsFilters } from "@/components/member-documents/member-documents-filters"

// Types
interface Document {
  id: number
  name: string
  category: string
  type: string
  size: string
  uploadDate: string
  lastModified: string
  description: string
  downloadUrl: string
  status: "available" | "pending" | "expired"
}

interface DocumentCategory {
  id: string
  name: string
  icon: string
  count: number
  description: string
}

// Simulate async data fetching
async function getDocumentsData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    categories: [
      {
        id: "contratti",
        name: "Contratti",
        icon: "📄",
        count: 3,
        description: "Contratti di adesione e accordi",
      },
      {
        id: "bollette",
        name: "Bollette e Fatture",
        icon: "💸",
        count: 12,
        description: "Documenti di fatturazione mensili",
      },
      {
        id: "report",
        name: "Report Energetici",
        icon: "📊",
        count: 6,
        description: "Report mensili di produzione e consumo",
      },
      {
        id: "certificati",
        name: "Certificati",
        icon: "🏆",
        count: 4,
        description: "Certificati verdi e attestazioni",
      },
      {
        id: "guide",
        name: "Guide e Manuali",
        icon: "📚",
        count: 8,
        description: "Documentazione e guide utente",
      },
      {
        id: "comunicazioni",
        name: "Comunicazioni",
        icon: "📧",
        count: 15,
        description: "Avvisi e comunicazioni ufficiali",
      },
    ],
    documents: [
      {
        id: 1,
        name: "Contratto di Adesione CEC",
        category: "Contratti",
        type: "PDF",
        size: "2.5 MB",
        uploadDate: "01/03/2024",
        lastModified: "01/03/2024",
        description: "Contratto di adesione alla comunità energetica",
        downloadUrl: "#",
        status: "available" as const,
      },
      {
        id: 2,
        name: "Bolletta Maggio 2024",
        category: "Bollette e Fatture",
        type: "PDF",
        size: "450 KB",
        uploadDate: "01/06/2024",
        lastModified: "01/06/2024",
        description: "Fattura dettagliata del mese di maggio",
        downloadUrl: "#",
        status: "available" as const,
      },
      {
        id: 3,
        name: "Report Produzione Maggio 2024",
        category: "Report Energetici",
        type: "PDF",
        size: "1.8 MB",
        uploadDate: "05/06/2024",
        lastModified: "05/06/2024",
        description: "Report dettagliato produzione e consumo maggio",
        downloadUrl: "#",
        status: "available" as const,
      },
      {
        id: 4,
        name: "Certificato Verde Q1 2024",
        category: "Certificati",
        type: "PDF",
        size: "320 KB",
        uploadDate: "15/04/2024",
        lastModified: "15/04/2024",
        description: "Certificato verde primo trimestre 2024",
        downloadUrl: "#",
        status: "available" as const,
      },
      {
        id: 5,
        name: "Guida Autoconsumo",
        category: "Guide e Manuali",
        type: "PDF",
        size: "5.2 MB",
        uploadDate: "10/02/2024",
        lastModified: "10/02/2024",
        description: "Guida completa all'autoconsumo energetico",
        downloadUrl: "#",
        status: "available" as const,
      },
      {
        id: 6,
        name: "Comunicazione Assemblea Giugno",
        category: "Comunicazioni",
        type: "PDF",
        size: "180 KB",
        uploadDate: "25/05/2024",
        lastModified: "25/05/2024",
        description: "Convocazione assemblea dei membri",
        downloadUrl: "#",
        status: "available" as const,
      },
      {
        id: 7,
        name: "Bolletta Aprile 2024",
        category: "Bollette e Fatture",
        type: "PDF",
        size: "425 KB",
        uploadDate: "01/05/2024",
        lastModified: "01/05/2024",
        description: "Fattura dettagliata del mese di aprile",
        downloadUrl: "#",
        status: "available" as const,
      },
      {
        id: 8,
        name: "Manuale App Mobile",
        category: "Guide e Manuali",
        type: "PDF",
        size: "3.8 MB",
        uploadDate: "20/03/2024",
        lastModified: "20/03/2024",
        description: "Guida all'utilizzo dell'app mobile CEC",
        downloadUrl: "#",
        status: "available" as const,
      },
    ],
  }
}

export default async function MemberDocumentiPage() {
  const { categories, documents } = await getDocumentsData()
  
  return (
    <div className="space-y-6">
      <MemberDocumentsPageHeader />
      <MemberDocumentsCategories categories={categories} />
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <MemberDocumentsFilters />
        </div>
        <div className="lg:col-span-3">
          <MemberDocumentsTable documents={documents} />
        </div>
      </div>
    </div>
  )
}