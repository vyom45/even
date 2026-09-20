import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Place } from '../../types/garba'
import { cn } from '../../utils/format'

const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function FlyTo({ place }: { place: Place | null }) {
  const map = useMap()
  useEffect(() => {
    if (!place?.lat || !place?.lng) return
    map.flyTo([place.lat, place.lng], 14, { duration: 0.8 })
  }, [place, map])
  return null
}

export function NavratriMap({
  places,
  selectedId,
  onSelect,
  className,
  height = 420,
}: {
  places: Place[]
  selectedId?: string | null
  onSelect?: (place: Place) => void
  className?: string
  height?: number
}) {
  const [basemap, setBasemap] = useState<'streets' | 'satellite'>('streets')
  const withCoords = useMemo(
    () => places.filter((p) => typeof p.lat === 'number' && typeof p.lng === 'number'),
    [places],
  )
  const selected = withCoords.find((p) => p.id === selectedId) ?? null
  const center = useMemo((): [number, number] => {
    if (selected) return [selected.lat!, selected.lng!]
    if (withCoords[0]) return [withCoords[0].lat!, withCoords[0].lng!]
    return [23.05, 72.55]
  }, [selected, withCoords])

  if (withCoords.length === 0) {
    return (
      <div className={cn('flex items-center justify-center rounded-2xl bg-ink-100 text-sm text-ink-500', className)} style={{ height }}>
        Map loading…
      </div>
    )
  }

  return (
    <div className={cn('relative z-0 isolate overflow-hidden rounded-2xl border border-ink-100 shadow-soft', className)}>
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-ink-100 bg-white px-3 py-2">
        <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
          Navratri map · {withCoords.length} venues
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setBasemap('satellite')}
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-semibold',
              basemap === 'satellite' ? 'bg-brand-700 text-white' : 'bg-ink-50 text-ink-600',
            )}
          >
            Drone / satellite
          </button>
          <button
            type="button"
            onClick={() => setBasemap('streets')}
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-semibold',
              basemap === 'streets' ? 'bg-brand-700 text-white' : 'bg-ink-50 text-ink-600',
            )}
          >
            Streets
          </button>
        </div>
      </div>
      <div className="relative z-0">
        <MapContainer center={center} zoom={11} style={{ height, width: '100%' }} scrollWheelZoom>
          {basemap === 'satellite' ? (
            <TileLayer
              attribution='Tiles &copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}
          <FlyTo place={selected} />
          {withCoords.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat!, p.lng!]}
              icon={p.id === selectedId ? activeIcon : pinIcon}
              eventHandlers={{
                click: () => onSelect?.(p),
              }}
            >
              <Popup>
                <div className="min-w-[160px]">
                  <p className="font-bold text-sm">{p.name}</p>
                  <p className="text-xs text-slate-600 mt-1">{p.address}</p>
                  {p.image && (
                    <img src={p.image} alt="" className="mt-2 h-20 w-full rounded object-cover" />
                  )}
                  <p className="mt-1 text-[10px] text-slate-500">Map pin = venue location</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
