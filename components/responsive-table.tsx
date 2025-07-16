'use client'

import React from 'react'
import './responsive-table.css'

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
    <div className={`responsive-table-container ${className}`} data-mobile-layout={mobileLayout}>
      {/* Desktop Table View */}
      <table className="responsive-table desktop-view">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={getRowKey(item, index)}>
              {columns.map((col) => (
                <td key={col.key as string} className={col.className}>
                  {col.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      {mobileLayout === 'card' && (
        <div className="mobile-cards">
          {data.map((item, index) => (
            <div key={getRowKey(item, index)} className="mobile-card">
              {sortedColumns.map((col) => (
                <div key={col.key as string} className="mobile-card-item">
                  <span className="mobile-card-label">{col.header}:</span>
                  <span className="mobile-card-value">{col.accessor(item)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Mobile Horizontal Scroll View */}
      {mobileLayout === 'scroll' && (
        <div className="mobile-scroll-wrapper">
          <table className="responsive-table mobile-scroll-view">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key as string} className={col.className}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={getRowKey(item, index)}>
                  {columns.map((col) => (
                    <td key={col.key as string} className={col.className}>
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
  )
}