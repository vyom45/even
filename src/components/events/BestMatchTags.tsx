import { MATCH_TAGS, type MatchTagId, resolveMatchTags } from '../../utils/bestMatch'
import { cn } from '../../utils/format'

export function BestMatchTags({
  tags,
  max = 4,
  size = 'sm',
  showHints = false,
  className,
}: {
  tags: MatchTagId[]
  max?: number
  size?: 'sm' | 'md'
  showHints?: boolean
  className?: string
}) {
  const resolved = resolveMatchTags(tags).slice(0, max)
  if (!resolved.length) return null

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {resolved.map((t) => (
        <span
          key={t.id}
          title={t.hint}
          className={cn(
            'inline-flex items-center gap-1 rounded-full font-bold ring-1 ring-inset',
            t.className,
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
          )}
        >
          <span aria-hidden>{t.emoji}</span>
          <span className="uppercase tracking-wide">{t.label}</span>
          {showHints && (
            <span className="hidden font-medium normal-case tracking-normal opacity-70 sm:inline">
              · {t.hint}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

export function BestMatchFilterChips({
  value,
  onChange,
}: {
  value: MatchTagId | 'all'
  onChange: (v: MatchTagId | 'all') => void
}) {
  const chips: { id: MatchTagId | 'all'; label: string; emoji?: string }[] = [
    { id: 'all', label: 'All matches' },
    ...Object.values(MATCH_TAGS).map((t) => ({
      id: t.id as MatchTagId,
      label: t.label,
      emoji: t.emoji,
    })),
  ]

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Best match</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {chips.map((c) => {
          const active = value === c.id
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange(c.id)}
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition',
                active
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'border border-ink-200 bg-white text-ink-600 hover:border-brand-300',
              )}
            >
              {c.emoji ? `${c.emoji} ` : ''}
              {c.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
