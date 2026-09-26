import axios from 'axios'
import { API_BASE } from '../utils/constants'
import { uid } from '../utils/formatters'
import { parseTicketQr } from '../utils/ticketQr'
import { dbData } from '../data/dbData'
import type {
  BundleDay,
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
  timeout: 3000,
})

const STORAGE_KEY = 'eventbiz_inmemory_db_v1'

function getLocalDb() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore
  }
  const clone = JSON.parse(JSON.stringify(dbData))
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clone))
  } catch {
    // ignore
  }
  return clone
}

function saveLocalDb(db: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch {
    // ignore
  }
}

function filterList<T extends Record<string, any>>(list: T[], params?: Record<string, string>): T[] {
  if (!params || Object.keys(params).length === 0) return list
  return list.filter((item) =>
    Object.entries(params).every(([k, v]) => String(item[k]) === String(v))
  )
}

async function withFallback<T>(httpFn: () => Promise<T>, fallbackFn: () => T | Promise<T>): Promise<T> {
  try {
    return await httpFn()
  } catch {
    return await fallbackFn()
  }
}

export async function loginRequest(email: string, _password: string): Promise<User | null> {
  return withFallback(
    async () => {
      const { data } = await http.get<User[]>('/users', { params: { email } })
      const user = data.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!user) return null
      if (!['admin', 'customer', 'scanner'].includes(user.role)) return null
      const { password: _pw, ...safe } = user
      return safe as User
    },
    () => {
      const db = getLocalDb()
      const user = (db.users as User[]).find((u: any) => u.email.toLowerCase() === email.toLowerCase())
      if (!user) return null
      if (!['admin', 'customer', 'scanner'].includes(user.role)) return null
      const { password: _pw, ...safe } = user
      return safe as User
    }
  )
}

