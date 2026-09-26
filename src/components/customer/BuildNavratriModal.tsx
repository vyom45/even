import { useEffect, useMemo, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import type { BundleDay, Place } from '../../types/garba'
import {
  BUILD_EVENT_IDS,
  type BuildNights,
  type NightTier,
  MAX_BUNDLE_NIGHTS,
  MIN_BUNDLE_NIGHTS,
  NAVRATRI_END,
  NAVRATRI_START,
  NAVRATRI_THEMES,
  NIGHT_ARTISTS,
  NIGHT_INDIVIDUAL_PRICE,
  PASS_TIER_OPTIONS,
  bundlePriceFor,
  extraUnlockSaving,
  formatNavratriLabel,
  individualValueFor,
  isBuildNights,
  listNavratriDates,
  savingsForDates,
  shortNightLabel,
  tierAddOnsTotal,
  unlockMessage,
} from '../../utils/navratri'
import { formatINR } from '../../utils/formatters'

const VENUES_PER_PAGE = 9

type Step = 'nights' | 'venues'

interface BuildNavratriModalProps {
  open: boolean
  places: Place[]
  onClose: () => void
  onConfirm: (payload: { nights: BuildNights; days: BundleDay[]; eventId: string }) => void
}

export function BuildNavratriModal({ open, places, onClose, onConfirm }: BuildNavratriModalProps) {
  const season = useMemo(() => listNavratriDates(), [])
  const [step, setStep] = useState<Step>('nights')
  const [picked, setPicked] = useState<string[]>([])
  const [venueByDate, setVenueByDate] = useState<Record<string, string>>({})
  const [tierByDate, setTierByDate] = useState<Record<string, NightTier>>({})
  const [activeDate, setActiveDate] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [venueQ, setVenueQ] = useState('')
  const [previewPlace, setPreviewPlace] = useState<Place | null>(null)
  const [draftTier, setDraftTier] = useState<NightTier>('gold')

  const selectedDates = useMemo(() => [...picked].sort(), [picked])
  const count = selectedDates.length
  const unlocked = count >= MIN_BUNDLE_NIGHTS
  const progressTarget = Math.max(MIN_BUNDLE_NIGHTS, count)
  const progressPct = Math.min(100, (count / MIN_BUNDLE_NIGHTS) * 100)
  const tierAddOns = useMemo(
    () => tierAddOnsTotal(selectedDates, tierByDate),
    [selectedDates, tierByDate],
  )
  const individual = individualValueFor(selectedDates, tierByDate)
  const bundle = bundlePriceFor(count, tierAddOns)
  const save = savingsForDates(selectedDates, tierByDate)
  const extraSave = extraUnlockSaving(selectedDates)
  const unlockLine = unlockMessage(count, extraSave)

  useEffect(() => {
    if (!open) return
    setStep('nights')
    setPicked([])
    setVenueByDate({})
    setTierByDate({})
    setActiveDate(null)
    setPage(1)
    setVenueQ('')
    setPreviewPlace(null)
    setDraftTier('gold')
  }, [open])

  useEffect(() => {
    if (step === 'venues' && selectedDates.length && !activeDate) {
      setActiveDate(selectedDates[0])
    }
  }, [step, selectedDates, activeDate])

  const toggleDate = (d: string) => {
    setPicked((prev) => {
      if (prev.includes(d)) {
        setVenueByDate((v) => {
          const next = { ...v }
          delete next[d]
          return next
        })
        setTierByDate((v) => {
          const next = { ...v }
          delete next[d]
          return next
        })
        return prev.filter((x) => x !== d)
      }
      if (prev.length >= MAX_BUNDLE_NIGHTS) return prev
      return [...prev, d]
    })
  }

  const filteredPlaces = useMemo(() => {
    const q = venueQ.trim().toLowerCase()
    if (!q) return places
    return places.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q)),
    )
  }, [places, venueQ])

  const totalPages = Math.max(1, Math.ceil(filteredPlaces.length / VENUES_PER_PAGE))
  const pageSafe = Math.min(page, totalPages)
  const pagePlaces = filteredPlaces.slice(
    (pageSafe - 1) * VENUES_PER_PAGE,
    pageSafe * VENUES_PER_PAGE,
  )

  const allVenuesPicked = unlocked && selectedDates.every((d) => venueByDate[d] && tierByDate[d])

  const openVenuePreview = (place: Place) => {
    if (!activeDate) return
    setPreviewPlace(place)
    setDraftTier(tierByDate[activeDate] ?? 'gold')
  }

  const confirmVenueSelect = () => {
    if (!activeDate || !previewPlace) return
    setVenueByDate((prev) => ({ ...prev, [activeDate]: previewPlace.id }))
    setTierByDate((prev) => ({ ...prev, [activeDate]: draftTier }))
    setPreviewPlace(null)
    const idx = selectedDates.indexOf(activeDate)
    if (idx >= 0 && idx < selectedDates.length - 1) {
      setActiveDate(selectedDates[idx + 1])
      setPage(1)
    }
  }

  const tierMeta = (tier?: NightTier) => PASS_TIER_OPTIONS.find((t) => t.id === tier)

  const buildDays = (): BundleDay[] =>
    selectedDates.map((date, i) => {
      const place = places.find((p) => p.id === venueByDate[date])!
      const tier = tierByDate[date] ?? 'gold'
      const meta = tierMeta(tier)
      return {
        day: i + 1,
        date,
        placeId: place.id,
        venue: place.name,
        area: place.area,
        address: place.address,
        landmark: place.landmark,
        lat: place.lat,
        lng: place.lng,
        theme: NAVRATRI_THEMES[date],
        dressHint: 'Traditional chaniya choli / kediyu',
        startTime: '19:00',
        endTime: '00:30',
        gatesOpen: '18:00',
        image: place.image,
        passTier: tier,
        highlights: [
          `${meta?.emoji ?? ''} ${meta?.label ?? 'Gold'}`.trim(),
          NIGHT_ARTISTS[date],
          ...(place.tags ?? []).slice(0, 2),
        ].filter(Boolean),
        note: meta?.blurb,
      }
    })

  const handleRootClose = () => {
    if (previewPlace) {
      setPreviewPlace(null)
      return
    }
    onClose()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleRootClose}
        title="Build your own Navratri"
        size="lg"
        footer={
          step === 'nights' ? (
            <>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={!unlocked}
                onClick={() => {
                  setStep('venues')
                  setActiveDate(selectedDates[0] ?? null)
                  setPage(1)
                }}
              >
                {unlocked ? 'Next — pick venues' : `Select ${MIN_BUNDLE_NIGHTS - count} more`}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setStep('nights')}>
                Back
              </Button>
              <Button
                disabled={!allVenuesPicked || !isBuildNights(count) || bundle == null}
                onClick={() => {
                  if (!isBuildNights(count) || bundle == null) return
                  onConfirm({
                    nights: count,
                    days: buildDays(),
                    eventId: BUILD_EVENT_IDS[count],
                  })
                }}
              >
                Continue · {bundle != null ? formatINR(bundle) : '—'}
              </Button>
            </>
          )
        }
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-ink-900">
                Your Navratri:{' '}
                <span className="text-brand-700">
                  {count}/{MIN_BUNDLE_NIGHTS} nights selected
                </span>
                {count > MIN_BUNDLE_NIGHTS && (
                  <span className="ml-1 font-semibold text-ink-500">(+{count - MIN_BUNDLE_NIGHTS})</span>
                )}
              </p>
              <Badge tone="warning">Build &amp; Save</Badge>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  unlocked ? 'bg-emerald-500' : 'bg-brand-600'
                }`}
                style={{ width: `${Math.min(100, (count / progressTarget) * 100 || progressPct)}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-ink-600">
              {!unlocked &&
                (count === 0
                  ? `Select ${MIN_BUNDLE_NIGHTS} nights → Unlock Bundle Price`
                  : `Select ${MIN_BUNDLE_NIGHTS - count} more → Unlock Bundle Price`)}
              {unlockLine && <span className="text-emerald-700">{unlockLine}</span>}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-500">
            <Badge tone={step === 'nights' ? 'brand' : 'neutral'}>1 · Nights</Badge>
            <span>→</span>
            <Badge tone={step === 'venues' ? 'brand' : 'neutral'}>2 · Venues</Badge>
            <span className="ml-auto text-ink-400">
              Skip any night · {formatNavratriLabel(NAVRATRI_START)} – {formatNavratriLabel(NAVRATRI_END)}
            </span>
          </div>

          {step === 'nights' && (
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.95fr]">
              <div className="space-y-3">
                <p className="text-sm text-ink-600">
                  Choose from Ahmedabad&apos;s best Garba nights. Tap to add or skip — build 5–9 nights.
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {season.map((d) => {
                    const selected = picked.includes(d)
                    const lockedOut = !selected && picked.length >= MAX_BUNDLE_NIGHTS
                    return (
                      <button
                        key={d}
                        type="button"
                        disabled={lockedOut}
                        onClick={() => toggleDate(d)}
                        className={`rounded-xl border px-3 py-3 text-left transition ${
                          selected
                            ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-100'
                            : lockedOut
                              ? 'cursor-not-allowed border-ink-100 bg-ink-50 opacity-45'
                              : 'border-ink-200 bg-white hover:border-brand-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-sm font-bold text-ink-900">{shortNightLabel(d)}</p>
                          {selected && <Check className="h-3.5 w-3.5 text-brand-700" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <aside className="flex flex-col rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
                  Your selected nights
                </p>

                {selectedDates.length === 0 ? (
                  <p className="mt-3 flex-1 text-sm text-ink-500">
                    Tap nights to start building your pass.
                  </p>
                ) : (
                  <ul className="mt-3 max-h-52 flex-1 space-y-2 overflow-y-auto pr-1">
                    {selectedDates.map((d) => (
                      <li
                        key={d}
                        className="flex items-center justify-between gap-2 border-b border-ink-50 pb-2 text-sm last:border-0"
                      >
                        <p className="font-bold text-ink-900">{shortNightLabel(d)}</p>
                        <Check className="h-3.5 w-3.5 shrink-0 text-brand-700" />
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-3 border-t border-ink-100 pt-3">
                  {unlocked ? (
                    <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      Bundle unlocked — next, pick a venue for each night.
                    </p>
                  ) : (
                    <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
                      Select {MIN_BUNDLE_NIGHTS - count} more → Unlock Bundle Price
                    </p>
                  )}
                </div>
              </aside>
            </div>
          )}

          {step === 'venues' && (
            <>
              <p className="text-sm text-ink-600">
                Tap a venue for details &amp; Gold / Diamond / Platinum — then Select to lock it for that night.
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedDates.map((d, i) => {
                  const place = places.find((p) => p.id === venueByDate[d])
                  const tier = tierMeta(tierByDate[d])
                  const active = activeDate === d
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setActiveDate(d)
                        setPage(1)
                      }}
                      className={`w-44 shrink-0 rounded-xl border p-2.5 text-left ${
                        active
                          ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-100'
                          : place
                            ? 'border-emerald-200 bg-emerald-50/50'
                            : 'border-ink-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <Badge tone="brand">Night {i + 1}</Badge>
                        {place && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                      </div>
                      <p className="mt-1 text-xs font-bold text-ink-900">{shortNightLabel(d)}</p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold text-ink-700">
                        {place ? place.name : 'Select venue…'}
                      </p>
                      {tier && (
                        <p className="mt-0.5 text-[10px] font-semibold text-ink-500">
                          {tier.emoji} {tier.label}
                        </p>
                      )}
                      {place && !tier && (
                        <p className="mt-0.5 line-clamp-1 text-[10px] text-ink-500">{place.area}</p>
                      )}
                    </button>
                  )
                })}
              </div>

              <input
                value={venueQ}
                onChange={(e) => {
                  setVenueQ(e.target.value)
                  setPage(1)
                }}
                placeholder="Search venues…"
                className="h-10 w-full rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />

              <div className="grid gap-2 sm:grid-cols-3">
                {pagePlaces.map((p) => {
                  const selected = activeDate ? venueByDate[activeDate] === p.id : false
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => openVenuePreview(p)}
                      className={`overflow-hidden rounded-xl border text-left transition ${
                        selected
                          ? 'border-brand-600 ring-2 ring-brand-100'
                          : 'border-ink-100 hover:border-brand-300'
                      }`}
                    >
                      <img src={p.image} alt="" className="h-20 w-full object-cover" />
                      <div className="p-2">
                        <p className="line-clamp-2 text-xs font-bold text-ink-900">{p.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-ink-500">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="line-clamp-1">{p.area}</span>
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </Button>
                <p className="text-xs font-semibold text-ink-500">
                  Page {pageSafe} / {totalPages}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {unlocked && bundle != null && (
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3 text-sm">
                  <div className="flex justify-between text-ink-600">
                    <span>Individual value</span>
                    <span className="font-semibold">{formatINR(individual)}</span>
                  </div>
                  <div className="flex justify-between text-ink-600">
                    <span>Bundle base ({count} nights)</span>
                    <span className="font-semibold">
                      {formatINR((bundlePriceFor(count, 0) ?? 0))}
                    </span>
                  </div>
                  {tierAddOns > 0 && (
                    <div className="flex justify-between text-ink-600">
                      <span>Diamond / Platinum upgrades</span>
                      <span className="font-semibold text-brand-800">+{formatINR(tierAddOns)}</span>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between text-ink-900">
                    <span className="font-bold">Your EventBiz total</span>
                    <span className="font-display text-lg font-extrabold text-brand-700">
                      {formatINR(bundle)}
                    </span>
                  </div>
                  <p className="mt-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
                    You save {formatINR(save)}
                    {extraSave > 0 ? ` · Extra ${formatINR(extraSave)} vs 5-night base` : ''}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>

      <Modal
        open={Boolean(open && previewPlace && activeDate)}
        onClose={() => setPreviewPlace(null)}
        title={previewPlace?.name ?? 'Venue'}
        size="md"
        layer={90}
        closeOnEscape
        footer={
          <>
            <Button variant="ghost" onClick={() => setPreviewPlace(null)}>
              Cancel
            </Button>
            <Button onClick={confirmVenueSelect}>Select</Button>
          </>
        }
      >
        {previewPlace && activeDate && (
          <div className="space-y-4">
            <img
              src={previewPlace.image}
              alt=""
              className="h-40 w-full rounded-2xl object-cover"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-400">
                Night · {formatNavratriLabel(activeDate)}
              </p>
              <h4 className="mt-1 font-display text-xl font-bold text-ink-900">{previewPlace.name}</h4>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span>
                  {previewPlace.area}
                  {previewPlace.landmark ? ` · ${previewPlace.landmark}` : ''}
                  <br />
                  <span className="text-xs text-ink-500">{previewPlace.address}</span>
                </span>
              </p>
              {(previewPlace.tags?.length ?? 0) > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {previewPlace.tags!.slice(0, 4).map((t) => (
                    <Badge key={t} tone="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              <ul className="mt-3 space-y-1 text-xs text-ink-500">
                {previewPlace.parking && <li>· Parking available on site</li>}
                {previewPlace.metroNearby && <li>· Metro / BRTS nearby</li>}
                {previewPlace.capacityHint != null && (
                  <li>· Capacity hint ~{previewPlace.capacityHint.toLocaleString('en-IN')}</li>
                )}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold text-ink-900">Choose your pass tier</p>
              <p className="mt-0.5 text-xs text-ink-500">
                Diamond &amp; Platinum add to your bundle total for this night.
              </p>
              <div className="mt-3 grid gap-2">
                {PASS_TIER_OPTIONS.map((opt) => {
                  const active = draftTier === opt.id
                  const basePrice = NIGHT_INDIVIDUAL_PRICE[activeDate] ?? 799
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDraftTier(opt.id)}
                      className={`rounded-2xl border px-3.5 py-3 text-left transition ${
                        active
                          ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-100'
                          : 'border-ink-200 bg-white hover:border-brand-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-ink-900">
                            {opt.emoji} {opt.label}
                          </p>
                          <p className="mt-0.5 text-xs text-ink-600">{opt.blurb}</p>
                          <ul className="mt-1.5 space-y-0.5 text-[11px] text-ink-500">
                            {opt.perks.map((perk) => (
                              <li key={perk}>· {perk}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="shrink-0 text-right">
                          {opt.fromPrice === 0 ? (
                            <div>
                              <p className="text-xs font-bold text-ink-900">{formatINR(basePrice)}</p>
                              <p className="text-[11px] font-semibold text-emerald-700">Included in bundle</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-xs font-bold text-ink-900">{formatINR(basePrice + opt.fromPrice)}</p>
                              <p className="text-[11px] font-semibold text-brand-700">+{formatINR(opt.fromPrice)} upgrade</p>
                            </div>
                          )}
                          {active && <Check className="ml-auto mt-1 h-4 w-4 text-brand-700" />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
