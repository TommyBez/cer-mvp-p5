"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface ResponsiveTableForceMobileProps {
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

export function ResponsiveTableForceMobile({
  columns,
  data,
  renderCell,
  className,
  mobileCardClassName,
}: ResponsiveTableForceMobileProps) {
  // Always show mobile card view for testing
  return (
    <div className="space-y-4">
      <div className="text-sm text-orange-600 font-medium">
        (Force Mobile View - For Testing Only)
      </div>
      {data.map((row, rowIndex) => (
        <Card key={rowIndex} className={cn("p-4", mobileCardClassName)}>
          <CardContent className="p-0 space-y-2">
            {columns.map((column) => {
              if (column.hideOnMobile) return null
              
              const value = renderCell 
                ? renderCell(row, column)
                : row[column.key]
              
              return (
                <div key={column.key} className="flex justify-between items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {column.mobileLabel || column.header}:
                  </span>
                  <span className="text-sm text-right">{value}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}