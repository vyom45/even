import { twMerge } from 'tailwind-merge'

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(
    'en-IN',
    opts ?? {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  ).format(new Date(iso))
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return twMerge(parts.filter(Boolean).join(' '))
}

export function delay(ms = 700): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function remainingInventory(cat: {
  totalQuantity: number
  soldPublic: number
  soldB2b: number
}): number {
  return cat.totalQuantity - cat.soldPublic - cat.soldB2b
}

export function eventMinPrice(categories: { publicPrice: number }[]): number {
  return Math.min(...categories.map((c) => c.publicPrice))
}
