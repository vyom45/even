export type Role = 'customer' | 'partner' | 'organizer' | 'gate' | 'admin'

export type EventStatus = 'draft' | 'published' | 'live' | 'ended' | 'cancelled'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'suspended'
export type OrderStatus = 'pending' | 'confirmed' | 'fulfilled' | 'cancelled' | 'refunded'
export type TicketStatus = 'valid' | 'used' | 'cancelled' | 'expired'
export type ScanResult = 'VALID' | 'ALREADY_USED' | 'CANCELLED' | 'INVALID'

export interface TicketCategory {
  id: string
  name: string
  description: string
  perks: string[]
  publicPrice: number
  b2bPrice: number
  totalQuantity: number
  publicAllocation: number
  b2bAllocation: number
  soldPublic: number
  soldB2b: number
}

export interface EventFaq {
  q: string
  a: string
}

export interface ScheduleSlot {
  time: string
  title: string
  detail?: string
}

export interface LineupArtist {
  name: string
  role: string
}

export interface EventItem {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  city: string
  venue: string
  address: string
  area: string
  startsAt: string
  endsAt: string
  gatesOpen: string
  durationLabel: string
  image: string
  coverGradient: string
  category: string
  tags: string[]
  organizerId: string
  organizerName: string
  status: EventStatus
  featured: boolean
  agePolicy: string
  languages: string[]
  highlights: string[]
  amenities: string[]
  lineup: LineupArtist[]
  schedule: ScheduleSlot[]
  gettingThere: string[]
  faqs: EventFaq[]
  terms: string[]
  refundPolicy: string
  categories: TicketCategory[]
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  city: string
  joinedAt: string
  status: 'active' | 'inactive' | 'pending'
}

export interface Partner {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string
  city: string
  approvalStatus: ApprovalStatus
  totalOrders: number
  totalTickets: number
  earnings: number
  joinedAt: string
}

export interface Organizer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  eventsCount: number
  totalSales: number
  status: 'active' | 'pending' | 'suspended'
  joinedAt: string
}

export interface Order {
  id: string
  type: 'public' | 'b2b'
  eventId: string
  eventName: string
  buyerName: string
  partnerId?: string
  categoryName: string
  quantity: number
  unitPrice: number
  total: number
  status: OrderStatus
  createdAt: string
}

export interface Ticket {
  id: string
  code: string
  eventId: string
  eventName: string
  venue: string
  startsAt: string
  categoryName: string
  holderName: string
  holderEmail: string
  status: TicketStatus
  purchasedAt: string
  price: number
  qrPlaceholder: string
}

export interface ScanRecord {
  id: string
  ticketCode: string
  eventName: string
  result: ScanResult
  scannedAt: string
  gate: string
  operator: string
}

export interface Settlement {
  id: string
  eventName: string
  period: string
  grossSales: number
  platformFee: number
  partnerPayout: number
  organizerPayout: number
  status: 'pending' | 'processing' | 'paid'
  settledAt?: string
}

export interface EarningsPoint {
  month: string
  earnings: number
  orders: number
}

export interface SalesPoint {
  day: string
  public: number
  b2b: number
}
