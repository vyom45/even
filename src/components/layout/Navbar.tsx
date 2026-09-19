import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Ticket, X } from 'lucide-react'
import { useRole, roleHome } from '../../contexts/RoleContext'
import type { Role } from '../../types'
import { Button } from '../ui/Button'
import { cn } from '../../utils/format'

const publicLinks = [
  { to: '/events', label: 'Events' },
  { to: '/account/tickets', label: 'My Tickets' },
]

const roleLinks: Record<Role, { to: string; label: string }[]> = {
  customer: publicLinks,
  partner: [
    { to: '/partner/dashboard', label: 'Dashboard' },
    { to: '/partner/events', label: 'Marketplace' },
    { to: '/partner/orders', label: 'Orders' },
    { to: '/partner/earnings', label: 'Earnings' },
  ],
  organizer: [
    { to: '/organizer/dashboard', label: 'Dashboard' },
    { to: '/organizer/events', label: 'Events' },
    { to: '/organizer/settlements', label: 'Settlements' },
  ],
  gate: [
    { to: '/gate/scanner', label: 'Scanner' },
    { to: '/gate/history', label: 'History' },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/events', label: 'Events' },
    { to: '/admin/partners', label: 'Partners' },
    { to: '/admin/orders', label: 'Orders' },
  ],
}

export function Navbar() {
  const { role, isAuthenticated, setAuthenticated } = useRole()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const links = roleLinks[role]

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-white/85 backdrop-blur-md">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Link to={roleHome[role]} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm">
            <Ticket className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink-900">
            Event<span className="text-brand-700">Biz</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-semibold transition',
                  isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/account')}>
                Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAuthenticated(false)
                  navigate('/')
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Get started
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-white px-4 py-3 md:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2.5 text-sm font-semibold',
                    isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-700',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2 border-t border-ink-100 pt-3">
              {isAuthenticated ? (
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => {
                    setOpen(false)
                    navigate('/account')
                  }}
                >
                  Account
                </Button>
              ) : (
                <>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => {
                      setOpen(false)
                      navigate('/login')
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setOpen(false)
                      navigate('/register')
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
