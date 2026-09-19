import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Bus,
  Calendar,
  Check,
  Clock,
  HelpCircle,
  MapPin,
  Mic2,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'
import { events } from '../../data/mock'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { PageLoading } from '../../components/ui/LoadingSkeleton'
import { ErrorState } from '../../components/ui/ErrorState'
import { useMockLoad } from '../../hooks/useMockLoad'
import { useRole } from '../../contexts/RoleContext'
import { formatDateTime, formatINR, remainingInventory } from '../../utils/format'

export function EventDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { setAuthenticated } = useRole()
  const { data, loading, error, reload } = useMockLoad(
    () => events.find((e) => e.slug === slug) ?? null,
    450,
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [buying, setBuying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const category = useMemo(
    () => data?.categories.find((c) => c.id === selected) ?? data?.categories[0],
    [data, selected],
  )

  if (loading) return <PageLoading />
  if (error)
    return (
      <div className="page-container py-8">
        <ErrorState onRetry={reload} />
      </div>
    )
  if (!data) {
    return (
      <div className="page-container py-16 text-center">
        <h1 className="section-title">Event not found</h1>
        <Button className="mt-4" onClick={() => navigate('/events')}>
          Back to events
        </Button>
      </div>
    )
  }

  const activeCat = category ?? data.categories[0]

  const fakeCheckout = async () => {
    setBuying(true)
    await new Promise((r) => setTimeout(r, 900))
    setBuying(false)
    setSuccess(true)
    setAuthenticated(true)
  }

  return (
    <div className="animate-fade-in">
      <div className="relative h-56 overflow-hidden sm:h-72 lg:h-[22rem]">
        <img src={data.image} alt={data.name} className="h-full w-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${data.coverGradient}`} />
        <div className="absolute inset-x-0 bottom-0 page-container pb-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge tone={statusTone(data.status)} className="capitalize">
              {data.status}
            </Badge>
            <Badge tone="brand">{data.category}</Badge>
          </div>
          <h1 className="max-w-3xl font-display text-3xl font-extrabold text-white sm:text-4xl">
            {data.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">{data.shortDescription}</p>
        </div>
      </div>

      <div className="border-b border-ink-100 bg-white">
        <div className="page-container grid gap-3 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <Meta icon={Calendar} label="Starts" value={formatDateTime(data.startsAt)} />
          <Meta icon={Clock} label="Gates / duration" value={`${data.gatesOpen} · ${data.durationLabel}`} />
          <Meta icon={MapPin} label="Venue" value={`${data.venue} · ${data.area}`} />
          <Meta icon={Users} label="Age & language" value={`${data.agePolicy.split('.')[0]}. · ${data.languages[0]}+`} />
        </div>
      </div>

      <div className="page-container grid gap-8 py-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl font-bold text-ink-900">About this event</h2>
            <p className="mt-3 text-ink-600 leading-relaxed">{data.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <Badge key={t} tone="neutral">
                  {t}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-500">
              Organized by <span className="font-semibold text-ink-800">{data.organizerName}</span>
              <br />
              {data.address}
            </p>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink-900">
              <Sparkles className="h-5 w-5 text-brand-600" /> Highlights
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {data.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink-900">Ticket categories</h2>
            <p className="mt-1 text-sm text-ink-500">Select a tier — perks are included in the pass.</p>
            <div className="mt-4 space-y-3">
              {data.categories.map((c) => {
                const left = remainingInventory(c)
                const isActive = activeCat.id === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelected(c.id)
                      setQty(1)
                    }}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                        : 'border-ink-100 bg-white hover:border-ink-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold text-ink-900">{c.name}</p>
                        <p className="mt-1 text-sm text-ink-500">{c.description}</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {c.perks.map((p) => (
                            <li
                              key={p}
                              className="rounded-full bg-ink-50 px-2 py-0.5 text-[11px] font-semibold text-ink-600"
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-xs font-medium text-ink-400">
                          {left.toLocaleString('en-IN')} remaining · public & B2B inventory
                        </p>
                      </div>
                      <p className="font-display text-xl font-bold text-ink-900">
                        {formatINR(c.publicPrice)}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-white p-5">
              <h3 className="flex items-center gap-2 font-display font-bold text-ink-900">
                <Clock className="h-4 w-4 text-brand-600" /> Night schedule
              </h3>
              <ol className="mt-4 space-y-3">
                {data.schedule.map((s) => (
                  <li key={s.time + s.title} className="flex gap-3 text-sm">
                    <span className="w-12 shrink-0 font-mono text-xs font-bold text-brand-700">
                      {s.time}
                    </span>
                    <span>
                      <span className="font-semibold text-ink-800">{s.title}</span>
                      {s.detail && <span className="block text-ink-500">{s.detail}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-5">
              <h3 className="flex items-center gap-2 font-display font-bold text-ink-900">
                <Mic2 className="h-4 w-4 text-brand-600" /> Lineup
              </h3>
              <ul className="mt-4 space-y-3">
                {data.lineup.map((a) => (
                  <li key={a.name} className="flex items-start justify-between gap-3 text-sm">
                    <span className="font-semibold text-ink-800">{a.name}</span>
                    <span className="text-right text-ink-500">{a.role}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-display font-bold text-ink-900">Amenities</h3>
              <ul className="mt-3 grid gap-1.5 text-sm text-ink-600 sm:grid-cols-1">
                {data.amenities.map((a) => (
                  <li key={a} className="flex gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-ink-100 bg-white p-5">
            <h3 className="flex items-center gap-2 font-display font-bold text-ink-900">
              <Bus className="h-4 w-4 text-brand-600" /> Getting there
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              {data.gettingThere.map((g) => (
                <li key={g} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-ink-50 px-3 py-2 text-xs text-ink-500">
              <strong className="text-ink-700">Age policy:</strong> {data.agePolicy}
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-bold text-ink-900">
              <HelpCircle className="h-5 w-5 text-brand-600" /> FAQs
            </h2>
            <div className="space-y-2">
              {data.faqs.map((f, i) => (
                <div key={f.q} className="overflow-hidden rounded-xl border border-ink-100 bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-ink-800"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <span className="text-ink-400">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <p className="border-t border-ink-50 px-4 py-3 text-sm text-ink-600">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-white p-5">
              <h3 className="font-display font-bold text-ink-900">Terms & entry rules</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                {data.terms.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-5">
              <h3 className="font-display font-bold text-ink-900">Refund policy</h3>
              <p className="mt-3 text-sm text-ink-600 leading-relaxed">{data.refundPolicy}</p>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
            <p className="text-sm text-ink-500">Selected</p>
            <p className="font-display text-lg font-bold text-ink-900">{activeCat.name}</p>
            <p className="mt-1 font-display text-3xl font-extrabold text-brand-800">
              {formatINR(activeCat.publicPrice)}
            </p>
            <p className="mt-1 text-xs text-ink-400">Incl. demo taxes as shown · per ticket</p>
            <label className="mt-4 block text-sm font-semibold text-ink-700">
              Quantity
              <input
                type="number"
                min={1}
                max={10}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 px-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </label>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-ink-500">
                <span>Subtotal</span>
                <span>{formatINR(activeCat.publicPrice * qty)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-500">Total</span>
                <span className="font-display text-lg font-bold">
                  {formatINR(activeCat.publicPrice * qty)}
                </span>
              </div>
            </div>
            <Button className="mt-5 w-full" size="lg" onClick={() => setCheckoutOpen(true)}>
              Buy tickets
            </Button>
            <p className="mt-3 flex items-start gap-2 text-xs text-ink-400">
              <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Demo checkout — no real payment charged. Instant digital ticket after fake success.
            </p>
          </div>
        </aside>
      </div>

      <Modal
        open={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false)
          setSuccess(false)
        }}
        title={success ? 'Tickets confirmed' : 'Confirm purchase'}
        footer={
          success ? (
            <Button
              onClick={() => {
                setCheckoutOpen(false)
                navigate('/account/tickets')
              }}
            >
              View my tickets
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button loading={buying} onClick={fakeCheckout}>
                Pay {formatINR(activeCat.publicPrice * qty)}
              </Button>
            </>
          )
        }
      >
        {success ? (
          <p className="text-sm text-ink-600">
            Fake payment succeeded. Your digital tickets are ready in My Tickets — show the QR at the
            gate.
          </p>
        ) : (
          <div className="space-y-2 text-sm text-ink-600">
            <p>
              <strong>{qty}×</strong> {activeCat.name}
            </p>
            <p>{data.name}</p>
            <p className="text-xs text-ink-400">{data.venue} · {formatDateTime(data.startsAt)}</p>
            <p className="font-display text-xl font-bold text-ink-900">
              {formatINR(activeCat.publicPrice * qty)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{label}</p>
        <p className="truncate text-sm font-semibold text-ink-800">{value}</p>
      </div>
    </div>
  )
}
