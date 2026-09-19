import { cn } from '../../utils/format'

const tones: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
  danger: 'bg-red-50 text-red-700 ring-red-200',
  info: 'bg-sky-50 text-sky-700 ring-sky-200',
  neutral: 'bg-ink-100 text-ink-700 ring-ink-200',
  brand: 'bg-brand-50 text-brand-800 ring-brand-200',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function statusTone(status: string): keyof typeof tones {
  const s = status.toLowerCase()
  if (['valid', 'approved', 'paid', 'confirmed', 'fulfilled', 'active', 'published', 'live', 'success'].includes(s))
    return 'success'
  if (['pending', 'processing', 'draft'].includes(s)) return 'warning'
  if (['cancelled', 'canceled', 'rejected', 'suspended', 'expired', 'used', 'already_used', 'danger'].includes(s))
    return 'danger'
  if (['ended'].includes(s)) return 'neutral'
  return 'info'
}
