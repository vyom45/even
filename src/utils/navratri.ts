/** Navratri 2026 — progressive Build your Navratri pricing & nights. */

export const NAVRATRI_START = '2026-10-05'
export const NAVRATRI_END = '2026-10-13'
export const MIN_BUNDLE_NIGHTS = 5
export const MAX_BUNDLE_NIGHTS = 9

export const NAVRATRI_THEMES: Record<string, string> = {
  '2026-10-05': 'Shailaputri Night',
  '2026-10-06': 'Brahmacharini Night',
  '2026-10-07': 'Chandraghanta Night',
  '2026-10-08': 'Kushmanda Night',
  '2026-10-09': 'Skandamata Night',
  '2026-10-10': 'Katyayani Night',
  '2026-10-11': 'Kalaratri Night',
  '2026-10-12': 'Mahagauri Night',
  '2026-10-13': 'Siddhidatri Night',
}

export type NightTier = 'gold' | 'diamond' | 'platinum'

/** Pass tiers offered when assigning a venue (Build step 2). */
export const PASS_TIER_OPTIONS: {
  id: NightTier
  label: string
  emoji: string
  blurb: string
  perks: string[]
  /** Indicative gate add-on vs Gold (for display). */
  fromPrice: number
}[] = [
  {
    id: 'gold',
    label: 'Gold',
    emoji: '🟡',
    blurb: 'Full floor access · classic Garba night',
    perks: ['General ras floor', 'Standard entry window', 'Included in bundle'],
    fromPrice: 0,
  },
  {
    id: 'diamond',
    label: 'Diamond',
    emoji: '💎',
    blurb: 'Better circle · priority entry',
    perks: ['Priority gate', 'Inner circle zone', 'Water station access'],
    fromPrice: 199,
  },
  {
    id: 'platinum',
    label: 'Platinum',
    emoji: '👑',
    blurb: 'VIP lounge · soft seating',
    perks: ['Fast-track entry', 'Soft seating / lounge', 'Complimentary welcome drink'],
    fromPrice: 499,
  },
]

export const NIGHT_TIERS: Record<
  string,
  { tier: NightTier; label: string; emoji: string }
> = {
  '2026-10-05': { tier: 'gold', label: 'Gold', emoji: '🟡' },
  '2026-10-06': { tier: 'diamond', label: 'Diamond', emoji: '💎' },
  '2026-10-07': { tier: 'platinum', label: 'Platinum', emoji: '👑' },
  '2026-10-08': { tier: 'diamond', label: 'Diamond', emoji: '💎' },
  '2026-10-09': { tier: 'gold', label: 'Gold', emoji: '🟡' },
  '2026-10-10': { tier: 'diamond', label: 'Diamond', emoji: '💎' },
  '2026-10-11': { tier: 'gold', label: 'Gold', emoji: '🟡' },
  '2026-10-12': { tier: 'diamond', label: 'Diamond', emoji: '💎' },
  '2026-10-13': { tier: 'platinum', label: 'Platinum', emoji: '👑' },
}

/** Individual gate price if bought night-by-night (shown in basket). */
export const NIGHT_INDIVIDUAL_PRICE: Record<string, number> = {
  '2026-10-05': 699,
  '2026-10-06': 799,
  '2026-10-07': 1199,
  '2026-10-08': 899,
  '2026-10-09': 699,
  '2026-10-10': 999,
  '2026-10-11': 999,
  '2026-10-12': 799,
  '2026-10-13': 1199,
}

/** Headline artist for each night (basket line). */
export const NIGHT_ARTISTS: Record<string, string> = {
  '2026-10-05': 'House Mandli Collective',
  '2026-10-06': 'Bopal Folk Orchestra',
  '2026-10-07': 'DJ Raas + Live Dhol',
  '2026-10-08': 'West Side Mandli',
  '2026-10-09': 'Ognaj Classic Ensemble',
  '2026-10-10': 'GIFT City Night Band',
  '2026-10-11': 'Kalaratri Live Circle',
  '2026-10-12': 'Mahagauri House Band',
  '2026-10-13': 'Siddhidatri Finale Cast',
}

