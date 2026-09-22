import { Link } from 'react-router-dom'
import { MapPin, Ticket } from 'lucide-react'
import type { EventRecord } from '../../types/garba'
import { BestMatchTags } from './BestMatchTags'
import { Badge } from '../ui/Badge'
import { formatINR } from '../../utils/formatters'
import { deriveMatchTags, type MatchTagId } from '../../utils/bestMatch'
import { formatNavratriLabel } from '../../utils/navratri'

type EventWithStock = EventRecord & { availablePasses: number }

function formatCardDates(ev: EventRecord): string {
  if (ev.endDate && ev.endDate !== ev.date) {
    return `${formatNavratriLabel(ev.date)} → ${formatNavratriLabel(ev.endDate)}`
  }
  return formatNavratriLabel(ev.date)
}

function artistLabel(ev: EventRecord): string {
  const lead = ev.lineup?.[0]
  if (lead?.name) return lead.name
  if (ev.offerType === 'bundle9x') return 'Multi-artist season lineup'
  if (ev.offerType === 'customBundle') return 'Your chosen mandlis'
  return 'House Mandli'
}

export function DiscoverPassCard({
  event,
  nearArea,
  priceMedian,
}: {
  event: EventWithStock
  nearArea?: string | null
  priceMedian?: number
}) {
  const matchTags = deriveMatchTags(event, { nearArea, priceMedian })
  const market = event.marketPrice && event.marketPrice > event.publicPriceFrom
    ? event.marketPrice
    : Math.round(event.publicPriceFrom * 1.3)
  const location =
    event.offerType === 'bundle9x'
      ? `${event.area ?? event.city} · ${(event.bundleDays ?? []).length} venues`
      : `${event.area ?? event.city} · ${event.venue}`

  return (
    <Link
      to={`/app/events/${event.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent" />

        {/* Garba logo mark */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <img
            src="/images/hero/ambe-maa.svg"
            alt=""
            className="h-9 w-9 rounded-full bg-[#C9920A] object-cover ring-2 ring-white/80"
          />
          <div className="rounded-xl bg-ink-950/70 px-2.5 py-1 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200">Garba</p>
            <p className="text-xs font-semibold text-white">{formatCardDates(event)}</p>
          </div>
        </div>

        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1">
          <Badge tone="brand">
            {event.offerType === 'bundle9x'
              ? '9x Bundle'
              : event.offerType === 'venue'
                ? 'Individual'
                : event.category}
          </Badge>
        </div>

        <div className="absolute bottom-0 p-4 text-white">
          <p className="font-display text-lg font-bold leading-snug sm:text-xl">{event.name}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <BestMatchTags tags={matchTags as MatchTagId[]} />

        <dl className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-base leading-none" aria-hidden>
              🎤
            </span>
            <div className="min-w-0">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Artist</dt>
              <dd className="truncate font-semibold text-ink-900">{artistLabel(event)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
            <div className="min-w-0">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Location</dt>
              <dd className="line-clamp-2 font-semibold text-ink-900">{location}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-50 pt-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">EventBiz price</p>
            <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
              <p className="font-display text-xl font-extrabold text-brand-700">
                {formatINR(event.publicPriceFrom)}
              </p>
              <p className="text-sm font-semibold text-red-500 line-through decoration-red-500/80">
                {formatINR(market)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-2.5 py-1 text-xs font-bold text-ink-700">
              <Ticket className="h-3.5 w-3.5 text-brand-600" />
              {event.availablePasses} left
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
