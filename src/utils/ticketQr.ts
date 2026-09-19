import type { Ticket } from '../types/garba'

/** Structured payload encoded into each ticket QR for secure gate entry. */
export interface TicketQrPayload {
  v: 1
  ticketId: string
  qrCode: string
  eventId: string
  lotName?: string
  attendeeName?: string
  orderId?: string
}

export function encodeTicketQr(ticket: Ticket): string {
  const payload: TicketQrPayload = {
    v: 1,
    ticketId: ticket.id,
    qrCode: ticket.qrCode,
    eventId: ticket.eventId,
    lotName: ticket.lotName,
    attendeeName: ticket.attendeeName,
    orderId: ticket.orderId,
  }
  return JSON.stringify(payload)
}

export function parseTicketQr(raw: string): { ticketId?: string; qrCode?: string } {
  const trimmed = raw.trim()
  if (!trimmed) return {}

  try {
    const data = JSON.parse(trimmed) as Partial<TicketQrPayload>
    if (data && (data.ticketId || data.qrCode)) {
      return {
        ticketId: typeof data.ticketId === 'string' ? data.ticketId : undefined,
        qrCode: typeof data.qrCode === 'string' ? data.qrCode : undefined,
      }
    }
  } catch {
    /* plain code */
  }

  if (trimmed.startsWith('EVENTBIZ:')) {
    return { ticketId: trimmed.slice('EVENTBIZ:'.length) }
  }

  // Ticket ids look like t6 / t-abc; QR codes look like QR-…
  if (/^t[\w-]+$/i.test(trimmed) && !trimmed.toUpperCase().startsWith('QR-')) {
    return { ticketId: trimmed }
  }

  return { qrCode: trimmed, ticketId: undefined }
}
