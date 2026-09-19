import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  QrCode,
  ShieldCheck,
  Store,
  Ticket,
  Users,
  Wallet,
} from 'lucide-react'
import { events } from '../../data/mock'
import { EventCard } from '../../components/events/EventCard'
import { Button } from '../../components/ui/Button'

const steps = [
  {
    icon: Ticket,
    title: 'Organizers publish inventory',
    text: 'List Garba nights with public vs B2B allocations, gates, and refund rules in one place.',
  },
  {
    icon: Store,
    title: 'Partners buy at wholesale',
    text: 'Approved resellers unlock B2B pricing, estimated margins, and bulk order history.',
  },
  {
    icon: QrCode,
    title: 'Fans & gates stay in sync',
    text: 'Digital QR tickets for customers; gate ops simulate VALID / used / cancelled scans.',
  },
]

const audiences = [
  {
    icon: Users,
    title: 'Customers',
    text: 'Browse Ahmedabad Navratri events, compare tiers, and keep tickets in one account.',
  },
  {
    icon: Store,
    title: 'Reseller partners',
    text: 'Campus sellers, travel desks, and ticket hubs — wholesale stock with clear savings.',
  },
  {
    icon: Building2,
    title: 'Organizers',
    text: 'Track sell-through, split public/B2B inventory, and review settlement summaries.',
  },
  {
    icon: Wallet,
    title: 'Platform admin',
    text: 'See GMV, approve partners, and monitor events & orders across the network.',
  },
]

export function LandingPage() {
  const navigate = useNavigate()
  const featured = events.filter((e) => e.featured).slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden bg-hero-mesh">
        <div className="page-container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="animate-slide-up">
            <p className="mb-4 font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
              Event<span className="text-brand-700">Biz</span>
            </p>
            <h1 className="max-w-xl font-display text-2xl font-bold leading-snug text-ink-800 sm:text-3xl">
              B2B ticket distribution for India’s biggest nights
            </h1>
            <p className="mt-4 max-w-lg text-base text-ink-600 sm:text-lg">
              Starting with Navratri & Garba in Ahmedabad — one platform for organizers, reseller
              partners, customers, and gate operators. Wholesale pricing, digital tickets, and
              settlement-ready flows (demo).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                onClick={() => navigate('/events')}
              >
                Browse events
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/partner/dashboard')}>
                Partner marketplace
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" /> Escrow-ready settlements
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-brand-600" /> Built for Ahmedabad first
              </span>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-400/20 via-transparent to-saffron-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 shadow-card">
              <img
                src={featured[0]?.image}
                alt="Navratri celebration"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-200">
                  Live this season
                </p>
                <p className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                  {featured[0]?.name}
                </p>
                <p className="mt-1 text-sm text-white/80">
                  {featured[0]?.venue} · {featured[0]?.durationLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-100 bg-white">
        <div className="page-container grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {[
            { k: '5', v: 'Live demo events' },
            { k: '₹5.2Cr', v: 'Mock season GMV' },
            { k: '38', v: 'Partner network' },
            { k: '9', v: 'Nights of Navratri' },
          ].map((s) => (
            <div key={s.v} className="text-center sm:text-left">
              <p className="font-display text-2xl font-extrabold text-brand-800 sm:text-3xl">{s.k}</p>
              <p className="mt-1 text-xs font-semibold text-ink-500 sm:text-sm">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">How EventBiz works</h2>
          <p className="mt-2 text-ink-500">
            Public retail + B2B wholesale on the same inventory — so partners never oversell what
            organizers don’t have.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink-100 bg-ink-50/80 py-16">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">Built for every side of the night</h2>
            <p className="mt-2 text-ink-500">
              Use the floating Role Switcher anytime to demo Customer, Partner, Organizer, Gate, or
              Admin views.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-ink-900">{a.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="page-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title">Featured events</h2>
              <p className="mt-1 text-ink-500">
                Ahmedabad Navratri 2025 — open-air, indoor AC, corporate & mega dandiya
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              View all events →
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-16">
        <div className="grid gap-6 overflow-hidden rounded-3xl bg-ink-900 lg:grid-cols-2">
          <div className="px-6 py-10 text-white sm:px-10 sm:py-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Sell tickets as a partner this Navratri
            </h2>
            <p className="mt-3 text-white/70">
              See public vs B2B price, available quantity, and estimated margin before you place a
              demo order. Switch to Partner in the bottom-right widget — no real signup needed.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              <li>· Wholesale tiers from ~₹199–₹9,999 in sample inventory</li>
              <li>· Orders, tickets, customers & earnings charts included</li>
              <li>· Approval status card mirrors the real partner onboarding story</li>
            </ul>
            <Button
              className="mt-6 border-0 bg-white text-ink-900 shadow-sm hover:bg-ink-100 hover:text-ink-950"
              size="lg"
              onClick={() => navigate('/partner/events')}
            >
              Open B2B marketplace
            </Button>
          </div>
          <div className="relative hidden min-h-[240px] lg:block">
            <img
              src="/images/garba-ellisbridge.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900 to-ink-900/20" />
          </div>
        </div>
      </section>
    </div>
  )
}
