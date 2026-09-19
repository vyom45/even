import axios from 'axios'
import { API_BASE } from '../utils/constants'
import { uid } from '../utils/formatters'
import { parseTicketQr } from '../utils/ticketQr'
import { initialDb } from '../data/dbData'
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

const DB_KEY = 'garba_mock_db_store'

function getLocalDb() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  saveLocalDb(initialDb)
  return initialDb
}

function saveLocalDb(data: any) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data))
  } catch {}
}

async function withFallback<T>(
  httpFn: () => Promise<T>,
  fallbackFn: () => T | Promise<T>,
): Promise<T> {
  try {
    return await httpFn()
  } catch {
    return await fallbackFn()
  }
}

export async function loginRequest(email: string, password: string): Promise<User | null> {
  return withFallback(
    async () => {
      const { data } = await http.get<User[]>('/users', { params: { email } })
      const user = data.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!user || user.password !== password) return null
      if (!['admin', 'customer', 'scanner'].includes(user.role)) return null
      const { password: _pw, ...safe } = user
      return safe as User
    },
    () => {
      const db = getLocalDb()
      const user = (db.users || []).find((u: any) => u.email.toLowerCase() === email.toLowerCase())
      if (!user || user.password !== password) return null
      if (!['admin', 'customer', 'scanner'].includes(user.role)) return null
      const { password: _pw, ...safe } = user
      return safe as User
    },
  )
}

