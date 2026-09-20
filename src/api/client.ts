import axios from 'axios'
import { API_BASE } from '../utils/constants'
import { uid } from '../utils/formatters'
import { parseTicketQr } from '../utils/ticketQr'
import type {
  EventRecord,
  Order,
  PassLot,
  Place,
  ScanResultCode,
  Ticket,
  Transaction,
  User,
  Wallet,
} from '../types/garba'

export const http = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export async function loginRequest(email: string, _password: string): Promise<User | null> {
  const { data } = await http.get<User[]>('/users', { params: { email } })
  const user = data.find((u) => u.email.toLowerCase() === email.toLowerCase())
  // Demo: skip password check — any click / any password logs in if email exists
  if (!user) return null
  if (!['admin', 'customer', 'scanner'].includes(user.role)) return null
  const { password: _pw, ...safe } = user
  return safe as User
}

export const api = {
  getUsers: () => http.get<User[]>('/users').then((r) => r.data),
  getUser: (id: string) => http.get<User>(`/users/${id}`).then((r) => r.data),
  updateUser: (id: string, patch: Partial<User>) =>
    http.patch<User>(`/users/${id}`, patch).then((r) => r.data),

  getEvents: (params?: Record<string, string>) =>
    http.get<EventRecord[]>('/events', { params }).then((r) => r.data),
  getEvent: (id: string) => http.get<EventRecord>(`/events/${id}`).then((r) => r.data),
  createEvent: (payload: Omit<EventRecord, 'id'> & { id?: string }) =>
    http.post<EventRecord>('/events', { id: uid('e'), ...payload }).then((r) => r.data),
  updateEvent: (id: string, patch: Partial<EventRecord>) =>
    http.patch<EventRecord>(`/events/${id}`, patch).then((r) => r.data),

  getPassLots: (params?: Record<string, string>) =>
    http.get<PassLot[]>('/passLots', { params }).then((r) => r.data),
  getPassLot: (id: string) => http.get<PassLot>(`/passLots/${id}`).then((r) => r.data),
  createPassLot: (payload: Omit<PassLot, 'id'> & { id?: string }) =>
    http.post<PassLot>('/passLots', { id: uid('pl'), ...payload }).then((r) => r.data),
  updatePassLot: (id: string, patch: Partial<PassLot>) =>
    http.patch<PassLot>(`/passLots/${id}`, patch).then((r) => r.data),

  getTickets: (params?: Record<string, string>) =>
    http.get<Ticket[]>('/tickets', { params }).then((r) => r.data),
  getTicket: (id: string) => http.get<Ticket>(`/tickets/${id}`).then((r) => r.data),
  createTicket: (payload: Omit<Ticket, 'id'> & { id?: string }) =>
    http.post<Ticket>('/tickets', { id: uid('t'), ...payload }).then((r) => r.data),
  updateTicket: (id: string, patch: Partial<Ticket>) =>
    http.patch<Ticket>(`/tickets/${id}`, patch).then((r) => r.data),

  getOrders: (params?: Record<string, string>) =>
    http.get<Order[]>('/orders', { params }).then((r) => r.data),
  createOrder: (payload: Omit<Order, 'id'> & { id?: string }) =>
    http.post<Order>('/orders', { id: uid('ord'), ...payload }).then((r) => r.data),

  getTransactions: (params?: Record<string, string>) =>
    http.get<Transaction[]>('/transactions', { params }).then((r) => r.data),
  createTransaction: (payload: Omit<Transaction, 'id'> & { id?: string }) =>
    http.post<Transaction>('/transactions', { id: uid('tx'), ...payload }).then((r) => r.data),

  getWallets: (params?: Record<string, string>) =>
    http.get<Wallet[]>('/wallets', { params }).then((r) => r.data),
  updateWallet: (id: string, patch: Partial<Wallet>) =>
    http.patch<Wallet>(`/wallets/${id}`, patch).then((r) => r.data),

  getPlaces: (params?: Record<string, string>) =>
    http.get<Place[]>('/places', { params }).then((r) => r.data),
  getPlace: (id: string) => http.get<Place>(`/places/${id}`).then((r) => r.data),
}

/** Admin lists qty from a pass lot onto customer Discover. */
export async function listLotForSale(lotId: string, qty: number, adminId: string) {
  const lot = await api.getPassLot(lotId)
  const n = Math.min(qty, lot.remainingQty)
  if (n <= 0) throw new Error('No inventory left in this lot')

  await api.updatePassLot(lot.id, { remainingQty: lot.remainingQty - n })

  const created: Ticket[] = []
  for (let i = 0; i < n; i++) {
    const ticket = await api.createTicket({
      passLotId: lot.id,
      eventId: lot.eventId,
      ownerType: 'admin',
      ownerId: adminId,
      status: 'available',
      qrCode: `QR-${uid('A').toUpperCase()}`,
      soldBy: null,
      soldAt: null,
      pricePaid: null,
      listedForSale: true,
      lotName: lot.name,
    })
    created.push(ticket)
  }
  return { qty: n, created }
}

export interface CheckoutPayload {
  eventId: string
  buyer: User
  quantity: number
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  attendees: { name: string; phone?: string }[]
  paymentMethod: string
  gstInvoice?: boolean
  gstin?: string
  businessName?: string
}

