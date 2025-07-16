'use client'

import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface Column<T> {
  key: keyof T | string
  header: string
  accessor: (item: T) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  className?: string
  priority?: number
  width?: string
}

interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

interface ResponsiveTableAdvancedProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  mobileLayout?: 'card' | 'scroll'
  getRowKey: (item: T, index: number) => string | number
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  itemsPerPage?: number
  onRowClick?: (item: T) => void
  emptyMessage?: string
  loading?: boolean
}

export function ResponsiveTableAdvanced<T>({
  data,
  columns,
  className = '',
  mobileLayout = 'card',
  getRowKey,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  itemsPerPage = 10,
  onRowClick,
  emptyMessage = 'No data available',
  loading = false
}: ResponsiveTableAdvancedProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [filterText, setFilterText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Sort columns by priority for mobile view
  const sortedColumns = useMemo(
    () => [...columns].sort((a, b) => (b.priority || 0) - (a.priority || 0)),
    [columns]
  )

  // Filter data
  const filteredData = useMemo(() => {
    if (!enableFiltering || !filterText) return data

    return data.filter((item) => {
      return columns.some((col) => {
        if (!col.filterable) return false
        const value = col.accessor(item)
        if (typeof value === 'string') {
          return value.toLowerCase().includes(filterText.toLowerCase())
        }
        return false
      })
    })
  }, [data, filterText, columns, enableFiltering])

  // Sort data
  const sortedData = useMemo(() => {
    if (!enableSorting || !sortConfig) return filteredData

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = columns.find(col => col.key === sortConfig.key)?.accessor(a)
      const bValue = columns.find(col => col.key === sortConfig.key)?.accessor(b)

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [filteredData, sortConfig, columns, enableSorting])

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, itemsPerPage, enablePagination])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const handleSort = (key: string) => {
    if (!enableSorting) return

    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Controls */}
      {(enableFiltering || enablePagination) && (
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          {enableFiltering && (
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="flex-1 max-w-sm px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          )}
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${
                    col.sortable ? 'cursor-pointer select-none hover:text-foreground' : ''
                  } ${col.className || ''}`}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key as string)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortConfig?.key === col.key && (
                      <span className="text-primary">
                        {sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={getRowKey(item, index)}
                  onClick={() => onRowClick?.(item)}
                  className={`border-b transition-colors hover:bg-muted/50 ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key as string} className={`px-4 py-3 text-sm ${col.className || ''}`}>
                      {col.accessor(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {mobileLayout === 'card' ? (
          // Card Layout for Mobile
          <div className="space-y-3">
            {paginatedData.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">{emptyMessage}</div>
            ) : (
              paginatedData.map((item, index) => (
                <div
                  key={getRowKey(item, index)}
                  onClick={() => onRowClick?.(item)}
                  className={`bg-card rounded-lg border p-4 space-y-3 ${
                    onRowClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''
                  }`}
                >
                  {sortedColumns.map((col) => (
                    <div key={col.key as string} className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {col.header}
                      </span>
                      <span className={`text-sm ${col.className || ''}`}>
                        {col.accessor(item)}
                      </span>
                    </div>
                  ))}
                </div>
              ))
            )}
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
                      style={{ width: col.width }}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr
                      key={getRowKey(item, index)}
                      onClick={() => onRowClick?.(item)}
                      className={`border-b ${onRowClick ? 'cursor-pointer' : ''}`}
                    >
                      {columns.map((col) => (
                        <td key={col.key as string} className={`px-4 py-3 text-sm ${col.className || ''}`}>
                          {col.accessor(item)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}