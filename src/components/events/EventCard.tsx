import { Link } from 'react-router-dom'
import { Calendar, MapPin } from 'lucide-react'
import type { EventItem } from '../../types'
import { eventMinPrice, formatDate, formatINR } from '../../utils/format'
import { Badge } from '../ui/Badge'

export function EventCard({
  event,
  href,
  showB2b,
}: {
  event: EventItem
  href?: string
  showB2b?: boolean
}) {
  const to = href ?? `/events/${event.slug}`
  const minPublic = eventMinPrice(event.categories)
  const minB2b = Math.min(...event.categories.map((c) => c.b2bPrice))
  const savings = minPublic - minB2b
  const remaining = event.categories.reduce(
    (sum, c) => sum + (c.totalQuantity - c.soldPublic - c.soldB2b),
    0,
  )

  return (
    <Link
      to={to}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${event.coverGradient}`} />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone="brand">{event.category}</Badge>
          {event.featured && <Badge tone="warning">Featured</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-800">
          {event.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-500">{event.shortDescription}</p>
        {event.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-ink-50 px-2 py-0.5 text-[10px] font-semibold text-ink-500"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 space-y-1.5 text-sm text-ink-600">
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-brand-600" />
            <span>
              {formatDate(event.startsAt)}
              {event.durationLabel ? ` · ${event.durationLabel}` : ''}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-brand-600" />
            <span className="line-clamp-1">
              {event.venue}, {event.city}
            </span>
          </p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {showB2b ? (
              <>
                <p className="text-xs text-ink-500">
                  Public {formatINR(minPublic)} · B2B from
                </p>
                <p className="font-display text-xl font-bold text-brand-800">{formatINR(minB2b)}</p>
                <p className="text-xs font-semibold text-emerald-600">
                  Save up to {formatINR(savings)} · {remaining.toLocaleString('en-IN')} left
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-ink-500">From</p>
                <p className="font-display text-xl font-bold text-ink-900">{formatINR(minPublic)}</p>
              </>
            )}
          </div>
          <span className="text-sm font-semibold text-brand-700 opacity-0 transition group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}
