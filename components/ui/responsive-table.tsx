"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/components/ui/use-mobile"
import { Card, CardContent } from "@/components/ui/card"

interface ResponsiveTableProps {
  columns: {
    key: string
    header: string
    className?: string
    hideOnMobile?: boolean
    mobileLabel?: string
  }[]
  data: any[]
  renderCell?: (row: any, column: any) => React.ReactNode
  className?: string
  mobileCardClassName?: string
}

export function ResponsiveTable({
  columns,
  data,
  renderCell,
  className,
  mobileCardClassName,
}: ResponsiveTableProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="space-y-4">
        {data.map((row, rowIndex) => (
          <Card key={rowIndex} className={cn("p-4", mobileCardClassName)}>
            <CardContent className="p-0 space-y-2">
              {columns.map((column) => {
                if (column.hideOnMobile) return null
                
                const value = renderCell 
                  ? renderCell(row, column)
                  : row[column.key]
                
                return (
                  <div key={column.key} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      {column.mobileLabel || column.header}:
                    </span>
                    <span className="text-sm">{value}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)}>
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b transition-colors hover:bg-muted/50"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn("p-4 align-middle", column.className)}
                >
                  {renderCell ? renderCell(row, column) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}