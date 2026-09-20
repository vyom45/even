import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'images', 'garba-fest')
fs.mkdirSync(outDir, { recursive: true })

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'EventBizDemo/1.0 (educational; local garba venue demo)',
            Accept: 'application/json',
          },
          timeout: 30000,
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchJson(res.headers.location).then(resolve, reject)
            return
          }
          let data = ''
          res.on('data', (c) => (data += c))
          res.on('end', () => {
            try {
              resolve(JSON.parse(data))
            } catch (e) {
              reject(e)
            }
          })
        },
      )
      .on('error', reject)
  })
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: { 'User-Agent': 'EventBizDemo/1.0 (educational; local garba venue demo)' },
        timeout: 45000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location, dest).then(resolve, reject)
          return
        }
        if (res.statusCode !== 200) {
          res.resume()
          reject(new Error('HTTP ' + res.statusCode))
          return
        }
        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => file.close(() => resolve(dest)))
        file.on('error', reject)
      },
    )
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('timeout'))
    })
  })
}

async function searchImages(q, limit = 30) {
  const url =
    'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      format: 'json',
      origin: '*',
      generator: 'search',
      gsrsearch: `filetype:bitmap ${q}`,
      gsrnamespace: '6',
      gsrlimit: String(limit),
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      iiurlwidth: '1280',
    })
  const json = await fetchJson(url)
  const pages = json?.query?.pages || {}
  const list = []
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0]
    if (!info) continue
    const mime = info.mime || ''
    if (!mime.startsWith('image/') || mime.includes('svg')) continue
    const src = info.thumburl || info.url
    if (src) list.push({ url: src, mime })
  }
  return list
}

const existing = fs.readdirSync(outDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
console.log('have', existing.length)

const need = 50 - existing.length
if (need <= 0) {
  console.log('already 50+')
  process.exit(0)
}

const queries = [
  'Garba Ahmedabad',
  'Navratri celebration',
  'Dandiya dance India',
  'Gujarati Garba',
  'Navratri women dancing',
  'folk dance Gujarat Garba',
]

const usedUrls = new Set()
const candidates = []
for (const q of queries) {
  try {
    const hits = await searchImages(q, 40)
    for (const h of hits) {
      const key = h.url.split('?')[0]
      if (usedUrls.has(key)) continue
      usedUrls.add(key)
      candidates.push(h)
    }
    console.log(q, 'candidates', candidates.length)
  } catch (e) {
    console.log('search fail', e.message)
  }
  await new Promise((r) => setTimeout(r, 800))
}

let next = 1
while (fs.existsSync(path.join(outDir, `garba-${String(next).padStart(2, '0')}.jpg`)) ||
  fs.existsSync(path.join(outDir, `garba-${String(next).padStart(2, '0')}.png`))) {
  next++
}

let added = 0
for (const h of candidates) {
  if (added >= need) break
  const n = String(next).padStart(2, '0')
  const ext = h.mime.includes('png') ? 'png' : 'jpg'
  const dest = path.join(outDir, `garba-${n}.${ext}`)
  // skip if slot already filled by earlier numbered file
  if (fs.existsSync(dest)) {
    next++
    continue
  }
  try {
    await download(h.url, dest)
    const size = fs.statSync(dest).size
    if (size < 8000) {
      fs.unlinkSync(dest)
      console.log('skip small', n)
      await new Promise((r) => setTimeout(r, 1200))
      continue
    }
    console.log('ok', n, Math.round(size / 1024) + 'KB')
    added++
    next++
  } catch (e) {
    console.log('fail', n, e.message)
    await new Promise((r) => setTimeout(r, 2000))
  }
  await new Promise((r) => setTimeout(r, 1200))
}

const files = fs.readdirSync(outDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort()
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(
    {
      source: 'Wikimedia Commons',
      note: 'Free-licensed Garba/Navratri/Dandiya festival images for demo',
      count: files.length,
      files,
    },
    null,
    2,
  ),
)
console.log('DONE files=', files.length)