/** EventBiz progressive bundle price by night count. */
export const BUILD_PRICES: Record<number, number> = {
  5: 2499,
  6: 2849,
  7: 3149,
  8: 3399,
  9: 3599,
}

export type BuildNights = 5 | 6 | 7 | 8 | 9

export const BUILD_EVENT_IDS: Record<BuildNights, string> = {
  5: 'e-build-5',
  6: 'e-build-6',
  7: 'e-build-7',
  8: 'e-build-8',
  9: 'e-build-9',
}

export function listNavratriDates(): string[] {
  const out: string[] = []
  const cur = new Date(`${NAVRATRI_START}T12:00:00`)
  const end = new Date(`${NAVRATRI_END}T12:00:00`)
  while (cur <= end) {
    out.push(cur.toISOString().slice(0, 10))
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

export function formatNavratriLabel(iso: string): string {
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function shortNightLabel(iso: string): string {
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export function individualValueFor(dates: string[], tiers?: Partial<Record<string, NightTier>>): number {
  return dates.reduce((sum, d) => {
    const base = NIGHT_INDIVIDUAL_PRICE[d] ?? 799
    const addOn = tiers?.[d] ? tierAddOn(tiers[d]) : 0
    return sum + base + addOn
  }, 0)
}

export function tierAddOn(tier?: NightTier | null): number {
  if (!tier) return 0
  return PASS_TIER_OPTIONS.find((t) => t.id === tier)?.fromPrice ?? 0
}

export function tierAddOnsTotal(
  dates: string[],
  tiers: Partial<Record<string, NightTier>> | Array<NightTier | undefined | null>,
): number {
  if (Array.isArray(tiers)) {
    return tiers.reduce((sum, t) => sum + tierAddOn(t), 0)
  }
  return dates.reduce((sum, d) => sum + tierAddOn(tiers[d]), 0)
}

export function bundlePriceFor(
  nights: number,
  tierAddOns = 0,
): number | null {
  if (nights < MIN_BUNDLE_NIGHTS) return null
  const base = BUILD_PRICES[Math.min(nights, MAX_BUNDLE_NIGHTS)]
  if (base == null) return null
  return base + Math.max(0, tierAddOns)
}

export function savingsForDates(
  dates: string[],
  tiers?: Partial<Record<string, NightTier>>,
): number {
  const addOns = tiers ? tierAddOnsTotal(dates, tiers) : 0
  const bundle = bundlePriceFor(dates.length, addOns)
  if (bundle == null) return 0
  return Math.max(0, individualValueFor(dates, tiers) - bundle)
}

/** Extra ₹ saved vs holding only the first 5 selected (tangible upsell). */
export function extraUnlockSaving(dates: string[]): number {
  if (dates.length <= MIN_BUNDLE_NIGHTS) return 0
  const sorted = [...dates].sort()
  const atFive = sorted.slice(0, MIN_BUNDLE_NIGHTS)
  return savingsForDates(sorted) - savingsForDates(atFive)
}

export function isBuildNights(n: number): n is BuildNights {
  return n >= 5 && n <= 9 && Number.isInteger(n)
}

export function unlockMessage(count: number, extraSave: number): string | null {
  if (count === MIN_BUNDLE_NIGHTS) return '🎉 Bundle unlocked!'
  if (count === 6) return `🔓 You unlocked an extra ${formatRupee(Math.max(extraSave, 150))} saving`
  if (count === 7) return '🔓 Your Navratri is getting better value'
  if (count === 8) return '🔓 Almost full season — keep exploring'
  if (count === MAX_BUNDLE_NIGHTS) return '👑 Full Navratri unlocked'
  return null
}

function formatRupee(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}
