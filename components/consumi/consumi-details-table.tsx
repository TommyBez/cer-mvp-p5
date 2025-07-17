import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"

interface ConsumiDetailsTableProps {
  data: Array<{
    id: number
    date: string
    time: string
    device: string
    consumption: number
    cost: number
  }>
}

export function ConsumiDetailsTable({ data }: ConsumiDetailsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dettaglio Consumi Recenti</CardTitle>
        <CardDescription>Ultimi consumi registrati per dispositivo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveTable
          data={data}
          columns={[
            {
              key: 'date',
              header: 'Data',
              accessor: (item) => new Date(item.date).toLocaleDateString("it-IT"),
              priority: 8
            },
            {
              key: 'time',
              header: 'Ora',
              accessor: (item) => item.time,
              priority: 6
            },
            {
              key: 'device',
              header: 'Dispositivo',
              accessor: (item) => <div className="font-medium">{item.device}</div>,
              priority: 10
            },
            {
              key: 'consumption',
              header: 'Consumo',
              accessor: (item) => `${item.consumption} kWh`,
              priority: 7
            },
            {
              key: 'cost',
              header: 'Costo',
              accessor: (item) => <span className="font-medium">€{item.cost.toFixed(2)}</span>,
              priority: 5
            }
          ]}
          getRowKey={(item) => item.id}
          mobileLayout="card"
        />
      </CardContent>
    </Card>
  )
}