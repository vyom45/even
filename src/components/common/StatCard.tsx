import type { ReactNode } from 'react'
import { cn } from '../../utils/format'

export function StatCard({
  label,
  value,
  hint,
  icon,
  trend,
  className,
}: {
  label: string
  value: string
  hint?: string
  icon?: ReactNode
  trend?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink-500">{label}</p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
          {trend && <p className="mt-2 text-xs font-semibold text-emerald-600">{trend}</p>}
        </div>
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