export const api = {
  getUsers: () =>
    withFallback(
      () => http.get<User[]>('/users').then((r) => r.data),
      () => getLocalDb().users || [],
    ),

  getUser: (id: string) =>
    withFallback(
      () => http.get<User>(`/users/${id}`).then((r) => r.data),
      () => {
        const u = (getLocalDb().users || []).find((x: User) => x.id === id)
        if (!u) throw new Error('User not found')
        return u
      },
    ),

  updateUser: (id: string, patch: Partial<User>) =>
    withFallback(
      () => http.patch<User>(`/users/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = (db.users || []).findIndex((x: User) => x.id === id)
        if (idx !== -1) {
          db.users[idx] = { ...db.users[idx], ...patch }
          saveLocalDb(db)
          return db.users[idx]
        }
        throw new Error('User not found')
      },
    ),

  getEvents: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<EventRecord[]>('/events', { params }).then((r) => r.data),
      () => {
        let list: EventRecord[] = getLocalDb().events || []
        if (params?.status) list = list.filter((e) => e.status === params.status)
        return list
      },
    ),

  getEvent: (id: string) =>
    withFallback(
      () => http.get<EventRecord>(`/events/${id}`).then((r) => r.data),
      () => {
        const e = (getLocalDb().events || []).find((x: EventRecord) => x.id === id)
        if (!e) throw new Error('Event not found')
        return e
      },
    ),

  createEvent: (payload: Omit<EventRecord, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<EventRecord>('/events', { id: uid('e'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newRecord = { id: uid('e'), ...payload }
        db.events = [...(db.events || []), newRecord]
        saveLocalDb(db)
        return newRecord as EventRecord
      },
    ),

  updateEvent: (id: string, patch: Partial<EventRecord>) =>
    withFallback(
      () => http.patch<EventRecord>(`/events/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = (db.events || []).findIndex((x: EventRecord) => x.id === id)
        if (idx !== -1) {
          db.events[idx] = { ...db.events[idx], ...patch }
          saveLocalDb(db)
          return db.events[idx]
        }
        throw new Error('Event not found')
      },
    ),

  getPassLots: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<PassLot[]>('/passLots', { params }).then((r) => r.data),
      () => {
        let list: PassLot[] = getLocalDb().passLots || []
        if (params?.eventId) list = list.filter((p) => p.eventId === params.eventId)
        return list
      },
    ),

  getPassLot: (id: string) =>
    withFallback(
      () => http.get<PassLot>(`/passLots/${id}`).then((r) => r.data),
      () => {
        const l = (getLocalDb().passLots || []).find((x: PassLot) => x.id === id)
        if (!l) throw new Error('PassLot not found')
        return l
      },
    ),

  createPassLot: (payload: Omit<PassLot, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<PassLot>('/passLots', { id: uid('pl'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newLot = { id: uid('pl'), ...payload }
        db.passLots = [...(db.passLots || []), newLot]
        saveLocalDb(db)
        return newLot as PassLot
      },
    ),

  updatePassLot: (id: string, patch: Partial<PassLot>) =>
    withFallback(
      () => http.patch<PassLot>(`/passLots/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = (db.passLots || []).findIndex((x: PassLot) => x.id === id)
        if (idx !== -1) {
          db.passLots[idx] = { ...db.passLots[idx], ...patch }
          saveLocalDb(db)
          return db.passLots[idx]
        }
        throw new Error('PassLot not found')
      },
    ),

  getTickets: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Ticket[]>('/tickets', { params }).then((r) => r.data),
      () => {
        let list: Ticket[] = getLocalDb().tickets || []
        if (params?.eventId) list = list.filter((t) => t.eventId === params.eventId)
        if (params?.ownerType) list = list.filter((t) => t.ownerType === params.ownerType)
        if (params?.ownerId) list = list.filter((t) => t.ownerId === params.ownerId)
        if (params?.status) list = list.filter((t) => t.status === params.status)
        if (params?.qrCode) list = list.filter((t) => t.qrCode === params.qrCode)
        return list
      },
    ),

  getTicket: (id: string) =>
    withFallback(
      () => http.get<Ticket>(`/tickets/${id}`).then((r) => r.data),
      () => {
        const t = (getLocalDb().tickets || []).find((x: Ticket) => x.id === id)
        if (!t) throw new Error('Ticket not found')
        return t
      },
    ),

  createTicket: (payload: Omit<Ticket, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<Ticket>('/tickets', { id: uid('t'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newTicket = { id: uid('t'), ...payload }
        db.tickets = [...(db.tickets || []), newTicket]
        saveLocalDb(db)
        return newTicket as Ticket
      },
    ),

  updateTicket: (id: string, patch: Partial<Ticket>) =>
    withFallback(
      () => http.patch<Ticket>(`/tickets/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = (db.tickets || []).findIndex((x: Ticket) => x.id === id)
        if (idx !== -1) {
          db.tickets[idx] = { ...db.tickets[idx], ...patch }
          saveLocalDb(db)
          return db.tickets[idx]
        }
        throw new Error('Ticket not found')
      },
    ),

  getOrders: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Order[]>('/orders', { params }).then((r) => r.data),
      () => {
        let list: Order[] = getLocalDb().orders || []
        if (params?.buyerId) list = list.filter((o) => o.buyerId === params.buyerId)
        return list
      },
    ),

  createOrder: (payload: Omit<Order, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<Order>('/orders', { id: uid('ord'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newOrder = { id: uid('ord'), ...payload }
        db.orders = [...(db.orders || []), newOrder]
        saveLocalDb(db)
        return newOrder as Order
      },
    ),

  getTransactions: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Transaction[]>('/transactions', { params }).then((r) => r.data),
      () => {
        let list: Transaction[] = getLocalDb().transactions || []
        if (params?.sellerId) list = list.filter((tx) => tx.sellerId === params.sellerId)
        return list
      },
    ),

  createTransaction: (payload: Omit<Transaction, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<Transaction>('/transactions', { id: uid('tx'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newTx = { id: uid('tx'), ...payload }
        db.transactions = [...(db.transactions || []), newTx]
        saveLocalDb(db)
        return newTx as Transaction
      },
    ),

  getWallets: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Wallet[]>('/wallets', { params }).then((r) => r.data),
      () => {
        let list: Wallet[] = getLocalDb().wallets || []
        if (params?.userId) list = list.filter((w) => w.userId === params.userId)
        return list
      },
    ),

  updateWallet: (id: string, patch: Partial<Wallet>) =>
    withFallback(
      () => http.patch<Wallet>(`/wallets/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = (db.wallets || []).findIndex((x: Wallet) => x.id === id)
        if (idx !== -1) {
          db.wallets[idx] = { ...db.wallets[idx], ...patch }
          saveLocalDb(db)
          return db.wallets[idx]
        }
        throw new Error('Wallet not found')
      },
    ),

  getPlaces: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Place[]>('/places', { params }).then((r) => r.data),
      () => getLocalDb().places || [],
    ),

  getPlace: (id: string) =>
    withFallback(
      () => http.get<Place>(`/places/${id}`).then((r) => r.data),
      () => {
        const p = (getLocalDb().places || []).find((x: Place) => x.id === id)
        if (!p) throw new Error('Place not found')
        return p
      },
    ),
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

  if (!ticket) return null

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
