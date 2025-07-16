'use client'

import React, { useState, useMemo } from 'react'
import './responsive-table.css'

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
      <div className="responsive-table-container loading">
        <div className="responsive-table-loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className={`responsive-table-container ${className}`} data-mobile-layout={mobileLayout}>
      {/* Controls */}
      {(enableFiltering || enablePagination) && (
        <div className="responsive-table-controls">
          {enableFiltering && (
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="responsive-table-search"
            />
          )}
        </div>
      )}

      {/* Desktop Table View */}
      <table className="responsive-table desktop-view">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`${col.className || ''} ${col.sortable ? 'sortable' : ''}`}
                style={{ width: col.width }}
                onClick={() => col.sortable && handleSort(col.key as string)}
              >
                <div className="th-content">
                  {col.header}
                  {col.sortable && sortConfig?.key === col.key && (
                    <span className="sort-indicator">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
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
              <td colSpan={columns.length} className="responsive-table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((item, index) => (
              <tr
                key={getRowKey(item, index)}
                onClick={() => onRowClick?.(item)}
                className={onRowClick ? 'clickable' : ''}
              >
                {columns.map((col) => (
                  <td key={col.key as string} className={col.className}>
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile Card View */}
      {mobileLayout === 'card' && (
        <div className="mobile-cards">
          {paginatedData.length === 0 ? (
            <div className="responsive-table-empty">{emptyMessage}</div>
          ) : (
            paginatedData.map((item, index) => (
              <div
                key={getRowKey(item, index)}
                className={`mobile-card ${onRowClick ? 'clickable' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {sortedColumns.map((col) => (
                  <div key={col.key as string} className="mobile-card-item">
                    <span className="mobile-card-label">{col.header}:</span>
                    <span className="mobile-card-value">{col.accessor(item)}</span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}

      {/* Mobile Horizontal Scroll View */}
      {mobileLayout === 'scroll' && (
        <div className="mobile-scroll-wrapper">
          <table className="responsive-table mobile-scroll-view">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key as string}
                    className={col.className}
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
                  <td colSpan={columns.length} className="responsive-table-empty">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={getRowKey(item, index)}
                    onClick={() => onRowClick?.(item)}
                    className={onRowClick ? 'clickable' : ''}
                  >
                    {columns.map((col) => (
                      <td key={col.key as string} className={col.className}>
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

      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className="responsive-table-pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}