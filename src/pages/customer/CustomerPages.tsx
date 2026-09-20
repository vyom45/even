import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import {
  Calendar,
  Check,
  Clock,
  MapPin,
  Search,
  Ticket as TicketIcon,
} from 'lucide-react'
import { api, checkoutPasses, getCustomerFacingEvents, getVenuePassEvent } from '../../api/client'
import { useAuth } from '../../auth/useAuth'
import { Button } from '../../components/ui/Button'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { PageLoading } from '../../components/ui/LoadingSkeleton'
import { ErrorState } from '../../components/ui/ErrorState'
import { NavratriMap } from '../../components/map/NavratriMap'
import { DashboardShell } from '../../layouts/DashboardShell'
import type { EventRecord, Order, Place, Ticket } from '../../types/garba'
import { formatINR } from '../../utils/formatters'
import { encodeTicketQr } from '../../utils/ticketQr'

const nav = [
  { to: '/app', label: 'Discover', icon: Search },
  { to: '/my-tickets', label: 'My Tickets', icon: TicketIcon },
  { to: '/my-orders', label: 'Orders', icon: Calendar },
]

export function CustomerLayout() {
  return <DashboardShell title="Customer" items={nav} />
}

type EventWithStock = EventRecord & { availablePasses: number }

export function CustomerHomePage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventWithStock[]>([])
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [venueBusy, setVenueBusy] = useState(false)
  const [venueMsg, setVenueMsg] = useState('')
  const [q, setQ] = useState('')
  const [offerMode, setOfferMode] = useState<'bundle' | 'individual'>('bundle')
  const [category, setCategory] = useState('all')
  const [area, setArea] = useState('all')
  const [sort, setSort] = useState('featured')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const [evs, pls] = await Promise.all([getCustomerFacingEvents(), api.getPlaces()])
      setEvents(evs)
      setPlaces(pls)
      setSelectedPlaceId(pls[0]?.id ?? null)
      setError(false)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setVenueMsg('')
  }, [selectedPlaceId])

  useEffect(() => {
    void load()
  }, [])

  const categories = useMemo(() => {
    const scoped = events.filter((e) =>
      offerMode === 'bundle' ? e.offerType === 'bundle9x' : e.offerType === 'venue' || e.offerType === 'single',
    )
    return Array.from(new Set(scoped.map((e) => e.category)))
  }, [events, offerMode])

  const areas = useMemo(() => {
    if (offerMode === 'individual') {
      return Array.from(new Set(places.map((p) => p.area).filter(Boolean)))
    }
    const fromEvents = events
      .filter((e) => e.offerType === 'bundle9x')
      .flatMap((e) => [e.area, ...(e.bundleDays ?? []).map((d) => d.area)])
    return Array.from(new Set(fromEvents.filter(Boolean) as string[]))
  }, [events, places, offerMode])

  const filtered = useMemo(() => {
    let list = events.filter((e) => {
      const isBundle = e.offerType === 'bundle9x'
      const isIndividual = e.offerType === 'venue' || e.offerType === 'single'
      if (offerMode === 'bundle' && !isBundle) return false
      if (offerMode === 'individual' && !isIndividual) return false

      const dayHit = (e.bundleDays ?? []).some(
        (d) =>
          d.venue.toLowerCase().includes(q.toLowerCase()) ||
          d.area.toLowerCase().includes(q.toLowerCase()) ||
          (d.theme ?? '').toLowerCase().includes(q.toLowerCase()),
      )
      const matchQ =
        !q ||
        e.name.toLowerCase().includes(q.toLowerCase()) ||
        e.venue.toLowerCase().includes(q.toLowerCase()) ||
        (e.tags ?? []).some((t) => t.toLowerCase().includes(q.toLowerCase())) ||
        dayHit
      const matchCat = category === 'all' || e.category === category
      const matchArea =
        area === 'all' ||
        e.area === area ||
        (e.bundleDays ?? []).some((d) => d.area === area)
      return matchQ && matchCat && matchArea
    })
    if (sort === 'price') list = [...list].sort((a, b) => a.publicPriceFrom - b.publicPriceFrom)
    if (sort === 'date') list = [...list].sort((a, b) => a.date.localeCompare(b.date))
    if (sort === 'featured') list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    return list
  }, [events, q, category, area, sort, offerMode])

  useEffect(() => {
    setCategory('all')
    setArea('all')
  }, [offerMode])

  const selectedPlace = places.find((p) => p.id === selectedPlaceId) ?? null

  if (loading) return <PageLoading />
  if (error) return <ErrorState onRetry={load} description="Restart npm run dev so API reloads db.json" />

  return (
    <div className="animate-fade-in">
      <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#B57F08] via-[#C9920A] to-[#A86F06] text-white shadow-soft">
        {/* Centered Ambe Maa eye aura */}
        <div className="relative flex items-center justify-center px-4 pt-5 sm:pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute h-28 w-28 rounded-full bg-[#FFE6A0]/55 blur-2xl sm:h-40 sm:w-40"
          />
          <img
            src="/images/hero/ambe-maa.svg"
            alt=""
            className="relative z-[1] h-auto w-[42%] max-w-[140px] opacity-95 sm:w-[28%] sm:max-w-[170px]"
          />
        </div>
        {/* Copy at bottom */}
        <div className="relative z-10 px-5 pb-5 pt-1 text-center sm:px-10 sm:pb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-100 sm:text-xs">
            Discover · Navratri
          </p>
          <h1 className="mx-auto mt-1 max-w-xl font-display text-xl font-extrabold leading-tight drop-shadow-sm sm:text-3xl">
            {places.length} Garba venues — map where nights happen
          </h1>
          <p className="mx-auto mt-1.5 max-w-md text-xs text-white/90 sm:text-sm">
            Browse Navratri photos, then use the map to see the exact venue location.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <NavratriMap
          places={places}
          selectedId={selectedPlaceId}
          onSelect={(p) => {
            setSelectedPlaceId(p.id)
            setArea(p.area)
          }}
          height={440}
        />
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-ink-900">All Garba venues</h2>
            <p className="text-xs text-ink-500">{places.length} mandli / party-plot grounds</p>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {places.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPlaceId(p.id)}
              className={`w-44 shrink-0 overflow-hidden rounded-2xl border text-left shadow-soft ${
                selectedPlaceId === p.id ? 'border-brand-500 ring-2 ring-brand-200' : 'border-ink-100 bg-white'
              }`}
            >
              <img src={p.image} alt="" className="h-24 w-full object-cover" />
              <div className="p-2.5">
                <p className="line-clamp-2 text-xs font-bold text-ink-900">{p.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[10px] font-medium text-ink-500">{p.address}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft sm:p-5">
          {selectedPlace ? (
            <div className="grid gap-5 sm:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
              <img
                src={selectedPlace.image}
                alt=""
                className="h-48 w-full rounded-xl object-cover sm:h-full sm:min-h-[220px]"
              />
              <div>
                <Badge tone="brand" className="mb-2">{selectedPlace.city}</Badge>
                <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">{selectedPlace.name}</h2>
                <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {selectedPlace.address}
                </p>
                <p className="mt-2 text-xs text-ink-500">
                  Pick a venue above or on the map — details show here.
                </p>
                {selectedPlace.mapImage && (
                  <details className="mt-3 rounded-xl border border-ink-100 bg-ink-50 p-2">
                    <summary className="cursor-pointer px-1 text-xs font-semibold text-ink-600">
                      Venue ground on map (satellite)
                    </summary>
                    <img
                      src={selectedPlace.mapImage}
                      alt="Venue area on map"
                      className="mt-2 h-32 w-full rounded-lg object-cover"
                    />
                  </details>
                )}
                <Button
                  className="mt-4 w-full max-w-md bg-gradient-to-r from-brand-700 via-brand-600 to-amber-600 text-white shadow-md hover:from-brand-800 hover:to-amber-700"
                  loading={venueBusy}
                  onClick={async () => {
                    setVenueBusy(true)
                    setVenueMsg('')
                    try {
                      const found = await getVenuePassEvent(selectedPlace.id)
                      if (!found || found.availablePasses <= 0) {
                        setVenueMsg('No individual passes listed for this venue yet.')
                        return
                      }
                      navigate(`/app/events/${found.event.id}`)
                    } catch {
                      setVenueMsg('Could not open venue passes. Is the API running?')
                    } finally {
                      setVenueBusy(false)
                    }
                  }}
                >
                  Buy individual venue pass
                </Button>
                <p className="mt-1.5 text-[11px] font-medium text-ink-400">
                  One night only · this mandli ground
                </p>
                {venueMsg && (
                  <p className="mt-2 max-w-md rounded-xl bg-amber-50 px-2 py-1.5 text-xs font-medium text-amber-800">
                    {venueMsg}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-500">Tap a venue or map pin to see details</p>
          )}
        </div>
      </section>

      <div className="mb-4 space-y-4">
        <div>
          <label htmlFor="discover-search" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">
            Search
          </label>
          <input
            id="discover-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Mandavadi, GIFT City, Bopal…"
            className="h-11 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm font-medium text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">Pass type</p>
          <div
            className="inline-flex rounded-2xl border border-ink-200 bg-ink-50 p-1"
            role="radiogroup"
            aria-label="Pass type"
          >
            <label
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition ${
                offerMode === 'bundle'
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              <input
                type="radio"
                name="offerMode"
                className="sr-only"
                checked={offerMode === 'bundle'}
                onChange={() => setOfferMode('bundle')}
              />
              9x Bundles
            </label>
            <label
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition ${
                offerMode === 'individual'
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              <input
                type="radio"
                name="offerMode"
                className="sr-only"
                checked={offerMode === 'individual'}
                onChange={() => setOfferMode('individual')}
              />
              Individual venue
            </label>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} options={[{ value: 'all', label: 'All categories' }, ...categories.map((c) => ({ value: c, label: c }))]} />
        <Select label="Area" value={area} onChange={(e) => setArea(e.target.value)} options={[{ value: 'all', label: 'All areas' }, ...areas.map((a) => ({ value: a, label: a }))]} />
        <Select
          label="Sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={[
            { value: 'featured', label: 'Featured' },
            { value: 'date', label: 'Date' },
            { value: 'price', label: 'Price: low to high' },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-14 text-center">
          <p className="font-display text-lg font-bold">No passes match</p>
          <p className="mt-2 text-sm text-ink-500">
            {offerMode === 'bundle'
              ? 'No 9x bundles listed right now — try Individual venue.'
              : 'No individual venue passes match these filters.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((ev) => (
            <Link key={ev.id} to={`/app/events/${ev.id}`} className="group overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10]">
                <img src={ev.image} alt={ev.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1">
                  <Badge tone="brand">
                    {ev.offerType === 'bundle9x'
                      ? '9x Bundle'
                      : ev.offerType === 'venue'
                        ? 'Individual'
                        : ev.category}
                  </Badge>
                  {ev.offerType === 'bundle9x' && <Badge tone="success">{ev.nights ?? 9} nights</Badge>}
                  {ev.offerType === 'venue' && <Badge tone="info">1 night</Badge>}
                  {ev.featured && <Badge tone="warning">Featured</Badge>}
                </div>
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="font-display text-xl font-bold leading-snug">{ev.name}</p>
                  <p className="mt-1 text-xs text-white/80">{ev.subtitle}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-white/75">
                    <MapPin className="h-3.5 w-3.5" />{' '}
                    {ev.offerType === 'bundle9x'
                      ? `${ev.area} · ${(ev.bundleDays ?? []).length} venues`
                      : `${ev.area} · ${ev.venue}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-xs font-medium text-ink-500">
                    {ev.availablePasses} left · {ev.date}
                    {ev.endDate && ev.endDate !== ev.date ? ` → ${ev.endDate}` : ''}
                  </p>
                  <p className="font-display text-lg font-bold">From {formatINR(ev.publicPriceFrom)}</p>
                </div>
                <span className="text-sm font-bold text-brand-700">Details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function CustomerBuyPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [event, setEvent] = useState<EventRecord | null>(null)
  const [available, setAvailable] = useState(0)
  const [price, setPrice] = useState(0)
  const [maxPerOrder, setMaxPerOrder] = useState(6)
  const [qty, setQty] = useState(1)
  const [step, setStep] = useState(1)
  const [buying, setBuying] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [attendees, setAttendees] = useState([{ name: '', phone: '' }])
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const [dayFocus, setDayFocus] = useState<string | null>(null)

  const onlyTenDigits = (raw: string) => raw.replace(/\D/g, '').slice(0, 10)

  const bundleMapPlaces = useMemo((): Place[] => {
    if (!event?.bundleDays?.length) return []
    return event.bundleDays
      .filter((d) => d.lat != null && d.lng != null)
      .map((d) => ({
        id: d.placeId || `day-${d.day}`,
        name: d.venue,
        city: /Gandhinagar/i.test(d.address) ? 'Gandhinagar' : 'Ahmedabad',
        area: d.area,
        address: d.address,
        landmark: d.landmark,
        image: d.image || event.image,
        lat: d.lat,
        lng: d.lng,
      }))
  }, [event])

  useEffect(() => {
    if (!id) return
    void (async () => {
      const [ev, tickets, lots] = await Promise.all([
        api.getEvent(id),
        api.getTickets({ eventId: id, ownerType: 'admin', status: 'available' }),
        api.getPassLots({ eventId: id }),
      ])
      const listed = tickets.filter((t) => t.listedForSale)
      setEvent(ev)
      setAvailable(listed.length)
      const lot = lots.find((l) => listed.some((t) => t.passLotId === l.id)) ?? lots[0]
      setPrice(lot?.pricePerPass ?? ev.publicPriceFrom)
      setMaxPerOrder(lot?.maxPerOrder ?? 6)
      if (ev.bundleDays?.[0]?.placeId) setDayFocus(ev.bundleDays[0].placeId)
    })()
  }, [id])

  useEffect(() => {
    setAttendees((prev) => {
      const next = [...prev]
      while (next.length < qty) next.push({ name: '', phone: '' })
      return next.slice(0, qty)
    })
  }, [qty])

  const fee = (event?.convenienceFee ?? 29) * qty
  const subtotal = price * qty
  const total = subtotal + fee

  const buy = async () => {
    if (!user || !id) return
    if (!buyerName.trim() || !buyerEmail.trim()) {
      setError('Fill buyer name and email')
      return
    }
    if (!/^\d{10}$/.test(buyerPhone)) {
      setError('Buyer phone must be exactly 10 digits')
      return
    }
    if (attendees.some((a) => !a.name.trim())) {
      setError('Enter attendee name for each pass')
      return
    }
    if (attendees.some((a) => a.phone && !/^\d{10}$/.test(a.phone))) {
      setError('Attendee phone must be 10 digits (or leave blank)')
      return
    }
    setBuying(true)
    setError('')
    try {
      await checkoutPasses({
        eventId: id,
        buyer: user,
        quantity: qty,
        buyerName: buyerName.trim(),
        buyerEmail: buyerEmail.trim(),
        buyerPhone,
        attendees,
        paymentMethod,
      })
      navigate('/my-tickets')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed')
    } finally {
      setBuying(false)
    }
  }

  if (!event) return <PageLoading />

  return (
    <div className="animate-fade-in">
      <button type="button" className="mb-4 text-sm font-semibold text-brand-700" onClick={() => navigate('/app')}>
        ← Discover
      </button>

      <div className="relative mb-6 overflow-hidden rounded-3xl">
        <img src={event.image} alt="" className="h-56 w-full object-cover sm:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
        <div className="absolute bottom-0 p-5 text-white sm:p-6">
          <Badge tone="brand" className="mb-2">{event.category}</Badge>
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{event.name}</h1>
          <p className="mt-1 text-sm text-white/80">{event.subtitle}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold">About</h2>
            <p className="mt-2 text-ink-600 leading-relaxed">{event.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(event.tags ?? []).map((t) => (
                <Badge key={t} tone="neutral">{t}</Badge>
              ))}
            </div>
          </section>

          <div className="grid gap-3 sm:grid-cols-2 text-sm text-ink-600">
            <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-brand-600" /> {event.date}{event.endDate && event.endDate !== event.date ? ` → ${event.endDate}` : ''}</p>
            <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand-600" /> {event.startTime} – {event.endTime} · Gates {event.gatesOpen}</p>
            <p className="flex items-center gap-2 sm:col-span-2"><MapPin className="h-4 w-4 text-brand-600" /> {event.venue}, {event.address}</p>
            <p>Age: {event.ageLimit}</p>
            <p>Dress: {event.dressCode}</p>
            <p>Languages: {(event.languages ?? []).join(', ')}</p>
            <p>Landmark: {event.landmark}</p>
          </div>

          {(event.bundleDays?.length ?? 0) > 0 && (
            <section>
              <div className="mb-3 flex items-end justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl font-bold">9-night itinerary</h2>
                  <p className="text-sm text-ink-500">Map every night — tap a day card to fly the map to that mandli ground.</p>
                </div>
                <Badge tone="success">{event.bundleDays!.length} days</Badge>
              </div>
              {bundleMapPlaces.length > 0 && (
                <div className="mb-4">
                  <NavratriMap
                    places={bundleMapPlaces}
                    selectedId={dayFocus}
                    onSelect={(p) => setDayFocus(p.id)}
                    height={320}
                  />
                </div>
              )}
              <div className="space-y-3">
                {event.bundleDays!.map((day) => (
                  <article
                    key={`${day.day}-${day.date}`}
                    className={`overflow-hidden rounded-2xl border bg-white shadow-soft sm:grid sm:grid-cols-[140px_1fr] ${
                      dayFocus === (day.placeId || `day-${day.day}`)
                        ? 'border-brand-500 ring-2 ring-brand-100'
                        : 'border-ink-100'
                    }`}
                    onClick={() => setDayFocus(day.placeId || `day-${day.day}`)}
                    onKeyDown={() => undefined}
                  >
                    <img src={day.image ?? event.image} alt="" className="h-36 w-full object-cover sm:h-full" />
                    <div className="space-y-2 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="brand">Day {day.day}</Badge>
                        <span className="text-xs font-semibold text-ink-500">{day.date}</span>
                        {day.theme && <Badge tone="warning">{day.theme}</Badge>}
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900">{day.venue}</h3>
                      <p className="flex items-start gap-1.5 text-sm text-ink-600">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        <span>
                          {day.area} · {day.address}
                          {day.landmark ? ` · Landmark: ${day.landmark}` : ''}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5 text-sm text-ink-600">
                        <Clock className="h-4 w-4 text-brand-600" />
                        Gates {day.gatesOpen} · {day.startTime} – {day.endTime}
                      </p>
                      {day.dressHint && <p className="text-sm text-ink-600">Dress: {day.dressHint}</p>}
                      {(day.highlights?.length ?? 0) > 0 && (
                        <ul className="flex flex-wrap gap-1.5">
                          {day.highlights!.map((h) => (
                            <Badge key={h} tone="neutral">{h}</Badge>
                          ))}
                        </ul>
                      )}
                      {day.note && <p className="text-xs font-medium text-brand-800">{day.note}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {(event.highlights?.length ?? 0) > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold">Highlights</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {event.highlights!.map((h) => (
                  <li key={h} className="flex gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(event.amenities?.length ?? 0) > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold">Amenities</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {event.amenities!.map((a) => (
                  <Badge key={a} tone="info">{a}</Badge>
                ))}
              </ul>
            </section>
          )}

          {(event.schedule?.length ?? 0) > 0 && (
            <section className="rounded-2xl border border-ink-100 bg-white p-5">
              <h2 className="font-display text-lg font-bold">Schedule</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {event.schedule!.map((s) => (
                  <li key={s.time + s.title} className="flex gap-3">
                    <span className="w-12 font-mono text-xs font-bold text-brand-700">{s.time}</span>
                    <span><strong>{s.title}</strong>{s.detail ? ` — ${s.detail}` : ''}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {(event.lineup?.length ?? 0) > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold">Lineup</h2>
              <ul className="mt-2 space-y-2 text-sm">
                {event.lineup!.map((a) => (
                  <li key={a.name} className="flex justify-between border-b border-ink-50 py-2">
                    <span className="font-semibold">{a.name}</span>
                    <span className="text-ink-500">{a.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <h3 className="font-display font-bold">Terms</h3>
              <ul className="mt-2 space-y-1 text-sm text-ink-600">
                {(event.terms ?? []).map((t) => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <h3 className="font-display font-bold">Refunds</h3>
              <p className="mt-2 text-sm text-ink-600">{event.refundPolicy}</p>
            </div>
          </section>

          {(event.faqs?.length ?? 0) > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold">FAQs</h2>
              <div className="mt-3 space-y-2">
                {event.faqs!.map((f, i) => (
                  <div key={f.q} className="rounded-xl border border-ink-100 bg-white">
                    <button type="button" className="flex w-full justify-between px-4 py-3 text-left text-sm font-semibold" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      {f.q}
                      <span>{openFaq === i ? '−' : '+'}</span>
                    </button>
                    {openFaq === i && <p className="border-t border-ink-50 px-4 py-3 text-sm text-ink-600">{f.a}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Checkout</p>
            <p className="mt-1 font-display text-3xl font-extrabold">{formatINR(price)}</p>
            <p className="text-xs text-ink-500">+ {formatINR(event.convenienceFee ?? 29)} convenience / pass</p>
            {event.offerType === 'bundle9x' && (
              <p className="mt-2 rounded-xl bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-800">
                9x season pass — qty = number of people. Each pass covers all {(event.bundleDays ?? []).length || 9} nights.
              </p>
            )}
            <p className="mt-2 text-sm font-semibold text-emerald-700">{available} available</p>

            {step === 1 && (
              <div className="mt-4 space-y-3">
                <Input
                  label="Quantity"
                  type="number"
                  min={1}
                  max={Math.min(maxPerOrder, available)}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Math.min(maxPerOrder, Number(e.target.value) || 1)))}
                />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-ink-500">Subtotal</span><span>{formatINR(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">Convenience</span><span>{formatINR(fee)}</span></div>
                  <div className="flex justify-between font-display text-lg font-bold"><span>Total</span><span>{formatINR(total)}</span></div>
                </div>
                <Button className="w-full" size="lg" disabled={!available} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-4 max-h-[55vh] space-y-3 overflow-y-auto pr-1">
                <p className="text-sm font-bold text-ink-800">Buyer details</p>
                <Input
                  label="Full name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter full name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="name@email.com"
                />
                <Input
                  label="Phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(onlyTenDigits(e.target.value))}
                  placeholder="10-digit mobile"
                  hint={buyerPhone.length > 0 && buyerPhone.length < 10 ? `${buyerPhone.length}/10 digits` : undefined}
                />

                <p className="pt-2 text-sm font-bold text-ink-800">Attendees ({qty})</p>
                {attendees.map((a, i) => (
                  <div key={i} className="grid gap-2 rounded-xl bg-ink-50 p-3">
                    <Input
                      label={`Attendee ${i + 1} name`}
                      value={a.name}
                      onChange={(e) => {
                        const next = [...attendees]
                        next[i] = { ...next[i], name: e.target.value }
                        setAttendees(next)
                      }}
                      placeholder="Attendee full name"
                    />
                    <Input
                      label="Phone (optional)"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={a.phone ?? ''}
                      onChange={(e) => {
                        const next = [...attendees]
                        next[i] = { ...next[i], phone: onlyTenDigits(e.target.value) }
                        setAttendees(next)
                      }}
                      placeholder="10-digit mobile"
                    />
                  </div>
                ))}

                <Select
                  label="Payment method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  options={[
                    { value: 'UPI', label: 'UPI' },
                    { value: 'Card', label: 'Credit / Debit card' },
                    { value: 'NetBanking', label: 'Net banking' },
                    { value: 'Wallet', label: 'Wallet' },
                  ]}
                />

                <div className="flex justify-between font-display text-lg font-bold">
                  <span>Pay</span>
                  <span>{formatINR(total)}</span>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1" loading={buying} onClick={buy}>Pay & get passes</Button>
                </div>
                <p className="text-center text-[11px] text-ink-400">Demo payment — writes order + tickets to db.json</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export function MyTicketsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [events, setEvents] = useState<EventRecord[]>([])

  useEffect(() => {
    if (!user) return
    void Promise.all([api.getTickets({ ownerId: user.id }), api.getEvents()]).then(([t, e]) => {
      setTickets(t.filter((x) => x.ownerType === 'customer'))
      setEvents(e)
    })
  }, [user])

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="section-title">My tickets</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {tickets.map((t) => {
          const ev = events.find((e) => e.id === t.eventId)
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => navigate(`/my-tickets/${t.id}`)}
              className="overflow-hidden rounded-3xl border border-ink-100 bg-white text-left shadow-soft transition hover:shadow-card"
            >
              <div className="bg-ink-950 px-5 py-4 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-300">{t.lotName ?? 'Pass'}</p>
                <p className="mt-1 font-display text-lg font-bold">{ev?.name ?? t.eventId}</p>
              </div>
              <div className="flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="font-mono text-xs font-bold text-ink-600">{t.qrCode}</p>
                  <p className="mt-1 text-ink-500">{t.attendeeName ?? '—'}</p>
                </div>
                <Badge tone={statusTone(t.status)} className="capitalize">{t.status}</Badge>
              </div>
            </button>
          )
        })}
        {tickets.length === 0 && <p className="text-sm text-ink-500">No tickets yet.</p>}
      </div>
    </div>
  )
}

export function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [event, setEvent] = useState<EventRecord | null>(null)

  useEffect(() => {
    if (!id) return
    void api.getTicket(id).then(async (t) => {
      setTicket(t)
      setEvent(await api.getEvent(t.eventId))
    })
  }, [id])

  if (!ticket || !event) return <PageLoading />

  return (
    <div className="mx-auto max-w-md animate-fade-in">
      <button type="button" className="mb-4 text-sm font-semibold text-brand-700" onClick={() => navigate('/my-tickets')}>← My tickets</button>
      <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
        <div className="bg-brand-800 px-5 py-5 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-200">Digital ticket</p>
          <h1 className="mt-1 font-display text-xl font-bold">{event.name}</h1>
          <p className="mt-1 text-sm text-white/80">{event.venue}</p>
        </div>
        <div className="space-y-3 p-5">
          <div className="flex justify-center">
            <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
              <QRCodeSVG
                value={encodeTicketQr(ticket)}
                size={180}
                level="M"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#0f172a"
              />
            </div>
          </div>
          <p className="text-center text-xs text-ink-500">
            Show this QR at the gate. Scanner reads pass + attendee details.
          </p>
          <p className="text-center font-mono text-sm font-bold">{ticket.qrCode}</p>
          <Row label="Attendee" value={ticket.attendeeName ?? '—'} />
          <Row label="Phone" value={ticket.attendeePhone ?? '—'} />
          <Row label="Lot" value={ticket.lotName ?? ticket.passLotId} />
          <Row label="When" value={`${event.date} · ${event.startTime}`} />
          <Row label="Status" value={<Badge tone={statusTone(ticket.status)} className="capitalize">{ticket.status}</Badge>} />
          <Row label="Paid" value={ticket.pricePaid != null ? formatINR(ticket.pricePaid) : '—'} />
          <Row label="Order" value={ticket.orderId ?? '—'} />
          {ticket.checkedInAt && (
            <Row label="Checked in" value={new Date(ticket.checkedInAt).toLocaleString()} />
          )}
          {(event.bundleDays?.length ?? 0) > 0 && (
            <div className="pt-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">Your 9 nights</p>
              <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {event.bundleDays!.map((day) => (
                  <div key={day.day} className="rounded-xl border border-ink-100 bg-ink-50 p-3 text-left text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-ink-900">Day {day.day} · {day.date}</span>
                      <span className="text-xs text-ink-500">{day.startTime}</span>
                    </div>
                    <p className="mt-1 font-semibold text-brand-800">{day.venue}</p>
                    <p className="text-xs text-ink-500">{day.area} · {day.landmark}</p>
                    {day.theme && <p className="mt-1 text-xs font-medium text-ink-600">{day.theme}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink-50 py-2 text-sm">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-800">{value}</span>
    </div>
  )
}

export function MyOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [events, setEvents] = useState<EventRecord[]>([])

  useEffect(() => {
    if (!user) return
    void Promise.all([api.getOrders({ buyerId: user.id }), api.getEvents()]).then(([o, e]) => {
      setOrders(o.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
      setEvents(e)
    })
  }, [user])

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="section-title">Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => {
          const ev = events.find((e) => e.id === o.eventId)
          return (
            <div key={o.id} className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-ink-900">{ev?.name ?? o.eventId}</p>
                  <p className="text-xs text-ink-500">{o.id} · {new Date(o.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <Badge tone="success">{o.status}</Badge>
              </div>
              <div className="mt-3 grid gap-1 text-sm text-ink-600 sm:grid-cols-2">
                <p>{o.quantity} pass(es) · {o.paymentMethod}</p>
                <p className="font-semibold text-ink-900">{formatINR(o.total)} (incl. fee {formatINR(o.convenienceFee)})</p>
                <p>Buyer: {o.buyerName} · {o.buyerPhone}</p>
                <p>Attendees: {o.attendees.map((a) => a.name).join(', ')}</p>
              </div>
            </div>
          )
        })}
        {orders.length === 0 && <p className="text-sm text-ink-500">No orders yet.</p>}
      </div>
    </div>
  )
}
