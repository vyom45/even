import type { Role } from '../utils/constants'

export interface User {
  id: string
  name: string
  email: string
  password?: string
  role: Role
  phone?: string
  city?: string
  status?: string
  businessName?: string
  gstin?: string
  address?: string
  upiId?: string
  bankAccount?: string
  about?: string
  avatarColor?: string
}

export interface EventRecord {
  id: string
  name: string
  subtitle?: string
  adminId: string
  date: string
  endDate?: string
  startTime?: string
  endTime?: string
  gatesOpen?: string
  venue: string
  address?: string
  city: string
  area?: string
  landmark?: string
  status: 'draft' | 'active' | 'sold_out' | 'ended' | string
  image: string
  gallery?: string[]
  shortDescription: string
  description: string
  category: string
  tags?: string[]
  languages?: string[]
  ageLimit?: string
  durationLabel?: string
  dressCode?: string
  highlights?: string[]
  amenities?: string[]
  lineup?: { name: string; role: string }[]
  schedule?: { time: string; title: string; detail?: string }[]
  terms?: string[]
  refundPolicy?: string
  faqs?: { q: string; a: string }[]
  convenienceFee?: number
  publicPriceFrom: number
  featured?: boolean
  offerType?: 'single' | 'bundle9x' | string
  nights?: number
  bundleDays?: BundleDay[]
}

export interface BundleDay {
  day: number
  date: string
  placeId: string
  venue: string
  area: string
  address: string
  landmark?: string
  lat?: number
  lng?: number
  theme?: string
  dressHint?: string
  startTime: string
  endTime: string
  gatesOpen?: string
  image?: string
  highlights?: string[]
  note?: string
}

export interface Place {
  id: string
  name: string
  city: string
  area: string
  address: string
  landmark?: string
  /** Navratri / Garba festival photo for cards */
  image: string
  gallery?: string[]
  /** Optional satellite crop — only for map detail panel */
  mapImage?: string
  lat?: number
  lng?: number
  tags?: string[]
  capacityHint?: number
  parking?: boolean
  metroNearby?: boolean
  photoStyle?: string
}

export interface PassLot {
  id: string
  eventId: string
  adminId: string
  name: string
  description?: string
  perks?: string[]
  totalQty: number
  remainingQty: number
  pricePerPass: number
  /** Unit cost / wholesale basis for margin reports */
  cost?: number
  /** @deprecated use cost */
  providerPrice?: number
  maxPerOrder?: number
  saleStartsAt?: string
  saleEndsAt?: string
  createdAt: string
  status: string
  isBundle?: boolean
  bundleNights?: number
}

export interface Ticket {
  id: string
  passLotId: string
  eventId: string
  ownerType: 'customer' | 'admin'
  ownerId: string
  status: 'available' | 'sold' | 'used' | 'cancelled'
  qrCode: string
  soldBy: string | null
  soldAt: string | null
  pricePaid: number | null
  listedForSale: boolean
  lotName?: string
  attendeeName?: string
  attendeePhone?: string
  orderId?: string
  checkedInAt?: string | null
  checkedInBy?: string | null
}

export type ScanResultCode = 'VALID' | 'ALREADY_USED' | 'NOT_SOLD' | 'CANCELLED' | 'INVALID' | 'NOT_FOUND'

export interface Order {
  id: string
  eventId: string
  buyerId: string
  sellerId: string
  /** @deprecated use sellerId */
  providerId?: string
  ticketIds: string[]
  quantity: number
  subtotal: number
  convenienceFee: number
  total: number
  paymentMethod: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  attendees: { name: string; phone?: string }[]
  gstInvoice?: boolean
  gstin?: string
  businessName?: string
  status: 'confirmed' | 'cancelled'
  createdAt: string
}

export interface Transaction {
  id: string
  ticketId: string
  eventId: string
  orderId?: string
  sellerId: string
  sellerRole: string
  buyerId: string
  amount: number
  cost: number
  commission: number
  timestamp: string
}

export interface Wallet {
  id: string
  userId: string
  role: string
  totalEarned: number
  totalOwed: number
  availableBalance: number
  lastPayoutAt: string | null
}
