import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { EmptyState } from '../ui/EmptyState'
import { cn } from '../../utils/format'

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  className?: string
  render: (row: T) => React.ReactNode
  sortValue?: (row: T) => string | number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  emptyTitle?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  pageSize = 8,
  searchPlaceholder = 'Search…',
  searchKeys,
  emptyTitle = 'No results',
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    let rows = [...data]
    if (query.trim() && searchKeys?.length) {
      const q = query.toLowerCase()
      rows = rows.filter((row) =>
        searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(q)),
      )
    }
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey)
      rows.sort((a, b) => {
        const av = col?.sortValue?.(a) ?? ''
        const bv = col?.sortValue?.(b) ?? ''
        if (av < bv) return sortDir === 'asc' ? -1 : 1
        if (av > bv) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return rows
  }, [data, query, searchKeys, sortKey, sortDir, columns])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageRows = filtered.slice(page * pageSize, page * pageSize + pageSize)

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
      {searchKeys && (
        <div className="border-b border-ink-100 p-3 sm:p-4">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(0)
            }}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 sm:max-w-xs"
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="p-4">
          <EmptyState title={emptyTitle} description="Try adjusting your search or filters." />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-ink-50/80 text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className={cn('whitespace-nowrap px-4 py-3 font-semibold', col.className)}>
                      {col.sortable ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 hover:text-ink-800"
                          onClick={() => toggleSort(col.key)}
                        >
                          {col.header}
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        col.header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {pageRows.map((row) => (
                  <tr key={row.id} className="hover:bg-ink-50/60">
                    {columns.map((col) => (
                      <td key={col.key} className={cn('px-4 py-3 text-ink-800', col.className)}>
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-ink-100 px-4 py-3">
            <p className="text-xs text-ink-500">
              {filtered.length} result{filtered.length === 1 ? '' : 's'} · Page {page + 1} of {pageCount}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pageCount - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
