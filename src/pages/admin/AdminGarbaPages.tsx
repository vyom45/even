import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  CalendarPlus,
  LayoutDashboard,
  Package,
  Store,
} from 'lucide-react'
import { api, listLotForSale } from '../../api/client'
import { useAuth } from '../../auth/useAuth'
import { StatCard } from '../../components/common/StatCard'
import { DataTable, type Column } from '../../components/common/DataTable'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Modal } from '../../components/ui/Modal'
import { PageLoading } from '../../components/ui/LoadingSkeleton'
import { DashboardShell } from '../../layouts/DashboardShell'
import type { EventRecord, PassLot, Ticket, Transaction } from '../../types/garba'
import { formatINR } from '../../utils/formatters'

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/events', label: 'Events', icon: CalendarPlus },
  { to: '/admin/pass-lots', label: 'Pass Lots', icon: Package },
  { to: '/admin/inventory', label: 'List for sale', icon: Store },
  { to: '/admin/reports', label: 'Sales', icon: BarChart3 },
]

export function AdminLayout() {
  return <DashboardShell title="Admin" items={nav} />
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ listed: 0, lots: 0, remaining: 0, gmv: 0, events: 0 })

  useEffect(() => {
    void (async () => {
      const [tickets, passLots, txs, events] = await Promise.all([
        api.getTickets({ ownerType: 'admin', status: 'available' }),
        api.getPassLots(),
        api.getTransactions(),
        api.getEvents(),
      ])
      setStats({
        listed: tickets.filter((t) => t.listedForSale).length,
        lots: passLots.length,
        remaining: passLots.reduce((s, l) => s + l.remainingQty, 0),
        gmv: txs.reduce((s, t) => s + t.amount, 0),
        events: events.filter((e) => e.status === 'active').length,
      })
      setLoading(false)
    })()
  }, [])

  if (loading) return <PageLoading />
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="section-title">Admin dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Active events" value={String(stats.events)} />
        <StatCard label="Listed for sale" value={String(stats.listed)} />
        <StatCard label="Pass lots" value={String(stats.lots)} />
        <StatCard label="Lot stock left" value={stats.remaining.toLocaleString('en-IN')} />
        <StatCard label="GMV" value={formatINR(stats.gmv)} />
      </div>
    </div>
  )
}

const emptyEvent = {
  name: '',
  subtitle: '',
  category: 'Navratri / Garba',
  shortDescription: '',
  description: '',
  date: '2026-10-15',
  endDate: '2026-10-15',
  startTime: '19:00',
  endTime: '00:30',
  gatesOpen: '18:00',
  venue: '',
  address: '',
  city: 'Ahmedabad',
  area: '',
  landmark: '',
  ageLimit: 'All ages',
  durationLabel: '',
  dressCode: 'Festive',
  languages: 'Gujarati, Hindi',
  tags: '',
  highlights: '',
  amenities: '',
  terms: '',
  refundPolicy: '',
  convenienceFee: 29,
  publicPriceFrom: 499,
  image: '/images/navratri-sabarmati.jpg',
  featured: true,
}

