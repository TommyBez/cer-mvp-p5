"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTable } from "@/components/responsive-table"
import { Download, Eye, FileText } from "lucide-react"

interface DocumentiTabsProps {
  documentsData: {
    comunita: any[]
    personali: any[]
    reports: any[]
    fatture: any[]
  }
}

const categoryColors: Record<string, string> = {
  Legale: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Tecnico: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Contratto: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Report: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Fattura: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Privacy: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
}

export function DocumentiTabs({ documentsData }: DocumentiTabsProps) {
  const allDocuments = [
    ...documentsData.comunita,
    ...documentsData.personali,
    ...documentsData.reports,
    ...documentsData.fatture,
  ]

  return (
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
            <CardDescription>{allDocuments.length} documenti trovati</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveTable
              data={allDocuments}
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
                  accessor: () => (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Similar tab content for personali, reports, and fatture tabs */}
    </Tabs>
  )
}