/** Buy N admin-listed passes. */
export async function checkoutPasses(payload: CheckoutPayload) {
  const event = await api.getEvent(payload.eventId)
  const tickets = await api.getTickets({
    eventId: payload.eventId,
    ownerType: 'admin',
    status: 'available',
  })
  const listed = tickets.filter((t) => t.listedForSale)
  if (listed.length < payload.quantity) {
    throw new Error(`Only ${listed.length} pass(es) available right now`)
  }

  const picked = listed.slice(0, payload.quantity)
  const lot = await api.getPassLot(picked[0].passLotId)
  const unit = lot.pricePerPass
  const cost = lot.cost ?? lot.providerPrice ?? 0
  const fee = (event.convenienceFee ?? 29) * payload.quantity
  const subtotal = unit * payload.quantity
  const total = subtotal + fee
  const orderId = uid('ord')

  const ticketIds: string[] = []
  for (let i = 0; i < picked.length; i++) {
    const ticket = picked[i]
    const attendee = payload.attendees[i] ?? payload.attendees[0]
    await api.updateTicket(ticket.id, {
      status: 'sold',
      ownerType: 'customer',
      ownerId: payload.buyer.id,
      soldBy: ticket.ownerId,
      soldAt: new Date().toISOString(),
      pricePaid: unit,
      listedForSale: false,
      attendeeName: attendee?.name,
      attendeePhone: attendee?.phone,
      orderId,
    })
    ticketIds.push(ticket.id)

    const commission = Math.max(0, unit - cost)
    await api.createTransaction({
      ticketId: ticket.id,
      eventId: ticket.eventId,
      orderId,
      sellerId: ticket.ownerId,
      sellerRole: 'admin',
      buyerId: payload.buyer.id,
      amount: unit,
      cost,
      commission,
      timestamp: new Date().toISOString(),
    })

    const wallets = await api.getWallets({ userId: ticket.ownerId })
    if (wallets[0]) {
      await api.updateWallet(wallets[0].id, {
        totalEarned: wallets[0].totalEarned + commission,
        availableBalance: wallets[0].availableBalance + commission,
      })
    }
  }

  const order = await api.createOrder({
    id: orderId,
    eventId: payload.eventId,
    buyerId: payload.buyer.id,
    sellerId: picked[0].ownerId,
    ticketIds,
    quantity: payload.quantity,
    subtotal,
    convenienceFee: fee,
    total,
    paymentMethod: payload.paymentMethod,
    buyerName: payload.buyerName,
    buyerEmail: payload.buyerEmail,
    buyerPhone: payload.buyerPhone,
    attendees: payload.attendees,
    gstInvoice: payload.gstInvoice,
    gstin: payload.gstin,
    businessName: payload.businessName,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  })

  return { order, ticketIds, total }
}

export async function getCustomerFacingEvents() {
  const [events, tickets] = await Promise.all([
    api.getEvents({ status: 'active' }),
    api.getTickets({ ownerType: 'admin', status: 'available' }),
  ])
  const listed = tickets.filter((t) => t.listedForSale)
  const counts = listed.reduce<Record<string, number>>((acc, t) => {
    acc[t.eventId] = (acc[t.eventId] ?? 0) + 1
    return acc
  }, {})
  return events
    .filter((e) => (counts[e.id] ?? 0) > 0)
    .map((e) => ({ ...e, availablePasses: counts[e.id] ?? 0 }))
}

/** Find the individual single-night event for a map venue. */
export async function getVenuePassEvent(placeId: string) {
  const events = await api.getEvents({ status: 'active' })
  const venue = events.find((e) => e.offerType === 'venue' && e.placeId === placeId)
  if (!venue) return null
  const tickets = await api.getTickets({
    eventId: venue.id,
    ownerType: 'admin',
    status: 'available',
  })
  const available = tickets.filter((t) => t.listedForSale).length
  return { event: venue, availablePasses: available }
}

export type ScanLookup = {
  ticket: Ticket
  event: EventRecord
  buyer: User | null
}

export async function lookupTicketFromScan(raw: string): Promise<ScanLookup | null> {
  const parsed = parseTicketQr(raw)
  let ticket: Ticket | undefined

  if (parsed.ticketId) {
    try {
      ticket = await api.getTicket(parsed.ticketId)
    } catch {
      ticket = undefined
    }
  }

  if (!ticket && parsed.qrCode) {
    const list = await api.getTickets({ qrCode: parsed.qrCode })
    ticket = list[0]
  }

  if (!ticket) {
    try {
      ticket = await api.getTicket(raw.trim())
    } catch {
      return null
    }
  }

  const event = await api.getEvent(ticket.eventId)
  let buyer: User | null = null
  if (ticket.ownerType === 'customer' && ticket.ownerId) {
    try {
      buyer = await api.getUser(ticket.ownerId)
    } catch {
      buyer = null
    }
  }

  return { ticket, event, buyer }
}

export function evaluateTicketForEntry(ticket: Ticket): ScanResultCode {
  if (ticket.status === 'used') return 'ALREADY_USED'
  if (ticket.status === 'cancelled') return 'CANCELLED'
  if (ticket.status === 'available') return 'NOT_SOLD'
  if (ticket.status === 'sold') return 'VALID'
  return 'INVALID'
}

export async function checkInTicket(ticketId: string, scannerId: string) {
  const ticket = await api.getTicket(ticketId)
  const code = evaluateTicketForEntry(ticket)
  if (code !== 'VALID') {
    return { ok: false as const, code, ticket }
  }

  const updated = await api.updateTicket(ticketId, {
    status: 'used',
    checkedInAt: new Date().toISOString(),
    checkedInBy: scannerId,
  })

  return { ok: true as const, code: 'VALID' as const, ticket: updated }
}