export function AdminEventsPage() {
  const { user } = useAuth()
  const [events, setEvents] = useState<EventRecord[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyEvent)
  const [saving, setSaving] = useState(false)

  const load = () => void api.getEvents().then(setEvents)
  useEffect(() => {
    load()
  }, [])

  const columns: Column<EventRecord>[] = [
    { key: 'name', header: 'Event', render: (r) => r.name, sortable: true, sortValue: (r) => r.name },
    { key: 'cat', header: 'Category', render: (r) => r.category },
    { key: 'date', header: 'Date', render: (r) => r.date },
    { key: 'venue', header: 'Venue', render: (r) => r.venue },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Badge tone={statusTone(r.status)} className="capitalize">
          {r.status}
        </Badge>
      ),
    },
    { key: 'price', header: 'From', render: (r) => formatINR(r.publicPriceFrom) },
  ]

  const save = async () => {
    if (!user) return
    setSaving(true)
    try {
      await api.createEvent({
        name: form.name,
        subtitle: form.subtitle,
        adminId: user.id,
        date: form.date,
        endDate: form.endDate,
        startTime: form.startTime,
        endTime: form.endTime,
        gatesOpen: form.gatesOpen,
        venue: form.venue,
        address: form.address,
        city: form.city,
        area: form.area,
        landmark: form.landmark,
        status: 'active',
        image: form.image,
        gallery: [form.image],
        shortDescription: form.shortDescription,
        description: form.description,
        category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        languages: form.languages.split(',').map((t) => t.trim()).filter(Boolean),
        ageLimit: form.ageLimit,
        durationLabel: form.durationLabel,
        dressCode: form.dressCode,
        highlights: form.highlights.split('\n').map((t) => t.trim()).filter(Boolean),
        amenities: form.amenities.split('\n').map((t) => t.trim()).filter(Boolean),
        terms: form.terms.split('\n').map((t) => t.trim()).filter(Boolean),
        refundPolicy: form.refundPolicy,
        convenienceFee: Number(form.convenienceFee) || 0,
        publicPriceFrom: Number(form.publicPriceFrom) || 0,
        featured: form.featured,
        lineup: [],
        schedule: [],
        faqs: [],
      })
      setOpen(false)
      setForm(emptyEvent)
      load()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="section-title">Events</h1>
        <Button onClick={() => setOpen(true)}>Create event</Button>
      </div>
      <DataTable columns={columns} data={events} searchKeys={['name', 'venue', 'category', 'city']} />

      <Modal open={open} onClose={() => setOpen(false)} title="Create event (District-style details)" size="lg" footer={<Button loading={saving} onClick={save}>Publish event</Button>}>
        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Basics</p>
          <Input label="Event name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Subtitle / tagline" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          <Select
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            options={[
              { value: 'Navratri / Garba', label: 'Navratri / Garba' },
              { value: 'Concert / Dandiya', label: 'Concert / Dandiya' },
              { value: 'Family', label: 'Family' },
              { value: 'Corporate', label: 'Corporate' },
              { value: 'Comedy', label: 'Comedy' },
              { value: 'Sports', label: 'Sports' },
            ]}
          />
          <Input label="Short description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
          <label className="block space-y-1.5 text-sm font-semibold text-ink-700">
            Full description
            <textarea className="min-h-24 w-full rounded-xl border border-ink-200 px-3 py-2 text-sm font-normal" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>

          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">When</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Start date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Input label="End date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            <Input label="Start time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            <Input label="End time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
            <Input label="Gates open" value={form.gatesOpen} onChange={(e) => setForm({ ...form, gatesOpen: e.target.value })} />
            <Input label="Duration label" value={form.durationLabel} onChange={(e) => setForm({ ...form, durationLabel: e.target.value })} placeholder="e.g. ~5 hrs" />
          </div>

          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Venue</p>
          <Input label="Venue name *" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          <Input label="Full address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="grid gap-3 sm:grid-cols-3">
            <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <Input label="Area" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
            <Input label="Landmark" value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} />
          </div>

          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Guest info</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Age limit" value={form.ageLimit} onChange={(e) => setForm({ ...form, ageLimit: e.target.value })} />
            <Input label="Dress code" value={form.dressCode} onChange={(e) => setForm({ ...form, dressCode: e.target.value })} />
            <Input label="Languages (comma)" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} />
            <Input label="Tags (comma)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <Input label="From price ₹" type="number" value={form.publicPriceFrom} onChange={(e) => setForm({ ...form, publicPriceFrom: Number(e.target.value) })} />
            <Input label="Convenience fee ₹" type="number" value={form.convenienceFee} onChange={(e) => setForm({ ...form, convenienceFee: Number(e.target.value) })} />
          </div>
          <Input label="Cover image path" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} hint="/images/..." />

          <label className="block space-y-1.5 text-sm font-semibold text-ink-700">
            Highlights (one per line)
            <textarea className="min-h-20 w-full rounded-xl border border-ink-200 px-3 py-2 text-sm font-normal" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
          </label>
          <label className="block space-y-1.5 text-sm font-semibold text-ink-700">
            Amenities (one per line)
            <textarea className="min-h-20 w-full rounded-xl border border-ink-200 px-3 py-2 text-sm font-normal" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
          </label>
          <label className="block space-y-1.5 text-sm font-semibold text-ink-700">
            Terms (one per line)
            <textarea className="min-h-16 w-full rounded-xl border border-ink-200 px-3 py-2 text-sm font-normal" value={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.value })} />
          </label>
          <label className="block space-y-1.5 text-sm font-semibold text-ink-700">
            Refund policy
            <textarea className="min-h-16 w-full rounded-xl border border-ink-200 px-3 py-2 text-sm font-normal" value={form.refundPolicy} onChange={(e) => setForm({ ...form, refundPolicy: e.target.value })} />
          </label>
        </div>
      </Modal>
    </div>
  )
}

