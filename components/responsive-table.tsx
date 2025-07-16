'use client'

import React from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  accessor: (item: T) => React.ReactNode
  className?: string
  priority?: number // Higher priority columns are shown first on mobile
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  mobileLayout?: 'card' | 'scroll' // card view vs horizontal scroll on mobile
  getRowKey: (item: T, index: number) => string | number
}

export function ResponsiveTable<T>({
  data,
  columns,
  className = '',
  mobileLayout = 'card',
  getRowKey
}: ResponsiveTableProps<T>) {
  // Sort columns by priority for mobile view
  const sortedColumns = [...columns].sort((a, b) => (b.priority || 0) - (a.priority || 0))

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((col) => (
                <th 
                  key={col.key as string} 
                  className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={getRowKey(item, index)}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {columns.map((col) => (
                  <td 
                    key={col.key as string} 
                    className={`px-4 py-3 text-sm ${col.className || ''}`}
                  >
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {mobileLayout === 'card' ? (
          // Card Layout for Mobile
          <div className="space-y-3">
            {data.map((item, index) => (
              <div 
                key={getRowKey(item, index)}
                className="bg-card rounded-lg border p-4 space-y-3"
              >
                {sortedColumns.map((col) => (
                  <div 
                    key={col.key as string} 
                    className="flex flex-col sm:flex-row sm:justify-between gap-1"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {col.header}
                    </span>
                    <span className={`text-sm ${col.className || ''}`}>
                      {col.accessor(item)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Horizontal Scroll Layout for Mobile
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b">
                  {columns.map((col) => (
                    <th 
                      key={col.key as string} 
                      className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground whitespace-nowrap ${col.className || ''}`}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr 
                    key={getRowKey(item, index)}
                    className="border-b"
                  >
                    {columns.map((col) => (
                      <td 
                        key={col.key as string} 
                        className={`px-4 py-3 text-sm ${col.className || ''}`}
                      >
                        {col.accessor(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}