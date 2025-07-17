"use client"

import { useState } from "react"
import { 
  Download,
  FileText,
  File,
  Filter,
  Search,
  Calendar,
  Eye,
  Share2,
  FolderOpen,
  FileCheck,
  FileX,
  Info,
  ChevronDown,
  BarChart
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTable } from "@/components/responsive-table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Dati mock per i documenti
const documentsData = {
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
}

const categoryColors: Record<string, string> = {
  Legale: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Tecnico: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Contratto: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Report: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Fattura: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Privacy: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
}

export function MemberDocumenti() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  // Combina tutti i documenti per la ricerca
  const allDocuments = [
    ...documentsData.comunita,
    ...documentsData.personali,
    ...documentsData.reports,
    ...documentsData.fatture,
  ]

  // Filtra i documenti
  const filteredDocuments = allDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    
    return matchesSearch && matchesCategory && matchesType
  })

  const handleDownload = (document: any) => {
    // Mock download functionality
    console.log("Downloading:", document.name)
  }

  const handlePreview = (document: any) => {
    setSelectedDocument(document)
  }

  const handleShare = (document: any) => {
    // Mock share functionality
    console.log("Sharing:", document.name)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Documenti</h2>
        
        {/* Statistiche */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale Documenti</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allDocuments.length}</div>
              <p className="text-xs text-muted-foreground">Disponibili per il download</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documenti Personali</CardTitle>
              <File className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentsData.personali.length}</div>
              <p className="text-xs text-muted-foreground">Contratti e schede tecniche</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Report Disponibili</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentsData.reports.length}</div>
              <p className="text-xs text-muted-foreground">Analisi e statistiche</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuovi Documenti</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Ultimi 7 giorni</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alert informativo */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Conservazione Documenti</AlertTitle>
        <AlertDescription>
          Tutti i documenti sono conservati in modo sicuro e sono sempre accessibili dal tuo account. 
          I documenti fiscali sono conservati per 10 anni come previsto dalla normativa.
        </AlertDescription>
      </Alert>

      {/* Filtri di ricerca */}
      <Card>
        <CardHeader>
          <CardTitle>Cerca Documenti</CardTitle>
          <CardDescription>Trova rapidamente i documenti che ti servono</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Label htmlFor="search" className="sr-only">Cerca</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Cerca per nome o descrizione..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le categorie</SelectItem>
                <SelectItem value="Legale">Legale</SelectItem>
                <SelectItem value="Tecnico">Tecnico</SelectItem>
                <SelectItem value="Contratto">Contratto</SelectItem>
                <SelectItem value="Report">Report</SelectItem>
                <SelectItem value="Fattura">Fattura</SelectItem>
                <SelectItem value="Privacy">Privacy</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo file" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i tipi</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="DOC">DOC</SelectItem>
                <SelectItem value="XLS">XLS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs per categorie di documenti */}
      <Tabs defaultValue="tutti" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tutti">Tutti</TabsTrigger>
          <TabsTrigger value="comunita">Comunità</TabsTrigger>
          <TabsTrigger value="personali">Personali</TabsTrigger>
          <TabsTrigger value="reports">Report</TabsTrigger>
          <TabsTrigger value="fatture">Fatture</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tutti" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tutti i Documenti</CardTitle>
              <CardDescription>
                {filteredDocuments.length} documenti trovati
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveTable
                data={filteredDocuments}
                columns={[
                  {
                    key: 'name',
                    header: 'Nome Documento',
                    accessor: (doc) => (
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">{doc.description}</div>
                      </div>
                    ),
                    priority: 10
                  },
                  {
                    key: 'category',
                    header: 'Categoria',
                    accessor: (doc) => (
                      <Badge className={categoryColors[doc.category] || ""}>
                        {doc.category}
                      </Badge>
                    ),
                    priority: 7
                  },
                  {
                    key: 'size',
                    header: 'Dimensione',
                    accessor: (doc) => doc.size,
                    priority: 5
                  },
                  {
                    key: 'date',
                    header: 'Data',
                    accessor: (doc) => new Date(doc.date).toLocaleDateString("it-IT"),
                    priority: 6
                  },
                  {
                    key: 'actions',
                    header: 'Azioni',
                    accessor: (doc) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Azioni
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreview(doc)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Anteprima
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(doc)}>
                            <Download className="mr-2 h-4 w-4" />
                            Scarica
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare(doc)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Condividi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                    className: 'text-right',
                    priority: 10
                  }
                ]}
                getRowKey={(doc) => doc.id}
                mobileLayout="card"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comunita" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documenti della Comunità</CardTitle>
              <CardDescription>Documenti ufficiali della CER</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {documentsData.comunita.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(doc.date).toLocaleDateString("it-IT")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handlePreview(doc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(doc)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personali" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documenti Personali</CardTitle>
              <CardDescription>I tuoi documenti e contratti</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {documentsData.personali.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <File className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge className={categoryColors[doc.category]}>{doc.status}</Badge>
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handlePreview(doc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(doc)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report e Analisi</CardTitle>
              <CardDescription>Report periodici della comunità</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documentsData.reports.map((doc) => (
                  <Card key={doc.id}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <Badge variant="secondary">{doc.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-1">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>{doc.size}</span>
                        <span>{new Date(doc.date).toLocaleDateString("it-IT")}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handlePreview(doc)}
                        >
                          <Eye className="mr-2 h-3 w-3" />
                          Anteprima
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="mr-2 h-3 w-3" />
                          Scarica
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fatture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fatture e Documenti Fiscali</CardTitle>
              <CardDescription>Documenti per la contabilità</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveTable
                data={documentsData.fatture}
                columns={[
                  {
                    key: 'name',
                    header: 'Documento',
                    accessor: (doc) => (
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">{doc.description}</div>
                      </div>
                    ),
                    priority: 10
                  },
                  {
                    key: 'date',
                    header: 'Data',
                    accessor: (doc) => new Date(doc.date).toLocaleDateString("it-IT"),
                    priority: 8
                  },
                  {
                    key: 'status',
                    header: 'Stato',
                    accessor: (doc) => (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        {doc.status}
                      </Badge>
                    ),
                    priority: 7
                  },
                  {
                    key: 'actions',
                    header: 'Azioni',
                    accessor: (doc) => (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handlePreview(doc)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizza
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}>
                          <Download className="mr-2 h-4 w-4" />
                          Scarica
                        </Button>
                      </div>
                    ),
                    priority: 10
                  }
                ]}
                getRowKey={(doc) => doc.id}
                mobileLayout="card"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog per anteprima documento (mock) */}
      <Dialog open={!!selectedDocument} onOpenChange={(open) => !open && setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
            <DialogDescription>{selectedDocument?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Anteprima documento non disponibile</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Scarica il documento per visualizzarlo
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    handleDownload(selectedDocument)
                    setSelectedDocument(null)
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Scarica Documento
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}