export const api = {
  getUsers: () =>
    withFallback(
      () => http.get<User[]>('/users').then((r) => r.data),
      () => getLocalDb().users
    ),
  getUser: (id: string) =>
    withFallback(
      () => http.get<User>(`/users/${id}`).then((r) => r.data),
      () => {
        const item = getLocalDb().users.find((u: any) => u.id === id)
        if (!item) throw new Error('User not found')
        return item
      }
    ),
  updateUser: (id: string, patch: Partial<User>) =>
    withFallback(
      () => http.patch<User>(`/users/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = db.users.findIndex((u: any) => u.id === id)
        if (idx !== -1) {
          db.users[idx] = { ...db.users[idx], ...patch }
          saveLocalDb(db)
          return db.users[idx]
        }
        throw new Error('User not found')
      }
    ),

  getEvents: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<EventRecord[]>('/events', { params }).then((r) => r.data),
      () => filterList(getLocalDb().events, params)
    ),
  getEvent: (id: string) =>
    withFallback(
      () => http.get<EventRecord>(`/events/${id}`).then((r) => r.data),
      () => {
        const item = getLocalDb().events.find((e: any) => e.id === id)
        if (item) return item
        if (id.startsWith('e-build-')) {
          const count = Number(id.replace('e-build-', '')) || 5
          return {
            id,
            name: `Custom Navratri ${count}-Night Garba Bundle`,
            subtitle: `${count} selected venues across Ahmedabad`,
            adminId: 'u-admin',
            date: '2026-10-05',
            endDate: '2026-10-13',
            startTime: '19:00',
            endTime: '00:30',
            gatesOpen: '18:00',
            venue: 'Multiple Selected Venues',
            address: 'Various venues across Ahmedabad',
            city: 'Ahmedabad',
            area: 'All Circuits',
            landmark: 'Selected Venues',
            category: 'Bundle',
            description: 'Customized multi-night Navratri Garba experience built by customer.',
            terms: ['Valid only for selected dates & venues', 'Non-transferable entry QR code', 'Original ID required at gates'],
            refundPolicy: 'No refunds once pass is issued.',
            image: '/images/bundles/classic-9x.jpg',
            publicPriceFrom: 2499,
            cost: 1500,
            providerPrice: 1500,
            convenienceFee: 29,
            status: 'active',
            offerType: 'bundle9x',
            featured: true,
          } as EventRecord
        }
        throw new Error('Event not found')
      }
    ),
  createEvent: (payload: Omit<EventRecord, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<EventRecord>('/events', { id: uid('e'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newItem = { id: uid('e'), ...payload }
        db.events.push(newItem)
        saveLocalDb(db)
        return newItem
      }
    ),
  updateEvent: (id: string, patch: Partial<EventRecord>) =>
    withFallback(
      () => http.patch<EventRecord>(`/events/${id}`).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = db.events.findIndex((e: any) => e.id === id)
        if (idx !== -1) {
          db.events[idx] = { ...db.events[idx], ...patch }
          saveLocalDb(db)
          return db.events[idx]
        }
        throw new Error('Event not found')
      }
    ),

  getPassLots: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<PassLot[]>('/passLots', { params }).then((r) => r.data),
      () => {
        const list = filterList(getLocalDb().passLots, params)
        if (list.length === 0 && params?.eventId?.startsWith('e-build-')) {
          return [
            {
              id: `pl-${params.eventId}`,
              eventId: params.eventId,
              name: 'Custom Bundle Pass Lot',
              totalQty: 100,
              remainingQty: 50,
              pricePerPass: 2499,
              cost: 1500,
              providerPrice: 1500,
              adminId: 'u-admin',
              createdAt: new Date().toISOString(),
            },
          ] as PassLot[]
        }
        return list
      }
    ),
  getPassLot: (id: string) =>
    withFallback(
      () => http.get<PassLot>(`/passLots/${id}`).then((r) => r.data),
      () => {
        const item = getLocalDb().passLots.find((p: any) => p.id === id)
        if (item) return item
        if (id.startsWith('pl-e-build-')) {
          return {
            id,
            eventId: id.replace('pl-', ''),
            name: 'Custom Bundle Pass Lot',
            totalQty: 100,
            remainingQty: 50,
            pricePerPass: 2499,
            cost: 1500,
            providerPrice: 1500,
            adminId: 'u-admin',
            createdAt: new Date().toISOString(),
          } as PassLot
        }
        throw new Error('PassLot not found')
      }
    ),
  createPassLot: (payload: Omit<PassLot, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<PassLot>('/passLots', { id: uid('pl'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newItem = { id: uid('pl'), ...payload }
        db.passLots.push(newItem)
        saveLocalDb(db)
        return newItem
      }
    ),
  updatePassLot: (id: string, patch: Partial<PassLot>) =>
    withFallback(
      () => http.patch<PassLot>(`/passLots/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = db.passLots.findIndex((p: any) => p.id === id)
        if (idx !== -1) {
          db.passLots[idx] = { ...db.passLots[idx], ...patch }
          saveLocalDb(db)
          return db.passLots[idx]
        }
        throw new Error('PassLot not found')
      }
    ),

  getTickets: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Ticket[]>('/tickets', { params }).then((r) => r.data),
      () => {
        const list = filterList(getLocalDb().tickets, params)
        if (list.length === 0 && params?.eventId?.startsWith('e-build-')) {
          return Array.from({ length: 10 }, (_, i) => ({
            id: `t-${params.eventId}-${i + 1}`,
            passLotId: `pl-${params.eventId}`,
            eventId: params.eventId,
            ownerType: 'admin',
            ownerId: 'u-admin',
            status: 'available',
            qrCode: `QR-${params.eventId.toUpperCase()}-${i + 1}`,
            soldBy: null,
            soldAt: null,
            pricePaid: null,
            listedForSale: true,
            lotName: 'Custom Bundle Pass',
          })) as Ticket[]
        }
        return list
      }
    ),
  getTicket: (id: string) =>
    withFallback(
      () => http.get<Ticket>(`/tickets/${id}`).then((r) => r.data),
      () => {
        const item = getLocalDb().tickets.find((t: any) => t.id === id)
        if (!item) throw new Error('Ticket not found')
        return item
      }
    ),
  createTicket: (payload: Omit<Ticket, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<Ticket>('/tickets', { id: uid('t'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newItem = { id: uid('t'), ...payload }
        db.tickets.push(newItem)
        saveLocalDb(db)
        return newItem
      }
    ),
  updateTicket: (id: string, patch: Partial<Ticket>) =>
    withFallback(
      () => http.patch<Ticket>(`/tickets/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = db.tickets.findIndex((t: any) => t.id === id)
        if (idx !== -1) {
          db.tickets[idx] = { ...db.tickets[idx], ...patch }
          saveLocalDb(db)
          return db.tickets[idx]
        }
        throw new Error('Ticket not found')
      }
    ),

  getOrders: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Order[]>('/orders', { params }).then((r) => r.data),
      () => filterList(getLocalDb().orders, params)
    ),
  getOrder: (id: string) =>
    withFallback(
      () => http.get<Order>(`/orders/${id}`).then((r) => r.data),
      () => {
        const item = getLocalDb().orders.find((o: any) => o.id === id)
        if (!item) throw new Error('Order not found')
        return item
      }
    ),
  createOrder: (payload: Omit<Order, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<Order>('/orders', { id: uid('ord'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newItem = { id: uid('ord'), ...payload }
        db.orders.push(newItem)
        saveLocalDb(db)
        return newItem
      }
    ),

  getTransactions: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Transaction[]>('/transactions', { params }).then((r) => r.data),
      () => filterList(getLocalDb().transactions, params)
    ),
  createTransaction: (payload: Omit<Transaction, 'id'> & { id?: string }) =>
    withFallback(
      () => http.post<Transaction>('/transactions', { id: uid('tx'), ...payload }).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const newItem = { id: uid('tx'), ...payload }
        db.transactions.push(newItem)
        saveLocalDb(db)
        return newItem
      }
    ),

  getWallets: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Wallet[]>('/wallets', { params }).then((r) => r.data),
      () => filterList(getLocalDb().wallets, params)
    ),
  updateWallet: (id: string, patch: Partial<Wallet>) =>
    withFallback(
      () => http.patch<Wallet>(`/wallets/${id}`, patch).then((r) => r.data),
      () => {
        const db = getLocalDb()
        const idx = db.wallets.findIndex((w: any) => w.id === id)
        if (idx !== -1) {
          db.wallets[idx] = { ...db.wallets[idx], ...patch }
          saveLocalDb(db)
          return db.wallets[idx]
        }
        throw new Error('Wallet not found')
      }
    ),

  getPlaces: (params?: Record<string, string>) =>
    withFallback(
      () => http.get<Place[]>('/places', { params }).then((r) => r.data),
      () => filterList(getLocalDb().places, params)
    ),
  getPlace: (id: string) =>
    withFallback(
      () => http.get<Place>(`/places/${id}`).then((r) => r.data),
      () => {
        const item = getLocalDb().places.find((p: any) => p.id === id)
        if (!item) throw new Error('Place not found')
        return item
      }
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
  customBundleDays?: BundleDay[]
  customNights?: number
  unitPrice?: number
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
  const unit = payload.unitPrice ?? lot.pricePerPass
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
    ...(payload.customBundleDays?.length
      ? {
          customBundleDays: payload.customBundleDays,
          customNights: payload.customNights ?? payload.customBundleDays.length,
        }
      : {}),
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
    .filter((e) => e.offerType !== 'bundle9x')
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
