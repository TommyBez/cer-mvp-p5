import { MemberAreaAuthCheck } from "@/components/member-area/member-area-auth-check"
import { DocumentiPageHeader } from "@/components/documenti/documenti-page-header"
import { DocumentiMetrics } from "@/components/documenti/documenti-metrics"
import { DocumentiInfoAlert } from "@/components/documenti/documenti-info-alert"
import { DocumentiSearch } from "@/components/documenti/documenti-search"
import { DocumentiTabs } from "@/components/documenti/documenti-tabs"

// Simulate async data fetching
async function getDocumentiData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    metrics: {
      totalDocuments: 11,
      personalDocuments: 3,
      reportsAvailable: 3,
      newDocuments: 3,
    },
    documentsData: {
      comunita: [
        {
          id: 1,
          name: "Statuto CER Milano Nord",
          description: "Documento costitutivo della comunità energetica",
          type: "PDF",
          size: "2.4 MB",
          date: "2024-01-15",
          category: "Legale",
          status: "Attivo",
        },
        {
          id: 2,
          name: "Regolamento Interno",
          description: "Regole di funzionamento della comunità",
          type: "PDF",
          size: "856 KB",
          date: "2024-01-10",
          category: "Legale",
          status: "Attivo",
        },
        {
          id: 3,
          name: "Piano Energetico 2024",
          description: "Strategia energetica per l'anno corrente",
          type: "PDF",
          size: "3.2 MB",
          date: "2024-01-05",
          category: "Tecnico",
          status: "Attivo",
        },
      ],
      personali: [
        {
          id: 4,
          name: "Contratto di Adesione",
          description: "Il tuo contratto di partecipazione alla CER",
          type: "PDF",
          size: "156 KB",
          date: "2023-06-15",
          category: "Contratto",
          status: "Firmato",
        },
        {
          id: 5,
          name: "Scheda Tecnica Impianto",
          description: "Dettagli tecnici del tuo impianto",
          type: "PDF",
          size: "2.1 MB",
          date: "2023-06-20",
          category: "Tecnico",
          status: "Approvato",
        },
        {
          id: 6,
          name: "Privacy Policy",
          description: "Informativa sul trattamento dei dati personali",
          type: "PDF",
          size: "245 KB",
          date: "2023-06-15",
          category: "Privacy",
          status: "Accettato",
        },
      ],
      reports: [
        {
          id: 7,
          name: "Report Energetico Q4 2023",
          description: "Analisi trimestrale consumi e produzione",
          type: "PDF",
          size: "1.2 MB",
          date: "2024-01-05",
          category: "Report",
          status: "Pubblicato",
        },
        {
          id: 8,
          name: "Report Economico Annuale 2023",
          description: "Riepilogo benefici economici dell'anno",
          type: "PDF",
          size: "890 KB",
          date: "2024-01-10",
          category: "Report",
          status: "Pubblicato",
        },
        {
          id: 9,
          name: "Report Sostenibilità 2023",
          description: "Impatto ambientale e CO2 risparmiata",
          type: "PDF",
          size: "1.5 MB",
          date: "2024-01-08",
          category: "Report",
          status: "Pubblicato",
        },
      ],
      fatture: [
        {
          id: 10,
          name: "Fattura Incentivi Q4 2023",
          description: "Dettaglio incentivi GSE ultimo trimestre",
          type: "PDF",
          size: "125 KB",
          date: "2024-01-15",
          category: "Fattura",
          status: "Pagata",
        },
        {
          id: 11,
          name: "Nota Credito Dicembre 2023",
          description: "Credito energia condivisa",
          type: "PDF",
          size: "98 KB",
          date: "2024-01-10",
          category: "Fattura",
          status: "Applicata",
        },
      ],
    },
  }
}

export default async function DocumentiPage() {
  const data = await getDocumentiData()

  return (
    <>
      <MemberAreaAuthCheck />
      <div className="space-y-6">
        <DocumentiPageHeader />
        <DocumentiMetrics metrics={data.metrics} />
        <DocumentiInfoAlert />
        <DocumentiSearch />
        <DocumentiTabs documentsData={data.documentsData} />
      </div>
    </>
  )
}