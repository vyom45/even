import { useMemo, useState } from 'react'
import { events } from '../../data/mock'
import { EventCard } from '../../components/events/EventCard'
import { PageLoading } from '../../components/ui/LoadingSkeleton'
import { ErrorState } from '../../components/ui/ErrorState'
import { EmptyState } from '../../components/ui/EmptyState'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { useMockLoad } from '../../hooks/useMockLoad'

export function EventsPage() {
  const { data, loading, error, reload } = useMockLoad(() => events, 500)
  const [q, setQ] = useState('')
  const [city, setCity] = useState('all')
  const [category, setCategory] = useState('all')

  const categories = useMemo(() => {
    if (!data) return []
    return Array.from(new Set(data.map((e) => e.category)))
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((e) => {
      const matchQ =
        !q ||
        e.name.toLowerCase().includes(q.toLowerCase()) ||
        e.venue.toLowerCase().includes(q.toLowerCase()) ||
        e.area.toLowerCase().includes(q.toLowerCase()) ||
        e.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
      const matchCity = city === 'all' || e.city === city
      const matchCat = category === 'all' || e.category === category
      return matchQ && matchCity && matchCat
    })
  }, [data, q, city, category])

  if (loading) return <PageLoading />
  if (error)
    return (
      <div className="page-container py-8">
        <ErrorState onRetry={reload} />
      </div>
    )

  return (
    <div className="page-container space-y-6 py-8 animate-fade-in">
      <div>
        <h1 className="section-title">Browse events</h1>
        <p className="mt-1 text-ink-500">
          {data?.length ?? 0} Ahmedabad Navratri & Garba listings — filter by area, vibe, or category
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_180px_220px]">
        <Input
          placeholder="Search name, venue, area, or tag…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={[
            { value: 'all', label: 'All cities' },
            { value: 'Ahmedabad', label: 'Ahmedabad' },
          ]}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: 'all', label: 'All categories' },
            ...categories.map((c) => ({ value: c, label: c })),
          ]}
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No events found" description="Try another search or category." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  )
}
