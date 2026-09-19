/**
 * Seed 50 real Ahmedabad/Gandhinagar Garba venues + aerial images + update 9x days
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dbPath = path.join(root, 'db.json')
const venueDir = path.join(root, 'public', 'images', 'venues')

const RAW = [
  ['Mandavadi – Garba & Mandli', 'Nidhivan Party Plot, Ognaj Circle, Ahmedabad', 23.1025, 72.481],
  ['Mandalam Garba', 'VIP Road, Bopal, Ahmedabad', 23.032, 72.465],
  ['Dholki Garba – The Premium Mandli', 'Ognaj–Bhadaj, Ahmedabad', 23.095, 72.475],
  ['Maa Ni Mandvi', 'Opp. LK Farm Road, Ahmedabad', 23.088, 72.492],
  ['Ghammardi – Garba & Mandli', 'Khodiyar, Ahmedabad', 23.138, 72.538],
  ['Radhevan – The Mandli Garba', 'S.P. Ring Road, Bopal, Ahmedabad', 23.028, 72.458],
  ['Swarnim Nagari Garba', 'LJ University Road, Makarba, Ahmedabad', 22.992, 72.498],
  ['Divi Garba', 'Master Farm, Khodiyar, Ahmedabad', 23.142, 72.545],
  ['Maavdee', 'RM Patel Farm, SG Highway, Ahmedabad', 23.055, 72.508],
  ['Radhe Raas Garba & Mandli', 'Vivianna Farm, Ahmedabad', 23.078, 72.488],
  ['RaasRatri', 'Oreva Farm, Ahmedabad', 23.07, 72.5],
  ['SAIBO Navratri Garba', 'Mahendra Farm, Shilaj, Ahmedabad', 23.068, 72.478],
  ['Prachin Mandli Garba', 'Aagman Farm, Ahmedabad', 23.085, 72.505],
  ['Aangan – The Mandali Garba', 'Arrissto Club & Resort, Ahmedabad', 23.06, 72.49],
  ['Raaton Ni Rassleela', 'Evergreen Party Plot, Bhadaj, Ahmedabad', 23.098, 72.468],
  ['Karnavati No Sanedo', 'Aagaman Party Plot & Resort, Ahmedabad', 23.082, 72.51],
  ['Mirchi Rock N Dhol', 'Aman/Akash Party Plot, Ahmedabad', 23.045, 72.52],
  ['Sheri Garba', 'Aarav Farm, Ahmedabad', 23.05, 72.495],
  ['PYC Navratri', 'M K Farm House, Bhadaj, Ahmedabad', 23.1, 72.47],
  ['Aadyaraas Garba', 'Sankus Farm, Bopal, Ahmedabad', 23.025, 72.462],
  ['Vrindavan Nagari', 'Shubh Farm, Makarba, Ahmedabad', 22.995, 72.505],
  ['Night Zero Garba', 'Evergreen Party Plot, Bhadaj, Ahmedabad', 23.099, 72.469],
  ['Navli Ratri', 'Shree Ganesh Tilak Farm, Ahmedabad', 23.075, 72.515],
  ['Sacred Raas', 'Sacred Raas Ground, Ahmedabad', 23.04, 72.53],
  ['Vibe With The Night', 'Ahmedabad', 23.035, 72.55],
  ['Sachi Navratri AC Dome Garba', 'Ahmedabad', 23.022, 72.54],
  ['AadhyaShakti Garba Prasang', 'SG Highway / Chanakyapuri, Ahmedabad', 23.048, 72.512],
  ["La Regal's Shubhaarambh", 'Shree Hari Party Plot, Ahmedabad', 23.065, 72.525],
  ['Pankhida – Root of Raas', 'Shree Hari Party Plot, Ahmedabad', 23.066, 72.526],
  ['The Garba Experience with Kinjal Dave', 'Vivenza by Gopi Farm, Ahmedabad', 23.09, 72.495],
  ['JashnRatri', 'Pleasant Party Plot, Ahmedabad', 23.058, 72.535],
  ['Sheri Circle Garba', 'Ahmedabad', 23.03, 72.56],
  ['Parampara Navratri', 'Ahmedabad', 23.015, 72.545],
  ['Inner Circle Garba', 'Ahmedabad', 23.042, 72.558],
  ['Sach Raatri Navratri', 'Tathastu Party Plot, Ahmedabad', 23.072, 72.532],
  ['Krishnamay Raas', 'Milan Farm, Ahmedabad', 23.08, 72.518],
  ['Nagri Na Norta', 'Club Babylon, Ahmedabad', 23.038, 72.505],
  ['Haalo Garba', 'Dwarkesh Farm, Rancharda, Ahmedabad', 23.115, 72.455],
  ['Navratri Nights', 'Sindhu Bhavan, Ahmedabad', 23.0455, 72.528],
  ['Vibrant Navratri Festival', 'GMDC Ground, Memnagar, Ahmedabad', 23.045, 72.538],
  ['Garba City Navratri', 'North Gate, GIFT City, Gandhinagar', 23.162, 72.682],
  ['GIFT City Garba Ground', 'GIFT City, Gandhinagar', 23.158, 72.685],
  ['Garba Ni Ramjhat & Premium Mandli', 'Madhav Party Lawns, Santej/Gandhinagar', 23.145, 72.655],
  ['Thanganat Garba Club', 'Sector 6, Gandhinagar', 23.223, 72.645],
  ['Garba Navratri Ground', 'Sector 2B, Gandhinagar', 23.215, 72.638],
  ['Garba Ground', 'Sector 22, Gandhinagar', 23.235, 72.655],
  ['Mandli Garba 2025 / Pushpakunj Farm', 'Rancharda, Ahmedabad', 23.112, 72.452],
  ['Premium Mandli & Garbani Ramjhat', 'Super City Road, Ahmedabad', 23.108, 72.498],
  ['Premium Mandvi', 'Near Bhat Circle, Enasan, Ahmedabad', 23.125, 72.575],
  ['Mandli Garba', 'Ahmedabad', 23.02, 72.57],
]

function areaFromAddress(addr) {
  const parts = addr.split(',').map((s) => s.trim())
  if (parts.length >= 2) return parts[parts.length - 2] || parts[0]
  return parts[0] || 'Ahmedabad'
}

function cityFromAddress(addr) {
  if (/Gandhinagar/i.test(addr)) return 'Gandhinagar'
  return 'Ahmedabad'
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      { headers: { 'User-Agent': 'EventBizVenueSeed/1.0' }, timeout: 25000 },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve, reject)
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`))
          res.resume()
          return
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      },
    )
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('timeout'))
    })
  })
}

async function downloadAerial(lat, lng, outPath) {
  const d = 0.012
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`
  const url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${bbox}&bboxSR=4326&imageSR=3857&size=1200,800&format=jpg&f=image`
  const buf = await fetchBuffer(url)
  fs.writeFileSync(outPath, buf)
}

const THEMES = [
  ['Shailaputri Night', 'White & saffron dress theme'],
  ['Brahmacharini Night', 'Yellow festive theme'],
  ['Chandraghanta Night', 'Green traditional theme'],
  ['Kushmanda Night', 'Orange dandiya night'],
  ['Skandamata Night', 'Family & kids priority'],
  ['Katyayani Night', 'Red & gold glam night'],
  ['Kaalratri Night', 'Black & silver youth night'],
  ['Mahagauri Night', 'All-white classic Garba'],
  ['Siddhidatri Night', 'Grand finale & fireworks cue'],
]

async function main() {
  fs.mkdirSync(venueDir, { recursive: true })
  const places = []

  for (let i = 0; i < RAW.length; i++) {
    const [name, address, lat, lng] = RAW[i]
    const id = `place-${String(i + 1).padStart(2, '0')}`
    const jpg = path.join(venueDir, `${id}.jpg`)
    const svgFallback = `/images/venues/v${String(i + 1).padStart(2, '0')}.svg`
    let image = svgFallback
    try {
      process.stdout.write(`aerial ${id}… `)
      await downloadAerial(lat, lng, jpg)
      image = `/images/venues/${id}.jpg`
      console.log('ok')
      await new Promise((r) => setTimeout(r, 200))
    } catch (e) {
      console.log('fallback svg', e.message)
    }

    const area = areaFromAddress(address)
    places.push({
      id,
      name,
      city: cityFromAddress(address),
      area,
      address,
      landmark: address.split(',')[0].trim(),
      image,
      gallery: [image, svgFallback],
      lat,
      lng,
      tags: ['Garba', 'Mandli', 'Navratri', area],
      capacityHint: 1200 + (i % 10) * 200,
      parking: true,
      metroNearby: false,
      photoStyle: 'aerial-ground',
    })
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
  db.places = places

  function buildDays(indexes, startDate) {
    return indexes.map((pi, idx) => {
      const p = places[pi]
      const d = new Date(`${startDate}T12:00:00+05:30`)
      d.setDate(d.getDate() + idx)
      const date = d.toISOString().slice(0, 10)
      const [theme, dressHint] = THEMES[idx]
      return {
        day: idx + 1,
        date,
        placeId: p.id,
        venue: p.name,
        area: p.area,
        address: p.address,
        landmark: p.landmark,
        lat: p.lat,
        lng: p.lng,
        theme,
        dressHint,
        startTime: idx === 8 ? '18:30' : '19:00',
        endTime: idx === 8 ? '01:30' : '00:30',
        gatesOpen: '18:00',
        image: p.image,
        highlights: [`${theme}`, p.area, dressHint, 'Wide mandli ground'],
        note: `Day ${idx + 1} of 9 — ${p.name}`,
      }
    })
  }

  // Classic west/bopal circuit + East/gift circuit from real list
  const classicDays = buildDays([0, 1, 2, 5, 6, 8, 11, 14, 38], '2026-10-05')
  const eastDays = buildDays([39, 4, 7, 40, 41, 42, 46, 48, 19], '2026-10-05')

  for (const ev of db.events || []) {
    if (ev.id === 'e-b1') {
      ev.bundleDays = classicDays
      ev.image = classicDays[0].image
      ev.gallery = classicDays.map((d) => d.image)
      ev.venue = 'Rotating — 9 Ahmedabad mandli grounds'
      ev.address = 'See day-wise map & itinerary'
      ev.landmark = classicDays[0].venue
      ev.area = 'West & Bopal circuit'
    }
    if (ev.id === 'e-b2') {
      ev.bundleDays = eastDays
      ev.image = eastDays[0].image
      ev.gallery = eastDays.map((d) => d.image)
      ev.venue = 'Rotating — East + GIFT / Gandhinagar'
      ev.address = 'See day-wise map & itinerary'
      ev.landmark = eastDays[0].venue
      ev.area = 'East & GIFT circuit'
    }
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n')
  console.log('places', places.length, 'with aerial jpg', places.filter((p) => p.image.endsWith('.jpg')).length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
