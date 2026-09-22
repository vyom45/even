/** Best Match tags — quick-scan labels for event cards. */

export type MatchTagId =
  | 'artist_pick'
  | 'high_energy'
  | 'traditional'
  | 'premium'
  | 'near_you'
  | 'best_value'
  | 'group_friendly'

export interface MatchTagDef {
  id: MatchTagId
  emoji: string
  label: string
  hint: string
  className: string
}

export const MATCH_TAGS: Record<MatchTagId, MatchTagDef> = {
  artist_pick: {
    id: 'artist_pick',
    emoji: '⭐️',
    label: 'Artist pick',
    hint: 'High artist appeal',
    className: 'bg-amber-50 text-amber-900 ring-amber-200',
  },
  high_energy: {
    id: 'high_energy',
    emoji: '💃',
    label: 'High energy',
    hint: 'DJ + high-energy Garba',
    className: 'bg-fuchsia-50 text-fuchsia-900 ring-fuchsia-200',
  },
  traditional: {
    id: 'traditional',
    emoji: '🪘',
    label: 'Traditional',
    hint: 'Mandli / traditional style',
    className: 'bg-orange-50 text-orange-900 ring-orange-200',
  },
  premium: {
    id: 'premium',
    emoji: '✨',
    label: 'Premium',
    hint: 'Premium venue/experience',
    className: 'bg-violet-50 text-violet-900 ring-violet-200',
  },
  near_you: {
    id: 'near_you',
    emoji: '📍',
    label: 'Near you',
    hint: 'Location advantage',
    className: 'bg-sky-50 text-sky-900 ring-sky-200',
  },
  best_value: {
    id: 'best_value',
    emoji: '💰',
    label: 'Best value',
    hint: 'Strong price-to-experience',
    className: 'bg-emerald-50 text-emerald-900 ring-emerald-200',
  },
  group_friendly: {
    id: 'group_friendly',
    emoji: '👥',
    label: 'Group friendly',
    hint: 'Good for groups',
    className: 'bg-blue-50 text-blue-900 ring-blue-200',
  },
}

export const MATCH_TAG_LIST = Object.values(MATCH_TAGS)

type Matchable = {
  name?: string
  subtitle?: string
  category?: string
  tags?: string[]
  area?: string
  venue?: string
  offerType?: string
  publicPriceFrom?: number
  featured?: boolean
  lineup?: { name: string; role: string }[]
  matchTags?: MatchTagId[]
  amenities?: string[]
  shortDescription?: string
  description?: string
}

function haystack(e: Matchable): string {
  return [
    e.name,
    e.subtitle,
    e.category,
    e.venue,
    e.area,
    e.shortDescription,
    e.description,
    ...(e.tags ?? []),
    ...(e.amenities ?? []),
    ...(e.lineup ?? []).map((l) => `${l.name} ${l.role}`),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

/** Derive Best Match tags from event content + optional “near you” area. */
export function deriveMatchTags(
  event: Matchable,
  opts?: { nearArea?: string | null; priceMedian?: number },
): MatchTagId[] {
  if (event.matchTags?.length) {
    const base = [...event.matchTags]
    if (
      opts?.nearArea &&
      opts.nearArea !== 'all' &&
      event.area &&
      event.area.toLowerCase() === opts.nearArea.toLowerCase() &&
      !base.includes('near_you')
    ) {
      base.unshift('near_you')
    }
    return base.slice(0, 4)
  }

  const text = haystack(event)
  const tags: MatchTagId[] = []
  const push = (id: MatchTagId) => {
    if (!tags.includes(id)) tags.push(id)
  }

  if (event.featured || (event.lineup && event.lineup.length > 0) || /artist|star|headline|falguni|osman/.test(text)) {
    push('artist_pick')
  }
  if (/dj|high.?energy|royale|party|concert|dandiya|mega|club|edm/.test(text)) {
    push('high_energy')
  }
  if (/mandli|traditional|classic|dholki|folk|aarti/.test(text)) {
    push('traditional')
  }
  if (/premium|gift city|swarnim|lounge|vip|luxury|platinum/.test(text)) {
    push('premium')
  }
  if (
    /family|group|corporate|friends|batch|society/.test(text) ||
    event.category === 'Family' ||
    event.offerType === 'bundle9x'
  ) {
    push('group_friendly')
  }

  const price = event.publicPriceFrom ?? 0
  const median = opts?.priceMedian ?? (event.offerType === 'bundle9x' ? 4200 : 799)
  if (price > 0 && price <= median * 0.92) push('best_value')
  if (event.offerType === 'customBundle') push('best_value')

  if (
    opts?.nearArea &&
    opts.nearArea !== 'all' &&
    event.area &&
    event.area.toLowerCase() === opts.nearArea.toLowerCase()
  ) {
    push('near_you')
  }

  // Ensure every card has at least 2 scannable tags
  if (tags.length === 0) push('traditional')
  if (tags.length === 1 && event.offerType === 'venue') push('group_friendly')

  return tags.slice(0, 4)
}

export function resolveMatchTags(ids: MatchTagId[]): MatchTagDef[] {
  return ids.map((id) => MATCH_TAGS[id]).filter(Boolean)
}