export function PassLotsPage() {
  const { user } = useAuth()
  const [lots, setLots] = useState<PassLot[]>([])
  const [events, setEvents] = useState<EventRecord[]>([])
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    eventId: '',
    name: '',
    description: '',
    perks: '',
    totalQty: 100,
    pricePerPass: 499,
    cost: 349,
    maxPerOrder: 6,
    saleStartsAt: '2026-09-01',
    saleEndsAt: '2026-10-30',
  })

  const load = async () => {
    const [l, e] = await Promise.all([api.getPassLots(), api.getEvents()])
    setLots(l)
    setEvents(e)
    if (e[0] && !form.eventId) setForm((f) => ({ ...f, eventId: e[0].id }))
  }
  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const eventName = (id: string) => events.find((e) => e.id === id)?.name ?? id
  const columns: Column<PassLot>[] = [
    { key: 'name', header: 'Lot', render: (r) => r.name },
    { key: 'event', header: 'Event', render: (r) => eventName(r.eventId) },
    { key: 'left', header: 'Left', render: (r) => `${r.remainingQty}/${r.totalQty}` },
    { key: 'price', header: 'Retail', render: (r) => formatINR(r.pricePerPass) },
    { key: 'cost', header: 'Cost', render: (r) => formatINR(r.cost ?? r.providerPrice ?? 0) },
    { key: 'max', header: 'Max/order', render: (r) => r.maxPerOrder ?? '—' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="section-title">Pass lots</h1>
        <Button onClick={() => setOpen(true)}>Add lot</Button>
      </div>
      <DataTable columns={columns} data={lots} searchKeys={['name', 'eventId']} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create pass lot"
        size="lg"
        footer={
          <Button
            loading={saving}
            onClick={async () => {
              if (!user || !form.eventId) return
              setSaving(true)
              try {
                await api.createPassLot({
                  eventId: form.eventId,
                  adminId: user.id,
                  name: form.name || 'New lot',
                  description: form.description,
                  perks: form.perks.split(',').map((p) => p.trim()).filter(Boolean),
                  totalQty: form.totalQty,
                  remainingQty: form.totalQty,
                  pricePerPass: form.pricePerPass,
                  cost: form.cost,
                  maxPerOrder: form.maxPerOrder,
                  saleStartsAt: form.saleStartsAt,
                  saleEndsAt: form.saleEndsAt,
                  createdAt: new Date().toISOString().slice(0, 10),
                  status: 'active',
                })
                setOpen(false)
                await load()
              } finally {
                setSaving(false)
              }
            }}
          >
            Save lot
          </Button>
        }
      >
        <div className="space-y-3">
          <Select label="Event" value={form.eventId} onChange={(e) => setForm({ ...form, eventId: e.target.value })} options={events.map((ev) => ({ value: ev.id, label: ev.name }))} />
          <Input label="Lot name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input label="Perks (comma separated)" value={form.perks} onChange={(e) => setForm({ ...form, perks: e.target.value })} placeholder="Main floor, Food court" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Total qty" type="number" value={form.totalQty} onChange={(e) => setForm({ ...form, totalQty: Number(e.target.value) })} />
            <Input label="Max per order" type="number" value={form.maxPerOrder} onChange={(e) => setForm({ ...form, maxPerOrder: Number(e.target.value) })} />
            <Input label="Customer price ₹" type="number" value={form.pricePerPass} onChange={(e) => setForm({ ...form, pricePerPass: Number(e.target.value) })} />
            <Input label="Cost ₹" type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })} />
            <Input label="Sale starts" type="date" value={form.saleStartsAt} onChange={(e) => setForm({ ...form, saleStartsAt: e.target.value })} />
            <Input label="Sale ends" type="date" value={form.saleEndsAt} onChange={(e) => setForm({ ...form, saleEndsAt: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export function InventoryListPage() {
  const { user } = useAuth()
  const [lots, setLots] = useState<PassLot[]>([])
  const [events, setEvents] = useState<EventRecord[]>([])
  const [listed, setListed] = useState<Ticket[]>([])
  const [lotId, setLotId] = useState('')
  const [qty, setQty] = useState(10)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const load = async () => {
    const [l, e, t] = await Promise.all([
      api.getPassLots(),
      api.getEvents(),
      api.getTickets({ ownerType: 'admin', status: 'available' }),
    ])
    setLots(l)
    setEvents(e)
    setListed(t.filter((x) => x.listedForSale))
    if (!lotId && l[0]) setLotId(l[0].id)
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const eventName = (id: string) => events.find((e) => e.id === id)?.name ?? id
  const selected = lots.find((l) => l.id === lotId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">List passes for sale</h1>
        <p className="mt-1 text-sm text-ink-500">
          Move stock from a pass lot onto customer Discover.
        </p>
      </div>
      {msg && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{msg}</p>}

      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft space-y-3 max-w-lg">
        <Select
          label="Pass lot"
          value={lotId}
          onChange={(e) => setLotId(e.target.value)}
          options={lots.map((l) => ({
            value: l.id,
            label: `${l.name} · ${eventName(l.eventId)} (${l.remainingQty} left)`,
          }))}
        />
        <Input label="Quantity to list" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value) || 1)} />
        {selected && (
          <p className="text-xs text-ink-500">
            Retail {formatINR(selected.pricePerPass)} · Lot remaining {selected.remainingQty}
          </p>
        )}
        <Button
          loading={busy}
          disabled={!lotId || !user}
          onClick={async () => {
            if (!user || !lotId) return
            setBusy(true)
            setMsg('')
            try {
              const res = await listLotForSale(lotId, qty, user.id)
              setMsg(`Listed ${res.qty} pass(es) on customer Discover.`)
              await load()
            } catch (e) {
              setMsg(e instanceof Error ? e.message : 'Failed')
            } finally {
              setBusy(false)
            }
          }}
        >
          List for customers
        </Button>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold">Currently listed</h2>
        <p className="mb-3 text-sm text-ink-500">{listed.length} available on Discover</p>
        <DataTable
          columns={[
            { key: 'qr', header: 'QR', render: (r) => r.qrCode },
            { key: 'lot', header: 'Lot', render: (r) => r.lotName ?? r.passLotId },
            { key: 'event', header: 'Event', render: (r) => eventName(r.eventId) },
            {
              key: 'status',
              header: 'Status',
              render: (r) => (
                <Badge tone={statusTone(r.status)} className="capitalize">
                  {r.status}
                </Badge>
              ),
            },
          ]}
          data={listed}
          searchKeys={['qrCode', 'lotName', 'eventId']}
        />
      </div>
    </div>
  )
}

export function AdminSalesReportsPage() {
  const [txs, setTxs] = useState<Transaction[]>([])
  const [orders, setOrders] = useState<Awaited<ReturnType<typeof api.getOrders>>>([])
  useEffect(() => {
    void Promise.all([api.getTransactions(), api.getOrders()]).then(([t, o]) => {
      setTxs(t)
      setOrders(o)
    })
  }, [])
  const total = useMemo(() => txs.reduce((s, t) => s + t.amount, 0), [txs])
  const columns: Column<Transaction>[] = [
    { key: 'id', header: 'Txn', render: (r) => r.id },
    { key: 'order', header: 'Order', render: (r) => r.orderId ?? '—' },
    { key: 'amount', header: 'Amount', render: (r) => formatINR(r.amount), sortable: true, sortValue: (r) => r.amount },
    { key: 'margin', header: 'Margin', render: (r) => formatINR(r.commission) },
  ]
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="section-title">Sales</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Ticket GMV" value={formatINR(total)} />
        <StatCard label="Orders" value={String(orders.length)} />
      </div>
      <DataTable columns={columns} data={txs} searchKeys={['id', 'orderId', 'sellerId']} />
    </div>
  )
}
