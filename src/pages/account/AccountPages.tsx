import { useParams, useNavigate } from 'react-router-dom'
import { tickets } from '../../data/mock'
import { useRole } from '../../contexts/RoleContext'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { formatDate, formatINR } from '../../utils/format'

export function AccountPage() {
  const { demoUser, isAuthenticated, setAuthenticated } = useRole()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return (
      <div className="page-container py-16 text-center">
        <h1 className="section-title">Sign in to view your account</h1>
        <p className="mt-2 text-ink-500">Or use the Role Switcher to jump into any demo persona.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => navigate('/login')}>Log in</Button>
          <Button variant="outline" onClick={() => setAuthenticated(true)}>
            Continue as demo user
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container max-w-2xl space-y-6 py-8 animate-fade-in">
      <div>
        <h1 className="section-title">My account</h1>
        <p className="mt-1 text-ink-500">Profile details (local demo state)</p>
      </div>
      <div className="space-y-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:p-6">
        <Input label="Name" defaultValue={demoUser.name} readOnly />
        <Input label="Email" defaultValue={demoUser.email} readOnly />
        <Input label="Phone" defaultValue={demoUser.phone} readOnly />
        <Input label="City" defaultValue={demoUser.city} readOnly />
        <p className="text-xs text-ink-400">Joined {formatDate(demoUser.joinedAt)}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button onClick={() => navigate('/account/tickets')}>My tickets</Button>
          <Button variant="outline" onClick={() => setAuthenticated(false)}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}

export function AccountTicketsPage() {
  const mine = tickets.filter((t) => t.holderEmail === 'aarav.patel@email.com')
  const navigate = useNavigate()

  return (
    <div className="page-container space-y-6 py-8 animate-fade-in">
      <div>
        <h1 className="section-title">My tickets</h1>
        <p className="mt-1 text-ink-500">Digital passes for upcoming nights</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {mine.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => navigate(`/ticket/${t.id}`)}
            className="rounded-2xl border border-ink-100 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display font-bold text-ink-900">{t.eventName}</p>
                <p className="mt-1 text-sm text-ink-500">{t.categoryName}</p>
              </div>
              <Badge tone={statusTone(t.status)} className="capitalize">
                {t.status}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-ink-600">{formatDate(t.startsAt)}</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">{formatINR(t.price)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ticket = tickets.find((t) => t.id === id)

  if (!ticket) {
    return (
      <div className="page-container py-16 text-center">
        <h1 className="section-title">Ticket not found</h1>
      </div>
    )
  }

  return (
    <div className="page-container flex justify-center py-8 sm:py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card animate-slide-up">
        <div className="bg-brand-800 px-6 py-5 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-200">Digital ticket</p>
          <h1 className="mt-1 font-display text-xl font-bold">{ticket.eventName}</h1>
          <p className="mt-1 text-sm text-white/80">{ticket.venue}</p>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex justify-center">
            <div className="flex h-48 w-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50 p-4 text-center">
              <div className="grid h-28 w-28 grid-cols-5 gap-0.5" aria-hidden>
                {Array.from({ length: 25 }).map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-[1px] ${i % 3 === 0 || i % 7 === 0 ? 'bg-ink-900' : 'bg-ink-300'}`}
                  />
                ))}
              </div>
              <p className="mt-3 font-mono text-xs font-bold text-ink-600">{ticket.qrPlaceholder}</p>
              <p className="text-[10px] text-ink-400">QR placeholder (demo)</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <Row label="Holder" value={ticket.holderName} />
            <Row label="Category" value={ticket.categoryName} />
            <Row label="Code" value={ticket.code} />
            <Row
              label="Status"
              value={
                <Badge tone={statusTone(ticket.status)} className="capitalize">
                  {ticket.status}
                </Badge>
              }
            />
            <Row label="When" value={formatDate(ticket.startsAt)} />
          </div>
          <Button variant="outline" className="w-full" onClick={() => navigate('/account/tickets')}>
            Back to tickets
          </Button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink-50 py-2">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-800">{value}</span>
    </div>
  )
}
