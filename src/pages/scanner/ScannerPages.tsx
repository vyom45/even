import { useCallback, useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import {
  CheckCircle2,
  History,
  ScanLine,
  ShieldAlert,
  XCircle,
} from 'lucide-react'
import {
  checkInTicket,
  evaluateTicketForEntry,
  lookupTicketFromScan,
  type ScanLookup,
  api,
} from '../../api/client'
import { useAuth } from '../../auth/useAuth'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { DashboardShell } from '../../layouts/DashboardShell'
import type { EventRecord, ScanResultCode, Ticket } from '../../types/garba'
import { formatINR } from '../../utils/formatters'

const SCANNER_ELEMENT_ID = 'eventbiz-qr-reader'

function resultTone(code: ScanResultCode): 'success' | 'danger' | 'warning' | 'neutral' {
  if (code === 'VALID') return 'success'
  if (code === 'ALREADY_USED') return 'warning'
  if (code === 'NOT_FOUND' || code === 'INVALID' || code === 'CANCELLED') return 'danger'
  return 'neutral'
}

function resultTitle(code: ScanResultCode): string {
  switch (code) {
    case 'VALID':
      return 'Valid pass — allow entry'
    case 'ALREADY_USED':
      return 'Already scanned'
    case 'NOT_SOLD':
      return 'Not sold yet'
    case 'CANCELLED':
      return 'Cancelled pass'
    case 'NOT_FOUND':
      return 'QR not recognized'
    default:
      return 'Invalid pass'
  }
}

function resultIcon(code: ScanResultCode) {
  if (code === 'VALID') return <CheckCircle2 className="h-8 w-8 text-emerald-600" />
  if (code === 'ALREADY_USED') return <ShieldAlert className="h-8 w-8 text-amber-600" />
  return <XCircle className="h-8 w-8 text-red-600" />
}

export function ScannerLayout() {
  return (
    <DashboardShell
      title="Gate Scanner"
      items={[
        { to: '/scanner', label: 'Scan QR', icon: ScanLine },
        { to: '/scanner/history', label: 'History', icon: History },
      ]}
    />
  )
}

export function ScannerHomePage() {
  const { user } = useAuth()
  const [cameraOn, setCameraOn] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [manualCode, setManualCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [lookup, setLookup] = useState<ScanLookup | null>(null)
  const [code, setCode] = useState<ScanResultCode | null>(null)
  const [checkInBusy, setCheckInBusy] = useState(false)
  const [checkInMsg, setCheckInMsg] = useState('')
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const handlingRef = useRef(false)

  const stopCamera = useCallback(async () => {
    const scanner = scannerRef.current
    scannerRef.current = null
    if (!scanner) return
    try {
      if (scanner.isScanning) await scanner.stop()
      await scanner.clear()
    } catch {
      /* already stopped */
    }
    setCameraOn(false)
  }, [])

  const processRaw = useCallback(
    async (raw: string) => {
      if (!raw.trim() || handlingRef.current) return
      handlingRef.current = true
      setLoading(true)
      setCheckInMsg('')
      try {
        await stopCamera()
        const found = await lookupTicketFromScan(raw)
        if (!found) {
          setLookup(null)
          setCode('NOT_FOUND')
          return
        }
        setLookup(found)
        setCode(evaluateTicketForEntry(found.ticket))
      } catch {
        setLookup(null)
        setCode('INVALID')
      } finally {
        setLoading(false)
        handlingRef.current = false
      }
    },
    [stopCamera],
  )

  const startCamera = async () => {
    setCameraError('')
    setCheckInMsg('')
    setLookup(null)
    setCode(null)
    await stopCamera()

    const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID)
    scannerRef.current = scanner
    try {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 8, qrbox: { width: 250, height: 250 } },
        (decoded) => {
          void processRaw(decoded)
        },
        () => undefined,
      )
      setCameraOn(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not open camera'
      setCameraError(
        `${msg}. On phone, allow camera permission — or paste / type the QR code below.`,
      )
      scannerRef.current = null
      try {
        await scanner.clear()
      } catch {
        /* noop */
      }
    }
  }

  useEffect(() => {
    return () => {
      void stopCamera()
    }
  }, [stopCamera])

  const confirmEntry = async () => {
    if (!user || !lookup || code !== 'VALID') return
    setCheckInBusy(true)
    setCheckInMsg('')
    try {
      const result = await checkInTicket(lookup.ticket.id, user.id)
      setLookup({ ...lookup, ticket: result.ticket })
      setCode(result.code)
      setCheckInMsg(
        result.ok
          ? 'Entry confirmed. Pass marked as used.'
          : resultTitle(result.code),
      )
    } catch {
      setCheckInMsg('Could not update ticket. Is the API running?')
    } finally {
      setCheckInBusy(false)
    }
  }

  const reset = () => {
    setLookup(null)
    setCode(null)
    setCheckInMsg('')
    setManualCode('')
  }

  return (
    <div className="mx-auto max-w-lg animate-fade-in space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink-900">Scan pass QR</h1>
        <p className="mt-1 text-sm text-ink-500">
          Point the phone camera at the customer’s ticket QR. Only sold passes can enter — already
          used codes are blocked.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-ink-100 bg-ink-950 shadow-card">
        <div id={SCANNER_ELEMENT_ID} className="min-h-[260px] w-full bg-ink-900" />
        {!cameraOn && (
          <div className="flex flex-col items-center gap-3 px-6 py-10 text-center text-white">
            <ScanLine className="h-10 w-10 text-brand-300" />
            <p className="text-sm text-white/70">Camera is off — start scanning on your phone</p>
            <Button onClick={() => void startCamera()}>Start camera</Button>
          </div>
        )}
      </div>

      {cameraOn && (
        <Button variant="outline" className="w-full" onClick={() => void stopCamera()}>
          Stop camera
        </Button>
      )}

      {cameraError && (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
          {cameraError}
        </p>
      )}

      <form
        className="space-y-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft"
        onSubmit={(e) => {
          e.preventDefault()
          void processRaw(manualCode)
        }}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Manual / paste code</p>
        <Input
          label="Ticket QR payload or code"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          placeholder='Paste JSON or QR-EB-T6'
        />
        <Button type="submit" className="w-full" loading={loading} disabled={!manualCode.trim()}>
          Look up pass
        </Button>
        <p className="text-xs text-ink-400">
          Demo tip: paste <span className="font-mono font-semibold">QR-EB-T6</span> (sold sample
          ticket) or scan from Customer → My tickets.
        </p>
      </form>

      {code && (
        <div
          className={`rounded-3xl border p-5 shadow-card ${
            code === 'VALID'
              ? 'border-emerald-200 bg-emerald-50'
              : code === 'ALREADY_USED'
                ? 'border-amber-200 bg-amber-50'
                : 'border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-start gap-3">
            {resultIcon(code)}
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-bold text-ink-900">{resultTitle(code)}</p>
              <Badge tone={resultTone(code)} className="mt-1 capitalize">
                {code.replace(/_/g, ' ').toLowerCase()}
              </Badge>
            </div>
          </div>

          {lookup && (
            <div className="mt-4 space-y-2 rounded-2xl bg-white/80 p-4 text-sm">
              <Detail label="Event" value={lookup.event.name} />
              <Detail label="Venue" value={lookup.event.venue} />
              <Detail label="When" value={`${lookup.event.date} · ${lookup.event.startTime ?? ''}`} />
              <Detail label="Pass" value={lookup.ticket.lotName ?? lookup.ticket.passLotId} />
              <Detail label="Attendee" value={lookup.ticket.attendeeName ?? '—'} />
              <Detail label="Phone" value={lookup.ticket.attendeePhone ?? '—'} />
              <Detail label="Buyer" value={lookup.buyer?.name ?? lookup.ticket.ownerId} />
              <Detail
                label="Paid"
                value={
                  lookup.ticket.pricePaid != null ? formatINR(lookup.ticket.pricePaid) : '—'
                }
              />
              <Detail label="Order" value={lookup.ticket.orderId ?? '—'} />
              <Detail label="Ticket ID" value={lookup.ticket.id} />
              <Detail label="QR code" value={lookup.ticket.qrCode} />
              {lookup.ticket.checkedInAt && (
                <Detail
                  label="Checked in"
                  value={new Date(lookup.ticket.checkedInAt).toLocaleString()}
                />
              )}
              {(lookup.event.bundleDays?.length ?? 0) > 0 && (
                <div className="pt-2">
                  <p className="mb-1 text-xs font-bold uppercase text-ink-400">9x nights</p>
                  <ul className="max-h-40 space-y-1 overflow-y-auto text-xs text-ink-700">
                    {lookup.event.bundleDays!.map((d) => (
                      <li key={d.day}>
                        D{d.day} {d.date} — {d.venue} ({d.area})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {checkInMsg && (
            <p className="mt-3 text-sm font-semibold text-ink-800">{checkInMsg}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {code === 'VALID' && lookup && (
              <Button loading={checkInBusy} onClick={() => void confirmEntry()}>
                Confirm entry
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                reset()
                void startCamera()
              }}
            >
              Scan next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-ink-50 py-1.5 last:border-0">
      <span className="shrink-0 text-ink-500">{label}</span>
      <span className="text-right font-semibold text-ink-900">{value}</span>
    </div>
  )
}

export function ScannerHistoryPage() {
  const { user } = useAuth()
  const [rows, setRows] = useState<{ ticket: Ticket; event?: EventRecord }[]>([])

  useEffect(() => {
    if (!user) return
    void Promise.all([api.getTickets({ status: 'used' }), api.getEvents()]).then(
      ([tickets, events]) => {
        const mine = tickets
          .filter((t) => t.checkedInBy === user.id)
          .sort((a, b) => (b.checkedInAt ?? '').localeCompare(a.checkedInAt ?? ''))
        setRows(
          mine.map((ticket) => ({
            ticket,
            event: events.find((e) => e.id === ticket.eventId),
          })),
        )
      },
    )
  }, [user])

  return (
    <div className="mx-auto max-w-lg animate-fade-in space-y-4">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink-900">Scan history</h1>
        <p className="mt-1 text-sm text-ink-500">Passes you confirmed at the gate.</p>
      </div>
      <div className="space-y-2">
        {rows.map(({ ticket, event }) => (
          <div
            key={ticket.id}
            className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink-900">{event?.name ?? ticket.eventId}</p>
                <p className="text-sm text-ink-600">{ticket.attendeeName ?? '—'}</p>
                <p className="mt-1 font-mono text-xs text-ink-400">{ticket.qrCode}</p>
              </div>
              <Badge tone="success">Used</Badge>
            </div>
            {ticket.checkedInAt && (
              <p className="mt-2 text-xs text-ink-500">
                {new Date(ticket.checkedInAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-ink-500">No check-ins yet. Scan a sold pass to start.</p>
        )}
      </div>
    </div>
  )
}
