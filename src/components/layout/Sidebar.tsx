import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/format'

export interface SidebarItem {
  to: string
  label: string
  icon: LucideIcon
}

export function Sidebar({ items, title }: { items: SidebarItem[]; title: string }) {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-20 space-y-1 rounded-2xl border border-ink-100 bg-white p-3 shadow-soft">
        <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-ink-400">
          {title}
        </p>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.split('/').length <= 3}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                  isActive
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}

export function MobileNavStrip({ items }: { items: SidebarItem[] }) {
  return (
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
  )
}
