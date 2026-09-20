import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { LogOut, Ticket } from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { Button } from '../components/ui/Button'
import { ROLE_LABELS, type Role } from '../utils/constants'
import { cn } from '../utils/format'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export function DashboardShell({
  title,
  items,
}: {
  title: string
  items: NavItem[]
}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <header className="sticky top-0 z-[1100] border-b border-ink-100 bg-white/95 backdrop-blur">
        <div className="page-container flex h-14 items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white">
              <Ticket className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-extrabold leading-none text-ink-900">
                Event<span className="text-brand-700">Biz</span>
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">
                {title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-ink-800">{user?.name}</p>
              <p className="text-[11px] text-ink-500">
                {user ? ROLE_LABELS[user.role as Role] : ''}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LogOut className="h-3.5 w-3.5" />}
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="page-container flex flex-1 gap-6 py-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-20 space-y-1 rounded-2xl border border-ink-100 bg-white p-3 shadow-soft">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                      isActive
                        ? 'bg-brand-700 text-white'
                        : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold',
                      isActive
                        ? 'border-brand-600 bg-brand-50 text-brand-800'
                        : 'border-ink-200 bg-white text-ink-600',
                    )
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
