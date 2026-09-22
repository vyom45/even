import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { BestMatchFilterChips, BestMatchTags } from '../../components/events/BestMatchTags'
import { DiscoverPassCard } from '../../components/events/DiscoverPassCard'
import { BuildNavratriModal } from '../../components/customer/BuildNavratriModal'
import { deriveMatchTags, type MatchTagId } from '../../utils/bestMatch'
import { DashboardShell } from '../../layouts/DashboardShell'
import type { BundleDay, EventRecord, Order, Place, Ticket } from '../../types/garba'
import { formatINR } from '../../utils/formatters'
import { encodeTicketQr } from '../../utils/ticketQr'
import {
  BUILD_PRICES,
  MIN_BUNDLE_NIGHTS,
  PASS_TIER_OPTIONS,
  formatNavratriLabel,
  type BuildNights,
} from '../../utils/navratri'

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
  const [offerMode, setOfferMode] = useState<'bundle' | 'individual' | 'build'>('bundle')
  const [category, setCategory] = useState('all')
  const [area, setArea] = useState('all')
  const [sort, setSort] = useState('featured')
  const [matchFilter, setMatchFilter] = useState<MatchTagId | 'all'>('all')
  const [error, setError] = useState(false)
  const [buildOpen, setBuildOpen] = useState(false)
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
    const scoped = events.filter((e) => {
      if (offerMode === 'bundle') return e.offerType === 'bundle9x'
      if (offerMode === 'individual') return e.offerType === 'venue' || e.offerType === 'single'
      return false
    })
    return Array.from(new Set(scoped.map((e) => e.category)))
  }, [events, offerMode])

  const areas = useMemo(() => {
    if (offerMode === 'individual' || offerMode === 'build') {
      return Array.from(new Set(places.map((p) => p.area).filter(Boolean)))
    }
    const fromEvents = events
      .filter((e) => e.offerType === 'bundle9x')
      .flatMap((e) => [e.area, ...(e.bundleDays ?? []).map((d) => d.area)])
    return Array.from(new Set(fromEvents.filter(Boolean) as string[]))
  }, [events, places, offerMode])

  const priceMedian = useMemo(() => {
    const prices = events
      .filter((e) => (offerMode === 'bundle' ? e.offerType === 'bundle9x' : e.offerType === 'venue' || e.offerType === 'single'))
      .map((e) => e.publicPriceFrom)
      .sort((a, b) => a - b)
    if (!prices.length) return 799
    return prices[Math.floor(prices.length / 2)]
  }, [events, offerMode])

  const selectedPlace = places.find((p) => p.id === selectedPlaceId) ?? null
  const nearArea = area !== 'all' ? area : selectedPlace?.area ?? null

  const filtered = useMemo(() => {
    if (offerMode === 'build') return []
    let list = events.filter((e) => {
      const isBundle = e.offerType === 'bundle9x'
      const isIndividual = e.offerType === 'venue' || e.offerType === 'single'
      if (offerMode === 'bundle' && !isBundle) return false
      if (offerMode === 'individual' && !isIndividual) return false
      if (e.offerType === 'customBundle') return false

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
      const tags = deriveMatchTags(e, { nearArea, priceMedian })
      const matchTag = matchFilter === 'all' || tags.includes(matchFilter)
      return matchQ && matchCat && matchArea && matchTag
    })
    if (sort === 'price') list = [...list].sort((a, b) => a.publicPriceFrom - b.publicPriceFrom)
    if (sort === 'date') list = [...list].sort((a, b) => a.date.localeCompare(b.date))
    if (sort === 'featured') list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    return list
  }, [events, q, category, area, sort, offerMode, matchFilter, nearArea, priceMedian])

  useEffect(() => {
    setCategory('all')
    setArea('all')
    setMatchFilter('all')
  }, [offerMode])

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
                <BestMatchTags
                  className="mt-2"
                  tags={deriveMatchTags(
                    {
                      name: selectedPlace.name,
                      area: selectedPlace.area,
                      tags: selectedPlace.tags,
                      offerType: 'venue',
                      publicPriceFrom: 799,
                    },
                    { nearArea },
                  )}
                />
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
            className="flex w-full flex-col gap-1 rounded-2xl border border-ink-200 bg-ink-50 p-1 sm:inline-flex sm:w-auto sm:flex-row sm:flex-wrap"
            role="radiogroup"
            aria-label="Pass type"
          >
            <label
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-center text-sm font-bold transition sm:text-left ${
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
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-center text-sm font-bold transition sm:text-left ${
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
            <label
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-center text-sm font-bold transition sm:text-left ${
                offerMode === 'build'
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              <input
                type="radio"
                name="offerMode"
                className="sr-only"
                checked={offerMode === 'build'}
                onChange={() => setOfferMode('build')}
              />
              Build Navratri
            </label>
          </div>
        </div>
      </div>

      {offerMode !== 'build' && (
        <div className="mb-5 space-y-4">
          <BestMatchFilterChips value={matchFilter} onChange={setMatchFilter} />
          <div className="grid gap-3 sm:grid-cols-3">
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
        </div>
      )}

      {offerMode === 'build' ? (
        <div className="mb-8 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#B57F08] via-[#C9920A] to-ink-950 px-5 py-8 text-white sm:px-10 sm:py-10">
              <img
                src="/images/hero/ambe-maa.svg"
                alt=""
                className="pointer-events-none absolute -right-8 bottom-0 w-28 opacity-30 sm:-right-4 sm:top-1/2 sm:w-44 sm:-translate-y-1/2 sm:opacity-40"
              />
              <div className="relative z-10 max-w-xl pr-0 sm:pr-36">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-100">
                  Build &amp; Save
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  Build your own Navratri
                </h2>
                <p className="mt-3 text-sm text-white/90 sm:text-base">
                  Choose from Ahmedabad&apos;s best Garba experiences across 9 nights.
                </p>
                <ul className="mt-5 space-y-1.5 text-sm font-semibold text-white/95">
                  <li>✓ Choose 5–9 nights</li>
                  <li>✓ Skip any night</li>
                  <li>✓ Unlock bundle pricing</li>
                </ul>
                <Button
                  className="relative z-10 mt-6 w-full bg-white text-ink-900 hover:bg-amber-50 sm:w-auto"
                  onClick={() => setBuildOpen(true)}
                >
                  Start building
                </Button>
              </div>
            </div>
            <div className="grid gap-3 border-t border-ink-100 p-4 sm:grid-cols-3 sm:p-5">
              <div className="rounded-2xl bg-ink-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Progress</p>
                <p className="mt-1 text-sm font-semibold text-ink-800">
                  0/{MIN_BUNDLE_NIGHTS} → 🎉 Bundle unlocked
                </p>
              </div>
              <div className="rounded-2xl bg-ink-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">At 6–7</p>
                <p className="mt-1 text-sm font-semibold text-ink-800">
                  Extra unlocks · better value as you explore
                </p>
              </div>
              <div className="rounded-2xl bg-ink-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">At 9</p>
                <p className="mt-1 text-sm font-semibold text-ink-800">
                  👑 Full Navratri · {formatINR(BUILD_PRICES[9])}
                </p>
              </div>
            </div>
          </div>
          <BuildNavratriModal
            open={buildOpen}
            places={places}
            onClose={() => setBuildOpen(false)}
            onConfirm={({ nights, days, eventId }: { nights: BuildNights; days: BundleDay[]; eventId: string }) => {
              setBuildOpen(false)
              navigate(`/app/events/${eventId}`, {
                state: {
                  customBundleDays: days,
                  customNights: nights,
                  customUnitPrice: (() => {
                    const addOns = days.reduce((s, d) => {
                      const t = PASS_TIER_OPTIONS.find((o) => o.id === d.passTier)
                      return s + (t?.fromPrice ?? 0)
                    }, 0)
                    return (BUILD_PRICES[nights] ?? 0) + addOns
                  })(),
                },
              })
            }}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-14 text-center">
          <p className="font-display text-lg font-bold">No passes match</p>
          <p className="mt-2 text-sm text-ink-500">
            {offerMode === 'bundle'
              ? 'No 9x bundles listed right now — try Individual venue or Build your Navratri.'
              : 'No individual venue passes match these filters.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((ev) => (
            <DiscoverPassCard
              key={ev.id}
              event={ev}
              nearArea={nearArea}
              priceMedian={priceMedian}
            />
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
  const location = useLocation()
  const [event, setEvent] = useState<EventRecord | null>(null)
  const [available, setAvailable] = useState(0)
  const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(1)
  const [qtyDraft, setQtyDraft] = useState('1')
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
  const [customBundleDays, setCustomBundleDays] = useState<BundleDay[] | null>(null)
  const [customNights, setCustomNights] = useState<number | null>(null)

  const onlyTenDigits = (raw: string) => raw.replace(/\D/g, '').slice(0, 10)

  const itineraryDays = customBundleDays?.length ? customBundleDays : event?.bundleDays ?? []

  const bundleMapPlaces = useMemo((): Place[] => {
    if (!itineraryDays.length) return []
    return itineraryDays
      .filter((d) => d.lat != null && d.lng != null)
      .map((d) => ({
        id: d.placeId || `day-${d.day}`,
        name: d.venue,
        city: /Gandhinagar/i.test(d.address) ? 'Gandhinagar' : 'Ahmedabad',
        area: d.area,
        address: d.address,
        landmark: d.landmark,
        image: d.image || event?.image || '',
        lat: d.lat,
        lng: d.lng,
      }))
  }, [itineraryDays, event?.image])

  useEffect(() => {
    if (!id) return
    const state = location.state as {
      customBundleDays?: BundleDay[]
      customNights?: number
      customUnitPrice?: number
    } | null
    void (async () => {
      const [ev, tickets, lots] = await Promise.all([
        api.getEvent(id),
        api.getTickets({ eventId: id, ownerType: 'admin', status: 'available' }),
        api.getPassLots({ eventId: id }),
      ])
      const listed = tickets.filter((t) => t.listedForSale)
      const days = state?.customBundleDays?.length ? state.customBundleDays : ev.bundleDays
      if (state?.customBundleDays?.length) {
        setCustomBundleDays(state.customBundleDays)
        setCustomNights(state.customNights ?? state.customBundleDays.length)
      }
      const merged: EventRecord = {
        ...ev,
        bundleDays: days,
        nights: state?.customNights ?? days?.length ?? ev.nights,
        date: days?.[0]?.date ?? ev.date,
        endDate: days?.[days.length - 1]?.date ?? ev.endDate,
      }
      setEvent(merged)
      setAvailable(listed.length)
      const lot = lots.find((l) => listed.some((t) => t.passLotId === l.id)) ?? lots[0]
      const tierAddOns =
        days?.reduce((sum: number, d: BundleDay) => {
          const t = PASS_TIER_OPTIONS.find((o) => o.id === d.passTier)
          return sum + (t?.fromPrice ?? 0)
        }, 0) ?? 0
      const builtPrice =
        state?.customUnitPrice ??
        (state?.customBundleDays?.length
          ? (BUILD_PRICES[state.customNights ?? state.customBundleDays.length] ?? lot?.pricePerPass ?? 0) +
            tierAddOns
          : null)
      setPrice(builtPrice ?? lot?.pricePerPass ?? ev.publicPriceFrom)
      if (days?.[0]?.placeId) setDayFocus(days[0].placeId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once per event id
  }, [id])

  useEffect(() => {
    setAttendees((prev) => {
      const next = [...prev]
      while (next.length < qty) next.push({ name: '', phone: '' })
      return next.slice(0, qty)
    })
  }, [qty])

  const maxQty = Math.max(1, Math.min(10, Math.max(available, 1)))

  useEffect(() => {
    setQty((q) => Math.min(Math.max(1, q), maxQty))
    setQtyDraft((d) => {
      const n = Number(d)
      if (!Number.isFinite(n) || n < 1) return d
      return String(Math.min(n, maxQty))
    })
  }, [maxQty])

  const commitQty = (raw: string) => {
    const n = Number.parseInt(raw, 10)
    const next = Number.isFinite(n) ? Math.min(maxQty, Math.max(1, n)) : 1
    setQty(next)
    setQtyDraft(String(next))
  }

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
        unitPrice: customBundleDays?.length ? price : undefined,
        ...(customBundleDays?.length
          ? {
              customBundleDays,
              customNights: customNights ?? customBundleDays.length,
            }
          : {}),
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

          {(itineraryDays.length ?? 0) > 0 && (
            <section>
              <div className="mb-3 flex items-end justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl font-bold">
                    {event.offerType === 'customBundle' || customBundleDays?.length
                      ? 'Your custom itinerary'
                      : '9-night itinerary'}
                  </h2>
                  <p className="text-sm text-ink-500">
                    Map every night — tap a day card to fly the map to that mandli ground.
                  </p>
                </div>
                <Badge tone="success">{itineraryDays.length} days</Badge>
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
                {itineraryDays.map((day) => (
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

          {(() => {
            const scheduleRows =
              itineraryDays.length > 0
                ? itineraryDays.map((day) => {
                    const tier = PASS_TIER_OPTIONS.find((t) => t.id === day.passTier)
                    return {
                      time: day.gatesOpen ?? day.startTime ?? '18:00',
                      title: `Day ${day.day} · ${day.venue}`,
                      detail: [day.theme, tier ? `${tier.emoji} ${tier.label}` : null]
                        .filter(Boolean)
                        .join(' · '),
                    }
                  })
                : (event.schedule ?? []).map((s) => ({
                    time: s.time,
                    title: s.title,
                    detail: s.detail ?? '',
                  }))
            if (!scheduleRows.length) return null
            return (
              <section className="rounded-2xl border border-ink-100 bg-white p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display text-lg font-bold">Schedule</h2>
                  <Badge tone="neutral">{scheduleRows.length} nights</Badge>
                </div>
                <ol className="mt-3 space-y-2 text-sm">
                  {scheduleRows.map((s) => (
                    <li key={s.time + s.title} className="flex gap-3">
                      <span className="w-12 shrink-0 font-mono text-xs font-bold text-brand-700">{s.time}</span>
                      <span>
                        <strong>{s.title}</strong>
                        {s.detail ? ` — ${s.detail}` : ''}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )
          })()}

          {(event.lineup?.length ?? 0) > 0 && !(customBundleDays?.length) && (
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
            {(event.offerType === 'bundle9x' ||
              event.offerType === 'customBundle' ||
              (customBundleDays?.length ?? 0) > 0) && (
              <p className="mt-2 rounded-xl bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-800">
                {(customBundleDays?.length || event.offerType === 'customBundle'
                  ? `Custom ${itineraryDays.length || customNights || ''}-night pass`
                  : '9x season pass')}{' '}
                — qty = number of people. Each pass covers all {itineraryDays.length || event.nights || 9}{' '}
                nights.
              </p>
            )}
            <p className="mt-2 text-sm font-semibold text-emerald-700">{available} available</p>

            {step === 1 && (
              <div className="mt-4 space-y-3">
                <div>
                  <p className="mb-1.5 text-sm font-semibold text-ink-700">Quantity</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-200 text-lg font-bold text-ink-700 hover:bg-ink-50 disabled:opacity-40"
                      disabled={qty <= 1}
                      onClick={() => commitQty(String(qty - 1))}
                    >
                      −
                    </button>
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-center text-sm font-semibold text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                      value={qtyDraft}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '')
                        if (raw === '') {
                          setQtyDraft('')
                          return
                        }
                        const n = Number.parseInt(raw, 10)
                        if (!Number.isFinite(n)) return
                        // Clamp live: never below 1, never above max (10)
                        const next = Math.min(maxQty, Math.max(1, n))
                        setQty(next)
                        setQtyDraft(String(next))
                      }}
                      onBlur={() => commitQty(qtyDraft === '' ? '1' : qtyDraft)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur()
                        }
                      }}
                    />
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-200 text-lg font-bold text-ink-700 hover:bg-ink-50 disabled:opacity-40"
                      disabled={qty >= maxQty}
                      onClick={() => commitQty(String(qty + 1))}
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-ink-500">Max {maxQty} per order (1–{maxQty})</p>
                </div>
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
  const [orderDays, setOrderDays] = useState<BundleDay[] | null>(null)

  useEffect(() => {
    if (!id) return
    void api.getTicket(id).then(async (t) => {
      setTicket(t)
      setEvent(await api.getEvent(t.eventId))
      if (t.orderId) {
        try {
          const ord = await api.getOrder(t.orderId)
          if (ord.customBundleDays?.length) setOrderDays(ord.customBundleDays)
        } catch {
          /* optional */
        }
      }
    })
  }, [id])

  if (!ticket || !event) return <PageLoading />

  const nights = orderDays?.length ? orderDays : event.bundleDays ?? []

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
          {nights.length > 0 && (
            <div className="pt-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">
                Your {nights.length} nights
              </p>
              <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {nights.map((day) => (
                  <div key={`${day.day}-${day.date}`} className="rounded-xl border border-ink-100 bg-ink-50 p-3 text-left text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-ink-900">Day {day.day} · {formatNavratriLabel(day.date)}</span>
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
