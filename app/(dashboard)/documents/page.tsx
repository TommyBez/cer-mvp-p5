import { DocumentsContent } from "@/components/documents-content"

// Simulate async data fetching
async function getDocumentsData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    documents: [
      {
        id: 1,
        name: "Contratto CEC FVG 2024",
        type: "Contratto",
        size: "2.5 MB",
        uploadDate: "15/03/2024",
        uploadedBy: "Mario Rossi",
        status: "Approvato",
        description: "Contratto standard per i membri della comunità energetica",
      },
      {
        id: 2,
        name: "Regolamento Interno",
        type: "Regolamento",
        size: "1.2 MB",
        uploadDate: "10/03/2024",
        uploadedBy: "Admin",
        status: "Pubblicato",
        description: "Regolamento interno della comunità energetica",
      },
      {
        id: 3,
        name: "Report Mensile Febbraio 2024",
        type: "Report",
        size: "5.8 MB",
        uploadDate: "01/03/2024",
        uploadedBy: "Sistema",
        status: "Pubblicato",
        description: "Report dettagliato delle attività del mese di febbraio",
      },
      {
        id: 4,
        name: "Modulo Adesione CEC",
        type: "Modulo",
        size: "450 KB",
        uploadDate: "20/02/2024",
        uploadedBy: "Admin",
        status: "In revisione",
        description: "Modulo per nuove adesioni alla comunità",
      },
      {
        id: 5,
        name: "Guida Tecnica Installazione",
        type: "Guida",
        size: "8.2 MB",
        uploadDate: "15/02/2024",
        uploadedBy: "Giuseppe Verdi",
        status: "Pubblicato",
        description: "Guida tecnica per l'installazione dei dispositivi",
      },
    ],
    stats: {
      totalDocuments: 156,
      publishedDocuments: 98,
      pendingDocuments: 23,
      rejectedDocuments: 5,
      totalSize: "2.3 GB",
      recentUploads: 12,
    }
  }
}

export default async function DocumentsPage() {
  const documentsData = await getDocumentsData()
  
  return <DocumentsContent initialData={documentsData} />
}